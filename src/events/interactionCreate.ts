import { Client, Interaction } from 'discord.js';

export default {
  name: 'interactionCreate',
  async execute(interaction: Interaction, CLIENT: Client & { commands: any }) {
    if (!interaction.isChatInputCommand()) return;

    const command = CLIENT.commands.get(interaction.commandName);
    if (!command) {
      await interaction.reply({ content: 'Commande introuvable.', ephemeral: true });
      return;
    }

    try {
      await command.execute(interaction, CLIENT);
    } catch (error) {
      console.error(error);
      if (interaction.replied || interaction.deferred) {
        await interaction.followUp({ content: 'Une erreur est survenue.', ephemeral: true });
      } else {
        await interaction.reply({ content: 'Une erreur est survenue.', ephemeral: true });
      }
    }
  }
};
