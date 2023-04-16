const { Buttons } = require('whatsapp-web.js');
const { pnf2 } = require("../../helper/formatter");

module.exports = {
    name: "menu",
    aliases: [],
    description: "ping bot",
    timeout: 5000,
    category: "info",
    run: async(client, message) => {
        let nama = client.data_akun.has(pnf2(message.from)) ? ` ${client.data_akun.get(pnf2(message.from)).nama}` : ` ${message._data.notifyName}`;
        let buttonwk = new Buttons(
            'ada yang bisa saya bantu?\nklick/ketik "help" untuk layanan lebih lanjut.',
            [
                { body: 'Help' },
                { body: 'Fitur' },
                { body: 'Thanks' }
            ],
                `Hi${nama}!`,
                'BaelzBot!'
            );
        message.reply(buttonwk);
        client.mode.set(message.from, {'first': 'done'})
    }
}