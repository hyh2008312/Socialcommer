# Xberts web app

## Deployment

### Setup
  - Install heroku toolbelt
  - Login to heroku

        heroku login
  
  - Add heroku git remote
  
        git remote add staging https://git.heroku.com/xberts-web-staging.git
        git remote add prod https://git.heroku.com/xberts-mobile.git
        
  - Set default remote to staging
  
        git config heroku.remote staging
        
### Update staging server
  - Push update
  
        git push staging develop:master
        
### Update production server
  - Push update
  
        git push heroku master
        
## Build

Run `npm start` for building and `ng serve` for preview.

## Testing

Running `ng test` will run the unit tests with karma.
