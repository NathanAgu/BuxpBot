import { Client } from 'discord.js';
import { readdirSync } from 'fs';
import path from 'path';

export function handleEvents(CLIENT: Client) {
  const eventsPath = path.join(__dirname, '..', 'events');
  const eventFiles = readdirSync(eventsPath).filter(file => file.endsWith('.ts') || file.endsWith('.js'));

  for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file);
    import(filePath).then(eventModule => {
      const event = eventModule.default;

      if (!event.name || !event.execute) {
        console.warn(`⚠️ ${file} invalid (missing name or execute).`);
        return;
      }

      if (event.once) {
        CLIENT.once(event.name, (...args) => event.execute(...args, CLIENT));
      } else {
        CLIENT.on(event.name, (...args) => event.execute(...args, CLIENT));
      }

      console.log(`✅ Event loaded: ${event.name}`);
    });
  }
}
