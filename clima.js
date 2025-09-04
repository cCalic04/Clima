const ciudad = 'bogota';

// La llave que identifica al usuario que esta pidiendo los datos
// Pueden usar mi llave gratuita o crear una propia en https://openweathermap.org/
const llaveApi = 'fb08d9cd120c13609db1d162c71ed5d0';
// La dirección que contiene los datos en tiempo real
const puntoDatos =  'https://api.openweathermap.org/data/2.5/weather';
const url = `${puntoDatos}?q=${ciudad}&appid=${llaveApi}`;

// La lógica con la que mostramos los íconos en la pantalla:
const contenedor = document.getElementById("simbolo");
const descripcion = document.getElementById("texto")

async function buscar() {
  const datos = await fetch(url).then(respuesta => respuesta.json());
  console.log(datos);
  const codigoIcono = datos.weather[0].icon;
  contenedor.src = `https://openweathermap.org/img/wn/${codigoIcono}@2x.png`;
  descripcion.innerText = datos.weather[0].description
} 

buscar();



//cartas
const imagenes = [
    "https://cdn.glitch.global/b9547f30-d27e-4ca3-8ef2-267d73725f75/hangedman.png?v=1726029380354",
    "https://cdn.glitch.global/b9547f30-d27e-4ca3-8ef2-267d73725f75/tower.png?v=1726029377877",
    "https://cdn.glitch.global/b9547f30-d27e-4ca3-8ef2-267d73725f75/death.png?v=1726029375410",
    "https://cdn.glitch.global/b9547f30-d27e-4ca3-8ef2-267d73725f75/justiec.png?v=1726029371776",
    "https://cdn.glitch.global/b9547f30-d27e-4ca3-8ef2-267d73725f75/wheel.png?v=1726029368886",
    "https://cdn.glitch.global/b9547f30-d27e-4ca3-8ef2-267d73725f75/chariot.png?v=1726041582366",
  ];
  //titulo
  const cabecera = [
    "0",
  ];
  //muerte
  const titulos = [
    "1",
  ];
  //condiciones
  const titulos1 = [
    "2",
  ];
  //tu vida
  const titulos2 = [
    "3",
  ];
  //Precauciones
  const titulos3 = [
    "4",
  ];
  
  
  
  const header = document.getElementById("cabecera");
  const titulo = document.getElementById("titulo");
  const titulo1 = document.getElementById("titulo1");
  const titulo2 = document.getElementById("titulo2");
  const titulo3 = document.getElementById("titulo3");
  const boton = document.getElementById("boton1");
  const imagen = document.getElementById("foto");
  const imagen1 = document.getElementById("foto1");
  const imagen2 = document.getElementById("foto2");
  
  
  function numeroRandom(min, max) {
    return Math.ceil(Math.random() * (max - min) + min - 1);
  }
  
  function generarPrediccion() {
    const indiceHeader = numeroRandom(0, cabecera.length);
    const indiceTitulo = numeroRandom(0, titulos.length);
    const indiceTitulo1 = numeroRandom(0, titulos1.length);
    const indiceTitulo2 = numeroRandom(0, titulos2.length);
    const indiceTitulo3 = numeroRandom(0, titulos3.length);
    const fotos = numeroRandom(0, imagenes.length);
    const fotos1 = numeroRandom(0, imagenes.length);
    const fotos2 = numeroRandom(0, imagenes.length);
  
    header.innerText = cabecera[indiceHeader];
    titulo.innerText = titulos[indiceTitulo];
    titulo1.innerText = titulos1[indiceTitulo1];
    titulo2.innerText = titulos2[indiceTitulo2];
    titulo3.innerText = titulos3[indiceTitulo3];
    imagen.src = imagenes[fotos];
    imagen1.src = imagenes[fotos1];
    imagen2.src = imagenes[fotos2];
  }
  
  boton.addEventListener("click", function () {
    generarPrediccion();
  });
  
  generarPrediccion();
  
  const audio = document.getElementById("musica");
  audio.volume = 0.1; 
  const audio1 = document.getElementById("musica1");
  audio1.volume = 0.1; 