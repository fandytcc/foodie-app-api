// models/restaurant.js
const mongoose = require('../config/database')
const { Schema } = mongoose
// const SchemeTypes = mongoose.Schema.Types

// const recipeSchema = new Schema({
//   title: { type: String, required: true },
//   summary: { type: String, required: true },
//   photo: { type: String, default: 'http://via.placeholder.com/500x180?text=No%20Image' },
//   cookingTime: { type: Number, required: false }, // in minutes
//   ingredients: [{
//     amount: { type: String, required: false },
//     name: { type: String, required: true },
//     optional: { type: Boolean, required: true, 'default': false }
//   }],
//   cookingSteps: [{
//     cookingTime: { type: Number, required: false }, // in minutes
//     title: { type: String, required: false },
//     description: { type: String, required: true }
//   }],
//   likedBy: [{ type: Schema.Types.ObjectId, ref: 'users' }],
//   authorId: { type: Schema.Types.ObjectId, ref: 'users' },
//   createdAt: { type: Date, default: Date.now },
//   updatedAt: { type: Date, default: Date.now }
// })

const reviewSchema = new Schema({
  title: { type: String, required: true },
  remark: { type: String, required: true },
  overallRating: { type: Number, required: true, min: 0, max: 5 },
  serviceRating: { type: Number, required: true, min: 0, max: 5 },
  foodRating: { type: Number, required: true, min: 0, max: 5 },
  valueRating: { type: Number, required: true, min: 0, max: 5 },
  dishes:[{
    name: { type: String },
  }],
  authorId: { type: Schema.Types.ObjectId, ref: 'users' },
  createdAt: { type: Date, default: new Date() },
  updatedAt: { type: Date, default: new Date() },
})

const restaurantSchema = new Schema({
  name: { type: String, required: true},
  summary: { type: String, required: true },
  phone: { type: String, required: false },
  url: { type: String, required: false },
  location: {
    address: { type: String, required: true },
    postalCode: { type: String, required: true },
    district: { type: String, required: false },
    city: { type: String, required: false },
    country: { type: String, required: true },
    geo: {
      type: [Number],
      index: '2d'
    }
  },
  photos: [{
    url: { type: String, required: false, default: 'http://via.placeholder.com/500x180?text=No%20Image' },
    createdAt: { type: Date, default: new Date() },
  }],
  price: {
    cheapEats: { type: Boolean, default: false },
    midRange: { type: Boolean, default: false },
    fineDining: { type: Boolean, default: false },
  },
  types: {
    breakfast: { type: Boolean, default: false },
    lunch: { type: Boolean, default: false },
    dinner: { type: Boolean, default: false },
    cafe: { type: Boolean, default: false },
    dessert: { type: Boolean, default: false },
  },
  dietaryType: {
    vegetarian: { type: Boolean, default: false },
    vegan: { type: Boolean, default: false },
    halal: { type: Boolean, default: false },
    glutenFree: { type: Boolean, default: false },
  },
  avgRating: { type: Number, min: 0, max: 5 },
  reviews: [reviewSchema],
  // recipes: [recipeSchema],
  likedBy: [{ type: Schema.Types.ObjectId, ref: 'users' }],
  authorId: { type: Schema.Types.ObjectId, ref: 'users' },
  createdAt: { type: Date, default: new Date() },
  updatedAt: { type: Date, default: new Date() },
})

module.exports = mongoose.model('restaurants', restaurantSchema)
