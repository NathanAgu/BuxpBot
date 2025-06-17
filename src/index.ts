import 'dotenv/config';
import CLIENT from './client';
// import { connectToDatabase } from './utils/mongoose';
import { loadCommands } from './handlers/commandHandler';
import { loadEvents } from './handlers/eventHandler';

async function main() {
  // await connectToDatabase();
  await loadCommands(CLIENT);
  await loadEvents(CLIENT);

  await CLIENT.login(process.env.CLIENT_TOKEN);
  console.warn(`${CLIENT.user?.tag} is online!`);
}

main();