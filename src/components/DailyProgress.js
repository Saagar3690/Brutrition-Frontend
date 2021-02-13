import React from 'react';
import { Text, View,  Dimensions } from 'react-native'
import * as Progress from 'react-native-progress'

const DailyProgress = ({name, progress, dailyVal, goal, color }) => {
  return (
    <View style={{paddingBottom: 10, width: '100%', paddingLeft: 20, paddingRight: 20}}>
      <Text style={{fontWeight: 'bold', color: color}}>{name}: </Text>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View style={{flex: 1}}><Progress.Bar progress={progress} width={Dimensions.get("window").width*0.65} color={color}/></View>
        <View style={{flex: 4}}><Text style={{fontWeight: 'bold', paddingLeft: 10, color: color, textAlign: 'right'}}>{dailyVal}/{goal}</Text></View>
      </View>
    </View>
    )
}

export default DailyProgress;
