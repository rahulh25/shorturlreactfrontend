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
3. Install the aws amplify node package using the following command
    ```js
    npm install -g @aws-amplify/cli
    ```
    ![AWS NODE PACKAGE](https://github.com/rahulh25/screenshots/blob/master/frontend/aws_amplify_package.png)
4. Next we will setup AWS amplify for our app.Run the following command to setup amplify for your project(Make sure you have a AWS account)
    ```js
    amplify init
    ```