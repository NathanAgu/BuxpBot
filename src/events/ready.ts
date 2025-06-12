import { Client, ActivityType } from 'discord.js';

export default {
  name: 'ready',
  once: true,
  execute(CLIENT: Client) {
    CLIENT.user?.setPresence({
        status: 'online',
        activities: [
            {
                name: 'Nagutaaa ☘️',
                type: ActivityType.Listening,
            },
        ],
    });
  },
};
