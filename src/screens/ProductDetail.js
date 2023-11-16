import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Header from '../components/Header';
import CustomButton from '../components/CustomButton';
import {useDispatch} from 'react-redux';
import {addItemToWIshList} from '../redux/slices/WishlistSlice';
import {addItemToCart} from '../redux/slices/CartSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AskForLogin from '../components/AskForLogin';

const ProductDetail = ({route, navigation}) => {
  console.log('R O U T E', route.params);
  const productRoute = route.params.item.item;
  const dispatch = useDispatch();
  const [qty, setQty] = useState(1);
  const [modalVisible, setmodalVisible] = useState(false);
  const checkUserStatus = async () => {
    const status = await AsyncStorage.getItem('IS_USER_LOGGED_IN');
    // if (status == null) {
    //   setmodalVisible(true);
    // } else {
      dispatch(addItemToCart({...productRoute, qty: qty}));
    // }
  };
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <AskForLogin
        modalVisible={modalVisible}
        onclose={() => {
          setmodalVisible(false);
        }}
        onclickLogin={() => {
          setmodalVisible(false);
          navigation.navigate('Login')
        }}
        onclickSignup={() => {
          setmodalVisible(false);
          navigation.navigate('Sign Up')

        }}
      />
      <Header
        title={'Product Details'}
        leftIcon={require('../assets/back.png')}
        rightIcon={require('../assets/shopping-cart.png')}
        onClickLeftIcon={() => navigation.goBack()}
      />
      <View style={{flexDirection: 'row'}}>
        <Image style={styles.banner} source={{uri: productRoute?.image}} />
        <TouchableOpacity
          onPress={() => {
            dispatch(addItemToWIshList(productRoute));
          }}>
          <Image
            style={{width: 30, height: 30, marginTop: 30}}
            source={require('../assets/heart-unselected.png')}
          />
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>{productRoute.title}</Text>
      <Text style={styles.desc}>{productRoute.description}</Text>
      <View style={styles.qtyview}>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            if (qty > 1) {
              setQty(qty - 1);
            } else {
              console.log('NUmber of items cannot be negative');
            }
          }}>
          <Text style={{fontSize: 18, fontWeight: '500'}}>-</Text>
        </TouchableOpacity>
        <Text style={styles.qty}>{qty}</Text>
        <TouchableOpacity
          onPress={() => {
            setQty(qty + 1);
          }}
          style={styles.btn}>
          <Text style={{fontSize: 18, fontWeight: '500'}}>+</Text>
        </TouchableOpacity>
      </View>
      <CustomButton
        bg={'#d54b1a'}
        title={'Add to cart'}
        color={'white'}
        onClick={() => {
          checkUserStatus();
        }}
      />
    </View>
  );
};

export default ProductDetail;

const styles = StyleSheet.create({
  banner: {
    width: '90%',
    height: 300,
    resizeMode: 'center',
  },
  title: {
    fontSize: 20,
    color: 'black',
    textAlign: 'center',
    fontWeight: '600',
  },
  desc: {
    width: '90%',
    fontSize: 14,
    color: 'gray',
    alignSelf: 'center',
    marginTop: 20,
  },
  qtyview: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  btn: {
    padding: 2,
    borderWidth: 0.5,
    width: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginLeft: 10,
  },
  qty: {
    marginLeft: 10,
    fontSize: 18,
  },
});
