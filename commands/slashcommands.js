import { SlashCommandBuilder } from "discord.js";
import fetch from 'node-fetch';

export const data = new SlashCommandBuilder()
    .setName('cardlookup')
    .setDescription('Get details about a Yugioh card.')
    .addStringOption(option => 
        option.setName('cardname')
        .setDescription('Enter a cardname.')
		.setRequired(true)
    );

export async function execute(interaction) {
    const arg = interaction.options.getString('cardname');
    console.log(arg)
    const resp = await fetch('https://db.ygoprodeck.com/api/v7/cardinfo.php?name=Decode%20Talker');
    const data = await resp.json();
    // console.log(data.data[0].name);
    const image = data.data[0].card_images[0].image_url;
    console.log(image)
    await interaction.reply({content: `data: ${data.data[0].name}`, files: [{attachment: `${image}`}]});
}
