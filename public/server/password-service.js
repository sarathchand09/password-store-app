const PasswordService = function (app) {
  var DataStore = require('nedb');
  var db = new DataStore({filename: 'data.db', autoload: true});

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
  })

  const err = (error) => {
    if (error) {
      console.log(err);
    }
  }

};

exports.PasswordService = PasswordService;
