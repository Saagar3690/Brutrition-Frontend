import * as React from 'react'
import { Text, View, StyleSheet } from 'react-native'

const MealSummaryPiece = ({name, value, shorthand, color}) => {
  return (
    <View style={styles.container}>
      <View style={styles.icon}>
        <Text style={[styles.iconText, {color: color}]}>{shorthand}</Text>
      </View>
      <Text style={styles.nameText}>{name}</Text>
      <Text>{value}g</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 4,
    justifyContent: 'center',
    alignItems: 'center'
  },
  icon: {
    backgroundColor: 'black',
    borderRadius: 25,
    width: 35,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center'
  },
  iconText: {
    width: 30,
    height: 30,
    fontSize: 27,
    fontWeight: '700',
    textAlign: 'center'
  },
  nameText: {
    fontWeight: 'bold',
    paddingTop: 5
  }
});

export default MealSummaryPiece;
