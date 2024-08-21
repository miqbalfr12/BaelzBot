module.exports = {
    name: "fitur",
    aliases: ['ftr','f'],
    description: "ping bot",
    timeout: 5000,
    category: "info",
    run: async(client, message) => {
        message.reply(`Here's our list of features at BaelzBot\n\nInfo:\n\t- Fitur\n\t- Ping\n\nOther:\n\t- Reminder\n\t- Stiker\n\t- Chatgpt\n\nPlease select a features`);
    }
}