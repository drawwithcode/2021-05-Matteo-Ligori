let a = 0;
let b = 0;
let message;
let calendario;
//ogni volta che ho una nuova connesisone mando messaggio a server
let clientSocket = io();
//mando messaggio da server a client
clientSocket.on("connect", newConnection);
//quando ricevoquesto messaggio  chiamato mousebroadcast eseguo funzione newbroadcast
clientSocket.on("mouseBroadcast", newBroadcast);

function preload() {
  calendario = loadImage("assets/Untitled-2.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  image(calendario, 0, 0, width, height);
}

function newConnection() {
  console.log(clientSocket.id);
}
//data : incoming information, posso chiamarla come voglio
function newBroadcast(data) {
  console.log(data);
  //disegno un cerchio con le informazioni di data chiamate x e y
  b = b + 1;
  angleMode(DEGREES);
  //translate(data.x, data.y);
  fill("red");
  noStroke();
  circle(data.x, data.y, 5);
}

function mousePressed() {
  a = a + 1;
  angleMode(DEGREES);
  //translate(mouseX, mouseY);
  fill("blue");
  noStroke();
  circle(mouseX, mouseY, 5);
  message = {
    x: mouseX,
    y: mouseY,
  };
  //perinviare messaggio da client a server .emit('nome',contenutto )
  //client manda messaggio chiamato mouse a server contenente variabile message, ovvero la posizione del mouse
  clientSocket.emit("mouse", message);
}

function mouseDragged() {
  a = a + 1;
  angleMode(DEGREES);
  //translate(mouseX, mouseY);
  fill("blue");
  noStroke();
  circle(mouseX, mouseY, 5);
  message = {
    x: mouseX,
    y: mouseY,
  };
  //perinviare messaggio da client a server .emit('nome',contenutto )
  //client manda messaggio chiamato mouse a server contenente variabile message, ovvero la posizione del mouse
  clientSocket.emit("mouse", message);
}

function keyPressed() {
  console.log(key);
}

//mando posizione del mouse al server
/*function mouseMoved() {
  message = {
    x: mouseX,
    y: mouseY,
  };
  //perinviare messaggio da client a server .emit('nome',contenutto )
  //client manda messaggio chiamato mouse a server contenente variabile message, ovvero la posizione del mouse
  clientSocket.emit("mouse", message);
}
*/
