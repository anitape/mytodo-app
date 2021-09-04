import React from 'react';
import { Text, SafeAreaView, TouchableOpacity } from 'react-native';
import Styles from './Styles';
import ICON from 'react-native-vector-icons/MaterialIcons';

const ListDone = ({
  dones,
  markTodoComplete,
  undoTodoComplete,
  delTodo,
  delDone,
}) => {
  return (
    <SafeAreaView style={Styles.listItem}>
      <SafeAreaView style={{ flex: 1 }}>
        <Text
          style={{
            fontWeight: 'bold',
            color: '#1f145c',
            textDecorationLine: dones?.completed ? 'line-through' : 'none',
          }}>
          {dones.task}
        </Text>
      </SafeAreaView>
      {!dones?.completed && (
        <TouchableOpacity
          style={[Styles.donekBox]}
          onPress={() => markTodoComplete(dones?.id)}>
          <ICON name="done" size={20} color="#00a693" />
        </TouchableOpacity>
      )}
      {dones?.completed && (
        <TouchableOpacity
          style={[Styles.undoneBox]}
          onPress={() => {
            undoTodoComplete(dones?.id), delDone(dones?.id);
          }}>
          <ICON name="clear" size={20} color="#404040" />
        </TouchableOpacity>
      )}
      <TouchableOpacity
        style={[Styles.checkBox]}
        onPress={() => {
          delTodo(dones?.id), delDone(dones?.id);
        }}>
        <ICON name="delete" size={20} color="red" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default ListDone;
