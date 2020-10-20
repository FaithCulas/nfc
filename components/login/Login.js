/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableNativeFeedback,
  ScrollView,
  SafeAreaView,
} from 'react-native';

function LoginScreen({navigation}) {
  const [email, setEmail] = useState('');
  const pressHandler1 = () => {
    navigation.navigate('Register');
  };
  const pressHandler2 = () => {
    navigation.navigate('Content');
  };
  console.log(email);

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}></View>
      <View style={styles.bottomContainer}></View>

      <View style={styles.frontContainer}>
        <View style={styles.img}>
          <Image style={{width: 100, height: 100}} />
          <Text style={{color: 'white', fontSize: 20}}>SNAP IT</Text>
        </View>
        <View style={styles.roundedSquare}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{color: 'black', fontSize: 25}}> Login </Text>
            <Image style={{width: 30, height: 30}} />
          </View>
          <View style={{flex: 1, flexDirection: 'column'}}>
            <Text style={styles.loginText}>user name </Text>
            {/* <TextInput style={styles.loginTextInput}>user1@example.com </TextInput> */}
            <TextInput
              value={email}
              onChangeText={(e) => setEmail(e)}
              label="Email"
              style={styles.loginTextInput}
            />
          </View>
          <View style={{flex: 1, flexDirection: 'column'}}>
            <Text style={styles.loginText}>password </Text>
            <TextInput style={styles.loginTextInput}>... </TextInput>
          </View>
          <TouchableNativeFeedback onPress={pressHandler2}>
            <View style={[styles.buttonContainer, {marginBottom: 10}]}>
              <Text style={{color: 'white', fontSize: 20}}> sign in </Text>
            </View>
          </TouchableNativeFeedback>
        </View>

        <View style={styles.layer2bottom}>
          <View
            style={{
              flex: 2,
              flexDirection: 'column',
              justifyContent: 'space-evenly',
            }}>
            <Text style={{alignSelf: 'center', fontSize: 20, color: 'grey'}}>
              {' '}
              Don't Have an Account?{' '}
            </Text>
            <TouchableNativeFeedback onPress={pressHandler1}>
              <View style={[styles.buttonContainer]}>
                {/* <Text style={{color:'white',fontSize:20}}> sign up </Text> */}
              </View>
            </TouchableNativeFeedback>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'flex-end',
              alignItems: 'flex-end',
              marginBottom: 10,
            }}>
            <Text
              style={{fontSize: 20, color: 'grey'}}
              onPress={() => alert('help pressed')}>
              {' '}
              help{' '}
            </Text>
            <Text
              style={{fontSize: 20, color: 'grey'}}
              onPress={() => alert('pivacy pressed')}>
              {' '}
              privacy policy{' '}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  topContainer: {
    flex: 1,
    backgroundColor: 'dodgerblue',
    zIndex: 1,
  },
  bottomContainer: {
    flex: 1,
    backgroundColor: '#ffff',
    zIndex: 1,
  },
  frontContainer: {
    flex: 1,
    flexDirection: 'column',
    zIndex: 2,
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  roundedSquare: {
    flex: 1.5,
    flexDirection: 'column',
    backgroundColor: '#ffff',
    width: '90%',
    borderRadius: 10,
    borderWidth: 2,
    alignSelf: 'center',
  },
  img: {
    flex: 1.5,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginText: {
    color: 'blue',
    fontSize: 20,
    marginLeft: 10,
  },
  loginTextInput: {
    fontSize: 20,
    color: 'grey',
    marginLeft: 10,
  },
  buttonContainer: {
    width: 150,
    height: 40,
    backgroundColor: 'dodgerblue',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
  },
  layer2bottom: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#ffff',
    width: '90%',
    alignSelf: 'center',
  },
});

export default LoginScreen;
