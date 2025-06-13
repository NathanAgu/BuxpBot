import { Client, Collection } from 'discord.js';
import path from 'path';
import { readdirSync } from 'fs';

interface ExtendedClient extends Client {
  commands: Collection<string, any>;
}

export async function handleCommands(CLIENT: ExtendedClient) {
  CLIENT.commands = new Collection();

  const commandsPath = path.join(__dirname, '..', 'commands');
  const commandFiles = readdirSync(commandsPath).filter(file => file.endsWith('.ts') || file.endsWith('.js'));

  for (const file of commandFiles) {
    const { data, execute } = await import(path.join(commandsPath, file));

    if (!data || !execute) {
      console.warn(`⚠️ Command invalid : ${file}`);
      continue;
    }

    CLIENT.commands.set(data.name, { data, execute });
    console.log(`✅ Command loaded : ${data.name}`);
  }
}
