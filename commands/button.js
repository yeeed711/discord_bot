const {
  SlashCommandBuilder,
  ActionRowBuilder,
  ButtonBuilder,
} = require('discord.js');

module.exports = {
  // 슬래시 커맨드가 뭘 하는건지 정의
  data: new SlashCommandBuilder()
    .setName('로또')
    .setDescription('로또번호를 추천해줍니다.'),
  // 슬래시 커맨드 행동을 정의 (실제로 슬래시 커맨드를 입력하면 동작하는 코드)
  async execute(interaction) {
    const buttons = [
      {
        customId: 'test2',
        label: '인생배팅!',
        style: 'Primary',
        async action(interaction) {
          await interaction.reply(`${lotto}`);
        },
      },
      {
        customId: 'test3',
        label: '두번째',
        style: 'Secondary',
        async action(interaction) {
          await interaction.update({
            content: `${lotto}`,
            components: [],
          });
        },
      },
    ];

    const row = new ActionRowBuilder().addComponents(
      //여기 안에 버튼을 추가
      buttons.map((button) => {
        return new ButtonBuilder()
          .setCustomId(button.customId)
          .setLabel(button.label)
          .setStyle(button.style);
      })
    );

    // 버튼을 만드는 코드
    await interaction.reply({
      content: '오늘은 잊지말고 로또 사라!',
      components: [row],
    });

    // 버튼이 응답할 코드
    const filter = (interaction) => {
      return buttons.filter(
        (button) => button.customId === interaction.customId
      );
    };

    const collector = interaction.channel.createMessageComponentCollector({
      // 몇초동안 반응할 수 있는지
      filter,
      time: 15000,
    });

    collector.on('collect', async (interaction) => {
      // 배열에 있는 동작을 자동으로 읽음
      const button = buttons.find(
        (button) => button.customId === interaction.customId
      );

      await button.action(interaction);
    });

    // 버튼의 시간초과가 됐을 때, 뭘 할지
    collector.on('end', (collect) => console.log('버튼시간초과'));
  },
};

// 로또번호 추첨기
let lotto = [];
while (lotto.length < 6) {
  const num = parseInt(Math.random() * 45 + 1);
  if (lotto.indexOf(num) == -1) {
    lotto.push(num);
  }
}
lotto.sort((a, b) => a - b);
