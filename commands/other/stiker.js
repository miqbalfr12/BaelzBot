const fs = require("fs");
const mime = require("mime-types");
const {execSync} = require("child_process");
const {MessageMedia} = require("whatsapp-web.js");

const stiker = async (pull, client) => {
 const mediaPath = "./download/";

 // Membuat direktori jika belum ada
 if (!fs.existsSync(mediaPath)) {
  fs.mkdirSync(mediaPath);
 }

 // Cek apakah pesan dari grup
 const fromGroup = pull.from.includes("@g.us");
 const chat = fromGroup
  ? (await client.getChats()).find((chat) => chat.id._serialized === pull.from)
  : null;
 const nama = fromGroup ? chat.name : pull.from;
 console.log({nama});

 const processMedia = (file, extension, filename, webpFilename) => {
  if (extension === "mp4" || extension === "gif") {
   execSync(
    `ffmpeg -i ${file} -t 10 -vf "fps=10,scale='if(gt(iw,ih),320,-2)':'if(gt(ih,iw),320,-2)':force_original_aspect_ratio=decrease,pad=320:320:(ow-iw)/2:(oh-ih)/2:color=#00000000" -c:v libwebp -lossless 0 -q:v 90 ${webpFilename}`
   );
  } else if (["jpg", "jpeg", "png", "webp"].includes(extension)) {
   // Jika file sudah berupa gambar, langsung gunakan tanpa konversi
   webpFilename = file;
  } else {
   console.log("File type not supported!");
   return;
  }

  const webpData = fs.readFileSync(webpFilename, {encoding: "base64"});
  const sticker = new MessageMedia(
   `image/${
    ["jpg", "jpeg", "png", "webp"].includes(extension) ? extension : "webp"
   }`,
   webpData,
   filename
  );

  // Kirim stiker
  client.sendMessage(pull.from, sticker, {
   sendMediaAsSticker: true,
   stickerAuthor: "Created By BaelzBot",
   stickerName: "BaelzBot",
  });

  // Hapus file WebP setelah digunakan
  if (file !== webpFilename) fs.unlinkSync(webpFilename);
  console.log("Files deleted successfully!");
 };

 pull.downloadMedia().then((media) => {
  if (media) {
   const extension = mime.extension(media.mimetype);
   const filename = pull.id._serialized;
   const fullFilename = `${mediaPath}${filename}_${nama}.${extension}`;
   let webpFilename = `${mediaPath}${filename}.webp`;

   try {
    // Simpan file media
    fs.writeFileSync(fullFilename, media.data, {encoding: "base64"});
    console.log("File downloaded successfully!", fullFilename);

    // Proses media
    processMedia(fullFilename, extension, filename, webpFilename);
   } catch (err) {
    console.log("Failed to process the file:", err);
   }
  } else {
   // Jika media tidak tersedia, cek apakah file sudah ada
   const extension = mime.extension(pull._data.mimetype);
   const file = `${mediaPath}${pull.id._serialized}_${nama}.${extension}`;
   const cari = fs.existsSync(file);
   console.log(
    cari ? `File "${file}" exists.` : `File "${file}" does not exist.`
   );

   if (cari) {
    let webpFilename = `${mediaPath}${pull.id._serialized}_${nama}.webp`;
    processMedia(file, extension, pull.id._serialized, webpFilename);
   }
  }
 });
};

module.exports = {
 name: "stiker",
 aliases: ["s", "stk"],
 description: "stiker bot",
 timeout: 10,
 category: "other",
 run: async (client, message) => {
  if (message.hasMedia) {
   console.log("Direct message: hasMedia ", message.hasMedia);
   stiker(message, client);
  }
  const quotedMsg = await message.getQuotedMessage();
  if (message.hasQuotedMsg && quotedMsg) {
   if (quotedMsg.hasMedia) {
    console.log("Quoted message: hasMedia ", quotedMsg.hasMedia);
    if (quotedMsg.hasMedia) {
     stiker(quotedMsg, client);
    }
   }
   if (!quotedMsg.hasMedia) {
    message.reply(
     "ini gak bisa dibikin stiker broo, tag gambar dong.\n\n_BaelzBot_"
    );
   }
  }
  if (!message.hasMedia && !message.hasQuotedMsg) {
   message.reply(`send image with caption *Stiker* \n\n_BaelzBot_`);
  }
 },
};
