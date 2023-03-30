const { Buttons } = require('whatsapp-web.js');
const { pnf2 } = require('../helper/formatter');
const fs = require("fs");
const Timeout = new Map();

const logging = (nama, log) => {
    if (!fs.existsSync(`./chats`)) fs.mkdirSync(`./chats`)
    if (!fs.existsSync(`./chats/${nama}.txt`)){fs.writeFile(`./chats/${nama}.txt`, nama, (err)=>{if (err) throw err})}
    fs.appendFile(`./chats/${nama}.txt`, `\n${log}`, (err)=>{if (err) throw err});
}

module.exports = (client) => {
    client.on("message", async message => {
        if (message.from === 'status@broadcast') return

        const today = new Date().toLocaleString();
        const msg = message.body;
        const args = msg.split(/ +/g);
        const cmd = args.shift().toLowerCase();
        const fromGroup = message.from.includes("@g.us");
        const chat = fromGroup ? (await client.getChats()).find(chat => chat.id._serialized === message.from) : null;
        const identity = fromGroup ? `[Group ${chat.name}][${message._data.notifyName}][${message.author}]` : `[Personal Chat][${message._data.notifyName}][${message.from}]`;
        const log = `[${today}]${identity} ${message.body} `;
        logging(fromGroup ? chat.name : message._data.notifyName, log);
        console.log('\x1b[33m[Whatsapp Chat-log]\x1b[0m', log);

        console.log(client.mode)
        const command = client.commands.get(cmd) || client.aliases.get(cmd);
        const feature = client.features.get(client.mode.get(message.from)?.mode);
        console.log(command || feature)

        const answer = (pull) => {
            const key = identity + pull.name;
            if(pull.timeout && Timeout.get(key)){
                return message.reply(`*${message._data.notifyName}*! Please wait ${pull.name} cooldown!`);
            } else {
                pull.run(client, message, args);
                if(pull.timeout){
                    Timeout.set(key, Date.now());
                    setTimeout(() => {
                        Timeout.delete(key);
                    }, pull.timeout);
                }
            }
        }

        if(feature) answer(feature);
        else if(command) answer(command);
        else {
            if (fromGroup || client.ignore.includes(cmd) || client.mode.has(message.from)) return;
            let nama = client.data_akun.has(pnf2(message.from)) ? ` ${client.data_akun.get(pnf2(message.from)).nama}` : ` ${message._data.notifyName}`;
            let buttonwk = new Buttons(
                'ada yang bisa saya bantu?\nklick/ketik "help" untuk layanan lebih lanjut.',
                [
                    { body: 'Help' },
                    { body: 'ChatGPT' },
                    { body: 'Thanks' }
                ],
                    `Hi${nama}!`,
                    'BaelzBot!'
                );
            message.reply(buttonwk);
            client.mode.set(message.from, {'first': 'done'})
        }
    });
}