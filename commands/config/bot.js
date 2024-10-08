module.exports = {
 name: "/system",
 aliases: ["/bot"],
 description: "Config",
 timeout: 5000,
 category: "info",
 run: async (client, message, args) => {
  if (message.id.fromMe) {
   console.log(client.config);
   const keys = [...client.config.keys()];
   console.log(keys);

   if (keys.includes(args[1])) {
    switch (args[0]) {
     case "enable":
      client.config.set(args[1], true);
      await message.reply(`Successfully set Status of ${args[1]}: Enabled`);
      break;
     case "disable":
      client.config.set(args[1], false);
      await message.reply(`Successfully set Status of ${args[1]}: Disabled`);
      break;
     case "status":
      const status = client.config.get(args[1]);
      await message.reply(
       `Status of ${args[1]}: ${status ? "Enabled" : "Disabled"}`
      );
      break;
     default:
      await message.reply(
       `You can config:${keys.map(
        (key) => `\n\t- ${key}`
       )}\n\nWith this command:\n/system <disable/enable/status> <key>`
      );
      break;
    }
   } else if (args[0] === "check") {
    switch (args[1]) {
     case "chatid":
      console.log(message);
      await message.reply(`Here's the chatid from this chat:\n\n${message.to}`);
      break;
     default:
      await message.reply(
       `You can check:\n\t- chatid\n\nWith this command:\n/system check <key>`
      );
      break;
    }
   } else {
    return await message.reply(
     `You can config:${keys.map(
      (key) => `\n\t- ${key}`
     )}\n\nYou can check:\n\t- chatid\n\nWith this command:\n/system <disable/enable/status/check> <key>`
    );
   }
  } else {
   await message.reply(`You can't use this command!`);
  }
 },
};
