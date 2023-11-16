import {StyleSheet, Text, View, Image, Keyboard} from 'react-native';
import React, {useState, useEffect} from 'react';
import Header from '../components/Header';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Home from './tabs/Home';
import Wishlist from './tabs/Wishlist';
import Search from './tabs/Search';
import Notification from './tabs/Notification';
import User from './tabs/User';
const HomeScreen = () => {
  const [selectedTab, setselectedTab] = useState(0);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
console.log('FIRST TAB',selectedTab)
const handleLogOut =()=>{
  setselectedTab(0)
}
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true); // or some other action
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false); // or some other action
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);
  return (
    <View style={{flex: 1}}>
      {selectedTab == 0 ? (
        <Home />
      ) : selectedTab == 1 ? (
        <Wishlist />
      ) : selectedTab == 2 ? (
        <Search />
      ) : selectedTab == 3 ? (
        <Notification />
      ) : (
        <User  onLogOut={handleLogOut}/>
      )}
      {!isKeyboardVisible && (
        <View style={styles.bottom}>
          <TouchableOpacity
            style={styles.bottomTab}
            onPress={() => {
              setselectedTab(0);
            }}>
            <Image
              source={require('../assets/house.png')}
              style={styles.bottomTabIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.bottomTab}
            onPress={() => {
              setselectedTab(1);
            }}>
            <Image
              source={require('../assets/heart-unselected.png')}
              style={styles.bottomTabIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.bottomTab}
            onPress={() => {
              setselectedTab(2);
            }}>
            <Image
              source={require('../assets/loupe.png')}
              style={styles.bottomTabIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.bottomTab}
            onPress={() => {
              setselectedTab(3);
            }}>
            <Image
              source={require('../assets/notification.png')}
              style={styles.bottomTabIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.bottomTab}
            onPress={() => {
              setselectedTab(4);
            }}>
            <Image
              source={require('../assets/user.png')}
              style={styles.bottomTabIcon}
            />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  bottom: {
    position: 'absolute',
    bottom: 0,
    height: 30,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: '#ada0a0',
    paddingTop: 5,
  },
  bottomTab: {
    width: '20%',
    height: '100%',
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  bottomTabIcon: {
    width: 24,
    height: 24,
  },
});
