import { Image, ImageBackground, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { DrawerContentScrollView ,DrawerItemList} from '@react-navigation/drawer'

const CustomDrawer = (props) => {
  return (
    <View style={{ flex: 1 }}>
    <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <ImageBackground
          source={require('../assets/bg.png')}
          style={{ padding: 20 }}
        >
          <Image
            source={require('../assets/logo.png')}
            style={{ height: 40, width: 40 }}
          />
          <Text
            style={{
              color: 'white',
              fontSize: 18,
              fontFamily: 'Roboto-Medium',
              backgroundColor:'#ada0a0',
              width:90,
              borderRadius:5,
              textAlign:'center'
            }}
          >
            ZesTee
          </Text>
        </ImageBackground>
        <View style={{ flex: 1, paddingTop: 10, backgroundColor: 'white' }}>
          <DrawerItemList {...props} />
        </View>
      </View>
      {/* <TouchableOpacity
        style={{ alignSelf: 'center', marginBottom: 10 }}
        onPress={() => {
          handleLogout();
        }}
      >
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Icon name="log-out" size={20} color="black" />
          <Text style={{ fontWeight: 'bold', marginLeft: 5 }}>Log Out</Text>
        </View>
      </TouchableOpacity> */}
    </DrawerContentScrollView>
  </View>
  )
}

export default CustomDrawer

const styles = StyleSheet.create({})