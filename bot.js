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
		await commands.execute(interaction, client);
	}

}

client.once(Events.ClientReady, () => {
	let bot;
	if (process.env.CLIENTID === 1185500795781795880) {
		bot = 'YGO Client';
	} else {
		bot = 'YGO Client (test)'
	}
    console.log(`${bot} is reporting for duty`);
});

client.login(process.env.TOKEN);
client.application?.commands?.set(commands);

client.on(Events.InteractionCreate, handleInteraction);