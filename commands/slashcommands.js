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

export async function execute(interaction, client) {
    const arg = interaction.options.getString('cardname');

    const resp = await fetch(`https://db.ygoprodeck.com/api/v7/cardinfo.php?name=${arg}`);
    if (!resp.ok) {
       await interaction.reply("Not able to find card. Please try again.");
       return; 
    }
    const data = await resp.json();
    let name = data.data[0].name;
    let text = data.data[0].desc;
    let image = data.data[0].card_images[0].image_url;
    let price = data.data[0].card_prices[0].tcgplayer_price;

    if (arg.toLowerCase() === "tearlaments kitkallos") {
        name = "Forgettaboutit";
        text = "She's gone. Get over it."
        price = "More than you can afford for bail."
        image = "https://pbs.twimg.com/media/GBuoqmPXgAACTP1.jpg"
    }

    const message = await interaction.reply({
        content: `Name: ${name}\nText: ${text}\nLowest Price: ${price}`, 
        files: [{attachment: `${image}`}]});


    setTimeout(async () => {
        const channel = await client.channels.cache.get(interaction.channelId);
        try {
            await message.delete();
        } catch (error) {
            await channel.send("Issue deleting message after timeframe");
            return;
        }
        await channel.send(`${interaction.user.username} requested a look up for ${arg}`);
    }, 60000)
}
