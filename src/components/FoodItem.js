import React, { useState } from 'react';
import { Text, View, Button, Image, StyleSheet } from 'react-native';

const FoodItem = ({foodName, portion, key, index, quantityHandler}) => {
  const [value, setValue] = useState(0);

  handleAdd = () => handleChangeValue(value + 1)
  handleSubtract = () => handleChangeValue(Math.max(0, value - 1))
  handleChangeValue = value => {
    setValue(value);
    quantityHandler(index, value);
  }

  return (
    <View key={key} style={{flexDirection: 'row', paddingBottom: 40, paddingLeft: 10}}>
      <Image source={require('../assets/Food.jpg')} style={{borderRadius: 20, borderWidth: 2, width: 30, height: 30}}/>
      <View style={{flex: 1, paddingLeft: 10, paddingRight: 15}}>
        <Text style={{fontSize: 14 }}>{foodName}</Text>
        <Text style={{fontSize: 10}}>Serving Size: {portion}</Text>
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
        <Button title='-' onPress={() => handleSubtract()} style={styles.button}/>
        <Text style={{ borderColor: 'gray', borderWidth: 2, padding: 6, textAlign: 'center' }} >{value}</Text>
        <Button title='+' onPress={() => handleAdd()} style={styles.button}/>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 100
  }
});

export default FoodItem;
