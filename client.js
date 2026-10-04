const vender = document.querySelector('div[aria-label="at_buy_button"]');
const comprar = document.querySelector('div[aria-label="at_sell_button"]');

console.log("SCRIPT INSTALADO...");

document.addEventListener("keydown", logKey);
let key = '';
let seconds = 60;
let useAPI = true;
let action = '';
let intervalId;

function logKey(e) {
  key = ` ${e.code}`;
  //console.log(key);
  if (key.includes('Escape')) {
    console.log("DETENIDO");
    clearInterval(intervalId);
  }

  if (key.includes('Space')) {
    console.clear();
    console.log("ESPERANDO");
    seconds = 60;
    useAPI = true;
    init();
  }
}

async function getData() {
  const url = "http://localhost:3000";
  try {
    const response = await fetch(url);
    const result = await response.json();
    //console.log(result);
    return result;
  } catch (error) {
    console.error(error.error);
  }
}

function tiempo() {
  const ahora = new Date();

  const dia = String(ahora.getDate()).padStart(2, '0');
  const mes = String(ahora.getMonth() + 1).padStart(2, '0'); // Los meses van de 0 a 11
  const anio = ahora.getFullYear();

  const horas = String(ahora.getHours()).padStart(2, '0');
  const minutos = String(ahora.getMinutes()).padStart(2, '0');
  const segundos = String(ahora.getSeconds()).padStart(2, '0');

  return `${horas}:${minutos}:${segundos}`;
}

async function process() {
  try {
    if (seconds <= 1) {
      useAPI = true;
      seconds = 60;
    }
    if (useAPI == true) {
      const result = await getData();
      if (result.error) {
        console.clear()
        console.log(`ESPERANDO ${tiempo()}`);
      }
      else if (result.linea.includes("COMPRAR")) {
        useAPI = false;
        action = "COMPRAR";
        console.log("COMPRAR");
        comprar.click();
      }
      else if (result.linea.includes("VENDER")) {
        useAPI = false;
        action = "VENDER";
        console.log("VENDER");
        vender.click();
      }
    }
  } catch (e) {
    console.log(`ERROR - ${e}`);
  }
}

const init = () => {
  intervalId = setInterval(() => {
    process();

    if (!useAPI) {
      console.clear();
      seconds--;
      console.log(`ACCIÓN REALIZADA - ${action} - ESPERAR ${seconds}s`);
    }
  }, 1000);
}

init();