module.exports = {
 name: "ping",
 aliases: ["p", "pi", "pp"],
 description: "ping bot",
 timeout: 5000,
 category: "info",
 run: (client, message) => {
  message.reply(`Pong!`);
 },
};
