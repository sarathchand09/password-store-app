var file = require("fs");
var uuidv1 = require("uuid/v1");

function onSubmit() {
  let message = getMessage();
  write();
  read();
};

function search() {
  let search = document.getElementById('search').value;
  let search_updated = (search && search.trim.length === 0)
    ? search
    : '-Nothing-';
  document.getElementById('search-span').innerText = search_updated;
};

function write() {
  file.appendFile("passwords.json", JSON.stringify(message, null, 2), function(err) {
    if (err)
      console.log(err)
  });
};

function read() {
  file.readFile("passwords.json", function(err, buf) {
    console.log(JSON.parse(buf.toString()).id);
    console.log(JSON.parse(buf.toString()).title);
  });
};

function getMessage() {
  let message = {};
  // this uuid is genreated based on time v1 = is for time.
  message.id = uuidv1();
  message.title = document.getElementById('title').innerText;
  message.username = document.getElementById('username').innerText;
  message.password = document.getElementById('password').innerText;
  message.lastUpdated = document.getElementById('lastUpdated').innerText;
  message.description = document.getElementById('description').innerText;
  return message;
}
