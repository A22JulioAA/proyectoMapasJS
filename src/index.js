import './css/style.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap';

// Importamos leaflet y lo preparamos para ser usado.

import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
// Aquí establecemos el icono de los marcadores del mapa.
L.Marker.prototype.setIcon(L.icon({ iconUrl: markerIcon }));

// DECLARACIÓN DE CONSTANTES Y VARIABLES

const d = document;
const mapa = d.querySelector('#map');

// Creación del mapa

let map = L.map('map').setView([42.8787763168092, -8.54720961064927], 13);

// Le añadimos un tile layer para darle las texturas.

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

// DECLARACIÓN DE FUNCIONES

const solicitarDatosMeteorológicos = function (latitud, longitud) {
  return fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${latitud}&longitude=${longitud}&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m`
  ).then((response) => response.json());
};

// EVENTOS DEL MAPA

solicitarDatosMeteorológicos(42.8787763168092, -8.54720961064927).then((data) =>
  console.log(data)
);
