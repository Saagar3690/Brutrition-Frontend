import React, { useState, useContext, useEffect } from 'react';
import { Text, View, Button, ScrollView } from 'react-native';

import TopBar from '../components/TopBar';
import SubMenu from '../components/SubMenu';
import Meal from '../objects/Meal';
import { Ctx } from '../StateProvider';

const DiningHallMenu = ({navigation, route}) => {
  let { state, dispatch } = useContext(Ctx);
  let quantities = state['quantities'];

  let menu = route.params.menu;

  function onCalculate() {
    let mealFoods = [];
    for(let sub in quantities) {
      let foods = menu[sub];
      let foodNames = Object.keys(foods);
      for(let i = 0; i < foodNames.length; i++) {
        let amt = quantities[sub][i];
        if(amt != 0) {
          mealFoods.push({...foods[foodNames[i]], quantity: amt, foodName: foodNames[i] });
        }
      }
    }
    let meal = new Meal(mealFoods, route.params.diningHallName);
    let foodAmounts = mealFoods.map(food => food.quantity);
    dispatch({ type: 'ADD_MEAL', payload: meal });
    navigation.navigate('Nutrition Info', {
      foodInfos: mealFoods,
      foodAmounts
    })
  }

  let items = []
  for(let name in menu) {
    let foods = menu[name];
    items.push(
      <SubMenu
        subMenuName={name}
        items={foods}
        quantities={quantities[name] || new Array(Object.keys(foods).length).fill(0)}
        quantityHandler={(index, val) => {
          let q = quantities;
          if(!q[name]) {
            q[name] = new Array(Object.keys(foods).length).fill(0);
          }
          else {
            q[name] = q[name].slice();
          }
          q[name][index] = parseInt(val);
          dispatch({ type: 'UPDATE_QUANTITY', payload: q });
        }}
      />
    )
  }

  return (
    <View style={{paddingBottom: 200}}>
        <TopBar/>
        <View style={{flexDirection: 'row', paddingLeft: 20, paddingTop: 20}}>
          <Text style={{fontSize: 30, fontWeight: 'bold'}}>{route.params.diningHallName}</Text>
        </View>
        <ScrollView contentContainerStyle={{padding: 10, paddingLeft: 10, paddingRight: 10}}>
          { items }
        </ScrollView>
        <Button title='Calculate' buttonStyle={{backgroundColor: Colors.primary }} onPress={onCalculate}/>
      </View>
  )
}

export default DiningHallMenu;
/*
import * as React from 'react'
import { Text, View, Button, Image, TouchableWithoutFeedback, ScrollView, StyleSheet } from 'react-native'

import Meal from '../Objects/Meal'
import TopBar from '../Components/TopBar'
import SubMenu from '../Components/SubMenu'

import {connect} from 'react-redux'

class DiningHallMenu extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      navigation: props.navigation,
      diningHallName: props.route.params.diningHallName,
      menu: props.route.params.menu,
      subMenu: [],
      subMenuItems: [],
      quantities: {}
    }
  }

  async componentDidMount() {
    this.getSubMenus()
    this.render()
  }

  getSubMenus() {
    var tmp = []
    for (const part in this.state.menu[0]) {
      tmp.push(part)
    }
    var allSubMenus = {}
    for (let i = 0; i < tmp.length; i++) {
      var foodItems = {}
      for (let j = 0; j < this.state.menu.length; j++) {
        for (const item in this.state.menu[j][tmp[i]]) {
          foodItems[item] = this.state.menu[j][tmp[i]][item]
        }
      }
      allSubMenus[tmp[i]] = foodItems
    }

    this.setState({
      subMenu: tmp,
      subMenuItems: allSubMenus,
      quantities: {}
    })
    //console.log(tmp, allSubMenus)

  }
  onCalculate = () => {
    let foodPromises = []
    //let foodIds = []
    let foodInfos, foodAmounts = []
    for(let subMenu of this.state.subMenu) {
      if(!this.state.quantities[subMenu]) continue
      for(let i = 0; i < this.state.quantities[subMenu].length; i++) {
        if(this.state.quantities[subMenu][i]) {
          let foodId = Object.keys(this.state.subMenuItems[subMenu])[i]
          let foodAmount = this.state.quantities[subMenu][i]
          if(foodAmount !== 0)
            foodAmounts.push(foodAmount)
          foodPromises.push(
            fetch('https://brutrition.herokuapp.com/foods?id=' + foodId)
            .then(response => response.json())
            .then(responseJSON => {return {...responseJSON.Data[0], quantity: foodAmount}})
            .catch(error => {
              console.error(error)
              return 0
            })
          )
          //foodIds.push(foodId)
          //console.log(foodId, foodAmount)
        }
      }
    }
    Promise.all(foodPromises).then(foodsInfo => {
      let meal = new Meal(foodsInfo.filter(val => val != 0), this.state.diningHallName)
      this.props.addMeal(meal)
      foodInfos = foodsInfo.filter(val => val != 0);
      //console.log(foodInfos)
      this.state.navigation.navigate('Nutrition Info', {
        //foodIds: foodIds,
        foodInfos: foodInfos,
        foodAmounts: foodAmounts
      })
    })
  }

  render() {
    var items = []
    for(let i = 0; i < this.state.subMenu.length; i++) {
      let name = this.state.subMenu[i]
      let foods = this.state.subMenuItems[name]
      items.push(
        <SubMenu
          subMenuName={name}
          foods={foods}
          quantityHandler={(index, val) => {
            let quantities = {...this.state.quantities}
            if(!quantities[name]) quantities[name] = new Array(foods.length).fill(0)
            quantities[name][index] = parseInt(val)
            //console.log('Quant', quantities)
            this.setState({
              quantities
            })
          }}
        />
      )
    }

    return (
      <View style={{paddingBottom: 200}}>
        <TopBar/>
        <View style={{flexDirection: 'row', paddingLeft: 20, paddingTop: 20}}>
          <Text style={{fontSize: 30, fontWeight: 'bold'}}>{this.state.diningHallName}</Text>
        </View>
        <ScrollView contentContainerStyle={{padding: 10, paddingLeft: 10, paddingRight: 10}}>
          { items }
        </ScrollView>
        <Button title='Calculate' buttonStyle={{backgroundColor: Colors.primary }} onPress={this.onCalculate}/>
      </View>
    )
  }
}

function mapStateToProps(state) {
  return {
    menus: state.menus,
    diningHalls: state.diningHalls,
    foods: state.foods,
    value: state.value,
    dataSource: state.dataSource,
    contentToDisplay: state.contentToDisplay,
    content: state.content,
    loading: state.loading
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addMeal: (meal) => dispatch({ type: 'ADD_MEAL', payload: meal }),
    fetchMenu: (menu) => dispatch({ type: 'FETCH_MENU', payload: menu }),
    fetchDiningHalls: (diningHalls) => dispatch({ type: 'FETCH_DINING_HALLS', payload: diningHalls}),
    fetchFoods: (foods) => dispatch({ type: 'FETCH_FOODS', payload: foods}),
    fetchFoodItem: () => dispatch({ type: 'FETCH_FOOD_ITEM'}),
    updateCount: (value) => dispatch({ type: 'UPDATE_COUNT', payload: value})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DiningHallMenu)
*/
