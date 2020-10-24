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
import NFC, {
  NfcRfidScanner,
  NfcDataType,
  NdefRecordType,
} from 'react-native-rfid-nfc-scanner';

export default function App() {
  const scanner = new NfcRfidScanner();

  const initiate = () => {
    let x = NFC.initialize();
    let X_scanner = scanner.init();
    //console.log('scanner is initiated');
    console.log('initiated ? :', x);
    console.log('scanner initiated ? :', X_scanner);
  };

  const stopScan = () => {
    let z = NFC.stopScan();
    let z_scanner = scanner.stopScan();
    console.log('stopped :', z);
    console.log('scanner stopped :', z_scanner);
  };

  const isEnabled = () => {
    let y = NFC.isEnabled();
    let y_scanner = scanner.isEnabled();
    //console.log('scanner is enabled');
    console.log('enabled is', y);
    console.log('scanner enabled is', y_scanner);
  };

  const getStatus = () => {
    let status = NFC.checkDeviceStatus();
    let s_scanner = scanner.getStatus();
    console.log('status is ', status);
    console.log('scanner status is ', s_scanner);
  };

  const removeAllListener = () => {
    let t = NFC.removeAllListeners();
    console.log('removed : ', t);
  };

  let _listeners = {};
  let _notifyListeners = (payload) => {
    try {
      console.log('in');
      switch (payload.type) {
        case NfcDataType.NDEF:
          let messages = payload.data;
          for (let i in messages) {
            let records = messages[i];
            for (let j in records) {
              let r = records[j];
              //if (r.type === NdefRecordType.TEXT) {
              console.log(r);
            }
          }
      }
    } catch (ex) {
      console.warn('ex', ex);
    }
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
        onPress={initiate}>
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
        onPress={isEnabled}>
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
        onPress={stopScan}>
        <Text>stop scan </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          padding: 10,
          width: 200,
          margin: 20,
          borderWidth: 1,
          borderColor: 'black',
        }}
        onPress={getStatus}>
        <Text>Get Status</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          padding: 10,
          width: 200,
          margin: 20,
          borderWidth: 1,
          borderColor: 'black',
        }}
        onPress={() => {
          NFC.addListener(
            'name',
            (payload) => {
              alert(payload.data.id);
              console.log('succcess');
            },
            (e) => {
              console.log('error:');
            },
          );
        }}>
        <Text>Add Listener</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          padding: 10,
          width: 200,
          margin: 20,
          borderWidth: 1,
          borderColor: 'black',
        }}
        onPress={removeAllListener}>
        <Text>Remove all listeners</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
