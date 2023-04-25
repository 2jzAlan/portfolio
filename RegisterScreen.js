import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Input, Button } from 'react-native-elements';

export default function RegistrationScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [formErrors, setFormErrors] = useState({
    username: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
  });

  const validateUsername = () => {
    if (username.length < 4) {
      return 'Error: Username must be at least 4 characters long.';
    }
    return '';
  };

  const validatePhoneNumber = () => {
    const phoneNumberRegex = /^\(\d{3}\) \d{3}-\d{4}$/;
    if (!phoneNumberRegex.test(phoneNumber)) {
      return 'Error: Phone number must be in the format (xxx) xxx-xxxx and all digits.';
    }
    return '';
  };

  const validatePassword = (password) => {
    if (!password || password.length < 8) {
      return 'Password must be at least 8 characters long.';
    }
    return '';
  };

  const validateConfirmPassword = (confirmPassword, password) => {
    if (!confirmPassword || confirmPassword !== password) {
      return 'Passwords must match.';
    }
    return '';
  };

  const handleBlur = (name) => {
    switch (name) {
      case 'username':
        setFormErrors((formErrors) => ({
          ...formErrors,
          username: validateUsername(),
        }));
        break;
      case 'phoneNumber':
        setFormErrors((formErrors) => ({
          ...formErrors,
          phoneNumber: validatePhoneNumber(),
        }));
        break;
      case 'password':
        setFormErrors((formErrors) => ({
          ...formErrors,
          password: validatePassword(password),
        }));
      case 'confirmPassword':
        setFormErrors((formErrors) => ({
          ...formErrors,
          confirmPassword: validateConfirmPassword(confirmPassword, password),
        }));
        break;
      default:
        break;
    }
  };

  const handleSubmit = () => {
    // Validate form inputs
    const usernameError = validateUsername();
    const phoneNumberError = validatePhoneNumber();
    const passwordError = validatePassword(password);
    const confirmPasswordError = validateConfirmPassword(confirmPassword, password);
  
    if (usernameError || phoneNumberError || passwordError || confirmPasswordError) {
      setFormErrors({
        username: usernameError,
        phoneNumber: phoneNumberError,
        password: passwordError,
        confirmPassword: confirmPasswordError,
      });
      return;
    }}

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.mainMenuButton}>Main Menu</Text>
      </TouchableOpacity>
      <Input
        placeholder="Username"
        onChangeText={(value) => setUsername(value)}
        onBlur={() => handleBlur('username')}
        errorMessage={formErrors.username}
      />
      <Input
        placeholder="Phone Number (xxx) xxx-xxxx"
        onChangeText={(value) => setPhoneNumber(value)}
        onBlur={() => handleBlur('phoneNumber')}
        errorMessage={formErrors.phoneNumber}
      />
      <Input
        placeholder="Password"
        onChangeText={(value) => setPassword(value)}
        onBlur={() => handleBlur('password')}
        secureTextEntry={true}
        errorMessage={formErrors.password}
      />
      <Input
        placeholder="Confirm Password"
        onChangeText={(value) => setConfirmPassword(value)}
        onBlur={() => handleBlur('confirmPassword')}
        secureTextEntry={true}
        errorMessage={formErrors.confirmPassword}
      />
      <Button title="Register" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  mainMenuButton: {
    marginVertical: 20,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    textDecorationLine: 'underline',
  },
});
