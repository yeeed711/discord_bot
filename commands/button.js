const {
  SlashCommandBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('로또')
    .setDescription('로또번호를 추천해줍니다.'),
  async execute(interaction) {
    const row = new ActionRowBuilder().addComponents(
      //여기 안에 버튼을 추가
      new ButtonBuilder()
        .setCustomId('primary')
        .setLabel('인생배팅!')
        .setStyle(ButtonStyle.Primary),
      new ButtonBuilder()
        .setCustomId('test2')
        .setLabel('두번째')
        .setStyle(ButtonStyle.Secondary)
    );

    // 버튼을 생성하는 코드
    await interaction.reply({
      content: '진짜 말만 하지 말고 오늘은 꼭 로또 사라',
      components: [row],
    });

    // 버튼이 응답할 코드
    const filter = (interaction) => {
      return interaction.customId === 'primary' || 'test2';
    };

    const collector = interaction.channel.createMessageComponentCollector({
      // 몇초동안 반응할 수 있는지
      filter,
      time: 15000,
    });

    collector.on('collect', async (interaction) => {
      // 버튼 클릭하면 나오는 메세지
      if (interaction.customId === 'primary') {
        await interaction.reply('버튼을 클릭했음!!!!');
      } else if (interaction.customId === 'test2') {
        await interaction.update({
          content: '버튼이 클릭됐어!',
          components: [],
        });
      }

      // 버튼 클릭시 기존 메세지를 수정하는 부분
      //   await interaction.update({
      //     content: 'A button was clicked!',
      //     components: [],
      //   });
    });

    // 버튼의 시간초과가 됐을 때, 뭘 할지
    collector.on('end', (collect) => console.log('버튼시간초과'));
  },
};
