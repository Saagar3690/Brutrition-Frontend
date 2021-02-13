import React, { useState, useContext, useEffect } from 'react';
import { Text, View, Image, TouchableWithoutFeedback } from 'react-native'

import TopBar from '../components/TopBar';

import { Ctx } from '../StateProvider';

const DiningHalls = ({navigation}) => {
  const { state } = useContext(Ctx);
  const [items, setItems] = useState([]);

  function getDiningHalls() {
    var items = []
    let diningHalls = Object.keys(state.menus.menu);
    for(let i = 0; i < diningHalls.length; i++) {
      items.push(
        <TouchableWithoutFeedback key={i} onPress={() => navigation.navigate('Dining Hall Menu', {
          diningHallName: diningHalls[i],
          menu: state.menus.menu[diningHalls[i]]
        })}>
          <View style={{flexDirection: 'column', paddingBottom: 40, justifyContent: 'center'}}>
            <Image source={require('../assets/Food.jpg')} style={{borderRadius: 40, borderWidth: 2, width: 75, height: 75}}/>
            <Text style={{paddingLeft: 12, paddingTop: 5, }}>{diningHalls[i]}</Text>
          </View>
        </TouchableWithoutFeedback>
      )
    }

    setItems(items);
  }

  useEffect(() => {
    getDiningHalls();
  }, [])

  return (
    <View>
      <TopBar/>
      <View style={{flexDirection: 'row', justifyContent: 'flex-start', padding: 20}}>
        <Text style={{fontSize: 30, fontWeight: 'bold'}}>Add Meal</Text>
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'flex-start', padding: 20}}>
        <Text style={{fontSize: 18, fontWeight: 'bold'}}>All Dining Halls</Text>
      </View>
      <View style={{paddingLeft: 30}}>
        { items }
      </View>
    </View>
  )
}

export default DiningHalls;
