// models/restaurant.js
const mongoose = require('../config/database')
const { Schema } = mongoose

const recipeSchema = new Schema({
  title: { type: String, required: true },
  summary: { type: String, required: true },
  photo: { type: String, default: 'http://via.placeholder.com/500x180?text=No%20Image' },
  cookingTime: { type: Number, required: false }, // in minutes
  ingredients: [{
    amount: { type: String, required: false },
    name: { type: String, required: true },
    optional: { type: Boolean, required: true, 'default': false }
  }],
  cookingSteps: [{
    cookingTime: { type: Number, required: false }, // in minutes
    title: { type: String, required: false },
    description: { type: String, required: true }
  }],
  likedBy: [{ type: Schema.Types.ObjectId, ref: 'users' }],
  authorId: { type: Schema.Types.ObjectId, ref: 'users' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
})

const reviewSchema = new Schema({
  rating: { type: String, required: true },
  title: { type: String, required: true },
  remark: { type: String, required: true },
  cheapEats: { type: Boolean, default: false },
  midRange: { type: Boolean, default: false },
  fineDining: { type: Boolean, default: false },
  authorId: { type: Schema.Types.ObjectId, ref: 'users' },
  createdAt: { type: Date, default: new Date() },
  updatedAt: { type: Date, default: new Date() },
})

const restaurantSchema = new Schema({
  name: { type: String, required: true},
  address: { type: String, required: true},
  phone: { type: String, required: false },
  website: { type: String, required: false },
  geometryLocation: [{
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
  }],
  photo: { type: String, required: false, default: 'http://via.placeholder.com/500x180?text=No%20Image' },
  review: [reviewSchema],
  recipes: [recipeSchema],
  ranking: { type: Number },
  lunch: { type: Boolean, default: false },
  dinner: { type: Boolean, default: false },
  cafe: { type: Boolean, default: false },
  dessert: { type: Boolean, default: false },
  breakfast: { type: Boolean, default: false },
  vegetarian: { type: Boolean, default: false },
  vegan: { type: Boolean, default: false },
  halal: { type: Boolean, default: false },
  glutenFree: { type: Boolean, default: false },
  likedBy: [{ type: Schema.Types.ObjectId, ref: 'users' }],
  authorId: { type: Schema.Types.ObjectId, ref: 'users' },
  createdAt: { type: Date, default: new Date() },
  updatedAt: { type: Date, default: new Date() },
})

module.exports = mongoose.model('restaurants', restaurantSchema)
