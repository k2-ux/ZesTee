import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
const { height, width } = Dimensions.get('screen');

const User = ({ onLogOut }) => {
  const navigation = useNavigation();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Retrieve user data from AsyncStorage
        const storedUserData = await AsyncStorage.getItem('USER_DATA');
        if (storedUserData) {
          const parsedUserData = JSON.parse(storedUserData);
          setUserData(parsedUserData);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const logout = async () => {
    Alert.alert(
      'Hey',
      'Are you sure about logging out?',
      [
        {
          text: 'Yes',
          onPress: async () => {
            await AsyncStorage.removeItem('IS_USER_LOGGED_IN');
            await AsyncStorage.removeItem('USER_DATA');
            onLogOut();
            navigation.navigate('Login');
          },
        },
        {
          text: 'Cancel',
          onPress: () => {
            console.log('Cancelled');
          },
        },
      ]
    );
  };
  return (
    <View style={styles.container}>
      <Image
        style={styles.profileImage}
        source={require('../../assets/user.png')} // Replace with the user's profile picture
      />
      <Text style={styles.name}>{userData ? userData.name : 'John Doe'}</Text>
      <Text style={styles.email}>{userData ? userData.email : 'johndoe@example.com'}</Text>

      {/* Buttons for different tabs */}
      <TouchableOpacity
        style={styles.tabButton}
        // onPress={() => navigation.navigate('EditProfile')}
      >
        <Text style={styles.buttonText}>Edit Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.tabButton} onPress={() => navigation.navigate('Orders')}>
        <Text style={styles.buttonText}>Orders</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.tabButton}
        // onPress={() => navigation.navigate('Address')}
      >
        <Text style={styles.buttonText}>Address</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.tabButton}
        // onPress={() => navigation.navigate('PaymentMethods')}
      >
        <Text style={styles.buttonText}>Payment Methods</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.logoutButton} onPress={() => logout()}>
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>
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
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#ada0a0',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  email: {
    fontSize: 16,
    marginBottom: 20,
    color: '#555',
  },
  tabButton: {
    backgroundColor: '#ada0a0',
    padding: 15,
    borderRadius: 8,
    marginTop: 10,
    width: width / 1.2,
    alignItems: 'center',
    elevation: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  logoutButton: {
    backgroundColor: '#CC2936',
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
    width: width / 3,
    alignItems: 'center',
    elevation: 20,
  },
  logoutText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default User;
