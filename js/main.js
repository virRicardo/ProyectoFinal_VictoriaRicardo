const precioNaftaPorKm = 100;
const precioPorNocheHotel = 2000;


let totalKm = 0;
let totalNoches = 0;
let costoTotalViaje = 0;
let costoNafta = 0;
let costoHotel = 0;

const totalKmInput = document.getElementById(`totalKm`);
const totalNochesInput = document.getElementById(`totalNoches`);
const calcularBtn = document.getElementById(`calcularBtn`);
const resultadoDiv = document.getElementById(`resultado`); 
const resultadoKm = document.getElementById(`resultadoKm`);
const resultadoNoches = document.getElementById(`resultadoNoches`);
const resultadoNafta = document.getElementById(`resultadoNafta`);
const resultadoHotel = document.getElementById(`resultadoHotel`);
const resultadoTotal = document.getElementById(`resultadoTotal`);
const otraSimulacionBtn = document.getElementById(`otraSimulacionBtn`);
const simulacionesList = document.getElementById(`simulacionesList`);
const borrarSimulacionesBtn = document.getElementById(`borrarSimulacionesBtn`);
const mensajeError = document.getElementById("mensajeError");




function calcularTotalCombustible (distancia, precioCombustible){
    return distancia * precioCombustible;
}

function calcularTotalHotel(noches, precioPorNoche){
    return noches * precioPorNoche;
}

function costoTotal(combustible, alojamiento){
    return combustible + alojamiento;
}



function calcular(){
    mensajeError.textContent = "";
    totalKm = parseFloat(totalKmInput.value);
    totalNoches = parseInt(totalNochesInput.value);

    if(isNaN(totalKm) || totalKm <= 0 || isNaN(totalNoches) || totalNoches <= 0){
        mostrarMensaje("Por favor ingresa valores válidos para los Kilometros y las noches de alojamiento.");
        return;
    }



costoNafta = calcularTotalCombustible(totalKm, precioNaftaPorKm);
costoHotel = calcularTotalHotel(totalNoches, precioPorNocheHotel);
costoTotalViaje = costoTotal(costoNafta, costoHotel);

resultadoKm.textContent =`Kilometros: ${totalKm} Km`;
resultadoNoches.textContent = `Noches de Hotel: ${totalNoches}`;
resultadoNafta.textContent = `Costo de combustible: $${costoNafta}`;
resultadoHotel.textContent = `Costo de hotel: $${costoHotel}`;
resultadoTotal.textContent = `Costo total del viaje: $${costoTotalViaje}`;

resultadoDiv.classList.remove(`hidden`);
otraSimulacionBtn.classList.remove(`hidden`);


const nuevaSimulacion = {
    totalKm: totalKm,
    totalNoches: totalNoches,
    costoTotalViaje: costoTotalViaje
};

guardarSimulacion(nuevaSimulacion);
}

function mostrarMensaje(mensaje){
    mensajeError.textContent = mensaje;
    mensajeError.style.color = "red";
}



function mostrarSimulaciones(simulaciones){
    simulacionesList.innerHTML = ``;
    simulaciones.forEach(simulacion => {
        const li = document.createElement(`li`);
        li.textContent = `simulación ${simulacion.numeroSimulacion} - Costo Total: $${simulacion.costoTotalViaje}`;
        simulacionesList.appendChild(li);
    });
}

function cargarSimulacionesPrevias(){
    const simulacionesGuardadas = localStorage.getItem(`todasLasSimulaciones`);
    if(simulacionesGuardadas){
        const simulaciones = JSON.parse(simulacionesGuardadas);
        mostrarSimulaciones(simulaciones);
    }
}



function guardarSimulacion(simulacion){
    let simulaciones = JSON.parse(localStorage.getItem(`todasLasSimulaciones`)) || [];

    let contador =parseInt(localStorage.getItem(`contadorSimulaciones`)) || 1;
    simulacion.numeroSimulacion = contador;

    simulaciones.push(simulacion);
    localStorage.setItem(`todasLasSimulaciones`, JSON.stringify(simulaciones));

    localStorage.setItem(`contadorSimulaciones`, contador + 1);

    mostrarSimulaciones(simulaciones);
}

function otraSimulacion (){
    totalKmInput.value = ``;
    totalNochesInput.value = ``;
    resultadoDiv.classList.add(`hidden`);

    otraSimulacionBtn.classList.add(`hidden`);
}



// Eventos


calcularBtn.addEventListener('click', calcular);

calcularBtn.addEventListener("click", ()=>{
    totalKmInput.value = ""
    totalNochesInput.value = ""
    totalKmInput.focus()
})

otraSimulacionBtn.addEventListener('click', otraSimulacion);
borrarSimulacionesBtn.addEventListener("click", () => {
    localStorage.removeItem("todasLasSimulaaciones");
    localStorage.removeItem("contadorSimulaciones");
    simulacionesList.innerHTML = "";
});

// Cargar simulaciones al iniciar la página
cargarSimulacionesPrevias();
