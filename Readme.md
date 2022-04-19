Adventure Wish List! 

A place to add info for other travellers and learn about destinations. 
Add your favourite places to your own wish list & tick them off when you've been! 

- Some computer generated holidays, then clients can add their own too. 
- All holidays are fetched and shown to the user on log in. 
- The holidays can be saved to the users favourites to be viewed on a seperate page. 
- The user can add their own advice to be shown to everyone. 

- Destination
- Pictures
- Hotels
- Things you can do
- Flight Time 
- When to go

# Make Fire Base Log In

- Toggle between Sign Up & Sign in
- Have Google Sign up on the Sign in toggle. 

Then once signed in go to Dashboard. 

-- Look at using UseContext hook so the Token & Uid is accessible throughout the app! 

# Create a login page
- Allow users to log in with Google or email / password 
- Once logged in go to home page. 

- Add forgotten password link
- Add sign up link
- Add go to login from Sign up page. 

# Create a home page

- Display 3 holidays from my database on the back end,
     use responsive grid format
     display cards
- Create a search to find a specfic holiday
- Allow the user to add this holiday to their 'saved' holidays
- Allow the user to create their own holiday 

# Things I've learned

- When deploying to Netlify, put the folder root in the base and then the folder/build in the publish box! 
e.g Base: firebase-text 
    Publish: firebase-test/build

- When using .env, Netlify can't access these through git hub so you need to put them into Netlify directly! 

- REMEMBER to tell your start/dev script to look in the dotenv/config for the .env file so it can connect to the database!! 

- REMEMBER you need app.use(express.json()) in your server to be able to read the body & the key values must match the values declared in your models folder. 


MONOREPO, 
DEPLOYING HEROKU VIA CLI 

login to Heroku 
create the remote repo in the root, as directed in the set up
git remote -a [firebase-app-name]
Then if there is a sub domain push to that domain using the subtree
git subtree push --prefix firebase-test-backend heroku main
... specify the subfolder you want to push to the remote

- check the config variables (connection variables), these need adding into Heroku. 
- Use environment variables. 
- check the logs Heroku logs -t
- On this occasion the port also needed changing to an environment variable given by express /Heroku? 



