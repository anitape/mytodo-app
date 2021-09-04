import React from 'react';
import { Text, SafeAreaView, TouchableOpacity } from 'react-native';
import Styles from './Styles';
import ICON from 'react-native-vector-icons/MaterialIcons';

const ListItem = ({ todos, markTodoComplete, undoTodoComplete, delTodo }) => {
  return (
    <SafeAreaView style={Styles.listItem}>
      <SafeAreaView style={{ flex: 1 }}>
        <Text
          style={{
            fontWeight: 'bold',
            color: '#1f145c',
            textDecorationLine: todos?.completed ? 'line-through' : 'none',
          }}>
          {todos.task}
        </Text>
      </SafeAreaView>
      {!todos?.completed && (
        <TouchableOpacity
          style={[Styles.doneBox]}
          onPress={() => markTodoComplete(todos?.id)}>
          <ICON name="done" size={20} color="#00a693" />
        </TouchableOpacity>
      )}
      {todos?.completed && (
        <TouchableOpacity
          style={[Styles.undoneBox]}
          onPress={() => undoTodoComplete(todos?.id)}>
          <ICON name="clear" size={20} color="#404040" />
        </TouchableOpacity>
      )}
      <TouchableOpacity
        style={[Styles.checkBox]}
        onPress={() => delTodo(todos?.id)}>
        <ICON name="delete" size={20} color="red" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default ListItem;
