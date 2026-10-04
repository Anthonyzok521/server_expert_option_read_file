# Servidor De Lectura de Archivo en Tiempo Real

<img src="https://github.com/Anthonyzok521/server_expert_option_read_file/blob/main/Screenshot%202026-10-03%20at%209.11.20%E2%80%AFPM.png" />

Este proyecto es para leer un archivo en tiempo real que contendrá la palabra COMPRAR o VENDER proveniente de una IA que analice la gráfica de Expert Option desde el navegador web. En este caso se usa Opus 5.5

# Herramienta
- Nodejs
- Claude
- Chrome
- Claud Extension

# Tener
- Cuenta ExpertOption

# Ejecutar
node server.js

# Pegar script dentro de la consola del navegador ExpertOption
client.js

# Promtear
https://app.expertoption.finance/ 
obtener las métricas de trading desde mi cuenta demo que está abierta en el navegador.

Analiza la gráfica y toma la mejor desición para comprar/vender cuando lo hayas hecho yo te digo el resultado. Ajusta la moneda que creas conveniente, el tiempo, el cierre, la grafica pero la inversión por ahora es de 1$

Vamos intentarlo, pero ajusta el tiempo de cierre a algo más extenso como para que tengas una mejor visión y además reduce el zoom de la grafica para que veas bien el historial.

Solo dame una palabra. COMPRAR o VENDER y lo hago.

 guarda la respuesta en el .txt por lo menos para tener un historial y así cómo fue mi descición antes de comprar o vender, debido a que con el archivo.txt que yo abra y lea y sea yo físicamente haciendo click sepa esa respuesta fue exitosa o no. Por ejemplo, me mandas COMPRAR - HORA: 5:00pm

Yo veo el archivo, hago click físicamente a la operación, luego escribo dentro del archivo

EXITO - HORA 5:01pm

y asi.

Los archivos deben llamarse con el nombre de la fecha y hora, por ejemplo

03_10_2026_17_00.txt
03_10_2026_17_05.txt

.etc.

Seré rápido. Solo dime COMPRAR o VENDER y yo solo te responderé con "SI" o "NO" para indicarte si fue acertada o no y de una vez intentas con otra, a menos que explicitamente te diga que nos detengamos.
