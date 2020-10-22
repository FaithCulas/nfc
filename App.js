/* eslint-disable no-bitwise */
/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {Text, TouchableOpacity, SafeAreaView, Platform} from 'react-native';
import NfcManager, {Ndef, NfcEvents, NfcTech} from 'react-native-nfc-manager';

function buildUrlPayload(valueToWrite) {
  //return Ndef.encodeMessage([Ndef.uriRecord(valueToWrite)]);
  return Ndef.encodeMessage([Ndef.textRecord(valueToWrite)]);
}

class App extends Component {
  componentDidMount() {
    NfcManager.start();
    /* console.log('started');
    NfcManager.setEventListener(NfcEvents.DiscoverTag, (tag) => {
      console.warn('tag', tag);
      NfcManager.unregisterTagEvent().catch(() => 0);
    }); */
  }

  componentWillUnmount() {
    NfcManager.setEventListener(NfcEvents.DiscoverTag, null);
    NfcManager.unregisterTagEvent().catch(() => 0);
  }

  render() {
    return (
      <SafeAreaView style={{padding: 20}}>
        <Text>NFC Demo</Text>
        <TouchableOpacity
          style={{
            padding: 10,
            width: 200,
            margin: 20,
            borderWidth: 1,
            borderColor: 'black',
          }}
          onPress={this._testNdef}>
          <Text>Test Ndef</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            padding: 10,
            width: 200,
            margin: 20,
            borderWidth: 1,
            borderColor: 'black',
          }}
          onPress={this._cleanUp}>
          <Text>Cancel Test</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            padding: 10,
            width: 200,
            margin: 20,
            borderWidth: 1,
            borderColor: 'black',
          }}
          onPress={this.checkSupport}>
          <Text>Check Support</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  _cleanUp = () => {
    NfcManager.unregisterTagEvent().catch(() => 0);
  };

  _testNdef = async () => {
    try {
      let tech = Platform.OS === 'ios' ? NfcTech.MifareIOS : NfcTech.NfcA;
      let resp = await NfcManager.requestTechnology(tech, {
        alertMessage: 'Ready to do some custom Mifare cmd!',
      });
      console.warn(resp);

      // the NFC uid can be found in tag.id
      let tag = await NfcManager.getTag();
      console.warn(tag);

      if (Platform.OS === 'ios') {
        resp = await NfcManager.sendMifareCommandIOS([0x30, 0x00]);
      } else {
        resp = await NfcManager.transceive([0x30, 0x00]);
      }
      console.warn(resp);

      this._cleanUp();
    } catch (ex) {
      console.warn('ex', ex);
      this._cleanUp();
    }
  };

  checkSupport = () => {
    NfcManager.isSupported(NfcTech.MifareClassic)
      .then(() => console.log('Mifare classic is supported'))
      .catch((err) => console.warn(err));
  };
}

export default App;
