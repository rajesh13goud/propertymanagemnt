//const multer = require('multer');
//const jwt = require('jsonwebtoken');
//const ocr = require('./ocr');
//const ipfs = require('./ipfs');
//const cookieParser = require('cookie-parser');
//var upload = multer();
const imageHandler = ((req, res,db) => {
    const {id} = req.body;
            db('users').where('id', '=',id)
            .increment('entries',1)
            .returning('entries')
            .then(entries => {
                console.log(entries);
            })
            .catch(err => res.status(400).json('not found'))
})

module.exports = {
    imageHandler: imageHandler
};




















































//    const up = (upload.single('file1'), function (req, res) {
//        db.files(upl =>{
//            upl.insert({
//                up: up
//            })
//        })
//         console.log(req.files);
//     })
//     // post('/image', upload.any(), function (req, res) {
//     //     var cookie = req.cookies;
//     //     var db;
//     //     console.log(cookie.any)
//     //     jwt.verify(cookie.any, "cipher", function (err, use) {
//     //         if (err) {
//     //             console.log(err.message);
//     //             res.render('wrong info');
//     //         }
//     //         else if (use) {
//     //             db = use;
//     //             console.log(use);
//     //         }
//     const {id} = req.body;
//     db('users').where('id','=',id)
//     .increment('entries', 1)
//     .returning('entries')
//     .then(entries => {
//         res.json(entries[0])
//     })
//     .catch(err => res.status(400).json('unable to get the count'))
//     let found = false;
//     database.users.forEach(user =>{
//         if(user.id === id){
//             found = true;
//             user.entries++
//             return res.json(user.entries);
//         }
//     })
//     if(!found){
//         res.status(400).json('not found');
//     }
 
