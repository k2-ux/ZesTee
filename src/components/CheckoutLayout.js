import {Dimensions, StyleSheet, Text, View,TouchableOpacity} from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

const CheckoutLayout = ({total,items}) => {
    const navigation = useNavigation()
  return (
    <View style={styles.container}>
      <View style={styles.tab}>
      <Text>items:{items}</Text>
      <Text>Total amount:{total}</Text>

      </View>
      <View style={styles.tab}>
        <TouchableOpacity style={styles.checkout} onPress={()=>navigation.navigate('Checkout')}>
          <Text>Check out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CheckoutLayout;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    height: 70,
    width: Dimensions.get('screen').width,
    backgroundColor: 'white',
    flexDirection: 'row',
  },
  tab: {
    width: '50%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkout: {
    width: '80%',
    height: '50%',
    backgroundColor: 'orange',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
