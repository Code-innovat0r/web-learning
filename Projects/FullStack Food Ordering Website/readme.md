'''
## for the frontend

1. npm create vite@latest
2. npm i
3. npm install react-router-dom axios

# for the tailwind css
4. npm install -D tailwindcss postcss autoprefixer
5. npx tailwindcss init -p

'''

'''
## For the backend we need these modules

6. npm i express mongoose jsonwebtoken bcrypt cors dotenv body-parser multer strip validator nodemon

express -> is a framework for the backend 
mongoose -> help you to connect with database
jdonwebtoken -> help you to create authentication system 
bcrypt -> help you to incript the user data and store in database
cors -> using it we can give permission to frontend to connect with backend
dotenv -> help to use a variable across the project defined in it
body-parser -> using this we can parse the data coming from the user
multer -> help you create image store system 
strip -> using this we can add payment gateway 
validator -> we can check password or email address is valid or not
nodemon -> on every change and save it automatically restarts the server

'''

'''
## In the admin folder

7. npm create vite@latest
8. npm i
9. npm i axios react-toastify react-router-dom 

axios -> we can create the network request like get, post, delete etc
react-toastify -> we can show the message and notifications
react-router-dom -> it allow you to display the pages and allow user to navigate them
'''


'''
Make sure you start the server of frontend panel and then the admin panel or backend panel..
Reason is:
        in backend at ordercontrollers I am using the frontend panel address to direct to verification page. and address is 'http://localhost:5173/', if you start the admin panel first it will take this location and then frontend panel will shift to the 'http://localhost:5174/' location that you need to change in the backend if you want to do so..
'''