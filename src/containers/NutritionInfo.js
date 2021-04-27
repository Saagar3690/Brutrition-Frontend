import * as React from 'react'
import { Text, View, Button, Image, TouchableWithoutFeedback, ScrollView, TextInput, StyleSheet, Dimensions } from 'react-native'

import TopBar from '../components/TopBar'
import Nutrition from '../components/Nutrition'

import Carousel, { Pagination } from 'react-native-snap-carousel';
import Ionicons from 'react-native-vector-icons/Ionicons'

import MealSummaryPiece from '../components/MealSummaryPiece';

class NutritionInfo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      navigate: props.navigation,
      //foodIds: props.route.params.foodIds,
      foodInfos: props.route.params.foodInfos,
      foodAmounts: props.route.params.foodAmounts,
      contentToDisplay: false,
      activeSlide: 0
    }
  }

  async componentDidMount() {
    if(this.state.foodInfos.length !== 0) {
      this.setState({
        contentToDisplay: true
      })
    }
    this.render()
  }

  _renderItem = ({item, index}) => {
    return (
      <Nutrition dataSource={item['nutritionInfo']} />
    );
  }

  roundToTwo(num) {
    return +(Math.round(num + "e+2")  + "e-2");
  }

  render() {
    let totalCalories = 0
    let totalCarbs = 0
    let totalFats = 0
    let totalProteins = 0;
    if(this.state.contentToDisplay) {
      for (let i = 0; i < this.state.foodInfos.length; i++) {
        let amt = this.state.foodAmounts[i]
        totalCalories += (parseFloat(this.state.foodInfos[i]['nutritionInfo']['calories']) * amt)
        let carbs = this.state.foodInfos[i]['nutritionInfo']['totalCarbohydrate']['val']
        totalCarbs += (parseFloat(carbs.substring(0, carbs.length-1)) * amt)
        let fats = this.state.foodInfos[i]['nutritionInfo']['totalFat']['val']
        totalFats += (parseFloat(fats.substring(0, fats.length-1)) * amt)
        let proteins = this.state.foodInfos[i]['nutritionInfo']['protein']
        totalProteins += (parseFloat(proteins.substring(0, proteins.length-1)) * amt)
      }
    }

    if (!this.state.contentToDisplay) {
        return(
          <View>
            <TopBar/>
            <Text style={{fontWeight: 'bold', fontSize: 30, textAlign: 'center', paddingTop: 10}}>No items selected</Text>
          </View>
        )
    }

    return (

      <View>
        <TopBar/>
        <ScrollView showsVerticalScrollIndicator={true} contentContainerStyle={{paddingBottom: 100}}>
          <View style={{flexDirection: 'column', justifyContent: 'center', padding: 20}}>
            <Text style={{fontSize: 30, fontWeight: 'bold'}}>Meal Summary</Text>
            <View style={{flexDirection: 'row', paddingTop: 10}}>
              <View style={{flex: 4, justifyContent: 'center', alignItems: 'center'}}>
                <View style={{backgroundColor: 'black', borderRadius: 25, width: 35, height: 35, justifyContent: 'center', alignItems: 'center'}}>
                  <Ionicons name='ios-flame' size={30} color='red' />
                </View>
                <Text style={{fontWeight: 'bold', paddingTop: 5}}>Calories</Text>
                <Text>{this.roundToTwo(totalCalories)} cal</Text>
              </View>
              <MealSummaryPiece name={'Carbs'} value={this.roundToTwo(totalCarbs)} shorthand={'C'} color={'blue'} />
              <MealSummaryPiece name={'Fats'} value={this.roundToTwo(totalFats)} shorthand={'F'} color={'green'} />
              <MealSummaryPiece name={'Proteins'} value={this.roundToTwo(totalProteins)} shorthand={'P'} color={'orange'} />
            </View>
          </View>
          <View style={{flexDirection: 'row', paddingLeft: 20}}>
            <Text style={{fontSize: 30, fontWeight: 'bold'}}>Nutritional Info</Text>
          </View>
          <View style={styles.descriptionContainer}>
            <View style={{maxHeight: 540}}>
              <Carousel
                ref={(c) => { this._carousel = c; }}
                data={this.state.foodInfos}
                renderItem={this._renderItem}
                sliderWidth={Dimensions.get('window').width-30}
                itemWidth={Dimensions.get('window').width-30}
                onSnapToItem={(index) => this.setState({ activeSlide: index })}
              />
              <Pagination
                dotsLength={this.state.foodInfos.length}
                activeDotIndex={this.state.activeSlide}
                dotStyle={{
                    width: 15,
                    height: 15,
                    borderRadius: 10,
                    marginHorizontal: 4,
                    backgroundColor: 'rgba(0, 0, 0, 0.75)'
                }}
                inactiveDotOpacity={0.4}
                inactiveDotScale={0.6}
                tappableDots={true}
                carouselRef={this._carousel}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  descriptionContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5
  },
});

export default NutritionInfo;