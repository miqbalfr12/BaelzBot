const axios = require("axios");
require('dotenv').config()

const ChatGPTRequest = async (text) => {
    const result = {
        success: false,
        data: "Aku gak tau",
        message: "",
    };
    return await axios({
        method: "post",
        url: "https://api.openai.com/v1/completions",
        data: {
            model: "text-davinci-003",
            prompt: text,
            max_tokens: 2048 ,
            temperature: 0,
        },
        headers: {
            accept: "application/json",
            "Content-Type": "application/json",
            "Accept-Language": "in-ID",
            Authorization: `Bearer ${process.env.API_KEY_OPEN_AI}`,
        },
    })
        .then((response) => {
            if (response.status == 200) {
                const { choices } = response.data;
                if (choices && choices.length) {
                    result.success = true;
                    result.data = choices[0].text;
                }
            } else {
                result.message = "Failed response";
            }
            return result;
        })
        .catch((error) => {
            result.message = "Error : " + error.message;
            return result;
        });
};


module.exports = {
    name: "ChatGPT",
    aliases: ['gpt'],
    description: "chatgpt",
    timeout: 5000,
    category: "info",
    run: async(client, message) => {
        ["quit"].forEach((item) => {
            client.ignore.push(item);
        });

        if (message.body.toLowerCase() === "quit") {
            client.sendMessage(message.from, "Anda telah keluar dari Mode ChatGPT");
            client.mode.delete(message.from);
        }

        if (!["chatgpt", "quit"].includes(message.body.toLowerCase())) {
            message.reply("Pertanyaan Anda diteruskan, mohon tunggu jawabannya.");
        
            const question = message.body;
            const response = await ChatGPTRequest(question);
        
            if (!response.success) {
                message.reply(response.message);
            }
            if (response.success) {
                message.reply(`${message.body}${response.data}`);
            }
        }
    }
}