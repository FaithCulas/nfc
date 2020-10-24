/* eslint-disable no-alert */
/* eslint-disable no-bitwise */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  Text,
  TouchableOpacity,
  SafeAreaView,
  ToastAndroid,
  Platform,
} from 'react-native';
import NfcManager, {
  NfcEvents,
  NfcTech,
  NfcAdapter,
  NdefParser,
} from 'react-native-nfc-manager';

export default function App() {
  const Start = () => {
    NfcManager.start();
    NfcManager.setEventListener(NfcEvents.DiscoverTag, (tag) => {
      console.warn('tag', tag);
      NfcManager.setAlertMessageIOS('I got your tag!');
      NfcManager.unregisterTagEvent().catch(() => 0);
    });
  };

  const Read = async () => {
    try {
      await NfcManager.registerTagEvent(
        (tag) => {
          console.log('Tag Discovered', tag);
        },
        'Hold your device over the tag',
        {
          invalidateAfterFirstRead: true,
          isReaderModeEnabled: true,
          readerModeFlags:
            NfcAdapter.FLAG_READER_NFC_A |
            NfcAdapter.FLAG_READER_SKIP_NDEF_CHECK,
        },
      );
    } catch (ex) {
      console.warn('ex', ex);
      NfcManager.unregisterTagEvent().catch(() => 0);
    }
  };

  const Support = () => {
    NfcManager.isSupported(NfcTech.MifareClassic)
      .then(() => console.log('Mifare classic is supported'))
      .catch((err) => console.warn(err));
  };

  const Enabled = () => {
    console.log('enabled is :', NfcManager.isEnabled);
  };

  const readNdef = () => {
    NfcManager.registerTagEvent((tag) => console.log(tag))
      .then(() => NfcManager.requestTechnology(NfcTech.Ndef))
      .then(() => NfcManager.getTag())
      .then((tag) => {
        console.log(JSON.stringify(tag));
      })
      .then(() => NfcManager.getNdefMessage())
      .then((tag) => {
        console.log('tag is ', tag);
      });
  };

  return (
    <SafeAreaView style={{padding: 20}}>
      <Text>NFC SCANNER</Text>
      <TouchableOpacity
        style={{
          padding: 10,
          width: 200,
          margin: 20,
          borderWidth: 1,
          borderColor: 'black',
        }}
        onPress={Start}>
        <Text>Initiate Scanner</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          padding: 10,
          width: 200,
          margin: 20,
          borderWidth: 1,
          borderColor: 'black',
        }}
        onPress={Read}>
        <Text>Read</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          padding: 10,
          width: 200,
          margin: 20,
          borderWidth: 1,
          borderColor: 'black',
        }}
        onPress={Support}>
        <Text>is Supported ? </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          padding: 10,
          width: 200,
          margin: 20,
          borderWidth: 1,
          borderColor: 'black',
        }}
        onPress={Enabled}>
        <Text>is Enabled ? </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          padding: 10,
          width: 200,
          margin: 20,
          borderWidth: 1,
          borderColor: 'black',
        }}
        onPress={readNdef}>
        <Text>Read Ndef </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
