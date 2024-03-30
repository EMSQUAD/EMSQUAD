import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Platform,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DateTimePicker from "@react-native-community/datetimepicker";

const AddTaskScreen = () => {
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState("");
  const [taskDate, setTaskDate] = useState(new Date());
  const [taskTime, setTaskTime] = useState(new Date());
  const [taskDescription, setTaskDescription] = useState("");
  const [showDate, setShowDate] = useState(false);
  const [showTime, setShowTime] = useState(false);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const tasksJson = await AsyncStorage.getItem("tasks");
      if (tasksJson) {
        setTasks(JSON.parse(tasksJson));
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleAddTask = async () => {
    let combinedDateTime = new Date(taskDate);
    combinedDateTime.setHours(taskTime.getHours());
    combinedDateTime.setMinutes(taskTime.getMinutes());

    const newTask = {
      id: Date.now(),
      name: taskName,
      dateTime: combinedDateTime.toLocaleString(),
      description: taskDescription,
    };

    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    setTaskName("");
    setTaskDescription("");
    try {
      await AsyncStorage.setItem("tasks", JSON.stringify(updatedTasks));
    } catch (e) {
      console.error(e);
    }
  };

  const handleRemoveTask = async (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
    try {
      await AsyncStorage.setItem("tasks", JSON.stringify(updatedTasks));
    } catch (e) {
      console.error(e);
    }
  };

  const onChangeDate = (event, selectedDate) => {
    setShowDate(Platform.OS === "ios");
    setTaskDate(selectedDate || taskDate);
  };

  const onChangeTime = (event, selectedTime) => {
    setShowTime(Platform.OS === "ios");
    setTaskTime(selectedTime || taskTime);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="תיאור המשימה"
        value={taskName}
        onChangeText={setTaskName}
      />
      <View style={styles.dateTimeRow}>
        <View style={styles.dateTimeContainer}>
          <Button title="תאריך" onPress={() => setShowDate(true)} />
          {showDate && (
            <DateTimePicker
              value={taskDate}
              mode="date"
              display="default"
              onChange={onChangeDate}
            />
          )}
          <Text style={styles.dateText}>{taskDate.toLocaleDateString()}</Text>
        </View>
        <View style={styles.dateTimeContainer}>
          <Button title="שעה" onPress={() => setShowTime(true)} />
          {showTime && (
            <DateTimePicker
              value={taskTime}
              mode="time"
              display="default"
              is24Hour={true}
              onChange={onChangeTime}
            />
          )}
          <Text style={styles.timeText}>{taskTime.toLocaleTimeString()}</Text>
        </View>
      </View>
      <Button title="הוספה" onPress={handleAddTask} />
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.taskItem}>
            <Text>
              {item.name} - {item.dateTime} {item.description}
            </Text>
            <TouchableOpacity onPress={() => handleRemoveTask(item.id)}>
              <Text style={styles.removeButton}>הסר</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    fontSize: 18,
    borderRadius: 6,
    textAlign: "right",
  },
  taskItem: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    alignItems: "right",
    padding: 10,
    marginVertical: 5,
    backgroundColor: "#f9f9f9",
    borderRadius: 5,
  },
  removeButton: {
    color: "red",
  },
  dateTimeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 10,
  },
  dateTimeContainer: {
    flex: 1,
    alignItems: "center",
    marginHorizontal: 5,
  },
  dateText: {
    marginTop: 5,
  },
  timeText: {
    marginTop: 5,
  },
});

export default AddTaskScreen;
