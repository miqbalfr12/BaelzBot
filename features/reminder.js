module.exports = {
    name: "Reminder",
    aliases: ['rmdr', 'pengingat', 'ingatkan'],
    description: "ini merupakan command untuk reminder task",
    timeout: 5000,
    category: "other",
    run: async(client, message) => {
        pull = client.mode.get(message.from)
        status = pull.status;
        waktu = pull.waktu;
        nanti = pull.nanti;

        if (status === "Menunggu Pesan"){
            client.mode.delete(message.from);
            message.reply(`Baik, saya akan mengingatkan anda ${nanti} lagi.`)
                setTimeout(() => {
                    message.reply(message.body)
                }, waktu);
        }
    }
}