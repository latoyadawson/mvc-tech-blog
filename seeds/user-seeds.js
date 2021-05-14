const { User } = require('../models');

const userData = [{
        username: 'Latoya',
        password: 'xxxxxx'

    },
    {
        username: 'Lucy',
        password: 'xxxxxx'
    },
    {
        username: 'Joe',
        password: 'xxxxxx'
    }
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;