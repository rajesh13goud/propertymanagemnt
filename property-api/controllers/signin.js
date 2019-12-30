const postgre = require("./postgres.js"); 
const jwt = require('jsonwebtoken');
const fs = require('fs');
var privateKEY = fs.readFileSync('./certs/Private.key', 'utf8');
var publicKEY = fs.readFileSync('./certs/public.key', 'utf8');

const {Pool, Client} = require('pg');
const pool = new Pool({
    user:"property",
    host:"localhost",
    database:"property",
    password:"rajesh123",
    port:5432
})

const signinHandler = (req, res,db, bcrypt) => {      
const {email, password} = req.body;
console.log('user info',req.body);
if(!email || !password){
    return res.status(400).json('incorrect details')
}
pool.connect();
pool.query("SELECT * from users WHERE email = ($1)",[email],
(err,res) =>{
    console.log(err,res)
    // pool.end()
})
console.log('username',email)

// const token = jwt.signinHandler(req.toJSON(), 'cipher', { expiresIn: "60 days" });
//     req.cookie('users', token, { maxAge: 900000000 })
db.select('email', 'hash').from('login')
.where('email', '=', email)
.then(data => {
    const isValid = bcrypt.compareSync(password, data[0].hash);
    // console.log(isValid);
    if(isValid){
        return db.select('*').from('users')
        .where('email','=',email)
        .then(user =>{
            //console.log(user);
            res.json(user[0])
        })
        
        .catch(err => res.status(400).json('unable to get user'))
    } else {
        res.status(400).json('Wrong Credentials')
    }
})
.catch(err => res.status(400).json('wrong credentials'))

}

module.exports = {
    signinHandler: signinHandler
}