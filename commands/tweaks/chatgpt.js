const { Buttons } = require("whatsapp-web.js");
const button = new Buttons(
    "Silahkan tulisan pertanyaan Anda.\n\nJika ingin mengakhiri Mode ChatGPT silahkan klick/kirim quit.",
    [{ body: "Quit" }],
    "Mode ChatGPT",
    "ChatGPT"
);

module.exports = {
    name: "chatgpt",
    aliases: ['gpt'],
    description: "chatgpt",
    timeout: 5000,
    category: "Other",
    run: async(client, message) => {
        client.mode.set(message.from, { mode: "ChatGPT" });
        client.sendMessage(message.from, button);
    }
}