import React, { useState, useContext, useEffect } from 'react';
import { Text, View, StyleSheet, Dimensions, ScrollView } from 'react-native'
import { ProgressChart, ContributionGraph } from 'react-native-chart-kit'
import { DataTable } from 'react-native-paper'

import CircleImage from '../components/CircleImage';
import TopBar from '../components/TopBar';
import Colors from '../constants/Colors';

import { Ctx } from '../StateProvider';
import moment from 'moment'

const Profile = ({title}) => {
  const { state } = useContext(Ctx);
  const [caloriesProgress, setCaloriesProgress] = useState(0.0);
  const [carbsProgress, setCarbsProgress] = useState(0.0);
  const [fatsProgress, setFatsProgress] = useState(0.0);
  const [proteinsProgress, setProteinsProgress] = useState(0.0);

  function getProgress() {
    let calories = 0.0, carbs = 0.0, fats = 0.0, proteins = 0.0;

    for (let i = 0; i < state.meals.length; i++) {
      if(state.meals[i].timestamp.format("MM/DD") == moment().format("MM/DD")) {
        calories += state.meals[i].calories
        carbs += state.meals[i].carbs
        fats += state.meals[i].fat
        proteins += state.meals[i].protein
      }
    }
    if(calories > state.user.goals.calories)  calories = state.user.goals.calories
    if(carbs > state.user.goals.totalCarbs)  carbs = state.user.goals.totalCarbs
    if(fats > state.user.goals.totalFat)  fats = state.user.goals.totalFat
    if(proteins > state.user.goals.protein)  proteins = state.user.goals.protein

    setCaloriesProgress(calories/state.user.goals.calories);
    setCarbsProgress(carbs/state.user.goals.totalCarbs);
    setFatsProgress(fats/state.user.goals.totalFat);
    setProteinsProgress(proteins/state.user.goals.protein);
  }

  function getDataTable() {
    let goals = ["Calories", "Total Fat", "Sodium", "Carbohydrates", "Dietary Fiber", "Sugar", "Protein"]
    let values = Object.values(state.user.goals)
    let units = ["cal",  "g", , "mg", "g", "g", "g", "g"]
    let dataTableItems = []
    for (let i = 0; i < goals.length; i++) {
      dataTableItems.push(
        <DataTable.Row key={i}>
          <DataTable.Cell>{goals[i]}</DataTable.Cell>
          <DataTable.Cell numeric>{values[i]}{units[i]}</DataTable.Cell>
        </DataTable.Row>
      )
    }
    return dataTableItems
  }

  function getContributionDataGraph() {
    let data = []
    let timestamp = moment().format("YYYY-MM-DD")
    let count = 0
    for (let i = 0; i < state.meals.length; i++) {
      if(state.meals[i].timestamp.format("YYYY-MM-DD") === timestamp)
        count++
      else {
        data.push({
          date: timestamp,
          count: count
        })
        timestamp = state.meals[i].timestamp.format("YYYY-MM-DD")
        count = 1
      }
    }
    return data
  }

  useEffect(() => {
    getProgress();
  }, [])

  return (
    <View>
      <TopBar/>
      <ScrollView contentContainerStyle={{paddingBottom: 150}}>
        <Text style={styles.titleText}>{title}</Text>
        <View style={styles.containerV}>
          <CircleImage size={120} path={'../Images/icecream.png'} />
          <Text style={{marginTop: 10}}>{state.user.name}</Text>
          <Text style={{margin: 0}}>{state.meals.length} Meals Tracked</Text>
          {state.meals.length > 0 && <Text style={{margin: 0}}>Last meal {state.meals[state.meals.length - 1].timestamp.fromNow()}</Text>}
        </View>
        <Text style={styles.titleText}>Daily Progress</Text>
        <View style={{marginLeft: -20, marginRight: 20}}>
          <ProgressChart
            data={{
              labels: ["Calories", "Carbs", "Fats", "Proteins"], // optional
              data: [caloriesProgress, carbsProgress, fatsProgress, proteinsProgress]
            }}
            width={Dimensions.get("window").width}
            height={220}
            strokeWidth={16}
            radius={32}
            chartConfig={{
              backgroundGradientFrom: "#1E2923",
              backgroundGradientFromOpacity: 0,
              backgroundGradientTo: Colors.primary,
              backgroundGradientToOpacity: 0,
              color: (opacity = Math.random()) => `rgba(122, 145, 225, ${opacity})`,
              strokeWidth: 2, // optional, default 3
              barPercentage: 0.3,
              useShadowColorFromDataset: false // optional,
            }}
            hideLegend={false}
          />
        </View>
        <Text style={styles.titleText}>My Goals</Text>
        <DataTable style={{borderRadius: 10, borderColor: 'black'}}>
            <DataTable.Header>
              <DataTable.Title>Category</DataTable.Title>
              <DataTable.Title numeric>Value</DataTable.Title>
            </DataTable.Header>
            {getDataTable()}
          </DataTable>
          <Text style={styles.titleText}>History</Text>
          <ContributionGraph
            values={getContributionDataGraph()}
            endDate={moment().format("YYYY-MM-DD")}
            numDays={105}
            width={Dimensions.get("window").width*0.9}
            height={220}
            chartConfig={{
              backgroundGradientFrom: "#1E2923",
              backgroundGradientFromOpacity: 0,
              backgroundGradientTo: Colors.primary,
              backgroundGradientToOpacity: 0,
              color: (opacity = 1) => `rgba(122, 145, 225, ${opacity})`,
              strokeWidth: 2, // optional, default 3
              barPercentage: 0.3,
              useShadowColorFromDataset: false // optional
            }}
          />
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  titleText: {
    fontSize: 30,
    fontWeight: "bold",
    marginLeft: 20,
    paddingTop: 10
  },
  containerV: {
    flexDirection: "column",
    alignItems: "center",
    marginTop: 20
  },
  goals: {
    paddingBottom: 10,
    fontSize: 16
  }
});

export default Profile;
