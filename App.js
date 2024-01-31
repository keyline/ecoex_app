import { Alert, AppState, Linking, StatusBar } from 'react-native'
import React, { useState, useCallback, useEffect, useRef } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import AuthStack from './App/Navigation/AuthStack'
import { Colors } from './App/Utils/Colors'
import { clearUserData, getAccessToken, getStoreFcmToken, getUserData } from './App/Service/AsyncStorage'
import AuthContext from './App/Service/Context'
import PlantDrawerStack from './App/Navigation/Plant/PlantDrawerStack'
import { ToastError, ToastMessage } from './App/Service/CommonFunction'
import Apis from './App/Service/Apis'
import SplashScreen from 'react-native-splash-screen'
import VendorDrawerStack from './App/Navigation/Vendor/VendorDrawerStack'
import { getFcmPermission } from './App/Service/DeviceToken'
import messaging from '@react-native-firebase/messaging';
import notifee, { EventType } from '@notifee/react-native';
import { Notification } from './App/Service/Notification'
import { navigate, navigationRef } from './App/Service/NavigationRef'
import VersionCheck from 'react-native-version-check';
import { fetch as fetchPolyfill } from 'whatwg-fetch'

const App = () => {
  const [state, setState] = useState({
    loading: true,
    isLogin: false,
    userdata: null,
    accesstoken: null,
    appData: null,
    userProfile: null,
    siteData: null,
    userType: '',
    appVersion: '1.0'
  })
  const appState = useRef(AppState.currentState);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        // console.log('App has come to the foreground!');
        onAppUpdate();
      }
      appState.current = nextAppState;
    });

    return () => subscription.remove();
  }, []);

  const onAppUpdate = async () => {
    global.fetch = fetchPolyfill
    VersionCheck.needUpdate()
      .then(async res => {
        if (__DEV__) {
          console.log('UpdateChecker', JSON.stringify(res))
        }
        if (res?.currentVersion) {
          setState(prev => ({
            ...prev,
            appVersion: res?.currentVersion
          }))
        }
        if (res?.isNeeded && res?.storeUrl) {
          Alert.alert(
            'Update Available',
            'A new version of the app is available. Please update for the best experience.',
            [
              {
                text: 'Update Now',
                onPress: () => Linking.openURL(res?.storeUrl)
              }
            ],
            { cancelable: false }
          )
        } else {
          // No update is required
          if (__DEV__) {
            console.log('You are using the latest version.');
          }
        }
      })
      .catch(err => {
        if (__DEV__) {
          console.error('Error checking for updates:', err)
        }
      });
  }

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      if (__DEV__) {
        console.log('ForgroundMessage', JSON.stringify(remoteMessage));
      }
      let title = remoteMessage.notification.title
      let body = remoteMessage.notification.body
      let data = remoteMessage.data
      Notification(title, body, data);
    })
    return () => unsubscribe
  }, [])

  useEffect(() => {
    //for Background state Notification
    const unsubscribes = messaging().onNotificationOpenedApp(remoteMessage => {
      if (__DEV__) {
        console.log('Notification caused app to open from background states:', remoteMessage);
      }
      if (remoteMessage) {
        navigate(remoteMessage.data)
      }
    });
    return () => unsubscribes
  }, [])

  useEffect(() => {
    //for Quit state Notification
    const unsb = messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          if (__DEV__) {
            console.log('Notification caused app to open from quit state:', remoteMessage);
          }
          navigate(remoteMessage.data)
        }
      });
    return () => unsb
  }, []);

  useEffect(() => {
    //for Foreground State Notification
    const unsbs = notifee.onForegroundEvent(({ type, detail }) => {
      switch (type) {
        case EventType.DISMISSED:
          if (__DEV__) {
            console.log('User dismissed notification', detail.notification);
          }
          break;
        case EventType.PRESS:
          if (__DEV__) {
            console.log('User pressed notification', detail.notification);
          }
          let datas = detail.notification.data
          if (datas) {
            navigate(datas)
          }
          break;
      }
    });
    return () => unsbs
  }, []);

  useEffect(() => {
    onGetDeviceToken();
    onGetData();
    onAppUpdate();
  }, [])

  const onGetDeviceToken = async () => {
    try {
      let premission = await getFcmPermission();
      // let token = await generateFcmToken();
      let fcmToken = await getStoreFcmToken();
      if (__DEV__) {
        console.log('FcmPremission', premission)
        console.log('FcmToken', fcmToken);
      }
    } catch (error) {
      if (__DEV__) {
        console.log(error)
      }
    }
  }

  const onGetData = useCallback(async () => {
    try {
      setState(prev => ({
        ...prev,
        loading: true
      }))
      let response = await Apis.app_setting()
      if (__DEV__) {
        console.log('AppSettingApp.js', JSON.stringify(response))
      }
      await onGetStoreData();
      if (response.success) {
        setState(prev => ({
          ...prev,
          siteData: response?.data,
          loading: false
        }))
        SplashScreen.hide();
      } else {
        ToastMessage(response?.message);
      }
    } catch (error) {
      if (__DEV__) {
        console.log(error)
      }
      ToastError();
    }
  })

  const onGetUserProfile = useCallback(async () => {
    let accesstoken = await getAccessToken();
    if (accesstoken) {
      try {
        let res = await Apis.get_profile();
        if (__DEV__) {
          console.log('UserProfileAppjs', JSON.stringify(res))
        }
        if (res.success) {
          setState(prev => ({
            ...prev,
            userProfile: res?.data,
            userType: res?.data?.type
          }))
        }
      } catch (error) {
        if (__DEV__) {
          console.log(error)
        }
        ToastError();
      }
    }
  })

  const onGetStoreData = async () => {
    try {
      let userdata = await getUserData();
      let accesstoken = await getAccessToken();
      if (__DEV__) {
        console.log('UserData', userdata);
        console.log('token', accesstoken)
      }
      if (userdata && accesstoken) {
        setState(prevState => ({
          ...prevState,
          userdata: userdata,
          accesstoken: accesstoken,
          userType: userdata?.type,
          isLogin: true
        }))
        onGetUserProfile();
      } else {
        setState(prevState => ({
          ...prevState,
          userdata: null,
          accesstoken: null,
          isLogin: false
        }))
      }
    } catch (error) {
      if (__DEV__) {
        console.log('dataError', error)
      }
    }
  }

  const onClearStoreData = async () => {
    try {
      setState(prevState => ({
        ...prevState,
        isLogin: false,
        userdata: null,
        accesstoken: null,
        userProfile: null
      }))
      await clearUserData();
    } catch (error) {
      if (__DEV__) {
        console.log('dataError', error)
      }
    }
  }

  return (
    <AuthContext.Provider value={{ allData: state, setState, onGetStoreData, onClearStoreData, onGetUserProfile }}>
      <NavigationContainer ref={navigationRef}>
        <StatusBar backgroundColor={Colors.white} barStyle={'dark-content'} />
        {(!state.loading) && (
          <>
            {(state.isLogin) ?
              <>
                {(state.userdata?.type == 'PLANT') ?
                  <PlantDrawerStack />
                  :
                  <VendorDrawerStack />
                }
              </>
              :
              <AuthStack />
            }
          </>
        )}
      </NavigationContainer>
    </AuthContext.Provider>
  )
}

export default App