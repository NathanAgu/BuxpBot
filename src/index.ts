import { Client, GatewayIntentBits, Collection  } from 'discord.js';
import dotenv from 'dotenv';

dotenv.config();

const CLIENT = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
}) as Client & {
  commands: Collection<string, any>;
};

CLIENT.commands = new Collection();

async function main() {
    try {
        await CLIENT.login(process.env.CLIENT_TOKEN);
        console.log(`${CLIENT.user?.tag} is online!`);
    } catch (error) {
        console.error('Error logging in:', error);
    }
}

main();