import { Client, GatewayIntentBits, Collection, REST, Routes } from 'discord.js';
import dotenv from 'dotenv';
import { handleEvents } from './handlers/events.handler';
import { handleCommands } from './handlers/commands.handler';
import { handleSlashCommands } from './handlers/slashCommands.handler';

dotenv.config();

interface ExtendedClient extends Client {
  commands: Collection<string, any>;
}

const CLIENT = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
}) as ExtendedClient;

CLIENT.commands = new Collection();

handleEvents(CLIENT);
handleCommands(CLIENT);
handleSlashCommands();

async function main() {
    try {
        await CLIENT.login(process.env.CLIENT_TOKEN);
        console.log(`${CLIENT.user?.tag} is online!`);
    } catch (error) {
        console.error('Error logging in:', error);
    }
}

main();