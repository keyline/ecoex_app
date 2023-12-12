import { View, Text, SafeAreaView, Image, ScrollView } from 'react-native'
import React, { useState, useCallback, useContext } from 'react'
import { CommonStyle } from '../../../Utils/CommonStyle'
import { ImagePath } from '../../../Utils/ImagePath'
import { styles } from './styles'
import InputField from '../../../Container/InputField'
import Button from '../../../Container/Button'
import { isValidEmail } from '../../../Service/Valid'
import { setAccessToken, setUserData } from '../../../Service/AsyncStorage'
import { ToastError, ToastMessage } from '../../../Service/CommonFunction'
import AuthContext from '../../../Service/Context'
import Apis from '../../../Service/Apis'
import DeviceInfo from 'react-native-device-info'
import { generateFcmToken, getFcmPermission } from '../../../Service/DeviceToken'

const Login = ({ navigation }) => {

  const context = useContext(AuthContext)

  const [state, setState] = useState({
    loading: false,
    email: '',
    emailErr: '',
    password: '',
    passwordErr: '',
    PasswordVisible: false
  })

  const showLoading = useCallback(async () => {
    setState(prev => ({
      ...prev,
      loading: true
    }))
  }, [state.loading])

  const hideLoading = useCallback(async () => {
    setState(prev => ({
      ...prev,
      loading: false
    }))
  }, [state.loading])

  const onChangeEmail = useCallback(async (value) => {
    setState(prev => ({
      ...prev,
      email: value,
      emailErr: ''
    }))
  }, [state.email])

  const onChangePassword = useCallback(async (value) => {
    setState(prev => ({
      ...prev,
      password: value,
      passwordErr: ''
    }))
  }, [state.password])

  const onChangePassVisible = useCallback(async () => {
    setState(prev => ({
      ...prev,
      PasswordVisible: !state.PasswordVisible
    }))
  }, [state.PasswordVisible])

  const onSubmit = useCallback(async () => {
    // navigation.navigate('DashBoard')
    if (state.email.trim() == '') {
      setState(prev => ({
        ...prev,
        emailErr: 'Enter Email'
      }))
      return
    } else if (!isValidEmail(state.email)) {
      setState(prev => ({
        ...prev,
        emailErr: 'Enter Valid Email'
      }))
      return
    } else if (state.password.trim() == '') {
      setState(prev => ({
        ...prev,
        passwordErr: 'Enter Password'
      }))
      return
    } else {
      try {
        showLoading();
        let premission = await getFcmPermission();
        let token = await generateFcmToken();
        let deviceId = DeviceInfo.getDeviceId();
        let datas = {
          email: state.email,
          password: state.password,
          device_token: deviceId,
          fcm_token: token ? token : ''
        }
        let response = await Apis.sign_in(datas);
        if (__DEV__) {
          console.log('LoginResponse', JSON.stringify(response))
        }
        if (response.success) {
          let userdata = response?.data;
          if (userdata?.type == 'PLANT') {
            let token = response?.data?.app_access_token
            await setUserData(userdata);
            await setAccessToken(token);
            // await context.onGetStoreData();
            await context.onGetUserProfile();
            await context.setState(prevState => ({
              ...prevState,
              userdata: userdata,
              accesstoken: token,
              userType: userdata?.type,
              isLogin: true
            }))
            hideLoading();
            ToastMessage(response?.message);
          } else {
            ToastMessage(`${userdata?.type} Pannel Comming Soon`);
            hideLoading();
          }
        } else {
          hideLoading();
          ToastMessage(response?.message);
        }
        hideLoading();
        // ToastMessage(response?.message);
      } catch (error) {
        if (__DEV__) {
          console.log(error)
        }
        hideLoading();
        ToastError();
      }
    }
  })

  const onForgotPassword = useCallback(async () => {
    navigation.navigate('ForgotPassword')
  })

  const onSignInMobile = useCallback(async () => {
    navigation.navigate('LoginWithMobile')
  })

  const onSignUp = useCallback(async () => {
    navigation.navigate('SignUp')
  })

  return (
    <SafeAreaView style={CommonStyle.container}>
      <View style={CommonStyle.headerContainer}>
        <Image source={ImagePath.shape} style={CommonStyle.headerImage} />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.bodyContent}>
          <View style={{ alignItems: 'center' }}>
            <Image source={ImagePath.logo} style={styles.logo} />
            <Text style={CommonStyle.headingText}>Sign In Here</Text>
          </View>
          <InputField
            name={'Email'}
            value={state.email}
            onChangeText={onChangeEmail}
            error={state.emailErr}
          />
          <InputField
            name={'Password'}
            value={state.password}
            onChangeText={onChangePassword}
            secureTextEntry={!state.PasswordVisible}
            rightIcon={state.PasswordVisible ? ImagePath.eye_off : ImagePath.eye_on}
            rightonPress={onChangePassVisible}
            error={state.passwordErr}
          />
          <Text onPress={onForgotPassword} style={styles.forgottext}>Forgot Password?</Text>
          <Button
            name={'Sign In'}
            onPress={onSubmit}
            loading={state.loading}
            width={'80%'}
          />
          <Text style={[CommonStyle.boldblacktext, { textAlign: 'center' }]}>OR</Text>
          <Button
            name={'Sign In With Mobile'}
            onPress={onSignInMobile}
            loading={false}
            width={'80%'}
          />
          <Text style={styles.btmText}>Not yet registered ? <Text onPress={onSignUp} style={CommonStyle.boldtext}>Create an account</Text></Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Login