/* clima.js - weather + typewriter + hover copeton + background */

document.addEventListener("DOMContentLoaded", () => {
  // --- CONFIG ---
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

  // --- BACKGROUND MAPPING ---
  const bgClimas = {
    '2xx': '#4a4a7c', // thunderstorm
    '3xx': '#4a646aff', // drizzle
    '5xx': '#4c6b8b', // rain
    '6xx': '#b0c4de', // snow
    '7xx': '#707177ff', // fog/mist
    '800': '#1355a5ff', // clear
    '80x': '#6e6363ff'  // clouds
  };

  const $id = id => document.getElementById(id) || null;

  function getCategoryUrlFromId(id) {
    id = Number(id);
    if (Number.isNaN(id)) return null;
    if (id >= 200 && id < 300) return climas['2xx'];
    if (id >= 300 && id < 400) return climas['3xx'];
    if (id >= 500 && id < 600) return climas['5xx'];
    if (id >= 600 && id < 700) return climas['6xx'];
    if (id >= 700 && id < 800) return climas['7xx'];
    if (id === 800) return climas['800'];
    if (id > 800) return climas['80x'];
    return null;
  }

  function testImageLoads(url) {
    return new Promise(resolve => {
      if (!url) return resolve(false);
      const img = new Image();
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
      img.src = url;
    });
  }

  async function setImageWithFallback(imgElement, categoryUrl, openWeatherIconUrl) {
    if (!imgElement) return;
    try {
      if (categoryUrl && await testImageLoads(categoryUrl)) {
        imgElement.src = categoryUrl;
        return;
      }
      if (openWeatherIconUrl && await testImageLoads(openWeatherIconUrl)) {
        imgElement.src = openWeatherIconUrl;
        return;
      }
      imgElement.src = '';
    } catch (err) {
      console.error('Image error', err);
      imgElement.src = '';
    }
  }

  // --- TYPEWRITER ---
  let typingInterval;
  function typeWriterEffect(text, targetEl) {
    clearInterval(typingInterval);
    if (!targetEl) return;
    targetEl.style.display = 'block';
    targetEl.innerText = '';
    let i = 0;
    typingInterval = setInterval(() => {
      targetEl.innerText = text.slice(0, i + 1); // preserves spaces
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
      } else {
        targetEl.style.display = 'none';
      }
    };
    erase();
  }

  // --- FETCH WEATHER & FORECAST ---
  async function buscar() {
    try {
      const descEl = $id('texto');
      const descEl1 = $id('texto1');
      const prediccionTexto = $id('prediccionTexto');
      const simboloEl = $id('simbolo');
      const simbolo1El = $id('simbolo1');
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

      await setImageWithFallback(simboloEl, getCategoryUrlFromId(curId),
        curIconCode ? `https://openweathermap.org/img/wn/${curIconCode}@2x.png` : null);
      if (descEl) descEl.innerText = curWeather.description || '';

      // Forecast
      const res2 = await fetch(url1);
      const datos1 = await res2.json();
      const forecastItem = datos1?.list?.[16] || datos1?.list?.[0] || {};
      const fWeather = forecastItem.weather?.[0] || {};
      const fId = fWeather.id;
      const fIconCode = fWeather.icon;

      await setImageWithFallback(simbolo1El, getCategoryUrlFromId(fId),
        fIconCode ? `https://openweathermap.org/img/wn/${fIconCode}@2x.png` : null);
      if (descEl1) descEl1.innerText = fWeather.description || '';

      // --- PREPARE MESSAGES ---
      const mensajes = {
        card1: `el clima actual: ${curWeather.description || ''}`,
        card2: `el clima de mañana: ${fWeather.description || ''}`
      };

      // --- COPETON HOVER IMAGES ---
      const copetonHoverImages = [
        'https://raw.githubusercontent.com/cCalic04/Clima/refs/heads/main/copetonhabla.gif', // card1
        'https://raw.githubusercontent.com/cCalic04/Clima/refs/heads/main/copetonhabla.gif'  // card2
      ];

      // --- CARD HOVER EVENTS ---
      const cards = document.querySelectorAll(".der .fila-cartas .contenedor .card");
      cards.forEach((card, i) => {
        const key = `card${i+1}`;

        card.addEventListener("mouseenter", () => {
          // typewriter
          typeWriterEffect(mensajes[key] || '', prediccionTexto);

          // copeton image
          if (copeton && copetonHoverImages[i]) {
            copeton.src = copetonHoverImages[i];
          }

          // background
          let code;
          if (key === 'card1') code = curId;
          if (key === 'card2') code = fId;
          let bgKey = null;
          if (code >= 200 && code < 300) bgKey = '2xx';
          else if (code >= 300 && code < 400) bgKey = '3xx';
          else if (code >= 500 && code < 600) bgKey = '5xx';
          else if (code >= 600 && code < 700) bgKey = '6xx';
          else if (code >= 700 && code < 800) bgKey = '7xx';
          else if (code === 800) bgKey = '800';
          else if (code > 800) bgKey = '80x';

          if (todoContainer && bgKey) todoContainer.style.backgroundColor = bgClimas[bgKey] || todoOriginalBg;
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

  // --- RUN ---
  buscar();
});
