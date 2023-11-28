import { StatusBar } from 'react-native'
import React, { useState, useCallback, useContext, useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import AuthStack from './App/Navigation/AuthStack'
import { Colors } from './App/Utils/Colors'
import DrawerStack from './App/Navigation/DrawerStack'
import { clearUserData, getAccessToken, getUserData } from './App/Service/AsyncStorage'
import AuthContext from './App/Service/Context'
import PlantDrawerStack from './App/Navigation/Plant/PlantDrawerStack'
import { ToastError, ToastMessage } from './App/Service/CommonFunction'
import Apis from './App/Service/Apis'
import SplashScreen from 'react-native-splash-screen'

const App = () => {

  const [state, setState] = useState({
    loading: true,
    isLogin: false,
    userdata: null,
    accesstoken: null,
    appData: null,
    userProfile: null,
    siteData: null
  })

  useEffect(() => {
    // onGetStoreData();
    onGetData();
  }, [])

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
          isLogin: true
        }))
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
    <NavigationContainer>
      <AuthContext.Provider value={{ allData: state, setState, onGetStoreData, onClearStoreData }}>
        <StatusBar backgroundColor={Colors.theme_color} barStyle={'light-content'} />
        {(!state.loading) && (
          <>
            {(state.isLogin) ?
              // <DrawerStack />
              <PlantDrawerStack />
              :
              <AuthStack />
            }
          </>
        )}
      </AuthContext.Provider>
    </NavigationContainer>
  )
}

export default App