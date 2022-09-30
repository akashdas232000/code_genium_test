import React,{useState,useEffect} from 'react';
import {View,
        ScrollView,
        useColorScheme,
        TouchableOpacity,
        ToastAndroid,
        StyleSheet,
        Text} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import OTPInputView from '@twotalltotems/react-native-otp-input'
import RnOtpTimer from 'rn-otp-timer';
import Toast from 'react-native-toast-message';

const styles=StyleSheet.create({
    container:{
    },
    header:{
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
    },
    enter_otp:{
        fontSize: 17,
        marginHorizontal: 20,
        fontWeight: 'bold'
    },
    inputContainer:{
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputStyle:{
        width: '90%', 
        height: 100,
        paddingHorizontal: 5,
        fontSize: 18,
    },
    underlineStyleBase: {
        width: 35,
        height: 50,
        fontSize: 20,
        fontWeight: '700',
        borderWidth: 0,
        borderColor: '#00000080',
        borderBottomWidth: 4,
        borderBottomRadius: 20,
      },
    
      underlineStyleHighLighted: {
        borderColor: "#4caf50",
      },
      button:{
        borderWidth: 0,
        backgroundColor: '#4caf5080',
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 10,
      },
      buttonText:{
        fontSize: 14,
        fontWeight: 'bold'
      },
      submitButton:{
        marginHorizontal: 20,
        marginVertical: 50,
        backgroundColor: '#4caf50',
        paddingVertical: 20,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
      },
      submitText:{
        fontSize: 15,
        fontWeight: 'bold',
      }
});

const EnterOTPScreen = ({route,navigation}) => {

    const{num}=route.params;

    /* This hook is used for getting the mode/theme of the android device i.e dark or light */
    const colorScheme=useColorScheme();

    const[randomNumber,setRandomNumber]=useState(null);
    const[otpValue,setOTPValue]=useState('');

    /* This function creates a 6 digit random number and shows the number as a notification. */
    const generateRandomNumber=()=>{
        const randomNumber1 = (Math.floor(Math.random() * 10)).toString();
        const randomNumber2 = (Math.floor(Math.random() * 10)).toString();
        const randomNumber3 = (Math.floor(Math.random() * 10)).toString();
        const randomNumber4 = (Math.floor(Math.random() * 10)).toString();
        const randomNumber5 = (Math.floor(Math.random() * 10)).toString();
        const randomNumber6 = (Math.floor(Math.random() * 10)).toString();

        const generatedNumber= randomNumber1+randomNumber2+randomNumber3+randomNumber4+randomNumber5+randomNumber6;
        setRandomNumber(generatedNumber);

        Toast.show({
            type: 'success',
            text1: 'OTP is '+generatedNumber,
          });
    }

    useEffect(()=>{
        generateRandomNumber();
    },[])

    return(
        <ScrollView style={{...styles.container,backgroundColor: colorScheme === 'dark' ? '#000000' : '#fff'}}>
            <View style={styles.header}>
            <TouchableOpacity
            onPress={()=>{
                navigation.goBack();
            }}>    
                <Ionicons name="chevron-back-outline" size={40} color="#4caf50" />
            </TouchableOpacity>
            <Text style={{...styles.enter_otp,color: colorScheme === 'dark' ? '#fff' : '#000000'}}>Enter OTP</Text>
            </View>

            <View style={styles.inputContainer}>
                <OTPInputView
                    style={styles.inputStyle}
                    pinCount={6}
                    code={otpValue} 
                    onCodeChanged = {code => { setOTPValue(code) }}
                    autoFocusOnLoad
                    codeInputFieldStyle={{...styles.underlineStyleBase,color: colorScheme === 'dark' ? '#fff' : '#000000',}}
                    codeInputHighlightStyle={styles.underlineStyleHighLighted}
                    onCodeFilled = {(code => {
                        console.log(`Code is ${code}, you are good to go!`)
                    })}/>
            </View> 

            <RnOtpTimer
                minutes={0}
                seconds={60}
                resendButtonText={'Resend OTP'}
                resendButtonStyle={styles.button}
                resendButtonTextStyle={styles.buttonText}
                resendButtonAction={() => {
                    generateRandomNumber();
                }}/>

            <TouchableOpacity 
            onPress={()=>{
                if(otpValue.length != 6){
                    ToastAndroid.show('Enter 6 digit OTP please !',ToastAndroid.SHORT);
                }
                else if(otpValue == randomNumber){
                    ToastAndroid.show('Registered successfully !',ToastAndroid.SHORT);
                }
                else{
                    ToastAndroid.show('Please enter correct OTP !',ToastAndroid.SHORT);
                }
            }}
            style={styles.submitButton}>
                <Text style={styles.submitText}>SUBMIT</Text>
            </TouchableOpacity>       
            <Toast />  
        </ScrollView>    
    )
}

export default EnterOTPScreen;