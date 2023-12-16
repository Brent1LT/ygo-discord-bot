import { Client, Events, GatewayIntentBits } from 'discord.js';
import { config } from 'dotenv';
import * as commands from './commands/slashcommands.js'

config();

const client = new Client({
    intents: [GatewayIntentBits.Guilds]
});

async function handleInteraction(interaction) {
    if (!interaction.isCommand()) return;
	if (interaction.commandName === "cardlookup") {
		await commands.execute(interaction);
	}

}

client.once(Events.ClientReady, () => {
    console.log('YGO Client is reporting for duty');
});

client.login(process.env.TOKEN);

client.on(Events.InteractionCreate, handleInteraction);