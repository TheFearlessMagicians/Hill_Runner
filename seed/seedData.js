//Faker set up
let faker = require("faker");

let usersList = [{
        name: "Varun Narayanan",
        email: "vchakravarthy21@g.ucla.edu",
        username: "varun1729",
        password: faker.internet.password(),
        address: "A5 Canyon Point, Sunset Village, UCLA",
        coordinates: [-118.45101239999997, 34.0734057],
        level: 1,
		moneyEarned: 0,
		experience: 0,
    },
    {
        name: "Wilson Jusuf",
        email: "wilsonjusuf@g.ucla.edu",
        username: "willyspinn",
        password: faker.internet.password(),
        address: "C1 Courtside, Sunset Village, UCLA",
        coordinates: [-118.45105039999999, 34.0729717],
        level: 1,
		moneyEarned: 0,
		experience: 0,
    },
];
module.exports = usersList;