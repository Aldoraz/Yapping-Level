# Yapping-Level
Analyzes historical and current level of discord chatter to calculate the current level of yapping going on.

Usage instructions:

1. Download Repo

2. Setup a bot
2.1. Go to https://discord.com/developers/applications
2.2. Follow this tutorial https://discordjs.guide/preparations/setting-up-a-bot-application.html
2.3. Remember bot token and application id

3. Setup postgresql
3.1. Download drivers from https://www.postgresql.org or using "sudo apt install postgresql-contrib"
3.2. Create user, remember username and password
3.3. Create database, remember name

4. Fill in .env
4.1. Add bot token, bot id (application id) and dev server id (optional)
4.2. Add in username, password, database name, host (usually localhost), port (usually 5432)

5. Setup workspace
5.1. "yarn install" to install dependencies
5.2. "yarn global add @dotenvx/dotenvx" for .env to work

6. Run bot
6.1. If you are running on linux install pm2 and run "yarn server"
6.2. if you are on windows install run "yarn start"