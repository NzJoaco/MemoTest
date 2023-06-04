
const imagenes = ['<i class="fa-sharp fa-solid fa-heart"></i>','<i class="fa-sharp fa-solid fa-bomb"></i>','<i class="fa-sharp fa-solid fa-music"></i>','<i class="fa-sharp fa-solid fa-bolt"></i>','<i class="fa-sharp fa-solid fa-heart"></i>','<i class="fa-sharp fa-solid fa-bomb"></i>','<i class="fa-sharp fa-solid fa-music"></i>','<i class="fa-sharp fa-solid fa-bolt"></i>']
const imagenesMedio = ['<i class="fa-sharp fa-solid fa-heart"></i>','<i class="fa-sharp fa-solid fa-bomb"></i>','<i class="fa-sharp fa-solid fa-music"></i>','<i class="fa-sharp fa-solid fa-bolt"></i>','<i class="fa-sharp fa-solid fa-hippo"></i>','<i class="fa-sharp fa-solid fa-mug-hot"></i>','<i class="fa-sharp fa-solid fa-ghost"></i>','<i class="fa-sharp fa-solid fa-umbrella"></i>','<i class="fa-sharp fa-solid fa-heart"></i>','<i class="fa-sharp fa-solid fa-bomb"></i>','<i class="fa-sharp fa-solid fa-music"></i>','<i class="fa-sharp fa-solid fa-bolt"></i>','<i class="fa-sharp fa-solid fa-hippo"></i>','<i class="fa-sharp fa-solid fa-mug-hot"></i>','<i class="fa-sharp fa-solid fa-ghost"></i>','<i class="fa-sharp fa-solid fa-umbrella"></i>']
const imagenesDificil = ['<i class="fa-sharp fa-solid fa-heart"></i>','<i class="fa-sharp fa-solid fa-bomb"></i>','<i class="fa-sharp fa-solid fa-music"></i>','<i class="fa-sharp fa-solid fa-bolt"></i>','<i class="fa-sharp fa-solid fa-hippo"></i>','<i class="fa-sharp fa-solid fa-mug-hot"></i>','<i class="fa-sharp fa-solid fa-ghost"></i>','<i class="fa-sharp fa-solid fa-umbrella"></i>','<i class="fa-sharp fa-solid fa-heart"></i>','<i class="fa-sharp fa-solid fa-bomb"></i>','<i class="fa-sharp fa-solid fa-music"></i>','<i class="fa-sharp fa-solid fa-bolt"></i>','<i class="fa-sharp fa-solid fa-hippo"></i>','<i class="fa-sharp fa-solid fa-mug-hot"></i>','<i class="fa-sharp fa-solid fa-ghost"></i>','<i class="fa-sharp fa-solid fa-umbrella"></i>','<i class="fa-sharp fa-solid fa-flask"></i>','<i class="fa-sharp fa-solid fa-lock"></i>','<i class="fa-sharp fa-solid fa-fire"></i>','<i class="fa-sharp fa-solid fa-plane"></i>','<i class="fa-sharp fa-solid fa-flask"></i>','<i class="fa-sharp fa-solid fa-lock"></i>','<i class="fa-sharp fa-solid fa-fire"></i>','<i class="fa-sharp fa-solid fa-plane"></i>']
const trasera = '<i class="fa-sharp fa-solid fa-question"></i>'
const tableroEl = document.getElementById('tablero')
const btnFacilEl = document.querySelector('.facil')
const btnMedioEl = document.querySelector('.medio')
const btnDificilEl = document.querySelector('.dificil')
const btnNuevoJuegoEl = document.querySelector('.nuevo-juego')
const ganadorEl = document.querySelector('.winner')
const btnTryAgainEl = document.getElementById('btnPlayAgain')
const timerEl = document.querySelector('.timer')
let cartasSelec = []
let dificultades
let contador
let timer



//boton nuevo juego

