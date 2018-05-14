// Enemies our player must avoid
var Enemy = function(speed, x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.speed = speed;
    this.x = x;
    this.y = y;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;

    //When the enemy runs off the screen, generate a random starting row and speed and start them over
    if (this.x >= 505) {
        this.y = generateStart();
        this.speed = generateSpeed();
        this.x = -104;
    }

    //Check to see if the enemy occupies the same space as the player
    checkCollisions(this.x, this.y);
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/char-boy.png';
};

// Update the player's position, required method for game
Player.prototype.update = function() {

    //Keep the player on the board
    if (this.x <= -4){
        this.x = -4
    } else if (this.x >= 404){
        this.x = 404;
    } else if (this.y >= 380){
        this.y = 380;
    }

    //Check to see if we won
    if (this.y === -35){
        this.x = 200;
        this.y = 380;
    }
};

// Draw the player on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//This moves the player based on teh kep ressed base on the x and y coordinates
Player.prototype.handleInput = function(arrow) {

    this.arrow = arrow;

    switch (arrow) {
        case 'left':
            this.x -= 102;
            break;
        case 'right':
            this.x += 102;
            break;
        case 'up':
            this.y -= 83;
            break;
        case 'down':
            this.y += 83;
            break;
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
allEnemies = [];

const player = new Player(200, 380);

//I've made the assumption that there will be three enemies
for (let i = 0; i <= 2; i++) {
    allEnemies.push(new Enemy(generateSpeed(), -104, generateStart()));
}

//This generates a random number 1-3 and uses that to pick the starting row
function generateStart(){
    let randomY = Math.floor((Math.random() * 3) + 1);
    let startY = 0;
    switch (randomY) {
        case 1:
            startY = 214;
            break;
        case 2:
            startY = 131;
            break;
        case 3:
            startY = 48;
            break;
    }
    return startY;
}

//This generates a random number 1-3 and uses that to pick the starting speed
function generateSpeed(){
    let randomNum = Math.floor((Math.random() * 3) + 1);
    let startSpeed = 0;
    switch (randomNum) {
        case 1:
            startSpeed = 100;
            break;
        case 2:
            startSpeed = 200;
            break;
        case 3:
            startSpeed = 300;
            break;
    }
    return startSpeed;
}

//This checks to see if the player and enemy are occupying the same space
//I added a padding of 75 to the players x coordinate to compensate for the png width
function checkCollisions(x, y){
    if (player.x < x + 75 && player.x > x - 75 && player.y === y) {
        player.x = 200;
        player.y = 380;
    }

}

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };


    player.handleInput(allowedKeys[e.keyCode]);
});