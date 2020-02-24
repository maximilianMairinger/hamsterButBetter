const express = require('express');
const bodyParser = require('body-parser');
const pth = require('path');
const port = 5200;
const app = express();
const chokidar = require('chokidar');
const delay = require("delay")
const { promises: fs } = require("fs")

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


var SSE = require('express-sse');
var sse = new SSE();

app.get('/code-stream', sse.init);

async function sendUpdate(event, path) {
  sse.send({
    event,
    content: event === "remove" ? "" : (await fs.readFile(path)).toString(),
    name: pth.basename(path)
  })
}

const codePath = pth.join(__dirname, "code")

var watcher = chokidar.watch(codePath, {persistent: true});

watcher
  .on('add', function(path) {sendUpdate("add", path)})
  .on('change', function(path) {sendUpdate("change", path)})
  .on('unlink', function(path) {sendUpdate("remove", path)})
  .on('error', function(error) {sendUpdate("error", error)})


function sendFile(res, p) {
  res.sendFile(pth.join(__dirname, p));
}

app.use('/dist', express.static('dist'))
app.use('/res', express.static('res'))

app.get('/', (req, res) => {
  sendFile(res, "index.html")
});


app.post("/code-init", async (req, res) => {
  let a = []


  let paths = await fs.readdir(codePath)
  for (let path of paths) {
    path = pth.join(codePath, path)
    a.push({
      content: (await fs.readFile(path)).toString(),
      name: pth.basename(path)
    })
  }


  res.send(a)
})





app.listen(port);
console.log("Listening on Port: " + port);
