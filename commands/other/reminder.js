module.exports = {
    name: "reminder",
    aliases: ['rmdr', 'pengingat', 'ingatkan'],
    description: "ini merupakan command untuk reminder task",
    timeout: 5000,
    category: "other",
    run: async(client, message, args) => {
        let pesan = args;
        let set = pesan.shift()?.toLowerCase();
        let waktu = 0;
        let nanti

        if (set) {
            if (set.includes('d')) {
                nanti = set.replace('d',' detik')
                waktu = 1000 * parseInt(set.replace('s',''))
            } else if (set.includes('m')) {
                nanti = set.replace('m',' menit')
                waktu = 60000 * parseInt(set.replace('m',''))
            } else if (set.includes('j')) {
                nanti = set.replace('j',' jam')
                waktu = 3600000 * parseInt(set.replace('j',''))
            } else {
                message.reply(`Tambahkan keterangan waktu seperti 1d/1m/1j.`)
                return
            }
            if (args.length) {
                message.reply(`Baik, saya akan mengingatkan anda ${nanti} lagi.`)
                setTimeout(() => {
                    message.reply(args.join(' '))
                }, waktu);
            } else {
                if (message.hasQuotedMsg) {
                    message.reply(`Baik, saya akan mengingatkan anda ${nanti} lagi.`)
                    const quotedMsg = await message.getQuotedMessage();
                    setTimeout(() => {
                        message.reply(quotedMsg.body)
                    }, waktu);
                } else {
                    message.reply(`Silahkan masukan pesan yang akan diingatkan ${nanti} lagi.`)
                    client.mode.set(message.from, { mode: "Reminder", status: "Menunggu Pesan", waktu: waktu, nanti: nanti })
                }
            }
        } else {
            message.reply('Ini merupakan command untuk reminder task.\n\nUntuk menggunakannya silahkan tambahkan keterangan waktu seperti 1d/1m/1j.\n\nContoh untuk mengingatkan 10 detik kedepan ada kuliah \n_Reminder 10s Ada kuliah!_')
        }
    }
}