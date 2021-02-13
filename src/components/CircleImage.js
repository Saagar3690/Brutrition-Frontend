import * as React from 'react'
import { Image } from 'react-native'

const CircleImage = ({ path, size }) => {
    return (
        <Image source={require('../assets/icecream.png')} style={{ width: size, height: size, borderRadius: 1000 }}></Image>
    )
}

export default CircleImage;
