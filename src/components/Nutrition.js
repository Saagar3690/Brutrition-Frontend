import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';

import NutritionLabel from './NutritionLabel';

const Nutrition = ({dataSource}) => {
  return (
    <View>
      <Text style={{fontSize: 18, fontWeight: 'bold', textAlign: 'center'}}>{dataSource.foodName}</Text>
      <Text style={{fontSize: 10, textAlign: 'center'}}>*{dataSource.prodWebCodes.join(', ')}</Text>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <NutritionLabel
          style={styles.label}
          servingSize={dataSource.servingSize}
          calories={dataSource.calories}
          totalFat={dataSource.totalFat.val}
          totalFatPercent={dataSource.totalFat.dailyVal}
          saturatedFat={dataSource.saturatedFat.val}
          saturatedFatPercent={dataSource.saturatedFat.dailyVal}
          transFat={dataSource.transFat}
          cholesterol={dataSource.cholesterol.val}
          cholesterolPercent={dataSource.cholesterol.dailyVal}
          sodium={dataSource.sodium.val}
          sodiumPercent={dataSource.sodium.dailyVal}
          totalCarbs={dataSource.totalCarbohydrate.val}
          totalCarbsPercent={dataSource.totalCarbohydrate.dailyVal}
          dietaryFiber={dataSource.dietaryFiber.val}
          dietaryFiberPercent={dataSource.dietaryFiber.dailyVal}
          sugars={dataSource.sugars}
          protein={dataSource.protein}
          vitaminA={dataSource.vitaminA}
          vitaminC={dataSource.vitaminC}
          calcium={dataSource.calcium}
          iron={dataSource.iron}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  label: {
    width: '70%',
    borderColor: 'black',
    borderWidth: 1
  }
});

export default Nutrition;
