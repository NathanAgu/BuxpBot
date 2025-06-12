import { Client } from 'discord.js';

export default {
  name: 'messageCreate',
  once: false,
  execute(message: any, CLIENT: Client) {
    if (message.author.bot) return;

    if (message.mentions.has(CLIENT.user!.id)) {
        message.reply({
            content: "Utilise `/help` pour voir la liste des commandes disponibles.",
            allowedMentions: { repliedUser: false },
        });
    }
  },
};