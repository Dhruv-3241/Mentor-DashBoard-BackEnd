# MentorDash Backend

## Folder Structure

### Controller
This folder contains all the logic for handling requests and responses. Each file in this folder corresponds to a specific entity in the application.

#### DB
This file/folder contains all the database related operations like connecting to the database, defining schemas, and performing CRUD operations.

##### Functions

`update(filter, data, collection)`: This function is used to update a document in a specific MongoDB collection. It takes three parameters:

`filter`: This is an object that defines the conditions for the document that you want to update.
`data`: This is an object that contains the new data that you want to set in the document.
`collection`: This is the name of the collection where the document is located. The $set operator replaces the value of a field with the specified value.
`updatePush(filter, data, collection`): This function is used to add an item to an array field in a document in a specific MongoDB collection. It takes the same parameters as the update function. The $push operator appends a specified value to an array.

`updatePull(filter, data, collection)`: This function is used to remove an item from an array field in a document in a specific MongoDB collection. It takes the same parameters as the update function. The $pull operator removes all instances of a value from an existing array.

All these functions return a Promise that resolves to an UpdateOneResult object. This object contains information about the result of the operation, such as the number of documents that were matched and modified.

#### Student
This file/folder is responsible for handling all the operations related to students. It may include functions for creating a new student, fetching student details, updating student information, and deleting a student.

### Routes
This folder contains all the route definitions for the application. Each file in this folder corresponds to a specific entity and defines routes for handling different operations on that entity.

## Functions
Each function in the controller files is responsible for handling a specific operation. For example, a function might handle creating a new student, fetching student details, updating student information, or deleting a student.

## Routes
Routes define the endpoints of the application. Each route is associated with a specific function in the controller files. When a request is made to a specific route, the corresponding function is called to handle the request and send a response.

## Getting Started
To get started with this project, clone the repository and install the dependencies.

```bash
git clone <repository_url>
cd <repository_name>
npm install