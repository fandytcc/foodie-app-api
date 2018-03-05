// routes/restaurants.js
const router = require('express').Router()
const passport = require('../config/auth')
const { Restaurant } = require('../models')

const authenticate = passport.authorize('jwt', { session: false })

router.get('/restaurants', (req, res, next) => {
  // console.log('hi')
  Restaurant.find()
    // Newest restaurants first
    .sort({ createdAt: -1 })
    // Send the data in JSON format
    .then((restaurants) => res.json(restaurants))
    // Throw a 500 error if something goes wrong
    .catch((error) => next(error))
  })
  .get('/restaurants/:restaurantId', (req, res, next) => {
    const id = req.params.restaurantId
    // console.log('hi')
    Restaurant.findById(id)
      .then((restaurant) => {
        if (!restaurant) { return next() }
        res.json(restaurant)
      })
      .catch((error) => next(error))
  })
  .post('/restaurants', authenticate, (req, res, next) => {
    let newRestaurant = req.body //=payload

    Restaurant.create(newRestaurant)
      .then((restaurant) => {
        res.status = 201
        res.json(restaurant)
      })
      .catch((error) => next(error))
  })
  .put('/restaurants/:restaurantId', (req, res, next) => {
    const id = req.params.restaurantId
    let restaurantUpdates = req.body

    Restaurant.findOneAndUpdate(id, restaurantUpdates)
      .then((restaurant) => {
        if (!restaurant) { return next() }
        res.json(restaurant)
      })
      .catch((error) => next(error))
  })
  .patch('/restaurants/:restaurantId', (req, res, next) => {
    const id = req.params.restaurantId
    let restaurantUpdates = req.body

    // { $set: { recipe: recipeUpdates } }
    Restaurant.findOneAndUpdate(id, restaurantUpdates)
      .then((restaurant) => {
        if (!restaurant) { return next() }
        res.json(restaurant)
      })
      .catch((error) => next(error))
  })
  .delete('/restaurants/:restaurantId', (req, res, next) => {
    const id = req.params.restaurantId

    Restaurant.findOneAndRemove(id)
      .then((restaurant) => {
        if(!restaurant) return next()
        res.json(restaurant)
      })
      .catch((error) => next(error))
  })

module.exports = router
