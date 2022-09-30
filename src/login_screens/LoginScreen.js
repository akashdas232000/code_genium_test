import React,{useState} from 'react';
import {View,
        Text,
        StatusBar,
        useColorScheme,
        ScrollView,
        Dimensions,
        TextInput,
        Image,
        ToastAndroid,
        NativeModules,
        PermissionsAndroid,
        TouchableOpacity,
        StyleSheet} from 'react-native';
import DatePicker from 'react-native-date-picker';
import * as yup from 'yup';
import Toast from 'react-native-toast-message';

/* Here contains all the styling elements */
const styles= StyleSheet.create({
    container:{
    },
    icon: {
        height: 50,
        marginVertical: 10,
        width: Dimensions.get('window').width,
        resizeMode: 'contain',
        alignItems: 'center',
        justifyContent: 'center',
    },
    input_name: {
        height: 50,
        margin: 12,
        borderWidth: 0,
        backgroundColor: '#4caf5060',
        borderRadius: 25,
        marginHorizontal: 40,
        padding: 10,
        paddingHorizontal: 20,
      },
    input_number:{
        flex: 5,
        height: 50,
        marginLeft: 2,
        backgroundColor: '#4caf5060',
        borderBottomRightRadius: 25,
        borderTopRightRadius: 25,
        marginRight: 40,
        padding: 10,
        paddingHorizontal: 20,
    },
    input_email:{
        height: 50,
        margin: 12,
        borderWidth: 0,
        backgroundColor: '#4caf5060',
        borderRadius: 25,
        marginHorizontal: 40,
        padding: 10,
        paddingHorizontal: 20,
    },
    next_button:{
        paddingVertical: 20,
        marginVertical: 30,
        borderRadius: 25,
        paddingHorizontal: 20,
        backgroundColor: '#4caf50',
        marginHorizontal: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    next:{
        fontWeight: 'bold',
        fontSize: 15,
    },
    number_view:{
        flexDirection: 'row',
        alignItems: 'center',
    },
    dob:{
        height: 50,
        margin: 12,
        borderWidth: 0,
        backgroundColor: '#4caf5060',
        borderRadius: 25,
        marginHorizontal: 40,
        padding: 10,
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    dob_placeholder:{
    },
    country_code:{
        flex: 1,
        backgroundColor: '#4caf5060',
        marginLeft: 40,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10,
        borderTopLeftRadius: 25,
        borderBottomLeftRadius: 25,
        paddingHorizontal: 10,
    },
    country_code_number:{
        color: '#000000',
        fontWeight: 'bold',
    }  
});        

const LoginScreen = ({navigation}) => {
    
    let DirectSms = NativeModules.DirectSms;

    /* This is a validation schema used to validate user entered information 
    */
    let schemaValidation = yup.object().shape({
        name: yup.string().required('Name can not be empty !').min(1),
        number: yup.string().required('Number can not be empty !').min(10,'Number must be of 10 digits !').max(10,'Number must be of 10 digits !'),
        email: yup.string().required('Email can not be empty !').email('Invalid email !'),
        dob: yup.date().required(),
      });


    /* This hook is used to get the state of the app i.e dark or light mode, returns a String */
    const colorScheme= useColorScheme(); 
    
    /* Local state declerations for name,number,dob,email e.t.c */
    const[name,setName]=useState('');
    const[number,setNumber]=useState('');
    const[email,setEmail]=useState('');
    const[date,setDate]=useState(new Date());

    const[showDateModal,setShowDateModal]=useState(false);
    const[showdob,setShowDOB]=useState(false);


    /* Function to send sms/message to the number provided */
    const sendDirectSMS=async()=>{
        if (number) {
            try {
              const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.SEND_SMS,
                {
                  title: 'Send SMS App Sms Permission',
                  message:
                    'Send SMS App needs access to your inbox ' +
                    'so you can send messages in background.',
                  buttonNeutral: 'Ask Me Later',
                  buttonNegative: 'Cancel',
                  buttonPositive: 'OK',
                },
              );
              if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                DirectSms.sendDirectSms(number, name);
                ToastAndroid.show('OTP Sent !',ToastAndroid.SHORT);
              } else {
                ToastAndroid.show('Permission Denied !',ToastAndroid.SHORT);
              }
            } catch (error) {
              console.warn(error);
              alert(error);
            }
          }
    }

    return(
        <ScrollView style={{...styles.container,backgroundColor: colorScheme === 'dark' ? '#000000' : '#fff'}}>
            <StatusBar
                animated={true}
                backgroundColor={colorScheme === 'dark' ? '#000000' : '#fff'}
                barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'}
                showHideTransition={'fade'}
                hidden={false} />
            <Image
                style={styles.icon}
                source={require('../assets/images/codegenium_logo.jpg')}/>
                    <TextInput
                        style={{...styles.input_name,color: colorScheme === 'dark' ? '#fff' : '#000000'}}
                        onChangeText={(text)=>{
                            setName(text);
                        }}
                        value={name}
                        placeholderTextColor={colorScheme === 'dark' ? '#bdbdbd' : '#61616180'}
                        placeholder="Name"/>
                    <View style={styles.number_view}>
                        <View style={styles.country_code}>
                            <Text style={styles.country_code_number}>+91</Text>
                        </View>    
                        <TextInput
                            style={{...styles.input_number,color: colorScheme === 'dark' ? '#fff' : '#000000'}}
                            onChangeText={(text)=>{
                                setNumber(text);
                            }}
                            value={number}
                            keyboardType="numeric"
                            placeholderTextColor={colorScheme === 'dark' ? '#bdbdbd' : '#61616180'}
                            placeholder="Mobile number"/>
                    </View>    
                    <TouchableOpacity 
                    onPress={()=>{
                        setShowDateModal(true);
                    }}
                    style={styles.dob}>
                        <DatePicker
                            modal
                            mode={'date'}
                            open={showDateModal}
                            date={date}
                            onConfirm={(date) => {
                                setShowDateModal(false);
                                setDate(date);
                                setShowDOB(true);
                            }}
                            onCancel={() => {
                                setShowDateModal(false);
                            }}
                        />
                        <Text style={{...styles.dob_placeholder,color: !showdob ? colorScheme === 'dark' ? '#bdbdbd' : '#61616180' : colorScheme === 'dark' ? '#fff' : '#000000'}}>{showdob ? date.toString().slice(3,16) : 'Date of birth'}</Text>
                    </TouchableOpacity>    
                    <TextInput
                        style={{...styles.input_email,color: colorScheme === 'dark' ? '#fff' : '#000000'}}
                        onChangeText={(text)=>{
                            setEmail(text);
                        }}
                        value={email}
                        placeholderTextColor={colorScheme === 'dark' ? '#bdbdbd' : '#61616180'}
                        placeholder="Email ID"/> 
            <TouchableOpacity 
            onPress={()=>{
                
                    schemaValidation
                    .validate({
                        name: name,
                        number: number,
                        email: email,
                        dob: date,
                    })
                    .catch((err)=>{
                        Toast.show({
                            type: 'error',
                            text1: err.errors[0],
                          });
                          
                    });
                    if(!showdob){
                        Toast.show({
                            type: 'error',
                            text1: 'Please select date !',
                          });
                    }

                    schemaValidation
                        .isValid({
                            name: name,
                            number: number,
                            email: email,
                            dob: date,
                        })
                        .then(function (valid) {
                            if(valid == true && showdob){
                                
                                sendDirectSMS();
                                navigation.navigate('EnterOTPScreen',{
                                    num: number,
                                });
                            }
                        });
            }}
            style={styles.next_button}>
                        <Text style={{...styles.next,color: colorScheme === 'dark' ? '#fff' : '#000000'}}>SUBMIT</Text>
            </TouchableOpacity>  
            <Toast />                             
        </ScrollView>    
    )
}

export default LoginScreen;