# Yapping-Level

Analyzes historical and current level of discord chatter to calculate the current level of yapping going on.

## Usage instructions:

1. **Download Repo**

2. **Setup a bot**
   1. Go to [Discord Developer Portal](https://discord.com/developers/applications)
   2. Follow this tutorial: [Setting up a bot application](https://discordjs.guide/preparations/setting-up-a-bot-application.html)
   3. Remember bot token and application id

3. **Setup PostgreSQL**
   1. Download drivers from [PostgreSQL website](https://www.postgresql.org) or using `sudo apt install postgresql-contrib`
   2. Create user, remember username and password
   3. Create database, remember name

4. **Fill in .env**
   1. Add bot token, bot id (application id), and dev server id (optional)
   2. Add in username, password, database name, host (usually localhost), port (usually 5432)

5. **Setup workspace**
   1. Run `yarn install` to install dependencies
   2. Run `yarn global add @dotenvx/dotenvx` for .env to work

6. **Run bot**
   1. If you are running on Linux, install pm2 and run `yarn server`
   2. If you are on Windows, run `yarn start`
