const qrcode = require("qrcode-terminal");

module.exports = qr => {
    qrcode.generate(qr, { small: true });
}