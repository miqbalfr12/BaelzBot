const pnf = function(number) {
    let formatted = number.replace(/\D/g, ''); //Merubah segala sesuatu selain angka
    if (formatted.startsWith('0')) {formatted = '62' + formatted.substr(1);} //mengganti 0 jadi 62 jika ada
    if (!formatted.endsWith('@c.us')) {formatted += '@c.us';} //menambah akhiran @c.us
    return formatted; //Mengembalikan nomor yang telah di Format
};

const pnf2 = function(number) {
    let formatted = number.replace(/\D/g, ''); //Merubah segala sesuatu selain angka
    // if (formatted.startsWith('62')) {formatted = '0' + formatted.substr(2);} //mengganti 62 jadi 0
    if (formatted.endsWith('@c.us')) {formatted = formatted.replace('@c.us','');} //menghapus akhiran @c.us
    return parseInt(formatted);
};
module.exports = {
    pnf, pnf2
}