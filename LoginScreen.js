import { useState } from 'react';
import { View, StyleSheet, Text, TextInput, Button } from 'react-native';

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');


    const handleLogin = async () => {
      const loginData = await AsyncStorage.getItem('loginData');
      const parsedData = JSON.parse(loginData);
      const user = parsedData.find((item) => item.username === username && item.password === password);
      if (user) {
        navigation.navigate('Task');
      } else {
        setErrorMessage('Invalid login credentials');
      }
    };
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoCapitalize="none"
      />
      <Text style={styles.error}>{errorMessage}</Text>
      <Button title="Login" onPress={() => navigation.navigate('Task')} />
      <Button
              title="Register"
              onPress={() => navigation.navigate('Register')}
/>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  error: {
    color: 'red',
    marginVertical: 10,
  },
});

export default LoginScreen;
