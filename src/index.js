import './css/style.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap';

// Importamos leaflet y lo preparamos para ser usado.

import L, { divIcon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import markerIcon from 'leaflet/dist/images/marcador-de-posicion.ico';
// Aquí establecemos el icono de los marcadores del mapa.
L.Marker.prototype.setIcon(L.icon({ iconUrl: markerIcon }));

// DECLARACIÓN DE CONSTANTES Y VARIABLES

const d = document;
const mapa = d.querySelector('#map');
const main = d.querySelector('main');
const listaPuntos = d.querySelector('#listaPuntos');

const arrayPuntos = [];

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

const añadirMarcador = function (lat, long) {
  let marker = L.marker([lat, long]).addTo(map);
};

const mostrarDescripcionPunto = function (latitud, longitud) {
  const gestionarInfoPuntoCard = d.createElement('div');
  const obtenerDescripcionMarcador = d.createElement('input');
  const botonAñadirDescripcion = d.createElement('button');

  obtenerDescripcionMarcador.type = 'text';
  obtenerDescripcionMarcador.placeholder = 'Descripción marcador';

  botonAñadirDescripcion.textContent = 'Añadir';
  botonAñadirDescripcion.classList.add('buttonDescripcion');

  gestionarInfoPuntoCard.append(obtenerDescripcionMarcador);
  gestionarInfoPuntoCard.append(botonAñadirDescripcion);

  main.append(gestionarInfoPuntoCard);
  obtenerDescripcionMarcador.focus();

  botonAñadirDescripcion.addEventListener('click', function () {
    añadirMarcador(latitud, longitud);
    arrayPuntos.push({
      lat: latitud,
      lng: longitud,
      description: obtenerDescripcionMarcador.value,
    });

    const elementoLista = d.createElement('li');
    elementoLista.classList.add('elemento-lista-class');
    elementoLista.textContent = obtenerDescripcionMarcador.value;
    listaPuntos.append(elementoLista);

    gestionarInfoPuntoCard.remove();
  });
};

// EVENTOS DEL MAPA

map.addEventListener('click', function (e) {
  mostrarDescripcionPunto(e.latlng.lat, e.latlng.lng);
});

// solicitarDatosMeteorológicos(42.8787763168092, -8.54720961064927).then((data) =>
//   console.log(data)
// );
