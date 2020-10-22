/* eslint-disable no-bitwise */
/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {Text, TouchableOpacity, SafeAreaView} from 'react-native';
import NfcManager, {Ndef, NfcEvents, NfcTech, NfcAdapter} from 'react-native-nfc-manager';

function buildUrlPayload(valueToWrite) {
  //return Ndef.encodeMessage([Ndef.uriRecord(valueToWrite)]);
  return Ndef.encodeMessage([Ndef.textRecord(valueToWrite)]);
}

class App extends Component {
  componentDidMount() {
    NfcManager.start();
    NfcManager.setEventListener(NfcEvents.DiscoverTag, (tag) => {
      console.warn('tag', tag);
      NfcManager.unregisterTagEvent().catch(() => 0);
    });
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
      await NfcManager.registerTagEvent(
        (tag) => {
          console.log('Tag Discovered', tag);
        },
        'Hold your device over the tag',
        {
          isReaderModeEnabled: true,
          readerModeFlags:
            NfcAdapter.FLAG_READER_NFC_A |
            NfcAdapter.FLAG_READER_SKIP_NDEF_CHECK,
        },
      );
      // try this part after you try the code...
      /* let resp = await NfcManager.requestTechnology(NfcTech.Ndef, {
        alertMessage: 'Ready to write some NFC tags!',
      });
      console.warn(resp);
      const ndef = await NfcManager.getNdefMessage();
      console.log(ndef); */
    } catch (ex) {
      console.warn('ex', ex);
      NfcManager.unregisterTagEvent().catch(() => 0);
    }
  };

  checkSupport = () => {
    NfcManager.isSupported(NfcTech.MifareClassic)
      .then(() => console.log('Mifare classic is supported'))
      .catch((err) => console.warn(err));
  };
}

export default App;
