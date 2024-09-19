const fs = require("fs");
const mime = require("mime-types");
const {execSync} = require("child_process");
const {MessageMedia} = require("whatsapp-web.js");

module.exports = {
 name: "stiker",
 aliases: ["s", "stk"],
 description: "stiker bot",
 timeout: 0,
 category: "other",
 run: async (client, message) => {
  const stiker = (pull) => {
   pull.downloadMedia().then((media) => {
    if (media) {
     const mediaPath = "./download/";
     if (!fs.existsSync(mediaPath)) {
      fs.mkdirSync(mediaPath);
     }
     const extension = mime.extension(media.mimetype);
     const filename = new Date().getTime();
     const fullFilename = `${mediaPath}${filename}.${extension}`;
     const webpFilename = ["jpg", "jpeg", "png", "webp"].includes(extension)
      ? fullFilename
      : `${mediaPath}${filename}.webp`;

     try {
      fs.writeFileSync(fullFilename, media.data, {encoding: "base64"});
      console.log("File downloaded successfully!", fullFilename);

      if (extension === "mp4") {
       execSync(
        `ffmpeg -i ${fullFilename} -t 10 -vf "fps=10,scale='if(gt(iw,ih),320,-2)':'if(gt(ih,iw),320,-2)':force_original_aspect_ratio=decrease,pad=320:320:(ow-iw)/2:(oh-ih)/2:color=#00000000" -c:v libwebp -lossless 0 -q:v 90 ${webpFilename}`
       );
      } else if (extension === "gif") {
       execSync(
        `ffmpeg -i ${fullFilename} -vf "fps=10,scale='if(gt(iw,ih),320,-2)':'if(gt(ih,iw),320,-2)':force_original_aspect_ratio=decrease,pad=320:320:(ow-iw)/2:(oh-ih)/2:color=#00000000" -q:v 90 -c:v libwebp  -lossless 0 -q:v 90 ${webpFilename}`
       );
      } else if (
       !["jpg", "jpeg", "png", "webp", "gif", "mp4"].includes(extension)
      ) {
       throw new Error("Unsupported file type for conversion");
      }

      // Send the WebP file as a sticker
      const webpData = fs.readFileSync(webpFilename, {
       encoding: "base64",
      });
      //   MessageMedia.fromFilePath(webpFilename);
      const sticker = new MessageMedia(
       `image/${
        ["jpg", "jpeg", "png", "webp"].includes(extension) ? extension : "webp"
       }`,
       webpData,
       filename
      );

      client.sendMessage(pull.from, sticker, {
       sendMediaAsSticker: true,
       stickerAuthor: "Created By BaelzBot",
       stickerName: "BaelzBot",
      });

      // Cleanup
      fs.unlinkSync(fullFilename);
      if (!["jpg", "jpeg", "png", "webp"].includes(extension))
       fs.unlinkSync(webpFilename);
      console.log("Files deleted successfully!");
     } catch (err) {
      console.log("Failed to process the file:", err);
     }
    } else {
     console.log(media);
     console.log("Failed to download the file");
    }
   });
  };

  if (message.hasMedia) {
   stiker(message);
  } else if (message.hasQuotedMsg) {
   const quotedMsg = await message.getQuotedMessage();
   console.log("Quoted message: hasMedia ", quotedMsg.hasMedia);
   if (quotedMsg.hasMedia) {
    stiker(quotedMsg);
   } else {
    quotedMsg.reply(
     "ini gak bisa dibikin stiker broo, tag gambar dong.\n\n_BaelzBot_"
    );
   }
  } else {
   message.reply(`send image with caption *Stiker* \n\n_BaelzBot_`);
  }
 },
};
