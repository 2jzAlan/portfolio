import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

LocaleConfig.locales['en'] = {
  monthNames: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ],
  monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
};

LocaleConfig.defaultLocale = 'en';

const App = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().slice(0, 10));
  const [selectedTime, setSelectedTime] = useState(new Date().toLocaleTimeString());
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const onDayPress = (day) => {
    setSelectedDate(day.dateString);
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirmDate = (date) => {
    setSelectedDate(date.toISOString().slice(0, 10));
    setSelectedTime(date.toLocaleTimeString());
    hideDatePicker();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Live Calendar</Text>
      <Calendar
        markedDates={{
          [selectedDate]: { selected: true, marked: true },
        }}
        onDayPress={onDayPress}
        minDate={new Date().toISOString().slice(0, 10)} // Set minimum date to today's date
        theme={{
          selectedDayBackgroundColor: '#2E8B57',
          todayTextColor: '#2E8B57',
          arrowColor: '#2E8B57',
        }}
      />
      <Text style={styles.selectedDate}>{`Selected date: ${selectedDate} ${selectedTime}`}</Text>
      <TouchableOpacity onPress={showDatePicker} style={styles.button}>
        <Text style={styles.buttonText}>Select Date</Text>
      </TouchableOpacity>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="datetime"
        minimumDate={new Date()} // Set minimum date to today's date
        onCancel={hideDatePicker}
        onConfirm={handleConfirmDate}
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
  selectedDate: {
    marginTop: 20,
    fontSize: 18,
  },
  button: {
    backgroundColor: '#2E8B57',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default App;
