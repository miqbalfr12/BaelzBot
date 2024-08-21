// const getCMD = require("../../models/cmdModel");

module.exports = {
 name: "cmd",
 aliases: [],
 description: "Menampilkan seluruh CMD",
 timeout: 5000,
 category: "info",
 run: async (client, message) => {
  // getCMD((data) => {
  //     Object.keys(data).map((key) => {
  //         client.dbcmd.set(data[key].q,{answer : data[key].a})
  //     })
  //     console.log("\x1b[33m[Whatsapp]\x1b[0m Commands Firebase available : ", client.dbcmd)
  // })
  // message.reply(`*Berikut kumpulan CMD BaelzBot*\n\n*Commands* ${JSON.stringify(Object.fromEntries(client.commands), null, 4)}\n\n*Firebase Commands* ${JSON.stringify(Object.fromEntries(client.dbcmd), null, 4)}`)
  message.reply(`Firebase Commands disabled!`);
 },
};
