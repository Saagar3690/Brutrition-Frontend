import React, { useState, useContext } from 'react';
import { View, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack'

import DiningHalls from './DiningHalls';
import DiningHallMenu from './DiningHallMenu';
import NutritionInfo from './NutritionInfo';

const AddMealStack = createStackNavigator();

const AddMeal = () => {
  return (
    <AddMealStack.Navigator screenOptions={{headerShown: false}}>
      <AddMealStack.Screen name='Dining Halls' component={DiningHalls} />
      <AddMealStack.Screen name='Dining Hall Menu' component={DiningHallMenu} />
      <AddMealStack.Screen name='Nutrition Info' component={NutritionInfo} />
    </AddMealStack.Navigator>
  )
}

export default AddMeal;
