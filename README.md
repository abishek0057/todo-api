# todo-api
Simple API for todo list created using ExpressJS and MongoDB  
The Todo API allows you to manage your todo list by performing CRUD (Create, Read, Update, Delete) operations.
## Endpoints
| **Endpoint**     | **Method** | **Description**              | **Request Body**                   | **Response**          |
|------------------|------------|------------------------------|------------------------------------|-----------------------|
|'/api/signup'     | POST       | Registers a new user         | name,<br>email,<br>,password| Create User|
|'/api/login'      | POST       | Authenticates a user and generates an access token.| email,<br>,password| Create access token|
|'/api/current'    | POST       | Returns the current user based on the access token.| None| Show email of current user|
| '/api/todos'     | POST       | Create a new todo            | title,<br>description,<br>priority | Create todo          |
| '/api/todos'     | GET        | Get all todos                | None                               | List of todos         |
| '/api/todos/:id' | GET        | Get a specific todo by ID    | None                               | Todo with matching ID |
| '/api/todos/:id' | PUT        | Update a specific todo by ID | title,<br>description,<br>priority | Updated todo          |
| '/api/todos/:id' | DELETE     | Delete a specific todo by ID | None                               | Deleted todo          |

## Environment Variables
The Todo API uses environment variables for configuration. To set up the environment variables, create a `.env` file in the root folder of the project with the following variables:
```
CON_URL=<db_connection string>
PORT=<port number>
ACCESS_TOKEN_SECRET=<JWT_secret string>
```
## Authentication Header
To access the endpoints of the Todo API, you need to include a JSON Web Token (JWT) in the **Authorization** header of your requests.

The ***'Authorization'*** header should have the following format:
```
Authorization: Bearer <JWT>
```
Please replace &lt;JWT&gt; with the actual value of the JWT that you obtained during the authentication process.
