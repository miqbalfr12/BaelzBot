const {pnf2} = require("../../helper/formatter");

module.exports = {
 name: "menu",
 aliases: [],
 description: "ping bot",
 timeout: 5000,
 category: "info",
 run: async (client, message) => {
  let nama = client.data_akun.has(pnf2(message.from))
   ? ` ${client.data_akun.get(pnf2(message.from)).nama}`
   : ` ${message._data.notifyName}`;
  message.reply(
   `Hi${nama}!\n\nada yang bisa saya bantu?\nklick/ketik "fitur" untuk layanan lebih lanjut.\n\n_BaelzBot_\n\nFitur, Thanks`
  );
  client.mode.set(message.from, {first: "done"});
 },
};
