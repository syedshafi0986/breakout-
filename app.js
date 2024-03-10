
const grid=document.querySelector('.grid')
const btnleft=document.querySelector('.moveleft')
const btnright=document.querySelector('.moveright')
const btnrestart=document.querySelector('.restart')

// console.log(block)
const blockwidth=100;
const blockheight=50;
const boardwidth=560;
const boardheight=400;
const startPosition=[190,10]
const ballposition=[200,60]
let ballcurrentPosition=ballposition;
let curentposition=startPosition;
let xdirection=-2
let ydirection=2
const ballDiameter=25
let timerid
let scorecard=document.querySelector('.score')
function start(){

    class blocks{
        constructor(xaxis,yaxis){
        this.bottomLeft=[xaxis,yaxis]
        this.bottomRight=[xaxis + blockwidth,yaxis]
        this.topleft=[xaxis,yaxis + blockheight]
        this.topRight=[xaxis + blockwidth,yaxis + blockheight]
        // console.log(this.bottomLeft)
        
    }
    
    
}
const blockes=[
    new blocks(10,350),
    new blocks(120,350),
    new blocks(230,350),
    new blocks(340,350),
    new blocks(450,350),
    new blocks(10,300),
    new blocks(120,300),
    new blocks(230,300),
    new blocks(340,300),
    new blocks(450,300),
    new blocks(10,250),
    new blocks(120,250),
    new blocks(230,250),
    new blocks(340,250),
    new blocks(450,250),

]
// console.log(blockes)
function createBlock(){
    for(let i=0;i<blockes.length;i++){
        const block=document.createElement('div')
        block.style.left=blockes[i].bottomLeft[0]+'px'
        block.style.bottom=blockes[i].bottomLeft[1]+'px'
        // block.style.margin='100px'
        block.classList.add('block')
        grid.appendChild(block)

    }
}
createBlock();
const userblock=document.createElement('div')
userblock.classList.add('user')
userposition();
grid.appendChild(userblock)

function userposition(){
    userblock.style.left=curentposition[0]+'px';
    userblock.style.bottom=curentposition[1]+'px';

}
function moveuser(e){
    switch(e.key){
        
        case 'ArrowLeft':
            if(curentposition[0] > 0){
                curentposition[0]-=10;
                userposition()
            }
            break;
            case 'ArrowRight':
                if(curentposition[0] < (560-blockwidth)){
                    curentposition[0]+=10;
                    userposition()
                }
                break;
                
            }
        }
        document.addEventListener('keydown',moveuser)
        function moveleft(){
            if(curentposition[0] > 0){
                curentposition[0]-=10;
                userposition()
            }
            
        }
        function moveright(){
            
            
            if(curentposition[0] < (560-blockwidth)){
                curentposition[0]+=10;
                userposition()
            }
        }
        btnleft.addEventListener('click',moveleft)
        btnright.addEventListener('click',moveright)
        const ball=document.createElement('div')
ball.classList.add('ball')
grid.appendChild(ball)
drawBAll()
function drawBAll(){

    ball.style.left=ballcurrentPosition[0] + 'px'
    ball.style.bottom=ballcurrentPosition[1] + 'px'
}
function moveBAll(){
    ballcurrentPosition[0]+=xdirection;
    ballcurrentPosition[1]+=ydirection;
    drawBAll()
    // changeDirection()
    checkForCollisions()
}
timerid=setInterval(moveBAll,20)
function checkForCollisions(){
    for(let i=0;i<blockes.length;i++){
        if(ballcurrentPosition[0]>blockes[i].bottomLeft[0] && ballcurrentPosition[0]<blockes[i].bottomRight[0] && (ballcurrentPosition[1]+ballDiameter)>blockes[i].bottomLeft[1] && ballcurrentPosition[1]<blockes[i].topleft[1]){
            const allBlock=Array.from(document.querySelectorAll('.block'))
            // console.log(allBlock)
            allBlock[i].classList.remove('block')
            blockes.splice(i,1)
            changeDirection();


        }

    }
    if(
        (ballcurrentPosition[0]>curentposition[0] && ballcurrentPosition[0]<(curentposition[0]+blockwidth) )&& (ballcurrentPosition[1]>curentposition[1] && ballcurrentPosition[1]<(curentposition[1]+blockheight))){
        changeDirection()
    }
    
    
    // console.log('croosed')
    
    if(ballcurrentPosition[0] >= (boardwidth - ballDiameter) || ballcurrentPosition[1] >= (boardheight - ballDiameter) || ballcurrentPosition[0]<=0){
        changeDirection()
        // console.log('croosed')
    }
    if(ballcurrentPosition[1]<=0){
        clearInterval(timerid)
        scorecard.textContent='you loose'
        document.removeEventListener('keydown',moveuser)
        
    }
}
// checkForCollisions()


function changeDirection(){
    if(xdirection===2 && ydirection ===2){
        ydirection= -2;
        return ydirection
    }
    if(xdirection===2 && ydirection ===-2){
        xdirection= -2;
        // xdirection =-2
        return xdirection;
        // return xdirection
    }
    if(xdirection===-2 && ydirection===-2){
        ydirection= 2
        return ydirection;
    }
    if(xdirection===-2 && ydirection===2){
        xdirection= 2
        return xdirection;
    }
}
    }
    start()

