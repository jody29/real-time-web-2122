# Movie Guesser

![interface van de app](https://user-images.githubusercontent.com/66092262/167162281-c84710a0-4490-4fa8-9707-a8bdc0a00040.png)
[🌐 Live link]()

## Table of contents
* [Description]()
* [Installation]()
* [Concept]()
* [Data model]()
* [Data life cycle]()
* [MoSCoW todo]()
* [Resources]()
* [License]()

## 📋 Description
This project is a movie guesser game that I created for the course real-time-web-2122.

## ⚙️ Installation
### Clone this repo
```bash
$ git clone https://github.com/jody29/real-time-web-2122.git
```
### Go to the right directory
```bash
$ cd real-time-web-2122
```
### Install dependencies
```bash
$ npm install
```
### Check .env.example file for environment variables
```bash
```
### Start application
```bash
$ npm start
```

## 💡 Concept
I decided to create a concept around the MovieDatabase API and combine this with a realtime implication. I created 3 concepts and created 1 concepts out of these 3 concepts.

### Movie guesser by poster
All the user get to see a random movie poster. The users have to guess which movie it is. The first user to guess it right wins and get a point. If none of the users manage to guess it right within 20 seconds, no one will get any points.
![movieguesser](https://user-images.githubusercontent.com/66092262/165304327-a0efa1e9-28b8-420e-86ac-29517ad67d9f.png)

### Videochat hints
One user gets to see one movie and this user has to visualize the movie through video. The others have to guess which movie the other user is visualizing. The user who guesses the movie first gets the points. If no one mananged to guess te movie in 30 seconds, no on will get any points.
![videohints](https://user-images.githubusercontent.com/66092262/165304702-0971df2c-3b88-4a2b-9a91-48635f48ebb5.png)

### Guess release year
All the users get to see the movie poster and name. The user who guesses the release year of the movie as first, gets the points. If no one guesses the year in 20 seconds, no one will get any points.
![releaseguesser](https://user-images.githubusercontent.com/66092262/165304968-737c12d7-d6ad-4a9f-b656-1e8a267e3a36.png)

## 📊 Data model


## ✅ MoSCoW todo
### Must have:
- [x] get random movie from API
- [x] chatting with displayname
- [x] validation for user guesses

### Should have:
- [x] authentication
- [x] have a live leaderboard
- [ ] UI-Stack

### Could have:
- [ ] chat timestamp
- [ ] detailed stats
- [ ] create rooms

### Would have:
- [ ] videochat with webRTC


## 📦 NPM packages
* express
* dotenv
* date-format
* socket.io
* body-parser
* ejs
* node-fetch

## ℹ️ Recourses


## ©️ License
MIT


<!-- Here are some hints for your project! -->

<!-- Start out with a title and a description -->

<!-- Add a nice image here at the end of the week, showing off your shiny frontend 📸 -->

<!-- Add a link to your live demo in Github Pages 🌐-->

<!-- replace the code in the /docs folder with your own, so you can showcase your work with GitHub Pages 🌍 -->

<!-- Maybe a table of contents here? 📚 -->

<!-- ☝️ replace this description with a description of your own work -->

<!-- How about a section that describes how to install this project? 🤓 -->

<!-- ...but how does one use this project? What are its features 🤔 -->

<!-- What external data source is featured in your project and what are its properties 🌠 -->

<!-- This would be a good place for your data life cycle ♻️-->

<!-- Maybe a checklist of done stuff and stuff still on your wishlist? ✅ -->

<!-- We all stand on the shoulders of giants, please link all the sources you used in to create this project. -->

<!-- How about a license here? When in doubt use GNU GPL v3. 📜  -->
