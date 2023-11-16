import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const CustomButton = ({bg,color,onClick,title}) => {
  return (
    <TouchableOpacity style={[styles.btn,{backgroundColor:bg}]}  onPress={()=>{onClick()}}>
      <Text style={{color:color,fontSize:18,fontWeight:'500'}}>{title}</Text>
    </TouchableOpacity>

  )
}

export default CustomButton

const styles = StyleSheet.create({
btn:{
    width:Dimensions.get('screen').width-40,
    height:50,
    alignItems:'center',
    justifyContent:'center',
    alignSelf:'center',
    marginTop:30,
    borderRadius:10,

}


})