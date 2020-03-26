let express = require('express');
let cors = require('cors');
let bodyParser = require('body-parser')
const app = express();
const port = 5000;
let PasswordService =  require('./password-service').PasswordService;


app.use(bodyParser.json());
app.use(cors({credentials: true, origin: true}));
console.log(require('path').dirname(require.main.filename));
app.use(express.static(require('path').dirname(require.main.filename)));
//use this wen you run the target electron . when you run without pack
// app.use(express.static('./build'));

new PasswordService(app);
app.listen(port, ()=> console.log('express app on port', port, 'is up and running !!!'));
