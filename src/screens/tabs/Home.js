import React, { useCallback, useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  FlatList,
  Dimensions,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addProducts } from '../../redux/slices/ProductSlice';
import Header from '../../components/Header';

const Home = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getProducts = useCallback(async () => {
    try {
      const response = await axios.get('https://fakestoreapi.com/products');
      setProducts(response.data);
      response.data.map((item) => {
        item.qty = 1;
      });
      dispatch(addProducts(response.data));
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />
      <Header
        title={'ZesTee'}
        leftIcon={require('../../assets/menu.png')}
        rightIcon={require('../../assets/shopping-cart.png')}
        onClickLeftIcon={() => navigation.toggleDrawer()}
      />
      <View style={styles.content}>
        {isLoading ? (
          <ActivityIndicator style={styles.activityIndicator} size="large" color="#84DCCF" />
        ) : (
          <FlatList
            data={products}
            renderItem={(item, index) => {
              return (
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={() => navigation.navigate('ProductDetail', { item })}
                  style={styles.productItem}
                >
                  <Image source={{ uri: item.item.image }} style={styles.itemImage} />
                  <View style={{}}>
                    <Text style={styles.name}>
                      {item.item.title.length > 20 ? item.item.title.substring(0, 20) + '...' : item.item.title}
                    </Text>
                    <Text style={{ marginLeft: 20 }}>{item.item.category}</Text>
                    <Text style={styles.desc}>
                      {item.item.description.length > 30
                        ? item.item.description.substring(0, 30) + '...'
                        : item.item.description}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  activityIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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

export default Home;
