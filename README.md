# React frontend for our URL Shortner and File uploader

## Goal
<p>The goal of this project is to provide user with an option to shorten the URL of the websites they visit daily by giving them a name. Once the user clicks on the name they are redirected to the website. This application will act as a vault of short URLs and just like a bookmark on a browser allows them to save URLs. In addition to this the users can also provide a short URL for their files i.e. they can upload a file on the application and have a short URL for that as well. This way they can share the files to other users and have all their files in one place just like drop box.</p>

## Requirements

<p>This application will require a user authentication to allow the user to have the data specific to only that user. The application will make use of AWS amplify for user authentication.</p>

## Technologies Used

<ol>
<li>React</li>
<li>AWS Amplify (For user Authentication)</li>
<li>Flask</li>
<li>AWS EKS</li>
<li>Grafana- To monitor our EKS cluster</li>
</ol>

## Folder structure for the project

```bash
│   .dockerignore                              # All the files to be ignored in our docker build process
│   .gitignore                                 # The gitignore file
│   .travis.yml                                # Specifies the desired building and testing environment for Travis CI
│   Dockerfile
│   package-lock.json
│   package.json                               # File specifying the node packages required for the project
│   README.md                                  # The file you are reading.
│   │
│   └───static                                 # Has all the static files required to run our application
│
├───public                                     # Has all the public files such as main index.html etc. 
│
└───src                                        # The main folder all our javascript code to run our React js app
        App.js                                 # The main javascript file that gets rendered in index.js
        fileshortner.js                        # The javascript file that shows the File upload part of the app
        index.js                               # The main javascript file acts as the entry point for our React app
        messages.js                            # The javascript file that shows the sucess and error messages                      
        showFileURL.js                         # The javascript file that shows the files uploaded by user so far
        showUrl.js                             # Renders the URL's stored by user so far
        urlShortner.js                         # Renders the URL shortner part of the application
```

## Steps to Run the application

1. Clone the repository on your local machine or download the zip folder.
2. Open the downloaded or cloned repo in your favourite editor and run the below command
    ```js
    npm i
    ```
    This will install all the packages successfully on your machine.

### Setting up AWS Amplify for user authentication
3. Install the aws amplify node package using the following command (in case you want to create a new React project. not needed for this one)
    ```js
    npm install -g @aws-amplify/cli
    ```
    ![AWS NODE PACKAGE](https://github.com/rahulh25/screenshots/blob/master/frontend/aws_amplify_package.png)<br>
4. Now we will configure our aws amplify. Run the following command:
    ```js
    amplify configure
    ```
    ![AMPLIFY CONFIGURE](https://github.com/rahulh25/screenshots/blob/master/frontend/aws_amplify_setup.png)<br>
    This will ask you for a region and whether you want to create a user. You can select your options here. Once you setup a user you will taken to the aws management console IAM where you will add a user and in the end of the step you will be provided with a <i>access_key</i> and <i>secret_access_key</i>. Make sure to save them. In the next step you need to enter the values.<br>
    ![ACCESS KEY](https://github.com/rahulh25/screenshots/blob/master/frontend/access_key.png)<br>
5. Next we will setup AWS amplify for our app. Run the following command to setup amplify for your project(Make sure you have a AWS account)
    ```js
    amplify init
    ```
    <i>This asks you a bunch of options (Fill them as shown below. Although the profile name can be of your choice.)</i><br>
    ![AMPLIFY INIT](https://github.com/rahulh25/screenshots/blob/master/frontend/amplify_init.png)<br>  
6. Install the amplify react packages using the following command
    ```js
    npm install aws-amplify aws-amplify-react
    ```
7. Now we will setup authentication using AWS Amplify. Run the following command:
    ```js
    amplify add auth
    ```
    <i>Enter the options as shown below</i><br>
    ![AMPLIFY ADD AUTH](https://github.com/rahulh25/screenshots/blob/master/frontend/add_auth.png)<br>
8. Push the changes to AWS amplify using the following command:
    ```js
    amplify push
    ```
    ![AMPLIFY PUSH](https://github.com/rahulh25/screenshots/blob/master/frontend/amplify_push.png)<br>
9. In the end run the following command to see your UI running on the localhost
    ```
    npm start
    ```
    This should bring up your React app on localhost port 3000 and you can see the Amplify login page
    ![REACT APP](https://github.com/rahulh25/screenshots/blob/master/frontend/react_app.png)<br>