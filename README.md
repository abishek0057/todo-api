# todo-api
Simple API for todo list created using ExpressJS and MongoDB  
The Todo API allows you to manage your todo list by performing CRUD (Create, Read, Update, Delete) operations.
## Endpoints
| **Endpoint**     | **Method** | **Description**              | **Request Body**                   | **Response**          |
|------------------|------------|------------------------------|------------------------------------|-----------------------|
| '/api/todos'     | POST       | Create a new todo            | title,<br>description,<br>priority | Created todo          |
| '/api/todos'     | GET        | Get all todos                | None                               | List of todos         |
| '/api/todos/:id' | GET        | Get a specific todo by ID    | None                               | Todo with matching ID |
| '/api/todos/:id' | PUT        | Update a specific todo by ID | title,<br>description,<br>priority | Updated todo          |
| '/api/todos/:id' | DELETE     | Delete a specific todo by ID | None                               | Deleted todo          |

## Environment Variables
The Todo API uses environment variables for configuration. To set up the environment variables, create a `.env` file in the root folder of the project with the following variables:
```
CON_URL=<db_connection string>
PORT=<port number>
```
