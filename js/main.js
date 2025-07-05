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
const btnModoOscuro = document.getElementById("btnModoOscuro");
const body = document.body;


btnModoOscuro.addEventListener("click", () =>{
    body.classList.toggle("dark-mode");

    if(body.classList.contains("dark-mode")){
        localStorage.setItem("tema", "dark");
        btnModoOscuro.textContent = "Activar modo claro";
    }else{
        localStorage.setItem("tema", "light");
        btnModoOscuro.textContent = "Activar modo oscuro";
    }
});

document.addEventListener("DOMContentLoaded", () =>{
    const temaGuardado = localStorage.getItem("tema");
    if(temaGuardado === "dark"){
        body.classList.add("dark-mode");
        btnModoOscuro.textContent = "Activar modo claro";
    }else{
        body.classList.remove("dark-mode");
        btnModoOscuro.textContent = "Activar modo oscuro";
    }
});

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

borrarSimulacionesBtn.addEventListener("click", function (e) {

    //borrar datos
    localStorage.removeItem("todasLasSimulaciones");
    localStorage.removeItem("contadorSimulaciones");
    simulacionesList.innerHTML = "";

    //efecto visual ripple
    const ripple = document.createElement("span");
    ripple.classList.add("ripple");

    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    ripple.style.width = ripple.style.height = `${size}px`;

    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;

        this.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    });

// Cargar simulaciones al iniciar la página
cargarSimulacionesPrevias();
