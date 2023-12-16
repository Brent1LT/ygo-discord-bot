import { SlashCommandBuilder } from "discord.js";

export const data = new SlashCommandBuilder()
    .setName('cardlookup')
    .setDescription('Get details about a Yugioh card.');

export async function execute(interaction) {
    await interaction.reply("looking for card...");
}
