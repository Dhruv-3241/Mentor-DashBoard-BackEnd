# MentorDash Backend

## Folder Structure

### Controller
This folder contains all the logic for handling requests and responses. Each file in this folder corresponds to a specific entity in the application.

#### DB
This file/folder contains all the database related operations like connecting to the database, defining schemas, and performing CRUD operations.

##### Functions



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