import React from 'react';
import { Text, SafeAreaView, TouchableOpacity } from 'react-native';
import Styles from './Styles';
import ICON from 'react-native-vector-icons/MaterialIcons';

const ListUndo = ({
  undones,
  markTodoComplete,
  undoTodoComplete,
  delTodo,
  delUndone,
}) => {
  return (
    <SafeAreaView style={Styles.listItem}>
      <SafeAreaView style={{ flex: 1 }}>
        <Text
          style={{
            fontWeight: 'bold',
            color: '#1f145c',
            textDecorationLine: undones?.completed ? 'line-through' : 'none',
          }}>
          {undones.task}
        </Text>
      </SafeAreaView>
      {!undones?.completed && (
        <TouchableOpacity
          style={[Styles.doneBox]}
          onPress={() => {
            markTodoComplete(undones?.id), delUndone(undones?.id);
          }}>
          <ICON name="done" size={20} color="#00a693" />
        </TouchableOpacity>
      )}
      {undones?.completed && (
        <TouchableOpacity
          style={[Styles.undoneBox]}
          onPress={() => undoTodoComplete(undones?.id)}>
          <ICON name="clear" size={20} color="#404040" />
        </TouchableOpacity>
      )}
      <TouchableOpacity
        style={[Styles.checkBox]}
        onPress={() => {
          delTodo(undones?.id), delUndone(undones?.id);
        }}>
        <ICON name="delete" size={20} color="red" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default ListUndo;
