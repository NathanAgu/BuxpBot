import { SlashCommandBuilder, ChatInputCommandInteraction, Client } from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('ping')
  .setDescription('Affiche la latence du bot.');

export async function execute(
  interaction: ChatInputCommandInteraction,
  client: Client
) {
  await interaction.reply(`🏓 Pong ! Latence : \`${client.ws.ping}ms\``);
  console.log(`[Ping] utilisé par ${interaction.user.tag}`);
}
