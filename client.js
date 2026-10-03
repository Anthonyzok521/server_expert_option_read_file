const vender = document.querySelector('div[aria-label="at_buy_button"]');
const comprar = document.querySelector('div[aria-label="at_sell_button"]');

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
    console.error(error.error);
  }
}

async function process(){
    const result = await getData();
    if(result.linea == "COMPRAR"){
    comprar.click();
    }
    else if(result.linea == "VENDER"){
    vender.click();
    }
}

setInterval({
    process();
}, 1000);
