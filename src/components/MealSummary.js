import React from 'react';
import { Text, View, StyleSheet} from 'react-native'
import CircleImage from './CircleImage'

const styles = StyleSheet.create({
    details: {
        fontSize: 12
    }
});

const MealSummary = ({data}) => {
  return (
    <View style={{flexDirection: 'column', margin: 20, alignItems: 'center'}}>
        <CircleImage size={75} path={'../Images/icecream.png'} ></CircleImage>
        <Text style={{ fontSize: 12, fontWeight: 'bold', marginTop: 5 }}>{data.type}</Text>
        <Text style={styles.details}>{data.calories} cal</Text>
        <Text style={styles.details}>{data.protein}g pro.</Text>
        <Text style={styles.details}>{data.carbs}g carb.</Text>
    </View>
  )
}

export default MealSummary;
