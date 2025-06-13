import { REST, Routes } from 'discord.js';
import dotenv from 'dotenv';
import path from 'path';
import { readdirSync } from 'fs';

dotenv.config();

export async function handleSlashCommands() {
  const commandsPath = path.join(__dirname, '..', 'commands');
  const commandFiles = readdirSync(commandsPath).filter(file => file.endsWith('.ts') || file.endsWith('.js'));

  const slashCommands = [];

  for (const file of commandFiles) {
    const { data } = await import(path.join(commandsPath, file));
    if (data) slashCommands.push(data.toJSON());
  }

  const rest = new REST({ version: '10' }).setToken(process.env.CLIENT_TOKEN!);

  try {
    console.log('🔄 Enregistrement des slash commands...');
    await rest.put(Routes.applicationCommands(process.env.CLIENT_ID!), {
      body: slashCommands,
    });
    console.log('✅ Slash commands enregistrées !');
  } catch (err) {
    console.error('❌ Erreur lors de l’enregistrement :', err);
  }
}
