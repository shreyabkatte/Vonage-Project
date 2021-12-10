## Clone the repository

As a first step clone the repository annd follow the instructions

### `git clone https://github.com/shreyabkatte/Vonage-Project.git`

## Install the dependencies in both Client and Servier applications

cd Client

### `npm install`

cd Server

### `npm install`

## Create your own .env file and add environment variables for Server App

Configuration is as follows:

| Environment Variable | Required? | Description                                                                                   |
| -------------------- | --------- | --------------------------------------------------------------------------------------------- |
| API_KEY              | Yes       | Your Vonage API key (Get from the [Nexmo Dashboard](https://dashboard.nexmo.com/settings))    |
| API_SECRET           | Yes       | Your Vonage API secret (Get from the [Nexmo Dashboard](https://dashboard.nexmo.com/settings)) |
| APPLICATION_ID       | Yes       | The id generated when you created your Vonage application.                                    |
| PRIVATE_KEY          | Yes       | The key generated when you created your Vonage application.                                   |

## Start the Server and Client Applications

cd Server

### node index.js

cd Client

## npm start
