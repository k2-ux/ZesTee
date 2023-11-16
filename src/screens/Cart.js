import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Header from '../components/Header';
import {useNavigation} from '@react-navigation/native';
import {
  addItemToCart,
  reduceItemfromCart,
  removeItemfromCart,
} from '../redux/slices/CartSlice';
import CheckoutLayout from '../components/CheckoutLayout';

const Cart = () => {
  const items = useSelector(state => state.cart);
  console.log('C A R T', JSON.stringify(items.data));
  const [wishlistdata, setWishlistdata] = useState([]);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  useEffect(() => {
    setWishlistdata(items.data);
  }, [items]);

  const getTotal = () => {
    let total = 0;
    wishlistdata.map(item => {
      total = total + item.qty * item.price; 
    });
    console.log('oi', total);
    return total;
  };
  // useEffect(() => {
  //   getTotal();
  // }, []);

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <Header title={'Cart Items'}  leftIcon={require('../assets/back.png')}
      onClickLeftIcon={()=>navigation.goBack()}
        // rightIcon={require('')}
        // onClickLeftIcon={() => navigation.toggleDrawer()}
        />
     {wishlistdata.length > 0 && (  <FlatList
        data={wishlistdata}
        renderItem={(item, index) => {
          // console.log(item,item.item.image)
          if (item.item.image != null) {
            return (
              <View style={{padding: 5}}>
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={() => {
                    navigation.navigate('ProductDetail', {item});
                  }}
                  style={styles.productItem}>
                  <Image
                    source={{uri: item?.item?.image}}
                    style={styles.itemImage}
                  />
                  <View style={{}}>
                    <Text style={styles.name}>
                      {item.item.title.length > 20
                        ? item.item.title.substring(0, 20) + '...'
                        : item.item.title}
                    </Text>
                    <Text style={{marginLeft: 20}}>{item.item.category}</Text>
                    <Text style={styles.desc}>
                      {item.item.description.length > 30
                        ? item.item.description.substring(0, 30) + '...'
                        : item.item.description}
                    </Text>
                    <View style={styles.qtyview}>
                      <TouchableOpacity
                        style={styles.btn}
                        onPress={() => {
                          if (item.item.qty > 1) {
                            dispatch(reduceItemfromCart(item.item));
                          } else {
                            dispatch(removeItemfromCart(index));
                          }
                        }}>
                        <Text style={{fontSize: 18, fontWeight: '500'}}>-</Text>
                      </TouchableOpacity>
                      <Text style={styles.qty}>{item.item.qty}</Text>
                      <TouchableOpacity
                        onPress={() => {
                          dispatch(addItemToCart(item.item));
                        }}
                        style={styles.btn}>
                        <Text style={{fontSize: 18, fontWeight: '500'}}>+</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            );
          }
        }}
      />)}
      {wishlistdata.length < 1 && (
        <View style={{justifyContent:'center',alignItems:'center',flex:1}}>
          <Text>No items added</Text>
        </View>
      )}
      {wishlistdata.length > 0 && (
        <CheckoutLayout items={wishlistdata.length} total={getTotal()} />
      )}
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({
  input: {
    width: '60%',
  },
  productItem: {
    width: Dimensions.get('screen').width,
    height: 100,
    marginTop: 10,
    backgroundColor: 'white',
    flexDirection: 'row',
  },
  itemImage: {
    width: 100,
    height: 100,
  },
  name: {
    fontSize: 20,
    fontWeight: '600',
    marginLeft: 20,
  },
  desc: {
    marginLeft: 20,
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
