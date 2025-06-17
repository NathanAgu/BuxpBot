import { Client, GatewayIntentBits, Collection } from 'discord.js';
import { Command } from './types/Command';
import {} from './types/discord';

export const CLIENT = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

CLIENT.commands = new Collection<string, Command>();

export default CLIENT;