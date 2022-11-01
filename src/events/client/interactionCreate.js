const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    name: "interactionCreate",
    async execute(interaction, client){
        if(interaction.isChatInputCommand()){
            const { commands } = client;
            const { CommandName } = interaction;
            const command = commands.get(CommandName);
            if(!command) return;

            try {
                await command.execute(interaction, client);
            } catch (error) {
                console.log(error);
                await interaction.reply({
                    content: `Something went wrong while executing this command...`,
                    ephemeral: true
                });
            }
        }
    }
}