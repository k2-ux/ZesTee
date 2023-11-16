import {Dimensions, StyleSheet, Text, View} from 'react-native';
import {StatusBar} from 'react-native';
import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import HomeScreen from './HomeScreen';
import CustomDrawer from '../components/CustomDrawer';
import Icon from 'react-native-vector-icons/Ionicons'

StatusBar.setHidden(false);
const Drawer = createDrawerNavigator();
const Main = ({route}) => {
  // console.log('oiiiiiiiiiiiiiiiiiii',route)
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: false,
        drawerActiveBackgroundColor: '#ada0a0',
        drawerActiveTintColor: 'white',
        drawerInactiveTintColor: '#333',
      }}>
      <Drawer.Screen
        name="Homescreen"
        component={HomeScreen}
        options={{
          headerShown: false,
          title: 'Home',
          drawerIcon: () => <Icon name="home" size={20} />,
        }}
      />
    </Drawer.Navigator>
  );
};

export default Main;

const styles = StyleSheet.create({});
