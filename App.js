/* eslint-disable no-bitwise */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text, TouchableOpacity, SafeAreaView} from 'react-native';
import NFC from 'react-native-rfid-nfc-scanner';

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
    let listener = NFC.addListener();
    console.log('listener :', listener);
  };

  const removeAllListener = () => {
    let t = NFC.removeAllListeners();
    console.log('removed : ', t);
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
        onPress={addListener}>
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
