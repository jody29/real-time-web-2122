# Movie Guesser

![interface van de app](https://user-images.githubusercontent.com/66092262/167162281-c84710a0-4490-4fa8-9707-a8bdc0a00040.png)
[🌐 Live link](https://movieguesser.herokuapp.com/)

## Table of contents
* [Description](https://github.com/jody29/real-time-web-2122#-description)
* [Installation](https://github.com/jody29/real-time-web-2122#%EF%B8%8F-installation)
* [Concept](https://github.com/jody29/real-time-web-2122#-concept)
* [Data model](https://github.com/jody29/real-time-web-2122#-data-model)
* [Data life cycle](https://github.com/jody29/real-time-web-2122#life-cycle-diagram)
* [Socket events](https://github.com/jody29/real-time-web-2122#socket-events)
* [MoSCoW todo](https://github.com/jody29/real-time-web-2122#-moscow-todo)
* [NPM packages](https://github.com/jody29/real-time-web-2122#-npm-packages)
* [Resources](https://github.com/jody29/real-time-web-2122#%E2%84%B9%EF%B8%8F-recourses)
* [License](https://github.com/jody29/real-time-web-2122#%EF%B8%8F-license)

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
### Generate API token
* Create an account on [themoviedb](https://www.themoviedb.org/)
* Get your API key [here](https://www.themoviedb.org/settings/api)
### Create .env file with your API key
```
MOVIEDB_TOKEN='<YOUR_API_KEY>'
```
### Start application
```bash
$ npm start
```

## 💡 Concept
I decided to create a concept around the MovieDatabase API and combine this with a realtime implication. I created 3 concepts and created 1 concepts out of these 3 concepts.

### Movie guesser by poster
All the user get to see a random movie poster. The users have to guess which movie it is. The first user to guess it right wins and get a point. If none of the users manage to guess it right within 30 seconds, no one will get any points.
![movieguesser](https://user-images.githubusercontent.com/66092262/165304327-a0efa1e9-28b8-420e-86ac-29517ad67d9f.png)

### Videochat hints
One user gets to see one movie and this user has to visualize the movie through video. The others have to guess which movie the other user is visualizing. The user who guesses the movie first gets the points. If no one mananged to guess te movie in 30 seconds, no on will get any points.
![videohints](https://user-images.githubusercontent.com/66092262/165304702-0971df2c-3b88-4a2b-9a91-48635f48ebb5.png)

### Guess release year
All the users get to see the movie poster and name. The user who guesses the release year of the movie as first, gets the points. If no one guesses the year in 20 seconds, no one will get any points.
![releaseguesser](https://user-images.githubusercontent.com/66092262/165304968-737c12d7-d6ad-4a9f-b656-1e8a267e3a36.png)

### Final concept
After the feedback of other students I decided to go for the movie guesser by poster. The one with the videochat was the most interesting, but the technique behind this concept is too complex for the amount of time. That is why I decided to go for the movie guesser by poster. This was still a challenge for me and it was doable in the given amount of time. It's also an interesting concept with many possibilities for improvement.

## 📊 Data model
For this project I used [themoviedb](https://developers.themoviedb.org/3/getting-started/introduction) API.
![data model](https://user-images.githubusercontent.com/66092262/167179895-8823d57a-83d5-4eda-9416-9c2a97772560.png)

### get response example
<details>
  <summary>response</summary>
  
```json
  {
  "page": 1,
  "results": [
    {
      "poster_path": "/e1mjopzAS2KNsvpbpahQ1a6SkSn.jpg",
      "adult": false,
      "overview": "From DC Comics comes the Suicide Squad, an antihero team of incarcerated supervillains who act as deniable assets for the United States government, undertaking high-risk black ops missions in exchange for commuted prison sentences.",
      "release_date": "2016-08-03",
      "genre_ids": [
        14,
        28,
        80
      ],
      "id": 297761,
      "original_title": "Suicide Squad",
      "original_language": "en",
      "title": "Suicide Squad",
      "backdrop_path": "/ndlQ2Cuc3cjTL7lTynw6I4boP4S.jpg",
      "popularity": 48.261451,
      "vote_count": 1466,
      "video": false,
      "vote_average": 5.91
    },
    {
      "poster_path": "/lFSSLTlFozwpaGlO31OoUeirBgQ.jpg",
      "adult": false,
      "overview": "The most dangerous former operative of the CIA is drawn out of hiding to uncover hidden truths about his past.",
      "release_date": "2016-07-27",
      "genre_ids": [
        28,
        53
      ],
      "id": 324668,
      "original_title": "Jason Bourne",
      "original_language": "en",
      "title": "Jason Bourne",
      "backdrop_path": "/AoT2YrJUJlg5vKE3iMOLvHlTd3m.jpg",
      "popularity": 30.690177,
      "vote_count": 649,
      "video": false,
      "vote_average": 5.25
    },
    {
      "poster_path": "/hU0E130tsGdsYa4K9lc3Xrn5Wyt.jpg",
      "adult": false,
      "overview": "One year after outwitting the FBI and winning the public’s adulation with their mind-bending spectacles, the Four Horsemen resurface only to find themselves face to face with a new enemy who enlists them to pull off their most dangerous heist yet.",
      "release_date": "2016-06-02",
      "genre_ids": [
        28,
        12,
        35,
        80,
        9648,
        53
      ],
      "id": 291805,
      "original_title": "Now You See Me 2",
      "original_language": "en",
      "title": "Now You See Me 2",
      "backdrop_path": "/zrAO2OOa6s6dQMQ7zsUbDyIBrAP.jpg",
      "popularity": 29.737342,
      "vote_count": 684,
      "video": false,
      "vote_average": 6.64
    },
    {
      "poster_path": "/h28t2JNNGrZx0fIuAw8aHQFhIxR.jpg",
      "adult": false,
      "overview": "A recently cheated on married woman falls for a younger man who has moved in next door, but their torrid affair soon takes a dangerous turn.",
      "release_date": "2015-01-23",
      "genre_ids": [
        53
      ],
      "id": 241251,
      "original_title": "The Boy Next Door",
      "original_language": "en",
      "title": "The Boy Next Door",
      "backdrop_path": "/vj4IhmH4HCMZYYjTMiYBybTWR5o.jpg",
      "popularity": 22.279864,
      "vote_count": 628,
      "video": false,
      "vote_average": 4.13
    },
    {
      "poster_path": "/vOipe2myi26UDwP978hsYOrnUWC.jpg",
      "adult": false,
      "overview": "An orphan boy is raised in the Jungle with the help of a pack of wolves, a bear and a black panther.",
      "release_date": "2016-04-07",
      "genre_ids": [
        12,
        18,
        14
      ],
      "id": 278927,
      "original_title": "The Jungle Book",
      "original_language": "en",
      "title": "The Jungle Book",
      "backdrop_path": "/eIOTsGg9FCVrBc4r2nXaV61JF4F.jpg",
      "popularity": 21.104822,
      "vote_count": 1085,
      "video": false,
      "vote_average": 6.42
    },
    {
      "poster_path": "/tgfRDJs5PFW20Aoh1orEzuxW8cN.jpg",
      "adult": false,
      "overview": "Arthur Bishop thought he had put his murderous past behind him when his most formidable foe kidnaps the love of his life. Now he is forced to travel the globe to complete three impossible assassinations, and do what he does best, make them look like accidents.",
      "release_date": "2016-08-25",
      "genre_ids": [
        80,
        28,
        53
      ],
      "id": 278924,
      "original_title": "Mechanic: Resurrection",
      "original_language": "en",
      "title": "Mechanic: Resurrection",
      "backdrop_path": "/3oRHlbxMLBXHfMqUsx1emwqiuQ3.jpg",
      "popularity": 20.375179,
      "vote_count": 119,
      "video": false,
      "vote_average": 4.59
    },
    {
      "poster_path": "/cGOPbv9wA5gEejkUN892JrveARt.jpg",
      "adult": false,
      "overview": "Fearing the actions of a god-like Super Hero left unchecked, Gotham City’s own formidable, forceful vigilante takes on Metropolis’s most revered, modern-day savior, while the world wrestles with what sort of hero it really needs. And with Batman and Superman at war with one another, a new threat quickly arises, putting mankind in greater danger than it’s ever known before.",
      "release_date": "2016-03-23",
      "genre_ids": [
        28,
        12,
        14
      ],
      "id": 209112,
      "original_title": "Batman v Superman: Dawn of Justice",
      "original_language": "en",
      "title": "Batman v Superman: Dawn of Justice",
      "backdrop_path": "/vsjBeMPZtyB7yNsYY56XYxifaQZ.jpg",
      "popularity": 19.413721,
      "vote_count": 3486,
      "video": false,
      "vote_average": 5.52
    },
    {
      "poster_path": "/kqjL17yufvn9OVLyXYpvtyrFfak.jpg",
      "adult": false,
      "overview": "An apocalyptic story set in the furthest reaches of our planet, in a stark desert landscape where humanity is broken, and most everyone is crazed fighting for the necessities of life. Within this world exist two rebels on the run who just might be able to restore order. There's Max, a man of action and a man of few words, who seeks peace of mind following the loss of his wife and child in the aftermath of the chaos. And Furiosa, a woman of action and a woman who believes her path to survival may be achieved if she can make it across the desert back to her childhood homeland.",
      "release_date": "2015-05-13",
      "genre_ids": [
        28,
        12,
        878,
        53
      ],
      "id": 76341,
      "original_title": "Mad Max: Fury Road",
      "original_language": "en",
      "title": "Mad Max: Fury Road",
      "backdrop_path": "/tbhdm8UJAb4ViCTsulYFL3lxMCd.jpg",
      "popularity": 18.797187,
      "vote_count": 5236,
      "video": false,
      "vote_average": 7.26
    },
    {
      "poster_path": "/5N20rQURev5CNDcMjHVUZhpoCNC.jpg",
      "adult": false,
      "overview": "Following the events of Age of Ultron, the collective governments of the world pass an act designed to regulate all superhuman activity. This polarizes opinion amongst the Avengers, causing two factions to side with Iron Man or Captain America, which causes an epic battle between former allies.",
      "release_date": "2016-04-27",
      "genre_ids": [
        28,
        53,
        878
      ],
      "id": 271110,
      "original_title": "Captain America: Civil War",
      "original_language": "en",
      "title": "Captain America: Civil War",
      "backdrop_path": "/m5O3SZvQ6EgD5XXXLPIP1wLppeW.jpg",
      "popularity": 16.733457,
      "vote_count": 2570,
      "video": false,
      "vote_average": 6.93
    },
    {
      "poster_path": "/jjBgi2r5cRt36xF6iNUEhzscEcb.jpg",
      "adult": false,
      "overview": "Twenty-two years after the events of Jurassic Park, Isla Nublar now features a fully functioning dinosaur theme park, Jurassic World, as originally envisioned by John Hammond.",
      "release_date": "2015-06-09",
      "genre_ids": [
        28,
        12,
        878,
        53
      ],
      "id": 135397,
      "original_title": "Jurassic World",
      "original_language": "en",
      "title": "Jurassic World",
      "backdrop_path": "/dkMD5qlogeRMiEixC4YNPUvax2T.jpg",
      "popularity": 15.930056,
      "vote_count": 4934,
      "video": false,
      "vote_average": 6.59
    },
    {
      "poster_path": "/gj282Pniaa78ZJfbaixyLXnXEDI.jpg",
      "adult": false,
      "overview": "Katniss Everdeen reluctantly becomes the symbol of a mass rebellion against the autocratic Capitol.",
      "release_date": "2014-11-18",
      "genre_ids": [
        878,
        12,
        53
      ],
      "id": 131631,
      "original_title": "The Hunger Games: Mockingjay - Part 1",
      "original_language": "en",
      "title": "The Hunger Games: Mockingjay - Part 1",
      "backdrop_path": "/83nHcz2KcnEpPXY50Ky2VldewJJ.jpg",
      "popularity": 15.774241,
      "vote_count": 3182,
      "video": false,
      "vote_average": 6.69
    },
    {
      "poster_path": "/dCgm7efXDmiABSdWDHBDBx2jwmn.jpg",
      "adult": false,
      "overview": "Deckard Shaw seeks revenge against Dominic Toretto and his family for his comatose brother.",
      "release_date": "2015-04-01",
      "genre_ids": [
        28,
        80,
        53
      ],
      "id": 168259,
      "original_title": "Furious 7",
      "original_language": "en",
      "title": "Furious 7",
      "backdrop_path": "/ypyeMfKydpyuuTMdp36rMlkGDUL.jpg",
      "popularity": 13.659073,
      "vote_count": 2718,
      "video": false,
      "vote_average": 7.39
    },
    {
      "poster_path": "/5JU9ytZJyR3zmClGmVm9q4Geqbd.jpg",
      "adult": false,
      "overview": "The year is 2029. John Connor, leader of the resistance continues the war against the machines. At the Los Angeles offensive, John's fears of the unknown future begin to emerge when TECOM spies reveal a new plot by SkyNet that will attack him from both fronts; past and future, and will ultimately change warfare forever.",
      "release_date": "2015-06-23",
      "genre_ids": [
        878,
        28,
        53,
        12
      ],
      "id": 87101,
      "original_title": "Terminator Genisys",
      "original_language": "en",
      "title": "Terminator Genisys",
      "backdrop_path": "/bIlYH4l2AyYvEysmS2AOfjO7Dn8.jpg",
      "popularity": 13.438976,
      "vote_count": 2334,
      "video": false,
      "vote_average": 5.91
    },
    {
      "poster_path": "/q0R4crx2SehcEEQEkYObktdeFy.jpg",
      "adult": false,
      "overview": "Minions Stuart, Kevin and Bob are recruited by Scarlet Overkill, a super-villain who, alongside her inventor husband Herb, hatches a plot to take over the world.",
      "release_date": "2015-06-17",
      "genre_ids": [
        10751,
        16,
        12,
        35
      ],
      "id": 211672,
      "original_title": "Minions",
      "original_language": "en",
      "title": "Minions",
      "backdrop_path": "/uX7LXnsC7bZJZjn048UCOwkPXWJ.jpg",
      "popularity": 13.001193,
      "vote_count": 2699,
      "video": false,
      "vote_average": 6.55
    },
    {
      "poster_path": "/nBNZadXqJSdt05SHLqgT0HuC5Gm.jpg",
      "adult": false,
      "overview": "Interstellar chronicles the adventures of a group of explorers who make use of a newly discovered wormhole to surpass the limitations on human space travel and conquer the vast distances involved in an interstellar voyage.",
      "release_date": "2014-11-05",
      "genre_ids": [
        12,
        18,
        878
      ],
      "id": 157336,
      "original_title": "Interstellar",
      "original_language": "en",
      "title": "Interstellar",
      "backdrop_path": "/xu9zaAevzQ5nnrsXN6JcahLnG4i.jpg",
      "popularity": 12.481061,
      "vote_count": 5600,
      "video": false,
      "vote_average": 8.12
    },
    {
      "poster_path": "/1ZQVHkvOegv5wVzxD2fphcxl1Ba.jpg",
      "adult": false,
      "overview": "Set after the events of Continental Drift, Scrat's epic pursuit of his elusive acorn catapults him outside of Earth, where he accidentally sets off a series of cosmic events that transform and threaten the planet. To save themselves from peril, Manny, Sid, Diego, and the rest of the herd leave their home and embark on a quest full of thrills and spills, highs and lows, laughter and adventure while traveling to exotic new lands and encountering a host of colorful new characters.",
      "release_date": "2016-06-23",
      "genre_ids": [
        12,
        16,
        35,
        10751,
        878
      ],
      "id": 278154,
      "original_title": "Ice Age: Collision Course",
      "original_language": "en",
      "title": "Ice Age: Collision Course",
      "backdrop_path": "/o29BFNqgXOUT1yHNYusnITsH7P9.jpg",
      "popularity": 12.150474,
      "vote_count": 242,
      "video": false,
      "vote_average": 5.15
    },
    {
      "poster_path": "/inVq3FRqcYIRl2la8iZikYYxFNR.jpg",
      "adult": false,
      "overview": "Based upon Marvel Comics’ most unconventional anti-hero, DEADPOOL tells the origin story of former Special Forces operative turned mercenary Wade Wilson, who after being subjected to a rogue experiment that leaves him with accelerated healing powers, adopts the alter ego Deadpool. Armed with his new abilities and a dark, twisted sense of humor, Deadpool hunts down the man who nearly destroyed his life.",
      "release_date": "2016-02-09",
      "genre_ids": [
        28,
        12,
        35,
        10749
      ],
      "id": 293660,
      "original_title": "Deadpool",
      "original_language": "en",
      "title": "Deadpool",
      "backdrop_path": "/nbIrDhOtUpdD9HKDBRy02a8VhpV.jpg",
      "popularity": 12.083976,
      "vote_count": 4834,
      "video": false,
      "vote_average": 7.16
    },
    {
      "poster_path": "/vNCeqxbKyDHL9LUza03V2Im16wB.jpg",
      "adult": false,
      "overview": "A private eye investigates the apparent suicide of a fading porn star in 1970s Los Angeles and uncovers a conspiracy.",
      "release_date": "2016-05-15",
      "genre_ids": [
        28,
        35,
        80,
        9648,
        53
      ],
      "id": 290250,
      "original_title": "The Nice Guys",
      "original_language": "en",
      "title": "The Nice Guys",
      "backdrop_path": "/8GwMVfq8Hsq1EFbw2MYJgSCAckb.jpg",
      "popularity": 11.374819,
      "vote_count": 537,
      "video": false,
      "vote_average": 6.84
    },
    {
      "poster_path": "/bWUeJHbKIyT306WtJFRHoSzX9nk.jpg",
      "adult": false,
      "overview": "A sorority moves in next door to the home of Mac and Kelly Radner who have a young child. The Radner's enlist their former nemeses from the fraternity to help battle the raucous sisters.",
      "release_date": "2016-05-05",
      "genre_ids": [
        35
      ],
      "id": 325133,
      "original_title": "Neighbors 2: Sorority Rising",
      "original_language": "en",
      "title": "Neighbors 2: Sorority Rising",
      "backdrop_path": "/8HuO1RMDI3prfWDkF7t1y8EhLVO.jpg",
      "popularity": 11.178222,
      "vote_count": 414,
      "video": false,
      "vote_average": 5.36
    },
    {
      "poster_path": "/lIv1QinFqz4dlp5U4lQ6HaiskOZ.jpg",
      "adult": false,
      "overview": "Under the direction of a ruthless instructor, a talented young drummer begins to pursue perfection at any cost, even his humanity.",
      "release_date": "2014-10-10",
      "genre_ids": [
        18,
        10402
      ],
      "id": 244786,
      "original_title": "Whiplash",
      "original_language": "en",
      "title": "Whiplash",
      "backdrop_path": "/6bbZ6XyvgfjhQwbplnUh1LSj1ky.jpg",
      "popularity": 10.776056,
      "vote_count": 2059,
      "video": false,
      "vote_average": 8.29
    }
  ],
  "total_results": 19629,
  "total_pages": 982
}
```
</details>

## Life cycle diagram
![LifeCycleDiagram](https://user-images.githubusercontent.com/66092262/168274261-f62ff50e-0cbf-47f1-b443-288151009dac.png)

## Socket events
### Server emits
#### new user
this will be emited to all clients after a new client has connected.
#### new game
if there are 4 users in the user array, then this emit will be send to all clients.
#### random movie 
after the client sended the new movie emit, a random movie will be requested from the api and this will be send to all clients.
#### good guess
after message validation, if the message matches the random movie then send this emit to all clients.
#### message 
if the message that is send from the client does not match the random movie, then send the message to all clients.
### end game
if a user has 100 points, then send this to all the clients. This will then end the game.

### Client emits
#### user connected
after a new user loads the page, this will be send to the server
#### new movie
this will be send to the server after 30 seconds, if no one guesses the movie title.
#### new message
this will be send to the server if the input field has a value and the user has clicked to send the message.
#### disconnect
this will be send to the server when someone clicks the button to leave the game.

## ✅ MoSCoW todo
### Must have:
- [x] get random movie from API
- [x] chatting with displayname
- [x] validation for user guesses

### Should have:
- [x] authentication
- [x] have a live leaderboard
- [x] give users 30 seconds to guess
- [x] end game when user gets 100 points 
- [x] game starts when 4 users have joined

### Could have:
- [ ] chat timestamp
- [ ] detailed stats
- [ ] create rooms
- [ ] UI-Stack

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
* Teachers at the minor
* Other students who helped me and gave feedback

## ©️ License
MIT
