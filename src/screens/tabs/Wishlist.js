import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import Header from '../../components/Header';
import {useNavigation} from '@react-navigation/native';

const Wishlist = () => {
  const items = useSelector(state => state.wishlist);
  console.log('W I S H', JSON.stringify(items.data));
  const [wishlistdata, setWishlistdata] = useState(items.data);
  const navigation = useNavigation();
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <Header
        title={'Wish List items'}
        leftIcon={require('../../assets/menu.png')}
        rightIcon={require('../../assets/shopping-cart.png')}
        onClickLeftIcon={() => navigation.toggleDrawer()}
      />
      <FlatList
        data={wishlistdata}
        renderItem={(item, index) => {
          // console.log(item,item.item.image)
          if (item.item.image != null) {
            return (
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
                </View>
              </TouchableOpacity>
            );
          }
        }}
      />
    </View>
  );
};

export default Wishlist;

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
});
