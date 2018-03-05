# Express restaurants API

RESTful Express API for foodie-app on top of MongoDB.

**Note: this api is work-in-progress, I've just started building this foodie-react-app on 28th Feb.**

## Authentication

Create a User with the following attributes:

| Attribute | Type   | Description   |
|-----------|--------|---------------|
| name      | string | Full name     |
| email     | string | Email address |
| password  | string | Password      |

Use the following endpoints to deal with initial authentication and the user.

| HTTP Verb | Path        | Description |
|-----------|-------------|--------------|
| `POST`    | `/users`    | Create a user account |
| `POST`    | `/sessions` | Log in with email and password, and retrieve a JWT token |
| `GET`     | `/users/me` | Retrieve own user data |

To authorize further requests, use Bearer authentication with the provided JWT token:

```
Authorization: Bearer <token here>
```

_**Note**: See `db/seed.js` for an example._

## restaurants

**Note:** See `models/restaurant.js` for the Restaurant schema attributes.

| HTTP Verb | Path | Description |
|-----------|------|--------------|
| `GET` | `/restaurants` | Retrieve all restaurants |
| `POST` | `/restaurants` | Create a restaurant* |
| `GET` | `/restaurants/:id` | Retrieve a single restaurant by it's `id` |
| `PUT` | `/restaurants/:id` | Update a restaurant with a specific `id`* |
| `PATCH` | `/restaurants/:id` | Patch (partial update) a restaurant with a specific `id`* |
| `DELETE` | `/restaurants/:id` | Destroy a single restaurant by it's `id`* |
| | | _* Needs authentication_ |

_**Note**: Run `yarn run seed` to seed some initial restaurants._
