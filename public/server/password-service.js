const PasswordService = function (app) {
  var DataStore = require('nedb');
  var db = new DataStore({filename: 'data.db', autoload: true});

  app.get('/passwords', (req, res) => {
    // db.remove({}, { multi: true }, function (err, numRemoved) { });
    // db.insert(data, (err, newDoc) => {
    //   if (err)
    //     console.log(err);
    //   }
    // );
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
    if (req.body._id) {
      db.find({_id: req.body._id}, {multi: false}, (err, docs) => {
        if (docs) {
          db.remove({_id: req.body._id}, {multi:true}, (err) => {
            if (err) {
              console.log(err);
            }
          });
        }
      })
    }
   delete req.body._id ;
    db.insert(req.body, (err) => {
      if (err) {
        console.log(err);
      }
      res.send({});
    })
  })
};

exports.PasswordService = PasswordService;
