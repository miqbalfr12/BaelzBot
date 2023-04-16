module.exports = (client) => {
    console.log('\x1b[31m[Whatsapp]\x1b[0m Disconnected');
    client.destroy();
    client.initialize();
}