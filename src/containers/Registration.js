import React, { useState, useContext } from 'react'
import { Text, View, ScrollView, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native'

import { Ctx } from '../StateProvider';
import calculator from '../services/Calculator';

import TopBar from '../components/TopBar';
import Colors from '../constants/Colors'

const Registration = () => {
  const { dispatch } = useContext(Ctx);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [sex, setSex] = useState('');
  const [weightStatus, setWeightStatus] = useState('');
  const [activityLevel, setActivityLevel] = useState('');
  const [calories, setCalories] = useState('');
  const [totalFat, setTotalFat] = useState('');
  const [sodium, setSodium] = useState('');
  const [totalCarbs, setTotalCarbs] = useState('');
  const [fiber, setFiber] = useState('');
  const [sugars, setSugars] = useState('');
  const [protein, setProtein] = useState('');

  function handleUserInfo() {
    if(!name) {
      Alert.alert('Please enter your name')
      return false
    }
    if(!age) {
      Alert.alert('Please enter your age')
      return false
    }
    if(!height) {
      Alert.alert('Please enter your height')
      return false
    }
    if(!weight) {
      Alert.alert('Please enter your weight')
      return false
    }
    if(!sex) {
      Alert.alert('Please enter your gender')
      return false
    }
    if(!weightStatus) {
      Alert.alert('Please enter your weight status')
      return false
    }
    if(!activityLevel) {
      Alert.alert('Please enter your activity level')
      return false
    }
    if(sex.toLowerCase() !== "m" && sex.toLowerCase() !== "f") {
      Alert.alert('Please enter M or F for sex')
      return false
    }
    if(activityLevel.toLowerCase() !== "none" && activityLevel.toLowerCase() !== "light" && activityLevel.toLowerCase() !== "moderate" && activityLevel.toLowerCase() !== "heavy") {
      Alert.alert('Please enter none, light, moderate, or heavy for activity level')
      return false
    }
    if(weightStatus.toLowerCase() !== "g" && weightStatus.toLowerCase() !== "l" && weightStatus.toLowerCase() !== "c") {
      Alert.alert('Please enter G, L, or C for weight status')
      return false
    }

    return true
  }

  function handleRegistration() {
    if(!handleUserInfo())
      return
    if(!calories) {
      Alert.alert('Please enter your calories goal')
      return
    }
    if(!totalFat) {
      Alert.alert('Please enter your total fat goal')
      return
    }
    if(!sodium) {
      Alert.alert('Please enter your sodium goal')
      return
    }
    if(!totalCarbs) {
      Alert.alert('Please enter your total carbs goal')
      return
    }
    if(!fiber) {
      Alert.alert('Please enter your fiber goal')
      return
    }
    if(!sugars) {
      Alert.alert('Please enter your sugars goal')
      return
    }
    if(!protein) {
      Alert.alert('Please enter your protein goal')
      return
    }

    let goals = {
      calories: calories,
      totalFat: totalFat,
      sodium: sodium,
      totalCarbs: totalCarbs,
      fiber: fiber,
      sugars: sugars,
      protein: protein
    }

    let user = {
      name: name,
      age: age,
      height: height,
      weight: weight,
      gender: sex,
      activityLevel: activityLevel,
      weightStatus: weightStatus,
      goals: goals
    }

    dispatch({ type: 'REGISTER', payload: user })
  }

  function handleRegistrationAndGoalSetting() {
    if(!handleUserInfo())
      return

    let goals = calculator(parseFloat(height) * 2.54, parseFloat(weight) * 0.453592, sex.toLowerCase(), age, activityLevel.toLowerCase(), weightStatus.toLowerCase())
    setCalories(goals.calories.toString());
    setTotalFat(goals.fats.toString());
    setSodium(goals.sodium.toString());
    setTotalCarbs(goals.carbs.toString());
    setFiber(goals.fiber.toString());
    setSugars(goals.sugar.toString());
    setProtein(goals.proteins.toString());
  }

  return (
    <View style={{marginBottom: 150}}>
      <TopBar/>
      <ScrollView contentContainerStyle={{justifyContent: 'center', alignItems: 'center', paddingBottom: 400}}>
        <View style={styles.container}>
          <Text style={styles.titleText}>Welcome</Text>
          <Text style={styles.subtitleText}>Fill in the details and start living healthier</Text>
        </View>
        <View style={styles.container}>
          <View style={styles.labelContainer}><Text style={styles.labelText}>Name</Text></View>
          <View style={styles.input}><TextInput placeholder='Name' value={name} onChangeText={(text) => setName(text)}></TextInput></View>
          <View style={styles.labelContainer}><Text style={styles.labelText}>Age</Text></View>
          <View style={styles.input}><TextInput placeholder='Age' value={age} keyboardType='numeric' onChangeText={(text) => setAge(text)}></TextInput></View>
          <View style={styles.labelContainer}><Text style={styles.labelText}>Height</Text></View>
          <View style={styles.input}><TextInput placeholder='Height (inches)' value={height} keyboardType='numeric' onChangeText={(text) => setHeight(text)}></TextInput></View>
          <View style={styles.labelContainer}><Text style={styles.labelText}>Weight</Text></View>
          <View style={styles.input}><TextInput placeholder='Weight (lbs)' value={weight} keyboardType='numeric' onChangeText={(text) => setWeight(text)}></TextInput></View>
          <View style={styles.labelContainer}><Text style={styles.labelText}>Sex</Text></View>
          <View style={styles.input}><TextInput placeholder='Sex (M for male and F for female)' value={sex} onChangeText={(text) => setSex(text)}></TextInput></View>
          <View style={styles.labelContainer}><Text style={styles.labelText}>Activity Level</Text></View>
          <View style={styles.input}><TextInput placeholder='Activity Level (none, light, moderate, heavy)' value={activityLevel} onChangeText={(text) => setActivityLevel(text)}></TextInput></View>
          <View style={styles.labelContainer}><Text style={styles.labelText}>Weight Goal</Text></View>
          <View style={styles.input}><TextInput placeholder='Weight Goal (G for gain, L for lose, and C for current)' value={weightStatus} onChangeText={(text) => setWeightStatus(text)}></TextInput></View>

        </View>
        <View style={styles.container}>
          <Text style={styles.titleText}>Set Your Goals</Text>
          <Text style={styles.subtitleText}>Let us set your goals based on your height, weight, gender, activity level, and weight status or set your own</Text>
        </View>
        <TouchableOpacity style={{backgroundColor: Colors.primary, width: '25%', justifyContent: 'center', borderRadius: 20, marginBottom: 20}} onPress={() => handleRegistrationAndGoalSetting()}>
          <Text style={{textAlign: 'center', color: 'white', padding: 10}}>Set It For Me</Text>
        </TouchableOpacity>
        <View style={styles.container}>
          <View style={styles.labelContainer}><Text style={styles.labelText}>Calories</Text></View>
          <View style={styles.input}><TextInput placeholder='Calories' value={calories} keyboardType='numeric' onChangeText={(text) => setCalories(text)}></TextInput></View>
          <View style={styles.labelContainer}><Text style={styles.labelText}>Fat</Text></View>
          <View style={styles.input}><TextInput placeholder='Total Fat (g)' value={totalFat} keyboardType='numeric' onChangeText={(text) => setTotalFat(text)}></TextInput></View>
          <View style={styles.labelContainer}><Text style={styles.labelText}>Sodium</Text></View>
          <View style={styles.input}><TextInput placeholder='Sodium (mg)' value={sodium} keyboardType='numeric' onChangeText={(text) => setSodium(text)}></TextInput></View>
          <View style={styles.labelContainer}><Text style={styles.labelText}>Carbs</Text></View>
          <View style={styles.input}><TextInput placeholder='Total Carbohydrates (g)' value={totalCarbs} keyboardType='numeric' onChangeText={(text) => setTotalCarbs(text)}></TextInput></View>
          <View style={styles.labelContainer}><Text style={styles.labelText}>Fiber</Text></View>
          <View style={styles.input}><TextInput placeholder='Dietary Fibers (g)' value={fiber} keyboardType='numeric' onChangeText={(text) => setFiber(text)}></TextInput></View>
          <View style={styles.labelContainer}><Text style={styles.labelText}>Sugars</Text></View>
          <View style={styles.input}><TextInput placeholder='Sugars (g)' value={sugars} keyboardType='numeric' onChangeText={(text) => setSugars(text)}></TextInput></View>
          <View style={styles.labelContainer}><Text style={styles.labelText}>Protein</Text></View>
          <View style={styles.input}><TextInput placeholder='Protein (g)' value={protein} keyboardType='numeric' onChangeText={(text) => setProtein(text)}></TextInput></View>
        </View>
        <TouchableOpacity style={{backgroundColor: Colors.primary, width: '25%', justifyContent: 'center', borderRadius: 20}} onPress={() => handleRegistration()}>
          <Text style={{textAlign: 'center', color: 'white', padding: 10}}>Finish</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    width: '100%'
  },
  baseText: {
    fontFamily: "Cochin"
  },
  titleText: {
    fontSize: 35,
    fontWeight: "bold",
    textAlign: 'center',
    paddingBottom: 10,
    paddingTop: 10
  },
  subtitleText: {
    color: 'gray',
    textAlign: 'center',
    fontSize: 16,
    marginLeft: 20,
    marginRight: 20
  },
  input: {
    backgroundColor: '#eaf6ff',
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    height: 50,
    justifyContent: 'center'
  },
  labelContainer: {
    marginLeft: 25,
    paddingBottom: 3
  },
  labelText: {
    fontWeight: 'bold'
  }
})

export default Registration;
