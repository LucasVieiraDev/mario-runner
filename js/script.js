document.addEventListener(`DOMContentLoaded`, ()=> {

    // Variaveis para uso da lógica
    const mario = document.querySelector('.mario')
    const pipe = document.querySelector('.pipe')
    var colidiu = false
    var vidas = 3
    const somHit = new Audio();
    somHit.src = "sons/hit-noise.mp3";

    //Variaveis das Paisagem 
    const grama = document.querySelector('.grama')
    const grama2 = document.querySelector('.grama2')
    const moitas = document.querySelector('.moitas')
    const moitas2 = document.querySelector('.moitas2')
    const monte = document.querySelector('.montes')
    const monte2 = document.querySelector('.montes2')
    const mont = document.querySelector('.mont')
    const mont2 = document.querySelector('.mont2')
    const cloud1 = document.querySelector('.cloud1')
    const cloud2 = document.querySelector('.cloud2')
    const telaGameOver = document.querySelector('.tela-game-over')
    const scoreTela = document.querySelector('.score')

    // Pulo do Mario
    function jump() {
        mario.classList.add('jump')
        
        setTimeout(() => {
            mario.classList.remove('jump')
        }, 500)
    }

    // Contagem do score
    var n = 0;
    var l = document.querySelector('.scoreNumber');
    var score = setInterval(
        function(){
        l.innerHTML = n;
        n++
    }, 100);

    //Verificando se o Mario bateu no Pipe
    function testeColisao() {
        
        const pipePosition = pipe.offsetLeft
        const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '')

        if (pipePosition <= 120 && pipePosition > 0 && marioPosition <= 80) {
            colidiu = true  
        } 
    }

    // Diminuindo as vidas quando o Mario bate no Pipe:
    function perdeuVida() {

        
        var nvidas = document.querySelector(`.vida${vidas}`)
        nvidas.src = "img/coracao-partido.png"
        setTimeout(
            function tirarCoracao() {
                nvidas.remove()   
            }, 1000)

        if (colidiu == true) {
            vidas--
        }

    }

    // Game Over qunado o Mario perde todas as vidas:
    function gameOver() {

        const pipePosition = pipe.offsetLeft
        const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '')
        const gramaPosi = grama.offsetLeft
        const grama2Posi = grama2.offsetLeft
        const moitasPosi = moitas.offsetLeft
        const moitas2Posi = moitas2.offsetLeft
        const montePosi = monte.offsetLeft
        const monte2Posi = monte2.offsetLeft
        const montPosi = mont.offsetLeft
        const mont2Posi = mont2.offsetLeft
        const cloudPosi = cloud1.offsetLeft
        const cloud2Posi = cloud2.offsetLeft
        
        if (vidas <= 0) {

            //para o score, mantem o ultmo valor, e coloca ele no meio da tela 
            clearInterval(score)
            l.innerHTML = `${l.value}`
            scoreTela.classList.add('score-meio')
            
            // mostra a tela de game over    
            telaGameOver.style.display = 'flex'

            // Para todos os obijetos em movimento
            pipe.style.animation = 'none'
            pipe.style.left = `${pipePosition}px` 
            mario.style.animation = `none`
            mario.style.bottom = `${marioPosition}px`
            mario.src = `img/mario_lose.png`
        
            grama.style.animation = 'none'
            grama.style.left = `${gramaPosi}px`
            grama2.style.animation = 'none'
            grama2.style.left = `${grama2Posi}px`
        
            moitas.style.animation = 'none'
            moitas.style.left = `${moitasPosi}px`
            moitas2.style.animation = 'none'
            moitas2.style.left = `${moitas2Posi}px`
        
            monte.style.animation = 'none'
            monte.style.left = `${montePosi}px`
            monte2.style.animation = 'none'
            monte2.style.left = `${monte2Posi}px`
        
            mont.style.animation = 'none'
            mont.style.left = `${montPosi}px`
            mont2.style.animation = 'none'
            mont2.style.left = `${mont2Posi}px`
        
            cloud1.style.animation = `none`
            cloud1.style.left = `${cloudPosi}px`
            cloud2.style.animation = `none`
            cloud2.style.left = `${cloud2Posi}px`
        }
        
    }

    function loop() {

        if (colidiu == false) {
            
            testeColisao ()
            setTimeout (loop, 10)

        }
        else {

            perdeuVida()
            gameOver()
            somHit.play()
            colidiu = false

            setTimeout (loop, 400)
            console.log(vidas)
        }
    }

    loop()

    
    document.addEventListener('keydown', jump) 
    document.addEventListener('click', jump) 
    
})
function again() {
    location.reload()
}
/*
Ideias para o jogo:
----------------------
- Fazer aparecer randomicamente novas vidas durante o jogo, assim o jogador pode recuperar vidas perdidas. (talvez seja bom ter um numero maximo de vidas, por exemplo 3 e quando o jogador tiver o numero maximo as vidas pode parar de aparecer ou simplesmente se ele pegar ela com o numero maximo nada acontece)

- Fazer aparecer randomicamente item que dá um bonus de score durante detarminado tempo, durante o bunus o mostrador do score pode mudar de stylo e tbm mostrar o icone de bonus que foi pego, por exemplo uma estrela (maybe) 

- fazer aparecer randomicamente itens negativos que podem fazer o score diminuir ou algo assim (maybe)

Ideias para a aparencia do jogo: 
----------------------------------
- Fazer o nome do jogo aparecer no fundo junto com a paisagem, mas por traz das nuvem quando elas passam, pode ser bonito.
*/