# Steps for build the project:

1. Initialize project 
    - npm init--y
    - add src folder and index.js
2. Setup dev environment
    - npm install nodemon -D
3. Install and setup express
    - add static middleware
    - add body parser - urlencoded
    - add routes file
4. Add static resources
5. Add views folder with resources
6. Add express-handlebars view engine
    - npm install express-handlebars
    - add to express
    - config extension
    - config views folder
    - add main layout
    - render home page and fix path in home.hbs
    - fix static paths
7. Add controllers folder with home controller
8. Add DB
    - install mongoose
    - connect to DB