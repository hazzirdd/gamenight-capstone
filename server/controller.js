// require('dotenv').config()
const Sequelize = require('sequelize')

// const {CONNECTION_STRING} = process.env;

const sequelize = new Sequelize(`postgres://pvontandipaiyq:9f194c4d74f76fb0b02558fb65f97599ffedffcde14ada501a4e2d3d27740ee6@ec2-54-80-123-146.compute-1.amazonaws.com:5432/d8htoujljp95ga
`, {
    dialect:'postgres',
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false,
        }
    }
});

// let tableCounter = require('./db.json')

module.exports = {
    getBoardgames: (req, res) => {
        // console.log(req.params)
        sequelize.query(`
        SELECT * FROM boardgames
        ORDER BY title ASC
        `)
        .then((dbRes) => {
            res.status(200).send(dbRes[0]);
        })
        .catch((err) => {
            console.log(err);
        })
    },

    createPopUp: (req, res) => {
        const {id} = req.params

        sequelize.query(`
        SELECT * FROM boardgames
        WHERE boardgame_id = ${id}
        `)
        .then((dbRes) => {
            res.status(200).send(dbRes[0]);
        })
        .catch((err) => {
            console.log(err);
        })
    },

    createPopUpEx: (req, res) => {
        const {id} = req.params

        sequelize.query(`
        SELECT * FROM expansions
        WHERE expansion_id = ${id}
        `)
        .then((dbRes) => {
            res.status(200).send(dbRes[0]);
        })
        .catch((err) => {
            console.log(err);
        })
    },

    sortByTitle: (req, res) => {
        sequelize.query(`
        SELECT * FROM boardgames
        ORDER BY title
        `)
        .then((dbRes) => {
            res.status(200).send(dbRes[0])
        })
        .catch((err) => {
            console.log(err)
        })
    },

    sortByGenre: (req, res) => {
        sequelize.query(`
        SELECT * FROM boardgames
        ORDER BY genre
        `)
        .then((dbRes) => {
            res.status(200).send(dbRes[0])
        })
        .catch((err) => {
            console.log(err)
        })
    },

    sortByPublisher: (req, res) => {
        sequelize.query(`
        SELECT * FROM boardgames
        ORDER BY publisher
        `)
        .then((dbRes) => {
            res.status(200).send(dbRes[0])
        })
        .catch((err) => {
            console.log(err)
        })
    },

    sortByYear: (req, res) => {
        sequelize.query(`
        SELECT * FROM boardgames
        ORDER BY year DESC
        `)
        .then((dbRes) => {
            res.status(200).send(dbRes[0])
        })
        .catch((err) => {
            console.log(err)
        })
    },   

    addToTable: (req, res) => {
        // console.log(req.body)
        const {id, image} = req.body

        sequelize.query(`
        INSERT INTO tabletop (boardgame_id, tabletop_image)
        VALUES (${id}, '${image}')
        `)
        .then((dbRes) => {
            res.status(200).send(dbRes[0])
        })
        .catch((err) => {
            console.log(err)
        })
    },

    getTableTopGames: (req, res) => {
        sequelize.query(`
        SELECT * FROM tabletop
        `)
        .then((dbRes) => {
            res.status(200).send(dbRes[0]);
        })
        .catch((err) => {
            console.log(err);
        })
    },

    tableCounter: (req, res) => {
       sequelize.query(`
       SELECT COUNT (tabletop_id)
       FROM tabletop
       `)
       .then((dbRes) => {
            res.status(200).send(dbRes[0]);
        })
        .catch((err) => {
            console.log(err);
        })
    },

    clearTable: (req, res) => {
        sequelize.query(`
        DELETE FROM tabletop
        `)
        .then((dbRes) => {
            res.status(200).send(dbRes[0])
        })
        .catch((err) => {
            console.log(err)
        })
    },

    requestGame: (req, res) => {
        const { requestTitle, requestee } = req.body

        sequelize.query(`
        INSERT INTO game_requests (title, requestee)
        VALUES ('${requestTitle}', '${requestee}')
        `)

        .then((dbRes) => {
            res.status(200).send(dbRes[0])
        })
        .catch((err) => {
            console.log(err)
        })
    },

    getRequests: (req, res) => {
        sequelize.query(`
        SELECT * FROM game_requests
        ORDER BY title ASC
        `)
        .then((dbRes) => {
            res.status(200).send(dbRes[0])
        })
        .catch((err) => {
            console.log(err)
        })
    },

    loginCheck: (req, res) => {
        sequelize.query(`
        SELECT * FROM gamenight_users
        `)
        .then((dbRes) => {
            res.status(200).send(dbRes[0]);
        })
        .catch((err) => {
            console.log(err);
        })
    },

    createUser: (req, res) => {

        const {username, password} = req.body

        sequelize.query(`
        INSERT INTO gamenight_users(username, password)
        VALUES ('${username}', '${password}')
        `)
        .then((dbRes) => {
            res.status(200).send(dbRes[0]);
        })
        .catch((err) => {
            console.log(err);
        })
    },

    getExpansions: (req, res) => {
        sequelize.query(`
        SELECT * FROM expansions
        ORDER BY title ASC
        `)
        .then((dbRes) => {
            res.status(200).send(dbRes[0]);
        })
        .catch((err) => {
            console.log(err);
        })
    }
}