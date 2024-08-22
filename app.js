const {Client, LocalAuth} = require("whatsapp-web.js");
const {readdirSync} = require("fs");
require("dotenv").config();

const client = new Client({
 restartOnAuthFail: true,
 puppeteer: {
  // executablePath: `${process.env.CHROME_PATH}`,
  headless: true,
  args: [
   "--no-sandbox",
   "--disable-setuid-sandbox",
   "--disable-dev-shm-usage",
   "--disable-accelerated-2d-canvas",
   "--no-first-run",
   "--no-zygote",
   // '--single-process', // <- this one doesn't works in Windows
   "--disable-gpu",
  ],
 },
 authStrategy: new LocalAuth(),
});

client.commands = new Map();
client.aliases = new Map();
client.dbcmd = new Map();
client.ignore = [];
client.features = new Map();
client.mode = new Map();
client.friends = new Map();
client.data_akun = new Map();

["handlers"].forEach((dir) => {
 readdirSync(`./${dir}/`).map((js) => {
  require(`./${dir}/${js}`)(client);
 });
});

client.initialize();