btnNuevoJuegoEl.addEventListener("click", () => {

    switch (dificultades) {
        case 'facil':
            generarTablero(imagenes)
            tableroEl.classList.remove("tablero-dificil")
            cartasSelec = []
            contador = 4
            break;
            
            case 'medio':
                generarTablero(imagenesMedio)
                tableroEl.classList.remove("tablero-dificil")
                cartasSelec = []
                contador = 8
                break;
                
                case 'dificil':
                    generarTablero(imagenesDificil)
                    tableroEl.classList.add("tablero-dificil")
                    cartasSelec = []
                    contador = 12
                    break;
                    
                    default:
            generarTablero(imagenes)
            tableroEl.classList.remove("tablero-dificil")
            cartasSelec = []
            contador = 4
            break;
        }
    })

//boton jugar de nuevo

    btnTryAgainEl.addEventListener("click", () => {
        ganadorEl.style.display = "none";
        pausarTimer()
    })

//botones dificultades

btnFacilEl.addEventListener("click", () => {
    generarTablero(imagenes)
    tableroEl.classList.remove("tablero-dificil")
    dificultades = "facil"
    cartasSelec = []
    contador = 4
    
})

btnMedioEl.addEventListener("click", () => {
    generarTablero(imagenesMedio)
    tableroEl.classList.remove("tablero-dificil")
    dificultades = "medio"
    cartasSelec = []
    contador = 8
    
})

btnDificilEl.addEventListener("click", () => {
    generarTablero(imagenesDificil)
    tableroEl.classList.add("tablero-dificil")
    dificultades = "dificil"
    cartasSelec = []
    contador = 12
    
})




//funciones

function mezclarImagenes (arr) {
    arr.sort(()=> Math.random() - 0.5)
}


function generarTablero (arrayImagenes) {
    
    
    tableroEl.innerHTML = ""
    
    mezclarImagenes(arrayImagenes)
    
    for (let index = 0; index < arrayImagenes.length; index++) {
        
        let tarjeta = document.createElement("div")
        tarjeta.classList.add("area-tarjeta")
        tarjeta.innerHTML = '<div class="area-tarjeta" onclick="darVueltaTarjeta('+index+')"><div class="tarjeta" id=tarjeta'+index+'> <div class="cara trasera" id="trasera'+index+'">'+arrayImagenes[index]+'</div> <div class="cara superior">'+trasera+'</div> </div> </div>'
        
        tableroEl.appendChild(tarjeta)
        
    }
    ganadorEl.style.display = "none";
    timerEl.style.display = "flex"
    pausarTimer()
    iniciarTimer()
}


function darVueltaTarjeta (e) {
    
    let tarjeta = document.querySelector("#tarjeta"+e)
    if (tarjeta.style.transform !== "rotateY(180deg)") {
        tarjeta.style.transform = "rotateY(180deg)"
        cartasSelec.push(e)
    }
    
    if (cartasSelec.length === 2) {
        deseleccionar(cartasSelec)
        cartasSelec = []
    }
}

function deseleccionar (cartasSelec) {
    setTimeout (() => {
        
        let trasera1 = document.getElementById("trasera"+cartasSelec[0])
        let trasera2 = document.getElementById("trasera"+cartasSelec[1])
        
        if (trasera1.innerHTML !== trasera2.innerHTML ) {
            let tar1 = document.getElementById("tarjeta"+cartasSelec[0])
            let tar2 = document.getElementById("tarjeta"+cartasSelec[1])
            
            tar1.style.transform = "rotateY(0deg)"
            tar2.style.transform = "rotateY(0deg)"
        }
        else {
            trasera1.style.background = "green"
            trasera2.style.background = "green"
            contador -= 1
            
            if (contador == 0) {
                 ganadorEl.style.display = "flex";
                 pausarTimer()
            }               
        }

    }, 1000)
}


function iniciarTimer () {
    var sec = 0;
        timer = setInterval(()=>{
          timerEl.innerHTML = '00:'+sec;
          sec ++;
        }, 1000)
}


function pausarTimer () {
    clearInterval(timer);
}


