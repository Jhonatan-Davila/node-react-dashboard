# Simple Express API

This project is a simple Node-Express API with some basic functions, coupled with a ReactJS Dashboard.

# Tech Overview

* Node.js v10.15.3+
* NPM v6.4.1+
* Express
* TypeORM
* React+Redux
* MaterialUI
* Typescript
* PostgreSQL
* Headless Wordpress API
* Docker

# Basic Functions

* User session handling with Auth0 
* PostgreSQL database management with TypeORM 
* A simple Blog through Headless Wordpress API interaction
* React+Redux+Material UI Dashboard(WIP)
* Drag'n'Drop customizable Sidebar
* Dockerized services(React Dashboard, Express REST API, PostgreSQL Database and Wordpress API)

## How to run

### Docker 

1. Download and install Docker on your machine.

2. Execute the following commands on the project's root folder:

	```
	docker-compose up --build
	```
    
	The client server will be started on `http://<your virtual machine address OR localhost>:3000/` 
    and the Express server will be on `http://<your virtual machine address OR localhost>:8080/`

	To stop the services, or in case you want to rerun migrations, use:
	```
	docker-compose down
	```
    And to bring it back up:
    ```
	docker-compose up
	```
# Screenshots
![](https://github.com/mariofonteles/simple-node-api/blob/master/Capturar.PNG?raw=true)
    
