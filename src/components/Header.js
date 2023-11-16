import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
const {height, width} = Dimensions.get('screen');

const Header = ({
  title,
  rightIcon,
  leftIcon,
  onCLickRightIcon,
  onClickLeftIcon,
  }) => {
  const navigation = useNavigation();
  const cartItems = useSelector(state => state.cart);
  console.log('carrrrrrrrrrrrrrt', cartItems);
  return (
    <View style={styles.header}>
      {leftIcon && (
        <TouchableOpacity style={styles.btn} onPress={onClickLeftIcon}>
          <Image source={leftIcon} style={styles.icon} />
        </TouchableOpacity>
      )}
      <Text style={styles.title}>{title}</Text>
      {rightIcon && (
        <TouchableOpacity
          style={styles.btn}
          onPress={() => navigation.navigate('Cart')}>
          <Image source={rightIcon} style={styles.icon} />
          {cartItems.data.length >= 1 && (
            <View
              style={{
                height: 20,
                width: 20,
                borderRadius: 10,
                backgroundColor: 'white',
                position: 'absolute',
                right: 0,
                top: 0,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={{color: 'black'}}>{cartItems.data.length}</Text>
            </View>
          )}
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    width: width,
    height: 60,
    backgroundColor: '#ada0a0',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingTop: 10,
  },
  btn: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 30,
    height: 30,
    tintColor: 'white',
  },
  title: {
    color: 'white',
    fontSize: 20,
    // padding: 5,
    position:'absolute',
    left:width/2.7,
    top:10
  },
});
