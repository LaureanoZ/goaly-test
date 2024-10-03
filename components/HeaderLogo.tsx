import { View, Text, Image } from 'react-native'
import React from 'react'

const HeaderLogo = () => {
  
  return (
    <Image
    source={require('../assets/images/goaly-stroke.png')}
    style={{ width: 100, height: 70, alignSelf: 'center' }}
    accessibilityLabel= 'Goaly logo'
    resizeMode='contain'
  />
  )
}

export default HeaderLogo