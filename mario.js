console.log(`[LucasDev] Mario Runner - The Game`)

const sprites = new Image();
sprites.src = 'img/sprite-mario.png';
const spriteBack = new Image();
spriteBack.src = 'img/fundo.png';

const canvas = document.querySelector('canvas');
const contexto = canvas.getContext('2d');

let frame = 0

const mario1 = {

    width: 120,
    height: 140,
    xPos: 10,
    yPos: canvas.height - (140 + 70),
    // logica do pulo do mario
    cicloPulo: 0,
    gravidade: 0.5,
    forca: 12,
    jump() {

        if (mario1.cicloPulo < (mario1.forca * 2) - mario1.gravidade) {
            
            if (colisao()) {
                return
            }

            mario1.runSpeed = 8
            mario1.cicloPulo = mario1.cicloPulo + mario1.gravidade
            
            mario1.yPos = mario1.yPos - (mario1.forca - mario1.cicloPulo)
            
        } else {
            this.cicloPulo = 0
            this.runSpeed = 3
        }
    },
    run: [
        {spriteX: 0, spriteY: 0},
        {spriteX: 120, spriteY: 0},
        {spriteX: 240, spriteY: 0},
        {spriteX: 360, spriteY: 0},
        {spriteX: 480, spriteY: 0},
        {spriteX: 600, spriteY: 0},
        {spriteX: 720, spriteY: 0},
        {spriteX: 840, spriteY: 0},
        {spriteX: 960, spriteY: 0},
        {spriteX: 1080, spriteY: 0},
        {spriteX: 1200, spriteY: 0},
        {spriteX: 1320, spriteY: 0}
    ],
    frameAtual: 0,
    runSpeed: 3,
    atualizaFrame(speed) {

        if (colisao()) {
            console.log('Mario bateu no cano')
            return
        }

        speed = this.runSpeed

        if (frame % speed == 0){
            const incremento = mario1.frameAtual + 1
            mario1.frameAtual = incremento % mario1.run.length
        }
    },
    draw () {
        const { spriteX, spriteY} =  mario1.run[mario1.frameAtual]

        contexto.drawImage(
            sprites,     //image
            spriteX, spriteY,        // onde vai buscar a imagem (x e y)
            mario1.width, mario1.height,    // tamanha do recorte na sprite
            mario1.xPos, mario1.yPos,      // onde vai ser desenhado no canvas
            mario1.width, mario1.height     // tamanha dentro do canvas
        )
    }
}

const pipe = {

    spriteX: 10,
    spriteY: 157,
    width: 80,
    height: 80,
    xPos: canvas.width - 80,
    yPos: canvas.height - (80 + 70),
    movSpeed: 8,
    movimento() {

        if (colisao()) {
            return
        }

        if (pipe.xPos > -80){
            pipe.xPos = pipe.xPos - pipe.movSpeed
        } else {
            pipe.xPos = canvas.width + pipe.width
        }
    },
    draw () {
        contexto.drawImage(
            sprites,     //image
            pipe.spriteX, pipe.spriteY,        // onde vai buscar a imagem (x e y)
            pipe.width, pipe.height,    // tamanha do recorte na sprite
            pipe.xPos, pipe.yPos,      // onde vai ser desenhado no canvas
            pipe.width, pipe.height     // tamanha dentro do canvas
            )
        }
}

const floor = {

    spriteX: 0,
    spriteY: 950,
    width: 1023,
    height: 176,
    xPos: 0,
    yPos: canvas.height - 176,
    draw () {
        contexto.drawImage(
            spriteBack,     //image
            floor.spriteX, floor.spriteY,        // onde vai buscar a imagem (x e y)
            floor.width, floor.height,    // tamanha do recorte na sprite
            floor.xPos, floor.yPos,      // onde vai ser desenhado no canvas
            floor.width, floor.height     // tamanha dentro do canvas
        )
        contexto.drawImage(
            spriteBack,     //image
            floor.spriteX, floor.spriteY,        // onde vai buscar a imagem (x e y)
            floor.width, floor.height,    // tamanha do recorte na sprite
            floor.xPos + floor.width, floor.yPos,      // onde vai ser desenhado no canvas
            floor.width, floor.height     // tamanha dentro do canvas
        )
    },
    movSpeed: 8,
    movimento() {
        if (colisao()) {
            return
        }
        const movimetacao = floor.xPos - floor.movSpeed
        floor.xPos = movimetacao % floor.width
    }
}

