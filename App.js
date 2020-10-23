/* eslint-disable no-bitwise */
/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {Text, TouchableOpacity, SafeAreaView, Platform} from 'react-native';
import NfcManager, {Ndef, NfcEvents, NfcTech} from 'react-native-nfc-manager';
import {NfcRfidScanner} from 'react-native-rfid-nfc-scanner';

export default function App() {
  const scanner = new NfcRfidScanner();

  const initiate = () => {
    scanner.init();
    console.log('scanner is initiated');
  };

  const isEnabled = () => {
    scanner.isEnabled();
    console.log('scanner is enabled');
  };

  const getStatus = () => {
    let status = scanner.getStatus();
    console.log('status is ', status);
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
        onPress={getStatus}>
        <Text>Get Status</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
