import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  Alert,
  Button,
  TouchableOpacity,
  Text,
  Picker,
} from 'react-native';
import Title from './components/Title.js';
import ListItem from './components/ListItem.js';
import ListUndo from './components/ListUndo.js';
import ListDone from './components/ListDone.js';
import AddTodo from './components/AddTodo.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Styles from './components/Styles.js';
import ICON from 'react-native-vector-icons/MaterialIcons';

export default function App() {
  const [todos, setTodos] = useState([]);
  const [inputTask, setInputTask] = useState('');
  const [allTodos, setAllTodos] = useState(true);
  const [sortUndone, setSortUndone] = useState(false);
  const [sortDone, setSortDone] = useState(false);
  const [undones, setUndones] = useState([]);
  const [dones, setDones] = useState([]);
  const [selectedValue, setSelectedValue] = useState('todos');

  useEffect(() => {
    loadTodoFromLocalStorage();
  }, []);

  useEffect(() => {
    storeTaskLocally(todos);
  }, [todos]);

  useEffect(() => {
    changeList(selectedValue);
  }, [selectedValue]);

  //Assigns input text to the inputTask
  const inputHandler = (text) => {
    setInputTask(text);
    //console.log(text)
  };

  //Adds new task to the list
  const addTask = () => {
    //console.log(inputTask)
    if (!inputTask) {
      Alert.alert('Oops!', 'Seems like there is nothing to add!');
      //Alert.alert("Alert", "Nothing to add!");
    } else {
      //Creating new task for the list
      const taskObj = {
        id: todos.length + 1,
        task: inputTask,
        completed: false,
      };
      //Stores new task to the todos list
      setTodos([...todos, taskObj]);
      //Sets input filed to empty string when Add button in pressed
      setInputTask('');
    }
  };

  /**
   *
   * @param {*} todoId gets the id of todo of pressed checkBox
   */
  const markTodoComplete = (todoId) => {
    //Creates new todo having the property complete to true
    const newTodos = todos.map((todo) => {
      if (todo.id == todoId) {
        return { ...todo, completed: true };
      }
      return todo;
    });
    //Adding new todos to the list
    setTodos(newTodos);
  };

  /**
   *
   * @param {*} todoId gets the id of todo of pressed checkBox
   */
  const undoTodoComplete = (todoId) => {
    //Creates new todo having the property complete to false
    const newTodos = todos.map((todo) => {
      if (todo.id == todoId) {
        return { ...todo, completed: false };
      }
      return todo;
    });
    //Adding new todos to the list
    setTodos(newTodos);
  };

  /**
   *
   * @param {*} todoId gets the id of todo of pressed deleted button
   */
  const delTodo = (todoId) => {
    //Creates new todos list without the todo object having the todoId
    const newTodos = todos.filter((todo) => todo.id != todoId);
    //Adding new todos to the list
    setTodos(newTodos);
  };

  /**
   *
   * @param {*} undoneId gets the id of undone of pressed deleted button
   */
  const delUndone = (undoneId) => {
    //Creates new undones list without the undo object having the undoneId
    const newUndones = undones.filter((undo) => undo.id != undoneId);
    //Adding new todos to the list
    setUndones(newUndones);
  };

  /**
   *
   * @param {*} doneId gets the id of done of pressed deleted button
   */
  const delDone = (doneId) => {
    //Creates new dones list without the done object having the doneId
    const newDones = dones.filter((done) => done.id != doneId);
    //Adding new todos to the list
    setDones(newDones);
  };

  /**
   * When top delete icon is pressed user has options to delete all task
   * If user press Yes, all task are deleted and vice-versa
   */
  const delAllTodo = () => {
    Alert.alert('Confirm', 'Clear all task?', [
      {
        text: 'Yes',
        onPress: () => setTodos([]),
      },
      {
        text: 'No',
      },
    ]);
  };

  //Stores data locally in the device
  const storeTaskLocally = async (todos) => {
    try {
      const stringifyTodos = JSON.stringify(todos);
      await AsyncStorage.setItem('todos', stringifyTodos);
    } catch (e) {
      console.log('Error: ', e);
    }
  };

  //Loads data from local storade when the app is started
  const loadTodoFromLocalStorage = async () => {
    try {
      const todos = await AsyncStorage.getItem('todos');
      if (todos != null) {
        setTodos(JSON.parse(todos));
      }
    } catch (error) {
      console.log('Error: ', error);
    }
  };

  // Shows All Todos when button Show All is pressed
  const showAll = () => {
    setSortUndone(false);
    setSortDone(false);
    setAllTodos(true);
  };

  // Shows All Undone todos when button Show Undone Todos is pressed
  const sortbyUndone = () => {
    stateUndone();
    setAllTodos(false);
    setSortDone(false);
    setSortUndone(true);
  };

  // Shows All Done todos when button Show Done Todos is pressed
  const sortbyDone = () => {
    stateDone();
    setAllTodos(false);
    setSortUndone(false);
    setSortDone(true);
  };

  // Sorts Undone todos to undones state
  const stateUndone = () => {
    const table = [];
    for (let i = 0; i < todos.length; i++) {
      if (todos[i].completed == false) {
        const undoneObj = {
          id: todos[i].id,
          task: todos[i].task,
          completed: todos[i].completed,
        };
        table.push(undoneObj);
      }
    }
    setUndones(table);
  };

  // Sorts Done todos to dones state
  const stateDone = () => {
    const table = [];
    for (let i = 0; i < todos.length; i++) {
      if (todos[i].completed == true) {
        const doneObj = {
          id: todos[i].id,
          task: todos[i].task,
          completed: todos[i].completed,
        };
        table.push(doneObj);
      }
    }
    setDones(table);
  };

  // renders list item of Todo Item
  const renderItem = ({ item }) => (
    <ListItem
      todos={item}
      markTodoComplete={markTodoComplete}
      undoTodoComplete={undoTodoComplete}
      delTodo={delTodo}
    />
  );

  // renders list item of Undone todo Item
  const renderUndones = ({ item }) => (
    <ListUndo
      undones={item}
      markTodoComplete={markTodoComplete}
      undoTodoComplete={undoTodoComplete}
      delTodo={delTodo}
      delUndone={delUndone}
    />
  );

  // renders list item of Done todo Item
  const renderDones = ({ item }) => (
    <ListDone
      dones={item}
      markTodoComplete={markTodoComplete}
      undoTodoComplete={undoTodoComplete}
      delTodo={delTodo}
      delDone={delDone}
    />
  );

  /**
   *
   * @param {*} selectedValue gets the value from Dropdown Menu selected item
   */
  const changeList = (selectedValue) => {
    if (selectedValue == 'todos') {
      showAll();
    } else if (selectedValue == 'undones') {
      sortbyUndone();
    } else {
      sortbyDone();
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }} delAllTodo={delTodo}>
      <View style={Styles.block} />
      <Title />
      <View style={Styles.mainBlock}>
        <View style={Styles.buttonRow}>
          <Picker
            selectedValue={selectedValue}
            style={Styles.dropdown}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedValue(itemValue)
            }>
            <Picker.Item
              label="Show All ▼"
              value="todos"
              selectedValue={showAll}
            />
            <Picker.Item
              label="Show Undone Todos ▼"
              value="undones"
              onValueChange={(value) => changeList(value)}
            />
            <Picker.Item
              label="Show Done Todos ▼"
              value="dones"
              onPress={sortbyDone}
            />
          </Picker>
          <TouchableOpacity style={[Styles.deleteBox]}>
            <ICON name="delete" size={35} color="red" onPress={delAllTodo} />
          </TouchableOpacity>
        </View>
        {allTodos ? (
          <FlatList
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ padding: 20, paddingBottom: 100 }}
            data={todos}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
          />
        ) : sortUndone ? (
          <FlatList
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ padding: 20, paddingBottom: 100 }}
            data={undones}
            renderItem={renderUndones}
            keyExtractor={(item, index) => index.toString()}
          />
        ) : sortDone ? (
          <FlatList
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ padding: 20, paddingBottom: 100 }}
            data={dones}
            renderItem={renderDones}
            keyExtractor={(item, index) => index.toString()}
          />
        ) : (
          <Text>Error occured</Text>
        )}
      </View>
      <AddTodo
        inputTask={inputTask}
        addTask={addTask}
        inputHandler={inputHandler}
      />
    </SafeAreaView>
  );
}
