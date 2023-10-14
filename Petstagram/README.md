# Steps for build the project:

1. Initialize project 
    - npm init--y
    - add src folder and index.js
2. Setup dev environment
    - install nodemon -D
3. Install and setup express
    - add static middleware
    - add body parser - urlencoded
    - add routes file
4. Add static resources
5. Add views folder with resources
6. Add express-handlebars view engine
    - install express-handlebars
    - add to express
    - config extension
    - config views folder
    - add main layout
    - render home page and fix path in home.hbs
    - fix navigation to home page
    - fix static paths
7. Add controllers folder with home controller
8. Create congig folder with constants file
9. Add DB
    - install mongoose
    - connect to DB
10. Authentication
    - add user controller
    - add controller to routes
    - fix header navigation to login, register and logout
    - render login page
    - render register page
11. Add user model
    - add unique index for username
    - validate password and repeat password
12. Edit login and register forms
13. Add post actions for login and register
14. Add user services
    - require user in userController
    - add register methods
    - add login methods
    - validate if user exists
15. Hash password
    - install bcrypt
    - make hash password
16. Login
    - find user by username
    - validate hash password
17. Generate jsonwebtoken
    - install jsonwebtoken
    - promisify jwt
    - create secret
    - generate token in services login
18. Return token in cookie
    - install cookie-parser
    - config cookie-parser
    - set cookie with token
19. Logout
20. Authentication middleware
    - create base middleware
    - use middleware
    - implement auth middleware
    - attach decoded token to request
    - handle invalid token
21. Authorization middleware
22. Add dynamic navigation bar
    - add conditional in main layout
    - add isAuthenticated property in res.locals
23. Error handler
    - add 404 page
    - redirect missing route to 404 page