import { Modal, StyleSheet, Text,Image, View,Dimensions,TouchableOpacity } from 'react-native'
import React from 'react'
import CustomButton from './CustomButton';
const {height, width} = Dimensions.get('screen');
const AskForLogin = ({modalVisible,onclose,onclickLogin,onclickSignup}) => {
  return (
    <Modal visible={modalVisible} transparent>
        <View style={{
            flex: 1,
            height: height,
            width: width,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor:'rgba(0, 0, 0, 0.5)'
        }}>
        <View style={styles.mainView}>
               <CustomButton bg={'#d54b1a'} title={'Login'}
                onClick={()=>onclickLogin()}
                />
          <CustomButton bg={'#d54b1a'} title={'Sign up'} 
          onClick={()=>onclickSignup()} 
          />
        <TouchableOpacity onPress={()=>{onclose()}}>
            <View>
              <Image
                source={require('../assets/close.png')}
                style={{width: 24, height: 24}}
              />
            </View>
          </TouchableOpacity>
        </View>
        </View>
    </Modal>
  )
}

export default AskForLogin

const styles = StyleSheet.create({
    mainView: {
        backgroundColor: 'white',
        borderRadius: 10,
        height: 200,
        width: '90%',
      },
})