import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import Header from '../../components/Header';
import {useNavigation} from '@react-navigation/native';
const Search = () => {
  const navigation = useNavigation();
  const Products = useSelector(state => state);
  const [searchText, setSearchText] = useState('');
  console.log('Reduuuuuuuuuuuuuuux', JSON.stringify(Products.product.data));
  const [oldData, setOldData] = useState(Products.product.data);
  const [searchedList, setSearchedList] = useState([]);
  const filterData = txt => {
    let newData = oldData.filter(item => {
      return item.title.toLowerCase().match(txt.toLowerCase());
    });

    setSearchedList(newData);
  };
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <Header title={'Search items'}  leftIcon={require('../../assets/menu.png')}
        rightIcon={require('../../assets/shopping-cart.png')}
        onClickLeftIcon={() => navigation.toggleDrawer()}/>
      <View style={styles.searchView}>
        <Image source={require('../../assets/loupe.png')} style={styles.icon} />
        <TextInput
          placeholder="Search item here"
          style={styles.input}
          onChangeText={text => {
            setSearchText(text);
            filterData(text);
          }}
          value={searchText}
        />

        {searchText != '' && (
          <TouchableOpacity
            style={{justifyContent: 'center', alignItems: 'center'}}
            onPress={() => {
              setSearchText('');
              filterData('');
            }}>
            <Image
              source={require('../../assets/close.png')}
              style={styles.icon}
            />
          </TouchableOpacity>
        )}
      </View>

      <FlatList
        data={searchedList}
        renderItem={(item, index) => {
          // console.log(item,item.item.image)
          return (
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => {
                navigation.navigate('ProductDetail', {item});
              }}
              style={styles.productItem}>
              <Image source={{uri: item.item.image}} style={styles.itemImage} />
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
        }}
      />
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  searchView: {
    width: '90%',
    height: 50,
    borderRadius: 20,
    borderWidth: 0.5,
    alignSelf: 'center',
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  icon: {
    width: 16,
    height: 16,
    alignSelf: 'center',
  },
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
