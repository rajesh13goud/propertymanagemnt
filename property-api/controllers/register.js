const registerHandler = (req, res, db, bcrypt) =>{
    const {email, name, password, mobile} = req.body;
    if(!email || !name || !password || !mobile){
        return res.status(400).json('incorrect form submission')
    }
    console.log('details',req.body);
    const _hash = bcrypt.hashSync(password);
    db.transaction(trx => {
        trx.insert({
            hash: _hash,
            email: email
        })
        .into('login')
        .returning('email')
        .then(loginEmail =>{
           return trx('users')
            .returning('*')
            .insert({
                email: loginEmail[0],
                name: name,
                mobile: mobile,
                joined: new Date()
            })
            .then(user =>{
                res.json(user[0]);
            })
        })
        .then(trx.commit)
        .catch(trx.rollback)
    })                                                                   
    .catch(err => res.status(400).json(err))
    
}

module.exports = {
    registerHandler: registerHandler
}

