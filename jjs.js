var canvas = document.getElementById("snake");
var canvas2d = canvas.getContext("2d");
canvas.width = 400;
canvas.height = 400;

// Ular pertama
var snake1Segments = [];
var snake1Length = 30;
var snake1X = 50;
var snake1Y = 50;
var snake1DirectionX = 0;
var snake1DirectionY = 10;

// Ular kedua
var snake2Segments = [];
var snake2Length = 30;
var snake2X = 100;
var snake2Y = 100;
var snake2DirectionX = 0;
var snake2DirectionY = 10;

var snake3Segments = [];
var snake3Length = 30;
var snake3X = 200;
var snake3Y = 200;
var snake3DirectionX = 0;
var snake3DirectionY = 10;

// Kontrol untuk ular pertama
document.onkeydown = function(event) {
    switch (event.keyCode) {
        case 37: // Left arrow
            if (snake1DirectionX === 0) {
                snake1DirectionX = -10;
                snake1DirectionY = 0;
            }
            break;
        case 38: // Up arrow
            if (snake1DirectionY === 0) {
                snake1DirectionX = 0;
                snake1DirectionY = -10;
            }
            break;
        case 39: // Right arrow
            if (snake1DirectionX === 0) {
                snake1DirectionX = 10;
                snake1DirectionY = 0;
            }
            break;
        case 40: // Down arrow
            if (snake1DirectionY === 0) {
                snake1DirectionX = 0;
                snake1DirectionY = 10;
            }
            break;
    }
};

// Fungsi untuk mengubah arah ular secara acak
function randomDirection() {
    var directions = [
        { x: 10, y: 0 },   // Right
        { x: -10, y: 0 },  // Left
        { x: 0, y: 10 },   // Down
        { x: 0, y: -10 }   // Up
    ];
    var randomIndex = Math.floor(Math.random() * directions.length);
    return directions[randomIndex];
}

// Mengubah arah ular kedua secara acak setiap 2 detik
setInterval(function() {
    var newDirection = randomDirection();
    if (snake2DirectionX === 0 && newDirection.x !== 0) {
        snake2DirectionX = newDirection.x;
        snake2DirectionY = newDirection.y;
    } else if (snake2DirectionY === 0 && newDirection.y !== 0) {
        snake2DirectionX = newDirection.x;
        snake2DirectionY = newDirection.y;
    }
}, 2000);

setInterval(function() {
    var newDirection = randomDirection();
    if (snake3DirectionX === 0 && newDirection.x !== 0) {
        snake3DirectionX = newDirection.x;
        snake3DirectionY = newDirection.y;
    } else if (snake2DirectionY === 0 && newDirection.y !== 0) {
        snake3DirectionX = newDirection.x;
        snake3DirectionY = newDirection.y;
    }
}, 2000);

function moveSnake(snakeX, snakeY, directionX, directionY, segments, length) {
    segments.unshift({ x: snakeX, y: snakeY });
    snakeX += directionX;
    snakeY += directionY;

// Jika ular keluar dari batas, kembali ke sisi yang berlawanan
if (snakeX >= canvas.width) snakeX = 0;
if (snakeX < 0) snakeX = canvas.width - 10;
if (snakeY >= canvas.height) snakeY = 0;
if (snakeY < 0) snakeY = canvas.height - 10;

while (segments.length > length) {
segments.pop();
}

return { snakeX, snakeY };
}

function drawSnake(segments, color) {
canvas2d.fillStyle = color;
for (var i = 0; i < segments.length; i++) {
canvas2d.fillRect(segments[i].x, segments[i].y, 10, 10);
}
}

function gameLoop() {
// Pindahkan ular pertama
var snake1Position = moveSnake(snake1X, snake1Y, snake1DirectionX, snake1DirectionY, snake1Segments, snake1Length);
snake1X = snake1Position.snakeX;
snake1Y = snake1Position.snakeY;

// Pindahkan ular kedua
var snake2Position = moveSnake(snake2X, snake2Y, snake2DirectionX, snake2DirectionY, snake2Segments, snake2Length);
snake2X = snake2Position.snakeX;
snake2Y = snake2Position.snakeY;

// Pindahkan ular kedua
var snake3Position = moveSnake(snake3X, snake3Y, snake3DirectionX, snake3DirectionY, snake3Segments, snake3Length);
snake3X = snake3Position.snakeX;
snake3Y = snake3Position.snakeY;

// Gambar ular
canvas2d.clearRect(0, 0, canvas.width, canvas.height);
drawSnake(snake1Segments, "black"); // Ular pertama berwarna hijau
drawSnake(snake2Segments, "blue");   // Ular kedua berwarna merah
drawSnake(snake3Segments, "red");
// Jalankan loop permainan
setTimeout(gameLoop, 100);
}

gameLoop(); // Mulai permainan
