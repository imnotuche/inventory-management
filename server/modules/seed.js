const {addRecord, findRecord} = require("./database")
const bcrypt = require("bcrypt")

async function addSeed(){

    id = await findRecord("users", {staffId: "test"});

    if (id){
        console.log("seed already added");
        return;
    }

    password = await bcrypt.hash("test", 10);

    seed = {
        firstName: 'test',
        lastName: 'test',
        staffId: 'test',
        password: password,
        role: 'admin',
        online: false,
        lastSeen: ""
    };

    await addRecord("users", seed);
    console.log("Seed account added");

}

module.exports = { addSeed }
