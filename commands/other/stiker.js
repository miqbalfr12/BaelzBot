const fs = require("fs");
const mime = require('mime-types');
const { MessageMedia } = require("whatsapp-web.js");

module.exports = {
    name: "stiker",
    aliases: ['s','stk'],
    description: "stiker bot",
    timeout: 5000,
    category: "other",
    run: async(client, message) => {
        const stiker = (pull) => {
            pull.downloadMedia().then(media => {
                if (media) {
                    const mediaPath = './download/';
                    if (!fs.existsSync(mediaPath)) {
                        fs.mkdirSync(mediaPath);
                    }
                    const extension = mime.extension(media.mimetype);
                    const filename = new Date().getTime();
                    const fullFilename = mediaPath + filename + '.' + extension;
                    // Save to file
                    try {
                        fs.writeFileSync(fullFilename, media.data, { encoding: 'base64' });
                        console.log('File downloaded successfully!', fullFilename);
                        console.log(fullFilename);
                        MessageMedia.fromFilePath(filePath = fullFilename)
                        client.sendMessage(pull.from, new MessageMedia(media.mimetype, media.data, filename), { sendMediaAsSticker: true,stickerAuthor:"Created By BaelzBot",stickerName:"BaelzBot"} )
                        fs.unlinkSync(fullFilename)
                        console.log(`File Deleted successfully!`,);
                    } catch (err) {
                        console.log('Failed to save the file:', err);
                        console.log(`File Deleted successfully!`,);
                    }
                }
            });
        }

        if(message.hasMedia){
            stiker(message)
        } else if (message.hasQuotedMsg) {
            const quotedMsg = await message.getQuotedMessage();
            if (quotedMsg.hasMedia) {
                stiker(quotedMsg)
            } else {
                quotedMsg.reply('ini gak bisa dibikin stiker broo, tag gambar dong.');
            }
        } else {
            message.reply(`send image with caption *sticker* `)
        }
    }
}
