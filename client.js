const vender = document.querySelector('div[aria-label="at_buy_button"]');
const comprar = document.querySelector('div[aria-label="at_sell_button"]');

console.log("SCRIPT INSTALADO...");

document.addEventListener("keydown", logKey);
let key = '';
function logKey(e) {
  key = ` ${e.code}`;
    //console.log(key);
    if(key.includes('Escape')){
        console.log("DETENIDO");
    clearInterval(init);
    }
}

async function getData() {
  const url = "http://localhost:3000";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.error}`);
    }

    const result = await response.json();
    console.log(result);
  } catch (error) {
    //console.error(error.error);
  }
}

async function process(){
   try{
        const result = await getData();

        if(result.linea == "COMPRAR"){
            console.log("COMPRAR");
            comprar.click();
        }
        else if(result.linea == "VENDER"){
            console.log("VENDER");
            vender.click();
        }
   }catch(e){
   console.log("ESPERANDO");
   }
}

const init = setInterval(() => {
  process();
}, 1000);

