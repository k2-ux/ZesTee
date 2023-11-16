import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState,useEffect} from 'react';
import Header from '../components/Header';
import CustomButton from '../components/CustomButton';
import RazorpayCheckout from 'react-native-razorpay';
import { useSelector,useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  CommonActions,
  useIsFocused,
  useNavigation,
} from '@react-navigation/native';
const Checkout = () => {
  const navigation = useNavigation();
  const items = useSelector(state => state.cart);
  const [cartItems, setCartItems] = useState([]);
  const [selectedMethod, setSelectedMethod] = useState(0);
  const isFocused = useIsFocused();
  const [selectedAddress, setSelectedAddress] = useState(
    'Please Select Address',
  );
  const dispatch = useDispatch();
  useEffect(() => {
    setCartItems(items.data);
  }, [items]);

  const getTotal = () => {
    let total = 0;
    cartItems.map(item => {
      total = total + item.qty * item.price;
    });
    return total.toFixed(0);
  };
  
  useEffect(() => {
    getSelectedAddress();
  }, [isFocused]);
  const getSelectedAddress = async () => {
    setSelectedAddress(await AsyncStorage.getItem('MY_ADDRESS'));
  };

  const orderPlace = paymentId => {
    const day = new Date().getDate();
    const month = new Date().getMonth() + 1;
    const year = new Date().getFullYear();
    const hours = new Date().getHours();
    const minutes = new Date().getMinutes();
    let ampm = '';
    if (hours > 12) {
      ampm = 'pm';
    } else {
      ampm = 'am';
    }
    const data = {
      items: cartItems,
      amount: '$' + getTotal(),
      address: selectedAddress,
      paymentId: paymentId,
      paymentStatus: selectedMethod == 3 ? 'Pending' : 'Success',
      createdAt:
        day +
        '/' +
        month +
        '/' +
        year +
        ' ' +
        hours +
        ':' +
        minutes +
        ' ' +
        ampm,
    };
    dispatch(orderItem(data));
    dispatch(emptyCart([]));
    navigation.navigate('OrderSuccess');
  };
  const payNow = () => {
    var options = {
      description: 'Credits towards consultation',
      image: 'https://i.imgur.com/3g7nmJC.png',
      currency: 'INR',
      key: 'rzp_test_Wy1YsPwzDklWv8', // Your api key
      amount: getTotal() * 100,
      name: 'foo',
      prefill: {
        email: 'void@razorpay.com',
        contact: '9191919191',
        name: 'Razorpay Software',
      },
      theme: {color: '#3E8BFF'},
    };
    RazorpayCheckout.open(options)
      .then(data => {
        // handle success
        //   alert(`Success: ${data.razorpay_payment_id}`);
        orderPlace(data.razorpay_payment_id);
      })
      .catch(error => {
        // handle failure
        alert(`Error: ${error.code} | ${error.description}`);
      });
  };
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <Header
        leftIcon={require('../assets/back.png')}
        title={'Check out'}
        onClickLeftIcon={() => {
          navigation.goBack();
        }}
      />
      <Text style={styles.title}>Select payment methods</Text>
      <TouchableOpacity
        onPress={() => setSelectedMethod(0)}
        style={styles.paymentMethods}>
        <Image
          source={
            selectedMethod === 0
              ? require('../assets/radio_2.png')
              : require('../assets/radio_1.png')
          }
          style={styles.img}
        />
        <Text style={styles.paymentmethodstxt}>Credit card</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => setSelectedMethod(1)}
        style={styles.paymentMethods}>
        <Image
          source={
            selectedMethod === 1
              ? require('../assets/radio_2.png')
              : require('../assets/radio_1.png')
          }
          style={styles.img}
        />
        <Text style={styles.paymentmethodstxt}>Debit card</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => setSelectedMethod(2)}
        style={styles.paymentMethods}>
        <Image
          source={
            selectedMethod === 2
              ? require('../assets/radio_2.png')
              : require('../assets/radio_1.png')
          }
          style={styles.img}
        />
        <Text style={styles.paymentmethodstxt}>UPI</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => setSelectedMethod(3)}
        style={styles.paymentMethods}>
        <Image
          source={
            selectedMethod === 3
              ? require('../assets/radio_2.png')
              : require('../assets/radio_1.png')
          }
          style={styles.img}
        />
        <Text style={styles.paymentmethodstxt}>Cash on delivery</Text>
      </TouchableOpacity>
      <View
        style={{
          flex: 0.5,
          justifyContent: 'flex-start',
          marginTop: 10,
          padding: 10,
        }}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={{fontSize: 18, fontWeight: '600'}}>Address</Text>
          <Text
            style={{
              fontSize: 18,
              fontWeight: '600',
              textDecorationLine: 'underline',
              color: 'blue',
            }}
            onPress={() => navigation.navigate('Addresses')}>
            Edit Address
          </Text>
        </View>
        <Text style={{fontSize: 16}}>select Address</Text>
        <Text 
          style={[
            styles.title,
            {marginTop: 10, fontSize: 16, color: '#636363'},
          ]}>
          {selectedAddress}
        </Text>
      </View>
      <CustomButton
        bg={'orange'}
        title={'Pay now'}
        onClick={() => {
          payNow();
        }}
      />
    </View>
  );
};

export default Checkout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 18,
    marginLeft: 20,
    marginTop: 30,
    color: '#000000',
  },
  paymentMethods: {
    flexDirection: 'row',
    width: '90%',
    marginTop: 20,
    paddingLeft: 20,
  },
  img: {
    width: 24,
    height: 24,
  },
  paymentmethodstxt: {
    marginLeft: 20,
    fontSize: 16,
    color: 'black',
  },
});
