class Cube {
    //Aspect attributes
    positionX;
    positionY;
    height;
    width;
    color;

    //Jump Attributes
    jumpSpeed;
    currentFrame;
    jumpHeight
    isJumping;

    Alive = false;
    
    constructor(x, y, width, height, color) {
        this.positionX = x;
        this.positionY = y;
        this.width = width;
        this.height = height;
        this.color = color;

        this.jumpSpeed = 10;
        this.currentFrame = 0;
        this.jumpFrames = 32;
        this.isJumping = false;
        
        this.draw(ctx);
    }

    //Functions that makes the animation of the Cube
    jump(){
        if(this.isJumping){
            cube.clearPath();
            if(this.currentFrame < (cube.jumpFrames/2)){
                cube.positionY -= cube.jumpSpeed;
            } else{
                cube.positionY += cube.jumpSpeed;
            }
            cube.draw(ctx);
            this.currentFrame++;
            if(this.currentFrame == cube.jumpFrames){
                this.currentFrame = 0;
                cube.isJumping = false;
            }
        }
    }

    clearPath(){
        ctx.clearRect(this.positionX, this.positionY, this.width, this.height);
    }

    draw(ctx){
        ctx.fillStyle = this.color;
        ctx.fillRect(this.positionX, this.positionY, this.width, this.height);
    };
}

class GenericEnemy{
    //Aspect Attributes
    positionX;
    positionY;
    height;
    width;
    color;
    killedCube;

    constructor(x, y, width, height) {
        this.positionX = x;
        this.positionY = y;
        this.width = width;
        this.height = height;
    }
}

class GroundEnemy extends GenericEnemy{
    //Cross Attributes
    crossDistance;
    speed;

    constructor(speed) {
        let x = 720;
        super(x, 255, 40, 40);
        this.color = "#95190c";
        this.crossDistance = x + this.width;
        this.speed = speed
        this.draw(ctx);
    }

    //Functions that makes the animation of the enemy
    cross(){
        this.clearPath();
        this.positionX -= this.speed;
        this.draw(ctx);
    }

    clearPath(){
        ctx.clearRect(this.positionX, this.positionY, this.width, this.height);
    }

    draw(ctx){
        ctx.fillStyle = this.color;
        ctx.fillRect(this.positionX, this.positionY, this.width, this.height);
    };
}

class AirEnemy extends GenericEnemy{
    //Cross Attributes
    crossDistance;
    speed;

    constructor(speed) {
        super(720, 200, 30, 10);
        this.color = "#610345";
        this.crossDistance = 720 + this.width;
        this.speed = speed
        this.draw(ctx);
    }

    //Functions that makes the animation of the enemy
    cross(){
        this.clearPath();
        this.positionX -= this.speed;
        this.draw(ctx);
    }

    clearPath(){
        ctx.clearRect(this.positionX, this.positionY, this.width, this.height);
    }

    draw(ctx){
        ctx.fillStyle = this.color;
        ctx.fillRect(this.positionX, this.positionY, this.width, this.height);
    };
}