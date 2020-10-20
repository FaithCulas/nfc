/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, Platform, Text, SafeAreaView, StyleSheet,TextInput, TouchableOpacity, Alert} from 'react-native';
import NfcManager, {NfcEvents, NfcTech} from 'react-native-nfc-manager';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      log: 'Ready',
      text: '',
    };
  }
  componentDidMount() {
    NfcManager.start();
  }

  componentWillUnmount() {
    this.cleanup();
  } 
 
  cleanup = () => {};

  onChangeText = (text) => {
    this.setState({
      text,
    });
  };

  writeData = async () => {
    //if (!this.state.text){
      //Alert.alert('enter some text');
    //}
    try {
      let tech = Platform.OS === 'android' ? NfcTech.MifareClassic : NfcTech.NfcA;
      let resp = await NfcManager.requestTechnology(tech, {
        alertMessage: "Ready for magic"
      })
    } catch (err) {
      this.setState({
        log: err.toString(),
      });
      this.cleanup();
    }
  };
  readData = async () => {}
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <TextInput
          style={styles.TextInput}
          onChangeText={this.onChangeText}
          autoCompleteType="off"
          auutoCapitalize="none"
          autoCorrect={false}
          placeholderTextColor="#888888"
          placeholder="enter text here"
        />
        <TouchableOpacity onPress={this.writeData} style={styles.buttonWrite}>
          <Text style={styles.buttonText}>Write</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={this.readData} style={styles.buttonRead}>
          <Text style={styles.buttonText}>Read</Text>
        </TouchableOpacity>

        <View style={styles.log}>
          <Text>{this.state.log}</Text>
        </View>
      </SafeAreaView>
    );
  }
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  textInput: {
    marginLeft: 20,
    marginRight: 20,
    height: 50,
    marginBottom: 10,
    textAlign: 'center',
    color: 'black',
  },
  buttonWrite: {
    marginLeft: 20,
    marginRight: 20,
    height: 50,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    backgroundColor: '#9D2235',
  },
  buttonRead: {
    marginLeft: 20,
    marginRight: 20,
    height: 50,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    backgroundColor: '#006C5B',
  },
  buttonText: {
    color: 'white',
  },
  log: {
    marginTop: 30,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
