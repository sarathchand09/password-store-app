const PasswordService = function(app) {
  var DataStore = require('nedb');
  var db = new DataStore({filename:'data.db', autoload:true});

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

  app.delete('/delete/:id', (req,res)=>{
    db.remove({_id:req.params.id},{},(err)=> {
      if(err)
        console.log(err);
      res.send({});
    })
  });

  app.post('/update', (req,res)=>{
    db.insert(req.body,(err)=> {
      if(err)
        console.log(err);
      res.send({});
    })
  })
};

exports.PasswordService = PasswordService;
