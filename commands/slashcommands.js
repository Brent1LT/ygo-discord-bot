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
    const name = data.data[0].name;
    const text = data.data[0].desc;
    const image = data.data[0].card_images[0].image_url;
    const price = data.data[0].card_prices[0].tcgplayer_price;

    await interaction.reply({
        content: `Name: ${name}\nText: ${text}\nLowest Price: ${price}`, 
        files: [{attachment: `${image}`}]});
}
