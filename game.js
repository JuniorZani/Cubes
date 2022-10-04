//Canvas variables
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

//Cubes
let cube = new Cube(100, 270, 25, 25, "#044B7F");
let enemiesArray = [];

//Enemies attributes
let speed = 5;
let airSpeed = 7;
let score = 0;
const minSpawnTime = 500;
const scoreChangeSpeed = 350;
const averageSpawnTime = 1200;

//Animation and Interval Id's
let animationID;
let timeoutID;
let intervalID;
let interval = function() {
    if(cube.Alive){
        //A cada 2500 pontos a velocidade é incrementada
        score++;
        if(score%scoreChangeSpeed == 0){
            speed++;
        }
        //Verifica se o inimigo está no intervalo de posição do cubo
        enemiesArray.forEach(enemy => {
            if((enemy.positionX + enemy.width >= 100 && enemy.positionX + enemy.width <= 125
                || enemy.positionX >= 100 && enemy.positionX <= 125)){
                if(enemy instanceof GroundEnemy){
                    if(cube.positionY > 230){
                        endGame();
                    }
                } else if(enemy instanceof AirEnemy){
                    if(cube.positionY <= 200 && cube.positionY >= 175){
                        endGame();
                    }
                }
            }
        });
    }
};

//Retorna um número entre 700 e 1500, para ser o tempo de spawn de um novo bloco
function randomSpawmTime(){
    return Math.floor(Math.random()*800) + minSpawnTime;
}

function newEnemy(){
    enemiesArray.push(randomEnemy());
    timeoutID = setTimeout(newEnemy, randomSpawmTime());
}

function randomEnemy(){
    if(Math.random() > 0.5)
        return new GroundEnemy(speed);
    else
        return new AirEnemy(airSpeed);
}

function animate(){
    if(cube.Alive){
        cube.jump();
        enemiesArray.forEach((enemy, index) => {
            enemy.cross();
            //Após o inimigo sair da tela, é deletado
            if(enemy.positionX + enemy.width <= 0){
                //Uso de timeout para sincronismo de movimentação
                setTimeout(() => {
                    enemy.clearPath();
                    enemiesArray.splice(index, 1);
                });   
            }
        });
        setScore();
        animationID = requestAnimationFrame(animate);
    }
}

function setScore(){
    // document.getElementById("score").innerText = score;
    document.getElementById("jogar").innerText = (score + " pts");
}

function alertDeath(){
    alert("Você morreu, pontuação: " + score);
}

function endGame(){
    clearInterval(intervalID);
    clearTimeout(timeoutID);
    cancelAnimationFrame(animationID);
    document.getElementById("jogar").innerText = "Jogar";
    alertDeath();
    deleteAllCubes();
    cube.Alive = false;
    ctx.clearRect(0,0,700,300);
    cube.draw(ctx);
    score = 0;
}

function deleteAllCubes(){
    while(enemiesArray.length != 0){
        enemiesArray.forEach((enemy) => {
            enemy.clearPath();
            enemiesArray.pop();
        });
    }
}

window.addEventListener("keydown", function (){
    if(cube.Alive){
        if(!cube.isJumping){
            cube.isJumping = true;
        }
    } else {
        play();
    }
});

function play(){
    if(!cube.Alive){
        cube.Alive = true;
        animate();
        newEnemy();
        intervalID = setInterval(interval, 50);
    }
}