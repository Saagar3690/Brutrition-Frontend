import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const LineItem = ({ content=[], subItem=false, bold=true }) => (
  <View style={[styles.lineItem, styles.topHr]}>
      <Text style={subItem ? [styles.indent, styles.leftColumn] : [bold && styles.bold, styles.leftColumn]}>{content[0]}</Text>
      <Text style={styles.middleColumn}>{content[1]}</Text>
      <Text style={[styles.rightColumn, styles.bold]}>{content[2]}</Text>
  </View>
)

const NutritionLabel = ({
    style,
    servingSize,
    calories,
    totalFat,
    totalFatPercent,
    saturatedFat,
    saturatedFatPercent,
    transFat,
    cholesterol,
    cholesterolPercent,
    sodium,
    sodiumPercent,
    totalCarbs,
    totalCarbsPercent,
    dietaryFiber,
    dietaryFiberPercent,
    sugars,
    protein,
    vitaminA,
    vitaminC,
    calcium,
    iron
}) => (
    <View style={[style, {borderColor: 'black', paddingLeft: 5, paddingRight: 5}]}>
        <Text style={[styles.title, styles.hr]}>Nutrition Facts</Text>
        <View style={[styles.lineItem, styles.thickestHr]}>
            <Text style={[styles.leftColumn, styles.bold]}>Serving size</Text>
            <Text style={styles.column}></Text>
            <Text style={[styles.rightColumn, styles.bold]}>{servingSize}</Text>
        </View>
        <Text style={[styles.bold, styles.smallText]}>Amount per serving</Text>
        <View style={[styles.lineItem, styles.calories, styles.midHr]}>
            <Text style={[styles.leftColumn, styles.bold, styles.title]}>Calories</Text>
            <Text style={styles.column}></Text>
            <Text style={[styles.rightColumn, styles.numCalories]}>{calories}</Text>
        </View>
        <Text style={[styles.bold, styles.smallText, { textAlign: 'right'}]}>% Daily Value*</Text>
        <LineItem content={['Total Fat', totalFat, totalFatPercent]} />
        <LineItem content={['Saturated Fat', saturatedFat, saturatedFatPercent]} subItem={true} />
        <LineItem content={['Trans Fat', transFat, '']} subItem={true} />
        <LineItem content={['Cholesterol', cholesterol, cholesterolPercent]} />
        <LineItem content={['Sodium', sodium, sodiumPercent]} />
        <LineItem content={['Total Carbohydrate', totalCarbs, totalCarbsPercent]} />
        <LineItem content={['Dietary Fiber', dietaryFiber, dietaryFiberPercent]} subItem={true} />
        <LineItem content={['Total Sugars', sugars, '']} subItem={true} />
        <LineItem content={['Protein', protein, '']} />
        <View style={styles.thickestHr} />
        <LineItem content={['Vitamin A', '', vitaminA]} bold={false} />
        <LineItem content={['Vitamin C', '', vitaminC]} bold={false} />
        <LineItem content={['Calcium', '', calcium]} bold={false} />
        <LineItem content={['Iron', '', iron]} bold={false} />
        <View style={styles.midHr} />
        <Text style={styles.smallText}>* The % Daily Value (DV) tells
            you how much a nutrient in a serving of food contributes
            to a daily diet. 2,000 calories a day is used for general nutrition advice.
        </Text>
    </View>
)

const styles = StyleSheet.create({
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        marginTop: -5
    },
    calories: {
        marginTop: -20
    },
    numCalories: {
        fontSize: 40,
        fontWeight: 'bold'
    },
    bold: {
        fontWeight: 'bold'
    },
    smallText: {
        fontSize: 10,
        paddingTop: 2,
        paddingBottom: 2
    },
    lineItem: {
        flexDirection: 'row',
        alignItems: 'flex-end'
    },
    leftColumn: {
        textAlign: 'left',
        marginRight: 4
    },
    middleColumn: {
        flex: 1,
        textAlign: 'left'
    },
    rightColumn: {
        flex: 1,
        textAlign: 'right'
    },
    indent: {
        marginLeft: 20
    },
    midHr: {
        borderBottomColor: 'black',
        borderBottomWidth: 5
    },
    thickestHr: {
        borderBottomColor: 'black',
        borderBottomWidth: 10
    },
    hr: {
        borderBottomColor: 'gray',
        borderBottomWidth: 1
    },
    topHr: {
        borderTopColor: 'gray',
        borderTopWidth: 1
    }
});

export default NutritionLabel;
