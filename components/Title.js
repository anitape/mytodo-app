import React from 'react';
import { Text, SafeAreaView, TouchableOpacity } from 'react-native';
import Styles from './Styles';
import ICON from 'react-native-vector-icons/MaterialIcons';

const Title = () => {
  return (
    <SafeAreaView style={Styles.header}>
        <ICON name="done" size={37} color="#ffffff" />
      <Text
        style={{
          fontWeight: 'bold',
          fontSize: 25,
          color: '#1f145c',
          marginLeft: 15,
        }}>
        My TODO App
      </Text>
    </SafeAreaView>
  );
};

export default Title;
