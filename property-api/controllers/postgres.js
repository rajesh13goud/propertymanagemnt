// const knex = require('knex');
// const {Pool, Client} = require('pg');
// const connectionString = 'postgressql://property:rajesh123@localhost:5432/property'
function postdb(data) {
    let content = data;
    console.log(content);
// const client = new Client({
//     connectionString:connectionString
// })

// client.connect()
// client.query("INSERT into docs('docshash')values('content') ",(err, res)=>{
//     console.log(err,res);
//     client.end()
// })
// db.select('email','docshash').from('docs')
// .then(data =>{
//     const multihash = data[0].hash;
//     if(multihash){
//         return db.select('*').from('users')
//         .where('email','=',email)
//         .then(user =>{
//             //console.log(user);
//             res.json(user[0])
//         })
//         .catch(err => res.status(400).json('unable to get user'))
//     } else {
//         res.status(400).json('Wrong Credentials')
//     }
// })
// .catch(err => res.status(400).json('wrong credentials'))


const {Pool, Client} = require('pg')
// const log = require('./signin');


const pool = new Pool({
    user:"property",
    host:"localhost",
    database:"property",
    password:"rajesh123",
    port:5432
})

// let content = data;
pool.connect();

pool.query("INSERT INTO docs(docshash,date)values($1,$2)",
[content, new Date()],
(err,res) =>{
    if(err){
    console.log(err,res);
    } else {
        console.log('row updated: ')
    }
})

// const {email} = req.body;
// pool.query("SELECT * FROM login where email = ($1)")
// [email]
// let email;
// log.signinHandler({email} = 'email') 
// pool.query("SELECT * FROM login")

// pool.query("SELECT * FROM docs where ('email')")
// pool.query("UPDATE login SET(ipfshash,storedate) = ($1, $2) where email = 'sam@gmail.com'",
// [content, new Date()],
// (err,res) =>{
//     if(err){
//     console.log(err,res);
//     } else {
//         console.log('row updated: ')
//     }
// })
}
module.exports = {
    postdb: postdb
}