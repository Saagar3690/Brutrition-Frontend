import React, { useState, useContext, useEffect } from 'react';
import { Text, View, Button, ScrollView } from 'react-native'

import TopBar from '../components/TopBar';
import SubMenu from '../components/SubMenu';

const DiningHallMenu = ({navigation, route}) => {
  const [subMenus, setSubMenus] = useState([]);
  const [subMenuItems, setSubMenuItems] = useState([]);
  const [quantities, setQuantities] = useState({});

  function getSubMenus() {
    let subMenus = Object.keys(route.params.menu);
    console.log(Object.keys(route.params.menu[subMenus[0]]));

    /*subMenus.forEach((subMenu, i) => {

    })

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
    })*/
  }

  useEffect(() => {
    getSubMenus();
  }, [])

  return (
    <View style={{paddingBottom: 200}}>
      <TopBar/>

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
