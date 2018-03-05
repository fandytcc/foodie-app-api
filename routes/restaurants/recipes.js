// routes/restaurants/recipes.js
const router = require('express').Router()
const passport = require('../../config/auth')
const { Recipe, Restaurant } = require('../../models')

const authenticate = passport.authorize('jwt', { session: false })

const loadRestaurant = (req, res, next) => {
  const id = req.params.id

  Restaurant.findById(id)
    .then((restaurant) => {
      req.restaurant = restaurant
      next()
    })
    .catch((error) => next(error))
}

router
    .get('/restaurants/:id/recipes', loadRestaurant, (req, res, next) => {
      if (!req.restaurant) { return next() }
      res.json(req.recipes.sort({ createdAt: -1 }))
    })

    .get('/restaurants/:id/recipes/:recipeId', loadRestaurant, (req, res, next) => {
      if (!req.restaurant) { return next() }
      const recipeId = req.params.recipeId

      const recipe = req.restaurant.recipes.filter(recipe => {
        return (recipe._id.toString() === recipeId.toString())
      })[0]

      res.json(recipe)
    })

    .post('/restaurants/:id/recipes', authenticate, loadRestaurant, (req, res, next) => {
      if (!req.restaurant) { return next() }
      let newRecipe = req.body

      const defaultEvaluation = {
        code: "W",
        remark: "No remarks yet",
        evaluatedAt: new Date(),
      }
      newRecipe = { ...newRecipe, evaluations: defaultEvaluation }
      newRecipe.authorId = req.account._id
      // req.restaurant.recipes.push(newRecipe)
      const recipes = req.restaurant.recipes.concat(newRecipe).sort({ createdAt: -1 })

      req.restaurant.recipes = recipes

      req.restaurant.save()
        .then((restaurant) => {
          req.restaurant = restaurant
          next()
        })
        .catch((error) => next(error))
    },
    // Respond with new recipe data in JSON
    (req, res, next) => {
      res.json(req.restaurant)
    })

    .patch('/restaurants/:id/recipes/:recipeId', authenticate, loadRestaurant, (req, res, next) => {
     if (!req.restaurant) { return next() }
     const recipeUpdates = req.body
     const recipeId = req.params.recipeId

     recipeUpdates.authorId = req.account._id

     const recipes = req.restaurant.recipes.map(recipe => {
       if (recipe._id.toString() === recipeId.toString()) {
         recipe.evaluations = recipe.evaluations.concat([recipeUpdates])
       }

       return recipe
     })

     req.restaurant.recipes = recipes

     req.restaurant.save()
       .then((restaurant) => {
         req.restaurant = restaurant
       })
       .catch((error) => next(error))
       res.json(req.restaurant)
    })

    .delete('/restaurants/:id/recipes/:recipeId', authenticate, loadRestaurant, (req, res, next) => {
      if (!req.restaurant) { return next() }

      const recipeId = req.params.recipeId
      const recipes = req.restaurant.recipes.filter(recipe => {
        return (recipe._id.toString() !== recipeId.toString())
      })

      req.restaurant.recipes = recipes

      req.restaurant.save()
        .then((restaurant) => {
          req.restaurant = restaurant
          next()
        })
        .catch((error) => next(error))
      },
      (req, res, next) => {
        res.json(req.restaurant)
    })

module.exports = router
