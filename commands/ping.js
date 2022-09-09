const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder().setName('야').setDescription('호라고 대답!'),
  async execute(interaction) {
    await interaction.reply('호호홍!');
  },
};
