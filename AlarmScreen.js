import React, { useState } from 'react';
import { View, Text, StyleSheet, Platform, DatePickerIOS, TimePickerIOS, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function AlarmScreen() {
  const [alarmTime, setAlarmTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(Platform.OS === 'ios');
  const [showTimePicker, setShowTimePicker] = useState(Platform.OS === 'ios');

  const navigation = useNavigation();

  const onDateChange = (date) => {
    setAlarmTime(date);
  };

  const onTimeChange = (event, time) => {
    if (Platform.OS === 'android') {
      setShowTimePicker(false);
    }

    if (time) {
      const newAlarmTime = new Date(alarmTime);
      newAlarmTime.setHours(time.getHours());
      newAlarmTime.setMinutes(time.getMinutes());
      setAlarmTime(newAlarmTime);
    }
  };

  const showDatepicker = () => {
    setShowDatePicker(true);
  };

  const showTimepicker = () => {
    setShowTimePicker(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Alarm Time:</Text>
      {showDatePicker && (
        <DatePickerIOS
          date={alarmTime}
          onDateChange={onDateChange}
          mode="time"
        />
      )}
      {showTimePicker && (
        <TimePickerIOS
          date={alarmTime}
          onDateChange={onTimeChange}
          mode="time"
        />
      )}
<TouchableOpacity onPress={() => navigation.navigate('Calendar')}>
  <View style={styles.button}>
    <Text style={styles.buttonText}>Select Date</Text>
  </View>
</TouchableOpacity>

      <TouchableOpacity onPress={showTimepicker}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>Select Time</Text>
        </View>
      </TouchableOpacity>
    </View>

    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  button: {
    backgroundColor: '#2196F3',
    borderRadius: 4,
    padding: 16,
    alignItems: 'center',
    marginTop: 16,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});
