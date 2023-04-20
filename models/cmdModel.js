const firebase = require('../db/firebaseConfig');

const getCMD = (callback) => {
    firebase.ref('cmd').once(
        'value',
        (snapshot) => {
            callback(snapshot.val())
        },
        (err) => {
            console.log('read filed: ', err.name)
        }
    )
}

module.exports = getCMD