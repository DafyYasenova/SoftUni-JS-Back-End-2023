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
    - add error message extractor
24. Show error notification
    - add error container to main layout
    - show error container conditionally
    - pass error to render
25. Automatically login after register (optional)
26. Add photo model
27. Add folder photos in views with create file
28. Add create page 'add photo'
    - modify create.hbs
    - add method 'POST' in the form
    - add name atributes in the form
    - fix addPhoto path in main.hbs 
29. Add photoController
    - import photoController in routes and use 
30. Modify catalog template and route in photoController
31. Create getAll method for populate data
32. Details page
    - conditionality for text area for post comments
33. Delete functionality
34. Edit page
35. Add comments to post
36. Create profile page
    - fix path in main layout
    - add route in the home controller
    - render profile page with current user data
37. Add validation in user and photo models
38. Routes guards in home and photo controllers
    - import and use isAuth middleware