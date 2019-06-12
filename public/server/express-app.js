var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser')
const app = express();
const port = 5000;
var PasswordService =  require('./password-service').PasswordService;


app.use(bodyParser.json());
app.use(cors({credentials: true, origin: true}));
app.use(express.static('./build'));

new PasswordService(app);
app.listen(port, ()=> console.log('express app on port ${port} is up and running !!!'));
