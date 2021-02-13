import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions, ScrollView } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

import MealSummary from '../components/MealSummary';
import TopBar from '../components/TopBar';
import DailyProgress from '../components/DailyProgress';
import Colors from '../constants/Colors';

import { Ctx } from '../StateProvider';
import moment from 'moment'

const Home = () => {
  const { state } = useContext(Ctx);
  const [caloriesProgress, setCaloriesProgress] = useState(0.0);
  const [carbsProgress, setCarbsProgress] = useState(0.0);
  const [fatsProgress, setFatsProgress] = useState(0.0);
  const [proteinsProgress, setProteinsProgress] = useState(0.0);
  const [dailyCalories, setDailyCalories] = useState(0.0);
  const [dailyCarbs, setDailyCarbs] = useState(0.0);
  const [dailyFats, setDailyFats] = useState(0.0);
  const [dailyProteins, setDailyProteins] = useState(0.0);
  const [mealSummaries, setMealSummaries] = useState([]);
  const [data, setData] = useState(true);
  const [loading, setLoading] = useState(true);

  function getData() {
    if(state.meals.length === 0) {
      setData(false);
      return;
    }

    let dataPointsCalories = []
    let dataPointsCarbs = []
    let dataPointsFats = []
    let dataPointsProteins = []
    let labels = []
    for (let i = 0; i < state.meals.length; i++) {
      let timestamp = state.meals[i].timestamp.format("MM/DD")
      let curDataCalories = state.meals[i].calories
      let curDataCarbs = state.meals[i].carbs
      let curDataFats = state.meals[i].fat
      let curDataProteins = state.meals[i].protein
      let j = i+1;
      while(j < state.meals.length) {
        if(state.meals[j].timestamp.format("MM/DD") !== timestamp)
          break
        curDataCalories += state.meals[j].calories
        curDataCarbs += state.meals[j].carbs
        curDataFats += state.meals[j].fat
        curDataProteins += state.meals[j].protein
        j++
      }
      labels.push(timestamp)
      dataPointsCalories.push(curDataCalories)
      dataPointsCarbs.push(curDataCarbs)
      dataPointsFats.push(curDataFats)
      dataPointsProteins.push(curDataProteins)
      i = j-1

    }

    let data = {
      labels: labels.slice(labels.length-10),
      datasets: [
        {
          data: dataPointsCalories.slice(labels.length-10),
          color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`, // optional
          strokeWidth: 2
        },
        {
          data: dataPointsCarbs.slice(labels.length-10),
          color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`, // optional
          strokeWidth: 2
        },
        {
          data: dataPointsFats.slice(labels.length-10),
          color: (opacity = 1) => `rgba(0, 128, 0, ${opacity})`, // optional
          strokeWidth: 2
        },
        {
          data: dataPointsProteins.slice(labels.length-10),
          color: (opacity = 1) => `rgba(255, 165, 0, ${opacity})`, // optional
          strokeWidth: 2
        }
      ],
      legend: ["Calories", "Carbs", "Fats", "Proteins"]
    }

    return data
  }

  function getProgress() {
    let calories = 0.0
    let carbs = 0.0
    let fats = 0.0
    let proteins = 0.0

    for (let i = 0; i < state.meals.length; i++) {
      if(state.meals[i].timestamp.format("MM/DD") == moment().format("MM/DD")) {
        calories += state.meals[i].calories
        carbs += state.meals[i].carbs
        fats += state.meals[i].fat
        proteins += state.meals[i].protein
      }
    }

    setCaloriesProgress(calories/state.user.goals.calories);
    setCarbsProgress(carbs/state.user.goals.totalCarbs);
    setFatsProgress(fats/state.user.goals.totalFat);
    setProteinsProgress(proteins/state.user.goals.protein);
    setDailyCalories(calories);
    setDailyCarbs(carbs);
    setDailyFats(fats);
    setDailyProteins(proteins);
  }

  function getMealSummaries() {
    let mealSummaries = state.meals.filter((meal) => meal.foods.length !== 0).map((meal, i) => <MealSummary key={i} data={meal} />)
    let start = mealSummaries.length - 3
    if (start < 0)
      start = 0
    mealSummaries = mealSummaries.slice(start).reverse()
    setMealSummaries(mealSummaries);
  }

  useEffect(() => {
    if(loading) {
      getProgress();
      getMealSummaries();
      setLoading(false);
    }
  }, [loading])

  return (
    <View>
      <TopBar/>
      <ScrollView contentContainerStyle={{paddingBottom: 150}}>
        {data ? (
          <>
            <Text style={styles.titleText}>Nutrition Summary</Text>
            <LineChart
            data={getData()}
            width={Dimensions.get("window").width*0.95} // from react-native
            height={220}
            yAxisInterval={10} // optional, defaults to 1
            chartConfig={{
              backgroundColor: Colors.primary,
              backgroundGradientFrom: Colors.primary,
              backgroundGradientTo: Colors.primary,
              decimalPlaces: 0, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              style: {
                borderRadius: 16
              },
              propsForDots: {
                r: "6",
                strokeWidth: "2",
              }
            }}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 16,
              justifyContent: 'center',
              alignItems: 'center'
            }}
            />
          </>
        ) : (
          <></>
        )}
        <Text style={styles.titleText}>Today's Progress</Text>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <DailyProgress name={'Calories'} progress={caloriesProgress} dailyVal={dailyCalories} goal={state.user.goals.calories} color={'red'}/>
          <DailyProgress name={'Carbs'} progress={carbsProgress} dailyVal={dailyCarbs} goal={state.user.goals.totalCarbs} color={'blue'}/>
          <DailyProgress name={'Fats'} progress={fatsProgress} dailyVal={dailyFats} goal={state.user.goals.totalFat} color={'green'}/>
          <DailyProgress name={'Protein'} progress={proteinsProgress} dailyVal={dailyProteins} goal={state.user.goals.protein} color={'orange'}/>
        </View>
        <Text style={styles.titleText}>Meals</Text>
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          {mealSummaries.length > 0 ? mealSummaries : <Text>You don't have any recent meals</Text>}
        </View>
        {/* <Text style={styles.titleText}>My Friends</Text> */}
        {/*
        <TextInput
          style={{ height: 40, borderColor: 'gray', margin: 10, padding: 10, backgroundColor: 'lightgray', color: 'gray', borderRadius: 6 }}
          onChangeText={text => onChangeText(text)}
          value={'Share with your friends...'}
          />
        */}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  baseText: {
    fontFamily: "Cochin"
  },
  titleText: {
    fontSize: 30,
    fontWeight: "bold",
    marginLeft: 20,
    paddingTop: 10
  }
});

export default Home;
