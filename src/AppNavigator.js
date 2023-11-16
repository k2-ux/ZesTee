import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import Main from './screens/Main';
import ProductDetail from './screens/ProductDetail';
import Cart from './screens/Cart';
import Signup from './screens/Signup';
import Login from './screens/Login';
import Checkout from './screens/Checkout';
import Addresses from './screens/Addresses';
import OrderSuccess from './screens/OrderSuccess';
import Orders from './screens/Orders';
const Stack = createNativeStackNavigator();
const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Main"
          component={Main}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ProductDetail"
          component={ProductDetail}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Cart"
          component={Cart}
          options={{headerShown: false}}
        />
          <Stack.Screen
          name="Sign Up"
          component={Signup}
          options={{headerShown: false}}
        />
          <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
           <Stack.Screen
          name="Checkout"
          component={Checkout}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Addresses"
          component={Addresses}
          options={{headerShown: false}}
        />
          <Stack.Screen
          name="OrderSuccess"
          component={OrderSuccess}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Orders"
          component={Orders}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;

const styles = StyleSheet.create({});
