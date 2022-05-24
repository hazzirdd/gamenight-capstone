require('dotenv').config()
const Sequelize = require('sequelize')

const {CONNECTION_STRING} = process.env;

const sequelize = new Sequelize(CONNECTION_STRING, {
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
    }
}