import React, { useEffect, useState } from 'react'
import { Text, View } from 'react-native'

import FoodItem from './FoodItem';

const SubMenu = ({subMenuName, items, quantities, quantityHandler}) => {
  const [foodItems, setFoodItems] = useState([]);

  function getFoodItems() {
    let foodItems = []
    let foodNames = Object.keys(items);

    //console.log(subMenuName, quantities, quantities[subMenuName])
    //console.log(quantities)


    foodNames.forEach((item, i) => {
      foodItems.push(
        <FoodItem
          foodName={item}
          portion={items[item].nutritionInfo.servingSize}
          key={i}
          index={i}
          quantity={quantities[i]}
          quantityHandler={quantityHandler}
        />
      )
    })

    setFoodItems(foodItems);
  }

  useEffect(() => {
    getFoodItems();
  }, [quantities])

  return (
    <View style={{flexDirection: 'column', paddingBottom: 40}}>
      <Text style={{flex: 1, fontSize: 20, paddingRight: 15, paddingTop: 6, paddingBottom: 10}}>{subMenuName}</Text>
      <View>
        { foodItems }
      </View>
    </View>
  )
}

export default SubMenu;
