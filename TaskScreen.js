import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const App = () => {
  const navigation = useNavigation();
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [showReminder, setShowReminder] = useState(false);

  const handleAddTask = () => {
    if (task) {
      setTasks([...tasks, task]);
      setTask('');
      setShowReminder(true);
    }
  };

  const handleRemoveTask = (index) => {
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
  };

  const renderItem = ({ item, index }) => (
    <TouchableOpacity style={styles.item} onPress={() => handleRemoveTask(index)}>
      <Text>{item}</Text>
    </TouchableOpacity>
  );

  const handleReminderPress = () => {
    setShowReminder(false);
    navigation.navigate('Alarm');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Daily Tasks</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add Task"
          value={task}
          onChangeText={(text) => setTask(text)}
        />
        <TouchableOpacity style={styles.button} onPress={handleAddTask}>
          <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity>
      </View>
      {showReminder && (
        <TouchableOpacity style={styles.reminderButton} onPress={handleReminderPress}>
          <Text style={styles.reminderButtonText}>Reminder</Text>
        </TouchableOpacity>
      )}
      <FlatList
        data={tasks}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        style={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#4CAF50',
    borderRadius: 4,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  buttonText: {
    color: '#fff',
  },
  list: {
    flex: 1,
  },
  item: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#f9f9f9',
    borderRadius: 4,
  },
  reminderButton: {
    backgroundColor: '#2196F3',
    borderRadius: 4,
    paddingHorizontal: 10,
    paddingVertical: 5,
    alignSelf: 'flex-end',
    marginTop: 10,
  },
  reminderButtonText: {
    color: '#fff',
  },
  list: {
    flex: 1,
  },
  item: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#f9f9f9',
    borderRadius: 4,
  },
});

export default App;
