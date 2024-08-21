module.exports = {
 name: "ping",
 aliases: ["p", "pi", "pp"],
 description: "ping bot",
 timeout: 5000,
 category: "info",
 run: async (client, message) => {
  console.log();
  await message.reply(`Pong!`);
 },
};
