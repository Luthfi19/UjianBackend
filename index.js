const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const port = 1998
var db = require('./database')

const app = express()
app.use(bodyParser.json())

app.get('/', (req,res) => {
    res.send(`<h1>Ini Home Page</h1>`)
})



app.get('/category', (req,res) => {
    var sql = `SELECT * from categories`
    db.query(sql, (err,results) => {
        if(err) res.send(err)
        console.log(results)
        res.send(results)
    })
})

app.post('/category', (req,res) => {
    var sql = `INSERT into categories SET ?`
    db.query(sql, req.body, (err,results) => {
        if(err)res.send(err)
        
        sql = `SELECT * from categories`
        db.query(sql, (err,results) => {
            if(err)res.send(err)
            res.send(results)
        })
    })
})

app.delete('/category/:id', (req,res) => {
    var sql = `delete from categories where id=${req.params.id}`
    db.query(sql, (err,results) => {
        if(err) res.send(err)

        var sql = `SELECT * from categories`
        db.query(sql, (err,results) => {
        if(err) res.send(err)
        console.log(results)
        res.send(results)
        })
    })
})

app.put('/category/:id', (req,res) => {
    var sql = `UPDATE categories SET ? WHERE id = ${req.params.id}`
    db.query(sql, req.body, (err, results) => {
        if(err) return res.status(500).send(err)

        sql = `select * from categories`
        db.query(sql, (err,results) =>{
            if(err) res.status(500).send(err);
            console.log(results)
            res.status(200).send(results)
        })
    })
})

app.get('/movie', (req,res) => {
    var sql = `SELECT * from movies`
    db.query(sql, (err,results) => {
        if(err) res.send(err)
        console.log(results)
        res.send(results)
    })
})

app.post('/movie', (req,res) => {
    var sql = `INSERT into movies SET ?`
    db.query(sql, req.body, (err,results) => {
        if(err)res.send(err)
        
        sql = `SELECT * from movies`
        db.query(sql, (err,results) => {
            if(err)res.send(err)
            res.send(results)
        })
    })
})

app.delete('/movie/:id', (req,res) => {
    var sql = `delete from movies where id=${req.params.id}`
    db.query(sql, (err,results) => {
        if(err) res.send(err)

        var sql = `SELECT * from movies`
        db.query(sql, (err,results) => {
        if(err) res.send(err)
        console.log(results)
        res.send(results)
        })
    })
})

app.put('/movie/:id', (req,res) => {
    var sql = `UPDATE movies SET ? WHERE id = ${req.params.id}`
    db.query(sql, req.body, (err, results) => {
        if(err) return res.status(500).send(err)

        sql = `select * from movies`
        db.query(sql, (err,results) =>{
            if(err) res.status(500).send(err);
            console.log(results)
            res.status(200).send(results)
        })
    })
})


app.get('/movcategory', (req,res) => {
    var sql = `select m.nama as namamovie , c.nama as namakategori from movies m 
    join movcat mc on m.id = mc.idmovie 
    join categories c on mc.idcategory = c.id
    order by m.id;`
    db.query(sql, (err,results) => {
        if(err) res.send(err)

        res.send(results)
        console.log(req.params)
    })
})

app.post('/movcategory', (req,res) => {
    var sql = `INSERT into movcat SET ?`
    db.query(sql, req.body, (err,results) => {
        if(err)res.send(err)
        
        var sql = `select m.nama as namamovie , c.nama as namakategori from movies m 
        join movcat mc on m.id = mc.idmovie 
        join categories c on mc.idcategory = c.id
        order by m.id;`
        db.query(sql, (err,results) => {
            if(err)res.send(err)
            res.send(results)
        })
    })
})

app.delete('/movcategory/:delete', (req,res) => {
    console.log(req.params)
    var sql =`delete from movcat where idmovie=${req.query.id[0]} and idcategory = ${req.query.id[1]}`
    db.query(sql, (err,results) => {
        if(err) res.send(err)

        var sql = `select m.nama as namamovie , c.nama as namakategori from movies m 
        join movcat mc on m.id = mc.idmovie 
        join categories c on mc.idcategory = c.id
        order by m.id;`
        db.query(sql, (err,results) => {
        if(err) res.send(err)
        res.send(results)
    })
    })
})

app.listen(port, () => console.log(`API aktif di port ${port}`))