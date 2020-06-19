const PasswordService = function (app) {
    const DataStore = require('nedb');
    const db = new DataStore({filename: 'data.db', autoload: true});

    app.get('/passwords', (req, res) => {
        db.find({}, (err, docs) => {
            res.send(JSON.stringify(docs));
        });
    });

    app.delete('/delete/:id', (req, res) => {
        db.remove({_id: req.params.id}, {}, (err) => {
            if (err) {
                console.log(err);
            }
            res.send({});
        })
    });

    app.delete('/deleteAll', (req, res) => {
        db.remove({}, {multi: true}, (err) => {
            if (err) {
                console.log(err);
            }
            res.send({});
        })
    });

    app.get('/search/:text', (req, res) => {
        let text = req.params.text;
        db.find({title: {"$regex": new RegExp(text, 'i')}}, {multi: true}, (err, docs) => {
            if (err) {
                console.log(err)
            }
            res.send(docs);
        })
    });

    app.post('/update', (req, res) => {
        req.body.lastUpdated = new Date().toDateString();
        if (req.body._id) {
            db.remove({_id: req.body._id}, {multi: true}, err);
        }

        delete req.body._id;

        db.insert(req.body, (err) => {
            if (err) {
                console.log(err);
            }
            res.send({});
        })
    });

    function remove(id) {
        if (id) {
            db.remove({_id: id}, {multi: true}, err);
        }
    }

    function insert(card) {
        db.insert(card, (err) => {
            if (err) {
                console.log(err);
            }
        });
    }

    app.get('/passwords/download', (req, res) => {
        db.find({}, (err, docs) => {
            res.send(JSON.stringify(docs));
        });
    });

    app.post('/passwords/upload', (req, res) => {
        req.body.forEach(card => {
            remove(card._id);
            delete card._id;
            insert(card);
        });
        res.send();
    });

    const err = (error) => {
        if (error) {
            console.log(err);
        }
    }

};

exports.PasswordService = PasswordService;
