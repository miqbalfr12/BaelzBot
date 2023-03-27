const { readdirSync } = require("fs");
module.exports = (client) => {
    const features = readdirSync(`./features/`).map(feature=>{
        let pull = require(`../features/${feature}`)
        // console.log(`Loaded command ${pull.name}`)
        client.features.set(pull.name,pull)
    })
}