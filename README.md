* **The Old Rusty Bot**, Is a bot for Discord app using Discord.js (and Typescript). 
* Named after _'The Old Rusty Bastards'_ crew. Created for a small group of (fairly) elderly individuals who occasionally play role-playing games via the Discord app. 
* Due to life's demands, they can no longer gather around a table as they used to when life was much simpler. 
***
* The application was made for my own use as a home project for to support role-playing game sessions via Discord app. 
* By the way, it is a project of self-education through coding practice. 
* Some variables may be in Polish - according to terms from Polish versions of RPG manuals such as 'Legend Of The Fife Rings' ed.1, 'Vampire Masquarade' ed.5, 'Warhammer' ed.2 and others. 
***
* As I wrote this is a home project, and probably I don't do anything what was something groundbreaking, but you might find something interesting.
***
This is a public repository which, by design, will not be updated as often as I would like. Why?
* I am lazy.
* As befits a "professional", I put secret tokens and passes in a private repository.
* This is because I want to quickly and conveniently start a bot on the raspberryPi via ssh without any problems.
* Running such application on the raspberry pi is a good test to see if the application code is well optimised.
***

1. To run **The Old Rusty Bot** you must create .env file in main folder
2. Provide in to .env file bot token
   1. Token you can generate: https://discord.com/developers/applications
   2. Choose your app, or create new
   3. Go to 'bot' section (button placed at menu on left side)
   4. Generate or Reset Token
3. Provide in to .env file userId 
   1. When you run **The Old Rusty Bot** you can provide message `userid`,`myid` or `my id` - bot will help you


.env file content template:
```
TOKEN = 1QAAZ2WSX3EDC4RFV5TGB6YHN7UJM8IK9.OLY0Pas_dfghjBu0dmUqsOuOJ7vIITn6-Shk_s
ADMIN_DISCORD_ID = '123456788901234567'
```