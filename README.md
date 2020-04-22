# React frontend for our URL Shortner and File uploader

## Goal
<p>The goal of this project is to provide user with an option to shorten the URL of the websites they visit daily by giving them a name. Once the user clicks on the name they are redirected to the website. This application will act as a vault of short URLs and just like a bookmark on a browser allows them to save URLs. In addition to this the users can also provide a short URL for their files i.e. they can upload a file on the application and have a short URL for that as well. This way they can share the files to other users and have all their files in one place just like drop box.</p>

## Requirements

<p>This application will require a user authentication to allow the user to have the data specific to only that user. The application will make use of AWS amplify for user authentication.</p>

## Technologies Used

<ol>
<li>React</li>
<li>AWS Amplify (For user Authentication) <a href="https://docs.amplify.aws/start/q/integration/react">Official Doc</a></li>
<li>Flask- for our backend api <a href="https://github.com/rahulh25/shorturlflaskapi">More Info</a></li>
<li>AWS EKS- to deploy our cluster <a href="https://aws.amazon.com/eks/">Offical Doc</a></li>
<li>Grafana- To monitor our EKS cluster <a href="https://github.com/rahulh25/PrometheusandGrafanainEKS">How</a></li>
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

### Cloning the repository and adding all the node packages
1. Clone the repository on your local machine or download the zip folder.
2. Open the downloaded or cloned repo in your favourite editor and run the below command
    ```js
    npm i
    ```
    This will install all the packages successfully on your machine.

### Setting up AWS Amplify for user authentication
1. Install the aws amplify node package using the following command (in case you want to create a new React project. not needed for this one)
    ```js
    npm install -g @aws-amplify/cli
    ```
    ![AWS NODE PACKAGE](https://github.com/rahulh25/screenshots/blob/master/frontend/aws_amplify_package.png)<br>
2. Now we will configure our aws amplify. Run the following command (Make sure you a AWS account setup):
    ```js
    amplify configure
    ```
    ![AMPLIFY CONFIGURE](https://github.com/rahulh25/screenshots/blob/master/frontend/aws_amplify_setup.png)<br>
    This will ask you for a region and whether you want to create a user. You can select your options here. Once you setup a user you will taken to the aws management console IAM where you will add a user and in the end of the step you will be provided with a <i>access_key</i> and <i>secret_access_key</i>. Make sure to save them. In the next step you need to enter the values.<br>
    ![ACCESS KEY](https://github.com/rahulh25/screenshots/blob/master/frontend/access_key.png)<br>
3. Next we will setup AWS amplify for our app. Run the following command to setup amplify for your project(Make sure you have a AWS account)
    ```js
    amplify init
    ```
    <i>This asks you a bunch of options (Fill them as shown below. Although the profile name can be of your choice.)</i><br>
    ![AMPLIFY INIT](https://github.com/rahulh25/screenshots/blob/master/frontend/amplify_init.png)<br>  
4. Install the amplify react packages using the following command
    ```js
    npm install aws-amplify aws-amplify-react
    ```
5. Now we will setup authentication using AWS Amplify. Run the following command:
    ```js
    amplify add auth
    ```
    <i>Enter the options as shown below</i><br>
    ![AMPLIFY ADD AUTH](https://github.com/rahulh25/screenshots/blob/master/frontend/add_auth.png)<br>
6. Push the changes to AWS amplify using the following command:
    ```js
    amplify push
    ```
    ![AMPLIFY PUSH](https://github.com/rahulh25/screenshots/blob/master/frontend/amplify_push.png)<br>
7. In the end run the following command to see your UI running on the localhost
    ```
    npm start
    ```
    This should bring up your React app on localhost port 3000 and you can see the Amplify login page
    ![REACT APP](https://github.com/rahulh25/screenshots/blob/master/frontend/react_app.png)<br>
8. Once a user is registered they recieve an email on their registered email id giving them a code to verify their email
    ![EMAIL VERIFICATION](https://github.com/rahulh25/screenshots/blob/master/frontend/email_verification.png)<br>
    `Note:` Do remember to enter your email id in the username textfield of the registration page since you selected that as your verification method in step 5. If you do not enter email id it will give you a error saying that <p style="color:Red">The username should be 1 to 128 characters</p> long which is not the actual error.
9. Once the user has successfully verified their email they are added to our user pool. You can see it by loggin in to your AWS management console and searching for Cognito>Manage User Pools> Select your userpool.
    ![USER ADDED TO POOL](https://github.com/rahulh25/screenshots/blob/master/frontend/user_added_to_pool.png)<br>

### Building your react app.

1. You can build you react app using the following command:
    ```js
    npm run-script build
    ```
    This creates a build folder inside our main project with files as shown below:<br>
    ![BUILD FOLDER](https://github.com/rahulh25/screenshots/blob/master/frontend/build_image.png)<br>
    Since we will be using nginx to create a Docker image for our application we will place all the files in the build folder in the nginx html folder.

### Building our Docker image

1. After placing all the files from the above folder (the build process) in nginx run the following command to create a Docker image:
    ```bash
    docker build -f Dockerfile -t <your_image_name> .
    ```
2. You can check you docker image using the following command:
    ```bash
    docker images
    ```
3. Push the docker image to your Docker hub using the below command:
    ```bash
    docker push <your_image_name>
    ```
4. You can run your Docker image locally using the following command:
    ```bash
    docker run -d -p 3000:80 <your_image_name>
    ```
5. Go to the following URL to see your image running successfully:
    http:// 192.168.99.100:3000<br>
    ![DOCKER IMAGE RUNNING SUCCESSFULLY](https://github.com/rahulh25/screenshots/blob/master/frontend/docker_running.png)<br>

### Deploying our application in EKS

1. Use <a href="https://github.com/rahulh25/PrometheusandGrafanainEKS/blob/master/frontenddeploy.yaml"> this</a> yaml to create a deployment for our frontend and run the following command in your kubernetes cluster:
    ```bash
    kubectl apply -f .\frontenddeploy.yaml
    ```
2. Next create a kubernetes service using <a href="https://github.com/rahulh25/PrometheusandGrafanainEKS/blob/master/frontendservice.yaml"> this</a> yaml file and the following command:
    ```bash
    kubectl create -f .\frontendservice.yaml
    ```
3. Once you deployment and service files are created you can see your services using the following command:
    ```bash
    kubectl get svc -o wide
    ```
4. You can then traverse to the external ip on port 80 and see your application running there.<br>
    ![KUBERNETES COMMANDS](https://github.com/rahulh25/screenshots/blob/master/frontend/kubectl_frontend.png)<br>