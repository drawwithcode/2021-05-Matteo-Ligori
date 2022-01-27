console.log("up and running ");
//loaded express
let express = require("express");
//attivo express
let app = express();
//definisco numero porta se non uso heroku, in quel caso eseguilo su proces.env.PORT
let port = process.env.PORT || 3000;
//la connessione avviene nella porta 3000
let server = app.listen(port);

console.log("server is runnning on http://localhost:" + port);

//dico di aprire la cartella public come app
app.use(express.static("public"));
//aggiungo libreria socket.io
let serverSocket = require("socket.io");
//io: è come chiamo il server
let io = serverSocket(server);
//preparo il server a legere le informazioni riguardanti l'accesso di nuovi id
io.on("connection", newConnection);
//quando ho una nuova connessione eseguo questa funzione
//tutte le cose che avvengono in relazione a nuove connessioni
//newsocket=sono le azioni compiute dal client
function newConnection(newSocket) {
  console.log(newSocket.id);
  //quando ricevo un messaggio chiamato mouse eseguo funzione mouseMessage
  newSocket.on("mouse", mouseMessage);

  function mouseMessage(dataRecived) {
    //stampo i dati ricevuti
    console.log(dataRecived);
    //quando ricevo un messaggio da un client eseguo mousemessage
    //invio questa informazione a tutti i client
    //broadcast: manda messaggio a tutti tranne a chi manda l'informazione
    //emit('nome messaggio', contenuto)
    newSocket.broadcast.emit("mouseBroadcast", dataRecived);
  }
}
/*
function setup (){

}

function draw (){

}

*/
