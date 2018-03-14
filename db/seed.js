const request = require('superagent')
const user = require('./fixtures/user.json')
const restaurants = require('./fixtures/restaurants.json')

const createUrl = (path) => {
  return `${process.env.HOST || `http://localhost:${process.env.PORT || 3030}`}${path}`
}

const createrestaurants = (token) => {
  return restaurants.map((restaurant) => {
    return request
      .post(createUrl('/restaurants'))
      .set('Authorization', `Bearer ${token}`)
      .send(restaurant)
      .then((res) => {
        console.log('Restaurant seeded...', res.body.name)
      })
      .catch((err) => {
        console.error('Error seeding restaurant!', err)
      })
  })
}

const authenticate = (email, password) => {
  request
    .post(createUrl('/sessions'))
    .send({ email, password })
    .then((res) => {
      console.log('Authenticated!')
      return createrestaurants(res.body.token)
    })
    .catch((err) => {
      console.error('Failed to authenticate!', err.message)
    })
}

request
  .post(createUrl('/users'))
  .send(user)
  .then((res) => {
    console.log('User created!')
    return authenticate(user.email, user.password)
  })
  .catch((err) => {
    console.error('Could not create user', err.message)
    console.log('Trying to continue...')
    authenticate(user.email, user.password)
  })
