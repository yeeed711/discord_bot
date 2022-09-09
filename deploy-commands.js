const fs = require('node:fs');
const path = require('node:path');
const { Routes } = require('discord.js');
const { REST } = require('@discordjs/rest');
const { clientId, guildIds, token } = require('./config.json');

const commands = [];
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs
  .readdirSync(commandsPath)
  .filter((file) => file.endsWith('.js'));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  commands.push(command.data.toJSON());
}

const rest = new REST({ version: '10' }).setToken(token);

(async () => {
  guildIds.map(async (guildId) => {
    try {
      await rest.put(Routes.applicationGuildCommands(clientId, guildId), {
        body: commands,
      });
      console.log(`${guildId} 서버 성공`);
    } catch (error) {
      console.log('error');
    }
  });

  //글로벌 명령어
  //   try {
  //     await rest.put(Routes.applicationCommands(clientId), {
  //       body: commands,
  //     });
  //     console.log('글로벌 명령어 등록 성공');
  //   } catch (error) {
  //     console.error(error);
  //   }
})();
