/* clima.js - weather + typewriter + hover copeton + background + outfits + omens */

document.addEventListener("DOMContentLoaded", () => {
  const ciudad = 'Bogotá';
  const llaveApi = 'fb08d9cd120c13609db1d162c71ed5d0';
  const llaveApi1 = 'f5098d4e3d7f2be89ac7e65039344e42';
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(ciudad)}&appid=${llaveApi}&lang=es`;
  const url1 = `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(ciudad)}&appid=${llaveApi1}&lang=es`;

  const climas = {
    '2xx': 'https://raw.githubusercontent.com/cCalic04/MyMeloApoyo/main/mymeloa2.png',
    '3xx': 'https://raw.githubusercontent.com/cCalic04/MyMeloApoyo/main/mymeloa3.png',
    '5xx': 'https://raw.githubusercontent.com/cCalic04/MyMeloApoyo/main/mymeloa4.png',
    '6xx': 'https://raw.githubusercontent.com/cCalic04/MyMeloApoyo/main/mymeloa5.png',
    '7xx': 'https://raw.githubusercontent.com/cCalic04/MyMeloApoyo/main/mymeloa6.png',
    '800': 'https://raw.githubusercontent.com/cCalic04/MyMeloApoyo/main/mymeloa8.png',
    '80x': 'https://raw.githubusercontent.com/cCalic04/MyMeloApoyo/main/mymeloa9.png'
  };

  const bgClimas = {
    '2xx': '#4a4a7c',
    '3xx': '#4a646aff',
    '5xx': '#4c6b8b',
    '6xx': '#b0c4de',
    '7xx': '#707177ff',
    '800': '#1355a5ff',
    '80x': '#6e6363ff'
  };

  // Outfit suggestions per weather category
  const outfits = {
    '2xx': { text: "El cielo está negro y lleno de destellos.\n Quédate en casa o usa impermeable y botas.\n Aprovecha esta oportunidad de pausa para ver hacia adentro.", img: "https://raw.githubusercontent.com/cCalic04/MyMeloApoyo/main/outfit2.png" },
    '3xx': { text: "Las nubes se abrieron y la llovizna tomó el turno.\n En este clima, el paraguas es la mejor inversión.\n Después de la lluvia, todo suele verse más claro.", img: "https://raw.githubusercontent.com/cCalic04/MyMeloApoyo/main/outfit3.png" },
    '5xx': { text: "El cielo se rompió y la lluvia tomó el turno.\n Impermeable y zapatos resistentes son ideales.\n Abre tu alma a la renovación y deja que el agua se lleve todo.", img: "https://raw.githubusercontent.com/cCalic04/MyMeloApoyo/main/outfit4.png" },
    '6xx': { text: "Nieve. Abrígate con chaqueta gruesa, gorro y guantes.", img: "https://raw.githubusercontent.com/cCalic04/MyMeloApoyo/main/outfit5.png" },
    '7xx': { text: " La neblina cubre el paisaje y todo parece difuso.\n Una bufanda cómoda hace la diferencia hoy.\n  Con neblina, el día suele guardar algo inesperado.", img: "https://raw.githubusercontent.com/cCalic04/MyMeloApoyo/main/outfit6.png" },
    '800': { text: "El cielo está despejado, el sol brilla sin pausa.\n Gafas oscuras y ropa ligera son la mejor elección.\n Un día soleado suele traer energía renovada.", img: "https://raw.githubusercontent.com/cCalic04/MyMeloApoyo/main/outfit7.png" },
    '80x': { text: "El sol está de descanso, el cielo se viste de gris.\n Un suéter ligero nunca sobra en un día así.\n Cuando se nublan los cielos, siempre se acerca un cambio.", img: "https://raw.githubusercontent.com/cCalic04/MyMeloApoyo/main/outfit8.png" }
  };

  // Omens (randomized)
  const omens = [
    { text: "Hoy deberías tomar una ruta distinta a tu destino.", img: "https://raw.githubusercontent.com/cCalic04/MyMeloApoyo/main/omen1.png" },
    { text: "Recuerda saludar a esa persona importante, lo apreciará.", img: "https://raw.githubusercontent.com/cCalic04/MyMeloApoyo/main/omen2.png" },
    { text: "Cuidado con los huecos en el anden.", img: "https://raw.githubusercontent.com/cCalic04/MyMeloApoyo/main/omen3.png" },
    { text: "Ojo con las goteras.", img: "https://raw.githubusercontent.com/cCalic04/MyMeloApoyo/main/omen4.png" },
    { text: "Hoy no es un buen día para hablar con extraños.", img: "https://raw.githubusercontent.com/cCalic04/MyMeloApoyo/main/omen5.png" },
    { text: "Parece que es momento de tener esa conversación incomoda.", img: "https://raw.githubusercontent.com/cCalic04/MyMeloApoyo/main/omen6.png" },
    { text: "Preparate para una despedida dolorosa.", img: "https://raw.githubusercontent.com/cCalic04/MyMeloApoyo/main/omen7.png" }
  ];

  const $id = id => document.getElementById(id) || null;

  function getCategory(id) {
    if (id >= 200 && id < 300) return '2xx';
    if (id >= 300 && id < 400) return '3xx';
    if (id >= 500 && id < 600) return '5xx';
    if (id >= 600 && id < 700) return '6xx';
    if (id >= 700 && id < 800) return '7xx';
    if (id === 800) return '800';
    if (id > 800) return '80x';
    return null;
  }

  async function setImage(imgElement, url) {
    if (!imgElement) return;
    imgElement.src = url || '';
  }

  // TYPEWRITER
  let typingInterval;
  function typeWriterEffect(text, targetEl) {
    clearInterval(typingInterval);
    if (!targetEl) return;
    targetEl.style.display = 'block';
    targetEl.innerText = '';
    let i = 0;
    typingInterval = setInterval(() => {
      targetEl.innerText = text.slice(0, i + 1);
      i++;
      if (i >= text.length) clearInterval(typingInterval);
    }, 50);
  }

  function eraseEffect(targetEl) {
    clearInterval(typingInterval);
    if (!targetEl) return;
    const erase = () => {
      if (targetEl.innerText.length > 0) {
        targetEl.innerText = targetEl.innerText.slice(0, -1);
        typingInterval = setTimeout(erase, 30);
      } else { targetEl.style.display = 'none'; }
    };
    erase();
  }

  async function buscar() {
    try {
      const prediccionTexto = $id('prediccionTexto');
      const simboloEl = $id('simbolo');
      const simbolo1El = $id('simbolo1');
      const titulo2El = $id('titulo2');
      const titulo3El = $id('titulo3');
      const todoContainer = document.querySelector('.todo');
      const todoOriginalBg = todoContainer ? window.getComputedStyle(todoContainer).backgroundColor : '#fff';
      const copeton = $id('copeton');
      const copetonOriginalSrc = copeton?.src;

      // Current weather
      const res = await fetch(url);
      const datos = await res.json();
      const curWeather = datos?.weather?.[0] || {};
      const curId = curWeather.id;
      const curIconCode = curWeather.icon;
      const curCat = getCategory(curId);

      await setImage(simboloEl, climas[curCat]);

      // Forecast
      const res2 = await fetch(url1);
      const datos1 = await res2.json();
      const forecastItem = datos1?.list?.[8] || datos1?.list?.[0] || {};
      const fWeather = forecastItem.weather?.[0] || {};
      const fId = fWeather.id;
      const fIconCode = fWeather.icon;
      const fCat = getCategory(fId);

      await setImage(simbolo1El, climas[fCat]);

      // MESSAGES
      const mensajes = {
        card1: `El clima actual: ${curWeather.description || ''}`,
        card2: `El clima de mañana: ${fWeather.description || ''}`
      };

      const copetonHoverImages = [
        'https://raw.githubusercontent.com/cCalic04/Clima/refs/heads/main/copetonhabla.gif',
        'https://raw.githubusercontent.com/cCalic04/Clima/refs/heads/main/copetonhabla.gif',
        'https://raw.githubusercontent.com/cCalic04/Clima/refs/heads/main/copetonhabla.gif',
        'https://raw.githubusercontent.com/cCalic04/Clima/refs/heads/main/copetonhabla.gif'
      ];

      const cards = document.querySelectorAll(".der .fila-cartas .contenedor .card");
      cards.forEach((card, i) => {
        card.addEventListener("mouseenter", () => {
          // Card 1 & 2: weather info
          if (i < 2) typeWriterEffect(mensajes[`card${i+1}`], prediccionTexto);

          // Card 3: outfit based on current weather
          if (i === 2 && outfits[curCat]) {
            typeWriterEffect(outfits[curCat].text, prediccionTexto);
            titulo2El.querySelector('img').src = outfits[curCat].img;
          }

          // Card 4: random omen
          if (i === 3) {
            const omen = omens[Math.floor(Math.random() * omens.length)];
            typeWriterEffect(omen.text, prediccionTexto);
            titulo3El.querySelector('img').src = omen.img;
          }

          // copeton
          if (copeton && copetonHoverImages[i]) copeton.src = copetonHoverImages[i];

          // background
          let code = i === 0 ? curId : i === 1 ? fId : null;
          const bgKey = getCategory(code);
          if (todoContainer && bgKey) todoContainer.style.backgroundColor = bgClimas[bgKey] || todoOriginalBg;
          console.log('Hover card index:', i);
console.log('copetonHoverImages[i]:', copetonHoverImages[i]);
copeton.src = copetonHoverImages[i];

        });

        card.addEventListener("mouseleave", () => {
          eraseEffect(prediccionTexto);
          if (copeton) copeton.src = copetonOriginalSrc;
          if (todoContainer) todoContainer.style.backgroundColor = todoOriginalBg;
        });
      });
    } catch (err) {
      console.error('Weather fetch error:', err);
    }
  }

  buscar();
});
