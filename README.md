# ION Organizer UI

### It`s simple inventory managment app.

## Installation

To install UI you need :

1. Check if you already have installed package manager, otherwise install it.

2. Clone this repository to your machine.

3. Run `npm install`(maybe you will need to use `sudo`);

---

**NOTE**

    By default ip for backend server is set to http://localhost:8080. You can change in .env file.

---

4. If you want production version use `npm run build`, otherwise just use `npm start` and wait till the app start.

Success.

## Docker

For building container use `docker build -t ion-organizer-ui .`.

For running docker container use `docker container run -d -p 80:80 --name ION-ui ion-organizer-ui`.