const thicket = {

    spriteX: 0,
    spriteY: 774,
    width: 1023,
    height: 127,
    xPos: 0,
    yPos: canvas.height - (floor.height + 50),
    draw () {
        contexto.drawImage(
            spriteBack,     //image
            thicket.spriteX, thicket.spriteY,        // onde vai buscar a imagem (x e y)
            thicket.width, thicket.height,    // tamanha do recorte na sprite
            thicket.xPos + thicket.width, thicket.yPos,      // onde vai ser desenhado no canvas
            thicket.width, thicket.height     // tamanha dentro do canvas
        )
        contexto.drawImage(
            spriteBack,     //image
            thicket.spriteX, thicket.spriteY,        // onde vai buscar a imagem (x e y)
            thicket.width, thicket.height,    // tamanha do recorte na sprite
            thicket.xPos, thicket.yPos,      // onde vai ser desenhado no canvas
            thicket.width, thicket.height     // tamanha dentro do canvas
        )
    },
    movSpeed: 5,
    movimento() {
        if (colisao()) {
            return
        }
        const movimetacao = thicket.xPos - thicket.movSpeed
        thicket.xPos = movimetacao % thicket.width
    }
}

const hill = {

    spriteX: 0,
    spriteY: 595,
    width: 1023,
    height: 135,
    xPos: 0,
    yPos: canvas.height - (floor.height + 100),
    draw () {
        contexto.drawImage(
            spriteBack,     //image
            hill.spriteX, hill.spriteY,        // onde vai buscar a imagem (x e y)
            hill.width, hill.height,    // tamanha do recorte na sprite
            hill.xPos, hill.yPos,      // onde vai ser desenhado no canvas
            hill.width, hill.height     // tamanha dentro do canvas
        )
        contexto.drawImage(
            spriteBack,     //image
            hill.spriteX, hill.spriteY,        // onde vai buscar a imagem (x e y)
            hill.width, hill.height,    // tamanha do recorte na sprite
            hill.xPos + hill.width, hill.yPos,      // onde vai ser desenhado no canvas
            hill.width, hill.height     // tamanha dentro do canvas
        )
    },
    movSpeed: 3,
    movimento() {
        if (colisao()) {
            return
        }
        const movimetacao = hill.xPos - hill.movSpeed
        hill.xPos = movimetacao % hill.width
    }
}

const mountain = {

    spriteX: 0,
    spriteY: 0,
    width: 1023,
    height: 510,
    xPos: 0,
    yPos: 0,
    draw () {
        contexto.drawImage(
            spriteBack,     //image
            mountain.spriteX, mountain.spriteY,        // onde vai buscar a imagem (x e y)
            mountain.width, mountain.height,    // tamanha do recorte na sprite
            mountain.xPos, mountain.yPos,      // onde vai ser desenhado no canvas
            mountain.width, mountain.height     // tamanha dentro do canvas
        )
        contexto.drawImage(
            spriteBack,     //image
            mountain.spriteX, mountain.spriteY,        // onde vai buscar a imagem (x e y)
            mountain.width, mountain.height,    // tamanha do recorte na sprite
            mountain.xPos + mountain.width, mountain.yPos,      // onde vai ser desenhado no canvas
            mountain.width, mountain.height     // tamanha dentro do canvas
        )   
    },
    movSpeed: 0.5,
    movimento() {
        if (colisao()) {
            return
        }
        const movimetacao = mountain.xPos - mountain.movSpeed
        mountain.xPos = movimetacao % mountain.width
    }
}

const score = {
    pontuação: 0,
    draw() {
        contexto.font = '20px arial'
        contexto.fillText(`Score: ${this.pontuação}`, canvas.width - 200, 50)  
    },
    atualiza() {
        
        if (colisao()) {
            return
        }

        this.pontuação = this.pontuação + 1
    }
}

// logica Mario batendo no cano
function colisao() {
    const marioFront = mario1.xPos + (mario1.width - 5)
    const canoFront = pipe.xPos
    const marioFeet = mario1.yPos + (mario1.height - 0)
    const canoTop = pipe.yPos + 20
    const marioBack = mario1.xPos + 10
    const canoBack = pipe.xPos + pipe.width

    if (marioFront >= canoFront && marioFeet >= canoTop && marioBack <= canoBack) {

        /*mario1.run[0].spriteX = 100
        mario1.run[0].spriteY = 135
        mario1.frameAtual = 0*/

        return true
    }
    return false
}

function loop() {

    frame++
    mario1.atualizaFrame()

    mountain.draw();
    hill.draw();
    thicket.draw();
    floor.draw();
    pipe.draw();
    mario1.draw();
    score.draw()
    score.atualiza()


    //lógica do pulo
    document.addEventListener('keydown', mario1.jump)

    if (mario1.cicloPulo != 0) {
        mario1.jump()
    }

    pipe.movimento();
    floor.movimento();
    thicket.movimento();
    hill.movimento();
    mountain.movimento()
    colisao()

    requestAnimationFrame(loop);    
};

loop();