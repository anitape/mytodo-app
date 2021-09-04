import React from 'react';
import { TextInput, SafeAreaView, TouchableOpacity } from 'react-native';
import Styles from './Styles';
import ICON from 'react-native-vector-icons/MaterialIcons';

const AddTodo = ({ inputTask, addTask, inputHandler }) => {
  return (
    <SafeAreaView style={Styles.footer}>
      <SafeAreaView style={Styles.input}>
        <TextInput
          placeholder="Add Todo"
          value={inputTask}
          onChangeText={(text) => inputHandler(text)}
          style={{ paddingLeft: 20, paddingTop: 10, fontSize: 20 }}
        />
      </SafeAreaView>
      <TouchableOpacity onPress={addTask}>
        <SafeAreaView style={Styles.iconAdd}>
          <ICON name="add" color="#add8e6" size={30}></ICON>
        </SafeAreaView>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default AddTodo;
