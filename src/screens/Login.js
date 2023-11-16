import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    firestore()
      .collection('Users')
      .where('email', '==', email)
      .get()
      .then(querySnapshot => {
        if (querySnapshot.docs.length > 0) {
          const userData = querySnapshot.docs[0].data();
          if (userData.password === password) {
            AsyncStorage.setItem('USER_DATA', JSON.stringify(userData));
            AsyncStorage.setItem('IS_USER_LOGGED_IN',"yes");
            navigation.navigate('Main');
          } else {
            Alert.alert('Invalid password');
          }
        } else {
          Alert.alert('User not found');
        }
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Log In</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={t => setEmail(t)}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={t => setPassword(t)}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Log In</Text>
      </TouchableOpacity>
      <Text style={styles.signupLink}>
        Not registered yet? 
        <Text style={styles.signupText} onPress={() => navigation.navigate('SignUp')}> Sign up</Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
  },
  signupLink: {
    marginTop: 20,
  },
  signupText: {
    color: 'blue', // You can change the color as desired
    textDecorationLine: 'underline',
  },
});

export default Login;
