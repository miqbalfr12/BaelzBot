const Timeout = new Map();

module.exports = (client, message) => {
 //  if (message.from === message.to) {
 const today = new Date().toLocaleString();
 const log = `[${today}][Self Chat][${message.from}] ${message.body} `;
 console.log("\x1b[33m[Whatsapp Chat-log]\x1b[0m", log);

 const msg = message.body;
 const args = msg.split(/ +/g);
 const cmd = args.shift().toLowerCase();

 const command = client.commands.get(cmd) || client.aliases.get(cmd);
 if (command) command.run(client, message, args);
 //  }
};
