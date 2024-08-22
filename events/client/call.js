const {MessageMedia} = require("whatsapp-web.js");

module.exports = async (client, call) => {
 let rejectCalls = true;
 console.log(
  "\x1b[33m[Whatsapp Call-log]\x1b[0m Call received, rejecting.",
  call
 );
 if (rejectCalls) await call.reject();
 const gambar = MessageMedia.fromFilePath("./source/img/incomingCall.jpg");
 const media = MessageMedia.fromFilePath(
  "./source/oga/1680455164585_Baelz.oga"
 );
 await client
  .sendMessage(call.from, gambar, {
   caption: `[${call.fromMe ? "Outgoing" : "Incoming"}] Phone call from ${
    "0" + call.from.slice(2).replace("@c.us", "")
   }, type ${call.isGroup ? "group " : ""}${
    call.isVideo ? "video" : "audio"
   } call. ${
    rejectCalls ? "This call was automatically rejected by the script." : ""
   }`,
  })
  .then((response) => {
   setTimeout(() => {
    response.reply(media);
   }, 1000);
  });
};
