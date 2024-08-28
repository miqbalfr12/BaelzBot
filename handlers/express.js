const express = require("express");
const bodyParser = require("body-parser");
const {body, validationResult} = require("express-validator");
const socketIO = require("socket.io");
const http = require("http");
const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const {pnf} = require("../helper/formatter");
const {MessageMedia} = require("whatsapp-web.js");
require("dotenv").config();

const qrcode = require("qrcode");

module.exports = (client) => {
 client.status = "Connecting...";
 client.recentQR;

 app.use(express.urlencoded({extended: true}));

 app.use(express.json());

 app.use(bodyParser.json());

 app.post("/webhook/:to?", (req, res) => {
  const to = req.params.to;
  const branch = req.body.ref.split("/")[2];
  const repositori = req.body.repository.name;
  const total = req.body.commits.length;

  const whos = req.body.pusher.name;
  const text = `[${repositori}:${branch}] ${total} new commits`;
  const commit = req.body.commits.map(
   (data) => ` - ${data.message}\n${data.url}\n\n`
  );
  // client.sendMessage("62895396161325@c.us", JSON.stringify(req.body, null, 2));
  client.sendMessage(
   to ? to : "62895396161325@c.us",
   `${whos}\n${text}\n\n${commit}_BaelzBot_`
  );
  res.sendStatus(200);
 });

 app.get("/", (req, res) => {
  res.sendFile(`${process.env.ROOT}\\source\\html\\index.html`);
  console.log("\x1b[90m[express]\x1b[0m Send File : index.html");
 });

 app.get("/logo.png", (req, res) => {
  res.sendFile(`${process.env.ROOT}\\source\\img\\logo.png`);
  console.log("\x1b[90m[express]\x1b[0m Send File : logo.png");
 });

 app.get("/styles.css", (req, res) => {
  res.sendFile(`${process.env.ROOT}\\source\\css\\styles.css`);
  console.log("\x1b[90m[express]\x1b[0m Send File : styles.css");
 });

 const checkReqNum = async function (number) {
  const isReg = client.isRegisteredUser(number);
  return isReg;
 };

 app.post(
  "/send-message",
  [body("number").notEmpty(), body("message").notEmpty()],
  async (req, res) => {
   const errors = validationResult(req).formatWith(({msg}) => {
    return msg;
   });

   if (!errors.isEmpty()) {
    return res.status(422).json({
     status: false,
     message: errors.mapped(),
    });
   }
   const number = pnf(req.body.number);
   const message = req.body.message;

   const isRegNum = await checkReqNum(number);

   if (!isRegNum) {
    return res.status(422).json({
     status: false,
     message: "The number is not registered",
    });
   }

   client
    .sendMessage(number, message)
    .then((response) => {
     res.status(200).json({
      status: true,
      response: response,
     });
    })
    .catch((err) => {
     res.status(500).json({
      status: false,
      response: err,
     });
    });
  }
 );

 app.post(
  "/send-group",
  [body("number").notEmpty(), body("message").notEmpty()],
  async (req, res) => {
   const errors = validationResult(req).formatWith(({msg}) => {
    return msg;
   });

   if (!errors.isEmpty()) {
    return res.status(422).json({
     status: false,
     message: errors.mapped(),
    });
   }
   const number = req.body.number;
   const message = req.body.message;

   client
    .sendMessage(number, message)
    .then((response) => {
     res.status(200).json({
      status: true,
      response: response,
     });
    })
    .catch((err) => {
     res.status(500).json({
      status: false,
      response: err,
     });
    });
  }
 );

 app.post(
  "/send-media",
  [
   body("number").notEmpty(),
   body("caption").notEmpty(),
   body("media").notEmpty(),
  ],
  async (req, res) => {
   const errors = validationResult(req).formatWith(({msg}) => {
    return msg;
   });

   if (!errors.isEmpty()) {
    return res.status(422).json({
     status: false,
     message: errors.mapped(),
    });
   }
   const number = pnf(req.body.number);
   const caption = req.body.caption;
   const media = req.body.media;

   let mediaf = MessageMedia.fromFilePath(media);

   const isRegNum = await checkReqNum(number);

   if (!isRegNum) {
    return res.status(422).json({
     status: false,
     message: "The number is not registered",
    });
   }

   client
    .sendMessage(number, mediaf, {caption: caption})
    .then((response) => {
     res.status(200).json({
      status: true,
      response: response,
     });
    })
    .catch((err) => {
     res.status(500).json({
      status: false,
      response: err,
     });
    });
  }
 );

 io.on("connection", function (socket) {
  socket.emit("message", client.status);
  if (client.recentQR) socket.emit("qr", client.recentQR);

  client.on("qr", (qr) => {
   qrcode.toDataURL(qr, (err, url) => {
    client.recentQR = url;
    client.status = "Scan QR Code please";
    socket.emit("qr", client.recentQR);
    socket.emit("message", client.status);
    console.log(
     "\x1b[33m[Whatsapp]\x1b[0m Sending QR Code to scan in localhost:5173"
    );
   });
  });

  client.on("ready", () => {
   client.status = "Whatsapp is ready!";
   socket.emit("ready", "/logo.png");
   socket.emit("message", client.status);
   console.log("\x1b[32m[Whatsapp]\x1b[0m Client is ready!");
   client.sendMessage("62895396161325@c.us", "WhatsApp Bot Online!");
  });

  client.on("authenticated", () => {
   client.status = "Whatsapp is authenticated!";
   client.recentQR = "";
   socket.emit("message", client.status);
   console.log("\x1b[33m[Whatsapp]\x1b[0m Authenticated");
  });

  client.on("auth_failure", function (session) {
   client.status = "Auth failure, restarting...";
   socket.emit("message", client.status);
   console.log("\x1b[33m[Whatsapp]\x1b[0m Auth failure, restarting...");
  });

  client.on("disconnected", (reason) => {
   client.status = "Whatsapp is disconnected!";
   socket.emit("message", client.status);
   console.log("\x1b[31m[Whatsapp]\x1b[0m Disconnected");
   client.destroy();
   client.initialize();
  });
 });

 server.listen(5173, function () {
  console.log("\x1b[36m[server]\x1b[0m App running on : " + 5173);
 });
};
