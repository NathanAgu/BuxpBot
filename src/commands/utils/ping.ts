import { CLIENT } from '../../client';
import { SlashCommandBuilder } from 'discord.js';
import { Command } from '../../types/Command';

const pingCommand: Command = {
  data: new SlashCommandBuilder().setName('ping').setDescription('Renvoie pong'),
  execute: async (interaction) => {
    await interaction.reply(`Ping : \`${CLIENT.ws.ping}ms\``);
  }
};

export default pingCommand;