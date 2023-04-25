import React, { useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import TaskScreen from './screens/TaskScreen';
import CalendarScreen from './screens/CalenderScreen';
import AlarmScreen from './screens/AlarmScreen';
import { View, Text, ActivityIndicator } from 'react-native';

const Stack = createStackNavigator();
const LoadingScreen = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" />
      <Text style={{ marginTop: 10 }}>Loading...</Text>
    </View>
  );
};

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  // Simulating a loading delay for demonstration purposes
  setTimeout(() => {
    setIsLoading(false);
  }, 2000);

  
  return (
    <NavigationContainer>
      {isLoading ? (
        // Render a loading indicator or splash screen while loading
        <LoadingScreen />
      ) : (
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="Task" component={TaskScreen} />
          <Stack.Screen name="Calendar" component={CalendarScreen} />
          <Stack.Screen name="Alarm" component={AlarmScreen} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}
