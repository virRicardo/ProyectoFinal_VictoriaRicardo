# Simulador de Costo de Viajes

Este proyecto es una aplicación web que permite simular el costo total de un viaje en función de la distancia a recorrer (en kilómetros) y la cantidad de noches de hotel. Además, incluye un conversor de millas a kilómetros utilizando una API externa.

## Características principales

- **Simulación de costos de viaje:**
  - Calcula el costo total del viaje sumando el costo de combustible y el alojamiento.
  - Permite ingresar la cantidad de kilómetros a recorrer y noches de hotel.
  - Muestra un resumen detallado de cada simulación.
  - Guarda el historial de simulaciones en el navegador (localStorage).
  - Permite ver detalles y borrar simulaciones previas.

- **Conversor de millas a kilómetros:**
  - Convierte millas a kilómetros usando la API de [api-ninjas.com](https://api-ninjas.com/api/unitconversion).

- **Modo oscuro:**
  - Permite alternar entre modo claro y oscuro.
  - Recuerda la preferencia de tema del usuario.

- **Interfaz amigable:**
  - Efectos visuales y validaciones de entrada.
  - Botones con animaciones y diseño responsivo.

## Tecnologías utilizadas

- HTML5
- CSS3 (incluye modo oscuro y efectos visuales)
- JavaScript (puro, sin frameworks)
- [SweetAlert2](https://sweetalert2.github.io/) para alertas y mensajes de error
- API externa para conversión de unidades

## Estructura del proyecto

```
ProyectoFinal-RicardoVictoria/
  ├── css/
  │   └── css.css
  ├── js/
  │   └── main.js
  └── index.html
```

## Instrucciones de uso

1. **Clona o descarga este repositorio.**
2. Abre el archivo `index.html` en tu navegador web preferido.
3. Utiliza el conversor de millas a kilómetros si lo necesitas.
4. Ingresa los kilómetros a recorrer y las noches de hotel, luego haz clic en "Calcular Costo Total".
5. Visualiza el resumen y guarda tus simulaciones. Puedes ver detalles o borrar simulaciones previas.
6. Cambia entre modo claro y oscuro con el botón correspondiente.

## Personalización

- Puedes modificar los valores de `precioNaftaPorKm` y `precioPorNocheHotel` en el archivo `js/main.js` para adaptarlos a tus necesidades.
- El conversor de millas a kilómetros requiere una API Key válida de [api-ninjas.com](https://api-ninjas.com/api/unitconversion). Puedes reemplazar la variable `API_KEY` en `main.js` si es necesario.

## Créditos

- Desarrollado por Ricardo Victoria.
- Utiliza [SweetAlert2](https://sweetalert2.github.io/) y la API de [api-ninjas.com](https://api-ninjas.com/api/unitconversion).

## Licencia

 