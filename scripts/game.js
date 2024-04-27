let config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

let game = new Phaser.Game(config);

//Variable
let player, goal, cursors, textScore, score, style;



function preload ()
{
    //List of Preload of the Assets to the game
    this.load.image("character","assets/images/character.png");
    this.load.image("background", "assets/images/Background.png");
    this.load.image("goal", "assets/images/cat.png");
}

function create ()
{
    this.add.image( 0, 0, "background").setOrigin(0,0); // Creating the background

    player = this.physics.add.sprite(-100, 454, "character"); //Creating the Characters model or Spritesheet

    player.setBounce(0);
    player.setCollideWorldBounds(true); //Collides with world boundaries
    player.setScale(0.5); // Resizing the Model

    goal = this.physics.add.sprite(730, 495, "goal"); //Creating the Goal model
    goal.setScale(0.26);
    
    score = 0; // Display The score
    style = {font: "40px Arial", fill: '#000'};
    textScore = this.add.text(16, 16, "Score: ", style);
    
    cursors = this.input.keyboard.createCursorKeys(); 
}
function update ()
{   
    //movement of the player
    if(cursors.left.isDown)
    {
        player.x -= 2;
        player.flipX = true;
    }
    if(cursors.right.isDown)
    {
        player.x += 2;
        player.flipX = false;
    }
    //if(cursors.up.isDown)
    //{
        //player.y -=2;
    //}
    //if(cursors.down.isDown)
   // {
       //player.y +=2;
    //}

    // Check for overlap between the player and goal to win the game
    this.physics.add.overlap(player, goal, WinGame);
}

function WinGame ()
{
    // Increase the score
    score += 50;
    textScore.setText("Score: " + score);// Update the displayed score
    goal.disableBody(true, true);// Disable the goal's physics body and hide it
    alert("You Catch the cat, You Won the Game!!!");    
}
