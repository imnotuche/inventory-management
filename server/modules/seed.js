const {addRecord} = require("./database")
const bcrypt = require("bcrypt")

async function addSeed(){

    password = await bcrypt.hash("test", 10);

    seed = {
        firstName: 'test',
        lastName: 'test',
        staffId: 'stf000',
        password: password,
        role: 'admin',
        online: false,
        lastSeen: ""
    };

    await addRecord("users", seed);
    console.log("Seed account added");

}

module.exports = { addSeed }
