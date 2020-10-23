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
import NFC, {NfcDataType, NdefRecordType} from 'react-native-rfid-nfc-scanner';

export default function App() {
  //const scanner = new NfcRfidScanner();

  const initiate = () => {
    let x = NFC.initialize();
    //console.log('scanner is initiated');
    console.log('initiated ? :', x);
  };

  const stopScan = () => {
    let z = NFC.stopScan();
    console.log('stopped :', z);
  };

  const isEnabled = () => {
    let y = NFC.isEnabled();
    //console.log('scanner is enabled');
    console.log('enabled is', y);
  };

  const getStatus = () => {
    let status = NFC.checkDeviceStatus();
    console.log('status is ', status);
  };

  const addListener = () => {
    let listener = NFC.addListener((payload) => {
      switch (payload.type) {
        case NfcDataType.NDEF:
          let messages = payload.data;
          for (let i in messages) {
            let records = messages[i];
            for (let j in records) {
              let r = records[j];
              if (r.type === NdefRecordType.TEXT) {
                console.log(r);
              } else {
                ToastAndroid.show(
                  `Non-TEXT tag of type ${r.type} with data ${r.data}`,
                  ToastAndroid.SHORT,
                );
              }
            }
          }
          break;

        case NfcDataType.TAG:
          ToastAndroid.show(
            `The TAG is non-NDEF:\n\n${payload.data.description}`,
            ToastAndroid.SHORT,
          );
          break;
      }
    });
    console.log('listener :', listener);
  };

  const removeAllListener = () => {
    let t = NFC.removeAllListeners();
    console.log('removed : ', t);
  };
  let _listeners = {};
  let _notifyListeners = (data) => {
    let payload = {
      from_device: data,
      id: null,
      type: null,
      origin: null,
      encoding: null,
      scanned: null,
    };
    payload.origin = data.origin;
    payload.id = data.id;
    payload.type = data.type;
    console.log(payload);
    if (Platform.OS !== 'ios' && data.type === 'TAG') {
      let tagType = data.data.techList[0];
      payload.from_device.data = [[data.data]];
      payload.encoding = 'UTF-8';
      payload.type = tagType.replace('android.nfc.tech.', '');
      payload.scanned = data.id;
    } else {
      if (data.data[0] && data.data[0][0]) {
        let dat = data.data[0][0];
        payload.encoding = dat.encoding;
        payload.scanned = dat.data;
      }
      console.log(payload);
    }
    if (data) {
      for (let _listener in _listeners) {
        _listeners[_listener](payload);
      }
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
        onPress={_notifyListeners}>
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
