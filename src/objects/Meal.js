import moment from 'moment'

export default class Meal {
  constructor(foods=[], diningHall) {
      this.foods = foods
      this.diningHall = diningHall
      this.items = {}
      for(let food of foods) {
        //console.log(food)
        this.items[food.foodName] = food.quantity
      }
      this.timestamp = moment()
      let hour = moment().hour()
      if (hour >= 5 && hour <= 11)
        this.type = "Breakfast"
      else if (hour > 11 && hour <= 15)
        this.type = "Lunch"
      else if (hour > 15 && hour <= 17)
        this.type = "Snack"
      else if (hour > 17 && hour <= 23)
        this.type = "Dinner"
      else
        this.type = "Midnight Snack"
  }
  get calories() {
    return this.foods.reduce((accum, food) => accum + parseInt(food.calories) * food.quantity, 0)
  }
  get protein() {
    return this.foods.reduce((accum, food) => accum + parseInt(food.protein) * food.quantity, 0)
  }
  get carbs() {
    return this.foods.reduce((accum, food) => accum + parseInt(food.totalCarbohydrate.val) * food.quantity, 0)
  }
  get fat() {
    return this.foods.reduce((accum, food) => accum + parseInt(food.totalFat.val) * food.quantity, 0)
  }

  static parse(obj) {
    let meal = Object.assign(new Meal(), obj)
    meal.timestamp = moment(obj.timestamp)
    return meal
  }
}
