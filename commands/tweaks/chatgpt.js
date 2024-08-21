// const { Buttons } = require("whatsapp-web.js");
// const button = new Buttons(
//     "Silahkan tulisan pertanyaan Anda.\n\nJika ingin mengakhiri Mode ChatGPT silahkan klick/kirim quit.",
//     [{ body: "Quit" }],
//     "Mode ChatGPT",
//     "ChatGPT"
// );

module.exports = {
 name: "chatgpt",
 aliases: ["gpt"],
 description: "chatgpt",
 timeout: 5000,
 category: "Other",
 run: async (client, message) => {
  // client.mode.set(message.from, { mode: "ChatGPT" });
  // message.reply(
  //  "Silahkan tulisan pertanyaan Anda.\n\nJika ingin mengakhiri Mode ChatGPT silahkan klick/kirim quit.\n\n\n_Mode ChatGPT_"
  // );
  message.reply(
   "Mohon maaf, Mode ChatGPT sedang dinonaktifkan.\n\n_Mode ChatGPT_"
  );
 },
};
