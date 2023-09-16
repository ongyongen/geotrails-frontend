# Geotrails Frontend
This is the frontend for a Singapore based geocaching platform. Read more about it <a href="https://docs.google.com/presentation/d/1yEqSQ3rS5NhXwLe5_6I8wf7FZG98jVrbEIJTPvPHcYU/edit?usp=sharing">here</a> 

The aim of this platform is to:
- Help geocachers in Singapore plan for, manage and organize their geocaching trips
- Provide geocachers with access to advanced search and filtering criteria for geocaches in Singapore
- Provide geocachers with a comprehensive dashboard showcasing analytics of past geocaches found

# Tech Stack and Libraries Used
- React + Typescript
- Bootstrap
- Styled Components
- Mapbox GL JS

# Overall architecture
The frontend of this platform is deployed to an S3 bucket with a cloudfront configuration. The frontend calls backend APIs deployed
into EC2 instances spun up using ECS. These resources are provisioned and managed using Terraform. <br></br>
<img width="573" alt="Screenshot 2023-09-16 at 12 14 28 PM" src="https://github.com/ongyongen/geotrails-frontend/assets/97529863/7d214699-910f-4040-886e-7442c2149829">


# Installation Guide
- Clone this repo locally
- Run `npm install` to install the required libraries
- Run `npm start` to launch the app

#### .env file
`REACT_APP_MAPBOX_TOKEN=REACT_APP_MAPBOX_TOKEN`<br></br>
`DOCKERHUB_USERNAME=DOCKERHUB_USERNAME` <br></br>
`DOCKERHUB_ACCESS_TOKEN=DOCKERHUB_ACCESS_TOKEN` <br></br>
`PATH_TO_FRONTEND_FOLDER=PATH_TO_FRONTEND_FOLDER` <br></br>
`PATH_TO_BACKEND_FOLDER=PATH_TO_BACKEND_FOLDER` <br></br>

# Available Scripts

In the project directory, you can run:

`npm start`

Runs the app in the development mode.
Open http://localhost:3000 to view it in your browser.

The page will reload when you make changes.
You may also see any lint errors in the console.

`npm test`

Launches the test runner in the interactive watch mode.
See the section about running tests for more information.

`npm run build`

Builds the app for production to the build folder.
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.
Your app is ready to be deployed!

See the section about deployment for more information.

`npm run eject`

Note: this is a one-way operation. Once you eject, you can't go back!

If you aren't satisfied with the build tool and configuration choices, you can eject at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except eject will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use eject. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.
