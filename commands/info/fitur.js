// const { List } = require('whatsapp-web.js');

module.exports = {
    name: "fitur",
    aliases: ['ftr','f'],
    description: "ping bot",
    timeout: 5000,
    category: "info",
    run: async(client, message) => {
        // let list = new List(
        //     "Here's our list of features at BaelzBot",
        //     "View all features",
        //     [
        //         {
        //             title: "Info",
        //             rows: [
        //                 { id: "Fitur", title: "Fitur" },
        //                 { id: "Ping", title: "Ping" },
        //             ],
        //         },
        //         {
        //             title: "Other",
        //             rows: [
        //                 { id: "Reminder", title: "Reminder" },
        //                 { id: "Stiker", title: "Stiker" },
        //                 { id: "Chatgpt", title: "Chatgpt" }
        //             ],
        //         },
        //     ],
        //     "Please select a features"
        // )
        message.reply(`Here's our list of features at BaelzBot\n\nInfo:\n\t- Fitur\n\t- Ping\n\nOther:\n\t- Reminder\n\t- Stiker\n\t- Chatgpt\n\nPlease select a features`);
    }
}