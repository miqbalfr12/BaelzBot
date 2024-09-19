const mime = require("mime-types");
const {pnf2} = require("../helper/formatter");
const fs = require("fs");
const Timeout = new Map();

const logging = (nama, log) => {
 console.log(nama, log);
 try {
  if (!fs.existsSync(`./chats`)) fs.mkdirSync(`./chats`);
  if (!fs.existsSync(`./chats/${nama}.txt`)) {
   fs.writeFileSync(`./chats/${nama}.txt`, `Log for ${nama}\n`);
  }
  fs.appendFileSync(`./chats/${nama}.txt`, `\n${log}`);
 } catch (error) {
  console.log(error);
  client.sendMessage("62895396161325@c.us", error.message);
 }
};

module.exports = (client) => {
 client.once("message", async (message) => {
  if (message.from === "status@broadcast") return;

  const today = new Date().toLocaleString();
  const msg = message.body;
  const args = msg.split(/ +/g);
  const cmd = args.shift().toLowerCase();
  const fromGroup = message.from.includes("@g.us");
  const chat = fromGroup
   ? (await client.getChats()).find(
      (chat) => chat.id._serialized === message.from
     )
   : null;
  const identity = fromGroup
   ? `[Group ${chat.name}][${message._data.notifyName}][${message.author}]`
   : `[Personal Chat][${message._data.notifyName}][${message.from}]`;
  const log = `[${today}]${identity} ${message.body} `;
  logging(fromGroup ? chat.name : message._data.notifyName, log);
  console.log("\x1b[33m[Whatsapp Chat-log]\x1b[0m", log);

  if (message.hasMedia) {
   message.downloadMedia().then((media) => {
    if (media) {
     const mediaPath = "./download/";
     if (!fs.existsSync(mediaPath)) {
      fs.mkdirSync(mediaPath);
     }
     const extension = mime.extension(media.mimetype);
     let nama = fromGroup ? chat.name : message.from;
     let medfile = media.filename
      ? nama + "_" + media.filename
      : nama + "." + extension;
     const fullFilename = mediaPath + message.id._serialized + "_" + medfile;
     // Save to file
     try {
      fs.writeFileSync(fullFilename, media.data, {encoding: "base64"});
      console.log("File downloaded successfully!", fullFilename);
     } catch (err) {
      console.log("Failed to save the file:", err);
     }
    }
   });
  }

  console.log(client.mode);
  const command = client.commands.get(cmd) || client.aliases.get(cmd);
  const feature = client.features.get(client.mode.get(message.from)?.mode);
  const dbcmd = client.dbcmd.get(cmd);
  console.log(command || feature);

  const answer = (pull) => {
   const key = identity + pull.name;
   console.log(pull.timeout);
   console.log(Timeout.get(key));
   if (pull.timeout && Timeout.get(key)) {
    return message.reply(
     `*${message._data.notifyName}*! Please wait ${pull.name} cooldown!`
    );
   } else {
    console.log("Running", pull.name);
    try {
     pull.run(client, message, args);
    } catch (error) {
     console.log(error);
     client.sendMessage(
      "62895396161325@c.us",
      `Errod running ${pull.name} : ${error.message}\n\nRequest from : ${message._data.notifyName}\n\nRequest : ${args}`
     );
    }
    if (pull.timeout) {
     Timeout.set(key, Date.now());
     setTimeout(() => {
      Timeout.delete(key);
     }, pull.timeout);
    }
   }
  };

  if (feature) answer(feature);
  else if (command) answer(command);
  else if (dbcmd) message.reply(dbcmd.answer);

  if (!feature && !command && !dbcmd) {
   if (
    fromGroup ||
    client.ignore.includes(cmd) ||
    client.mode.has(message.from) ||
    client.friends.has(message.from)
   )
    return;
   let contact;
   try {
    contact = await client.getContactById(message.from);
   } catch (error) {
    contact.name = message._data.notifyName;
   }
   let nama = client.data_akun.has(pnf2(message.from))
    ? ` ${client.data_akun.get(pnf2(message.from)).nama}`
    : ` ${contact.name}`;
   //  const media = MessageMedia.fromFilePath(
   //   "./source/oga/1680455163938_Baelz.oga"
   //  );
   //  message.reply(media).then((response) => {
   //   setTimeout(() => {
   client.config.get("first") &&
    message.reply(
     `Hi${nama}!\n\nada yang bisa saya bantu?\nketik "Fitur" untuk layanan lebih lanjut.\n\n_BaelzBot_\n\nFitur, Thanks`
    );
   //   }, 1000);
   //  });
   client.mode.set(message.from, {first: "done"});
  }
 });
};
