const router = require('express').Router();
const pool = require('../modules/pool');

//Router methods go here =>
    router.get ('/', (req, res) => {
        let queryText = `SELECT * FROM "todos"` 
        pool.query(queryText)
        .then(( results) => {
            //return rows as result:
            res.send (results.rows)
        })
        .catch( (error) => {
            console.log('There has been an error', error)
            res.sendStatus( 400 )
        })
    })

    router.post ('/', (req, res) => {
        let queryText = `INSERT INTO "todos" ( "text", "isComplete") VALUES ( $1, $2 );`; 
        let values = [ req.body.text, req.body.isComplete]
        pool.query(queryText, values)
        .then(( results) => {
            //return rows as result:
            res.send (results.rows)
        })
        .catch( (error) => {
            console.log('There has been an error', error)
            res.sendStatus( 400 )
        })
    })


module.exports = router;
