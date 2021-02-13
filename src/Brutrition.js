import React, { useState, useContext, useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Ionicons from 'react-native-vector-icons/Ionicons'

import Home from './containers/Home';
import Profile from './containers/Profile';
import AddMeal from './containers/AddMeal';
import Diary from './containers/Diary';
import Settings from './containers/Settings';
import LoadingScreen from './containers/LoadingScreen';
import Registration from './containers/Registration';

import MenuService from './services/MenuService';
import { Ctx } from './StateProvider';
import Meal from './objects/Meal';

import AsyncStorage from '@react-native-community/async-storage';

import Colors from './constants/Colors';

const Tab = createBottomTabNavigator();

const Brutrition = () => {
  const { state, dispatch } = useContext(Ctx);
  const [loading, setLoading] = useState(true);

  async function setLocalData() {
    let { meals, user } = state;
    meals = JSON.stringify(meals);
    user = JSON.stringify(user);
    try {
      await AsyncStorage.setItem('storedMeals', meals);
      await AsyncStorage.setItem('user', user);
      console.log('Successfully saved data');
    } catch (err) {
      console.log(err);
    }
  }

  async function getLocalData() {
    try {
      let user = await AsyncStorage.getItem('user');
      user = JSON.parse(user);
      dispatch({ type: 'SET_USER', payload: user });
      console.log('Retrieved user');

      let meals = await AsyncStorage.getItem('storedMeals');
      meals = JSON.parse(meals);
      meals = meals.map(meal => Meal.parse(meal));
      dispatch({ type: 'SET_MEALS', payload: meals });
      console.log('Retrieved meals')
    } catch(err) {
      console.log(err);
    }
  }

  async function fetchMenu() {
    try {
      let date = new Date().toLocaleDateString('en-CA');
      let menu = await MenuService.getMenu(date);
      console.log('Retrieved menu');
      menu = formatMenu(menu);
      dispatch({ type: 'SET_MENU', payload: menu });
    } catch(err) {
      console.log(err);
    }
  }

  useEffect(() => {
    setLocalData();
  }, [state.user, state.meals])

  useEffect(() => {
    if(loading) {
      getLocalData();
      fetchMenu();
      setLoading(false);
    }
  }, [loading])

  if (loading) {
    return <LoadingScreen/>
  }
  if (Object.keys(state.user).length === 0)
    return <Registration/>
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = 'ios-home';
            } else if (route.name === 'Profile') {
              iconName = 'ios-person';
            } else if (route.name === 'Add Meal') {
              iconName = 'ios-add-circle';
            } else if (route.name === 'Diary') {
              iconName = 'ios-book';
            } else if (route.name === 'Settings') {
              iconName = 'ios-settings';
            }

            return <Ionicons name={iconName} size={parseInt(size)} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: Colors.primary,
          inactiveTintColor: Colors.secondary,
        }}
      >
        <Tab.Screen name="Home" children={() => <Home title='Home'/>} />
        <Tab.Screen name="Profile" children={() => <Profile title='Profile'/>} />
        <Tab.Screen name="Add Meal" children={() => <AddMeal title='Add Meal'/>} />
        <Tab.Screen name="Diary" children={() => <Diary title='Diary'/>} />
        <Tab.Screen name="Settings" children={() => <Settings title='Settings'/>} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default Brutrition;

/** --------------------------- HELPER FUNCTIONS ---------------------------- */

const formatMenu = (menu) => {
  let diningHalls = {};

  menu.diningHalls.forEach((diningHall) => {
    let subMenus = {};
    diningHall.submenus.forEach((subMenu) => {
      let items = {}
      subMenu.items.forEach((item) => {
        let itemInfo = {
          mealType: item.mealType,
          nutritionInfo: item.nutritionInfo,
        };
        items[item.name] = itemInfo
      })
      subMenus[subMenu.name] = items;
    })
    diningHalls[diningHall.name] = subMenus;
  })
  let newMenu = {
    menu: diningHalls
  };

  return newMenu;
}

