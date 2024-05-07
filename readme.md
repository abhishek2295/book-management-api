Book Management API
This repository contains a simple book management API developed using Node.js. The API offers various functionalities including user authentication, CRUD operations for managing book entries, filtering books by author or publication year, clear documentation of API endpoints and their usage, and implementation of basic security measures like input validation.

Installation
To set up and run the API locally, follow these steps:

Clone this repository to your local machine:

git clone <repository_url>

Navigate to the project directory:

cd book-management-api

Install dependencies:

npm install

Set up environment variables:
Create a .env file in the root directory of the project.
Add the following variables to the .env file:

Copy code

PORT=3000
DB_HOST=<your_database_host>
DB_USERNAME=<your_database_username>
DB_PASSWORD=<your_database_password>
DB_DATABASE=<your_database_name>
JWT_SECRET=<your_jwt_secret>

Running the API
Once the installation is complete and environment variables are set up, you can run the API using the following command:

npm start
