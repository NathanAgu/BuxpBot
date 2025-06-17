import { Client, Collection, SlashCommandBuilder, REST, Routes } from 'discord.js';
import { readdirSync } from 'fs';
import path from 'path';
import { Command } from '../types/Command.js';

export async function loadCommands(CLIENT: Client) {
  CLIENT.commands = new Collection<string, Command>();

  const commands: SlashCommandBuilder[] = [];

  const commandsPath = path.join(__dirname, '../commands');
  const commandFolders = readdirSync(commandsPath);

  for (const folder of commandFolders) {
    const folderPath = path.join(commandsPath, folder);
    const commandFiles = readdirSync(folderPath).filter(file => file.endsWith('.ts') || file.endsWith('.js'));

    for (const file of commandFiles) {
      const filePath = path.join(folderPath, file);
      const commandModule = await import(filePath);
      const command: Command = commandModule.default;

      if (command?.data && typeof command.execute === 'function') {
        CLIENT.commands.set(command.data.name, command);
        commands.push(command.data);
      } else {
        console.warn(`[⚠️]  ${file} invalid (missing data or execute).`);
      }
    }
  }

  console.log(`[✅]  ${CLIENT.commands.size} commands loaded.`);

  const rest = new REST({ version: '10' }).setToken(process.env.CLIENT_TOKEN!);

  try {
    await rest.put(Routes.applicationCommands(process.env.CLIENT_ID!), {
      body: commands.map(command => command.toJSON()),
    });
    console.log(`[✅]  ${commands.length} slash commands registered.`);
  } catch (err) {
    console.error(`[❌]  Error registering commands:`, err);
  }
}