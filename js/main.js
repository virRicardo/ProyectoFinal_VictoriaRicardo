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
const totalMillasInput = document.getElementById("totalMillas");
const kmConvertidosInput = document.getElementById(`kmConvertidos`);
const API_KEY = "Rl8ADao7BFIs7C1ZsWmLKw==l3AHXIEswcxIuTmp";


btnModoOscuro.addEventListener("click", () =>{
    body.classList.toggle("dark-mode");

    if(body.classList.contains("dark-mode")){
        localStorage.setItem("tema", "dark");
        btnModoOscuro.textContent = "Clear mode";
    }else{
        localStorage.setItem("tema", "light");
        btnModoOscuro.textContent = "Dark mode";
    }
});

document.addEventListener("DOMContentLoaded", () =>{
    const temaGuardado = localStorage.getItem("tema");
    if(temaGuardado === "dark"){
        body.classList.add("dark-mode");
        btnModoOscuro.textContent = "Clear mode";
    }else{
        body.classList.remove("dark-mode");
        btnModoOscuro.textContent = "Dark mode";
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
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Por favor ingrese valores válidos para los Kilometros y para las noches de alojamiento.",
        });
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
        li.innerHTML = `simulación ${simulacion.numeroSimulacion} - Costo Total: $${simulacion.costoTotalViaje}
        <button class = "verDetalle boton-hover">Ver detalles</button>
        <button class ="borrarSimulacion boton-hover">Borrar</button>`;

        li.querySelector(".verDetalle").addEventListener("click", ()=> {
            resultadoKm.textContent = `Kilómetros: ${simulacion.totalKm} Km`;
            resultadoNoches.textContent = `Noches de Hotel: ${simulacion.totalNoches}`;
            resultadoNafta.textContent = `Costo de combustible: $${simulacion.totalKm * precioNaftaPorKm}`;
            resultadoHotel.textContent = `Costo de hotel: $${simulacion.totalNoches * precioPorNocheHotel}`;
            resultadoTotal.textContent = `Costo total del viaje: $${simulacion.costoTotalViaje}`;
            resultadoDiv.classList.remove("hidden");
        });

        li.querySelector(".borrarSimulacion").addEventListener("click", ()=>{
            borrarSimulacion(simulacion.numeroSimulacion);
        });

        simulacionesList.appendChild(li);
    });
}

function borrarSimulacion(numeroSimulacion){
    let simulaciones = JSON.parse(localStorage.getItem("todasLasSimulaciones")) || [];
    simulaciones = simulaciones.filter(sim => sim.numeroSimulacion !== numeroSimulacion);
    localStorage.setItem("todasLasSimulaciones", JSON.stringify(simulaciones));
    mostrarSimulaciones(simulaciones);
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

//Conversor de millas a km con API 

async function convertirMillasAKm(millas) {
    try{
        const response = await fetch(`https://api.api-ninjas.com/v1/unitconversion?amount=${millas}&unit=mile`, {
            headers: {
                'X-Api-Key': API_KEY
            }
        });

        if (!response.ok) throw new Error("Error al convertir millas");

        const data = await response.json();
        return data.conversions.kilometer;

    } catch (error) {
        console.error(error);
        Swal.fire("Error", "No se pudo convertir millas. Verifica tu conexión o API Key.", "error");
        return null;
    }
}

// Eventos

calcularBtn.addEventListener('click', calcular);

calcularBtn.addEventListener("click", ()=>{
    totalKmInput.value = ""
    totalNochesInput.value = ""
    totalKmInput.focus()
})

otraSimulacionBtn.addEventListener('click', otraSimulacion);

totalKmInput.addEventListener(`keydown`, function(e){
    if(e.key === `Enter`){
        e.preventDefault();
        totalNochesInput.focus();
    }
});

totalNochesInput.addEventListener(`keydown`, function(e){
    if(e.key === `Enter`){
        e.preventDefault();
        calcularBtn.focus();
    }
});

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


totalMillasInput.addEventListener(`input`, async function () {
    const millas = parseFloat(this.value);
    if (isNaN(millas) || millas <= 0) return;

    const km = await convertirMillasAKm(millas);
    if (km !== null){
        kmConvertidosInput.value = km.toFixed(2);
    }
});



// Cargar simulaciones al iniciar la página
cargarSimulacionesPrevias();
