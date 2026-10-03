import http from 'node:http';
import fs from 'node:fs';
import readline from 'node:readline';
import path from 'node:path';

const PUERTO = 3000;
const RUTA_ARCHIVO = path.join(process.cwd(), 'result.txt');

let primeraLineaActual = '';

// Función para leer únicamente la primera línea del archivo
function actualizarPrimeraLinea() {
  if (!fs.existsSync(RUTA_ARCHIVO)) return;

  const stream = fs.createReadStream(RUTA_ARCHIVO, { encoding: 'utf-8' });
  const rl = readline.createInterface({ input: stream });

  rl.on('line', (linea) => {
    primeraLineaActual = linea;
    rl.close();
    stream.destroy();
  });
}

// Lectura inicial y escucha de cambios
actualizarPrimeraLinea();
fs.watch(RUTA_ARCHIVO, (eventType) => {
  if (eventType === 'change') {
    actualizarPrimeraLinea();
  }
});

// Servidor HTTP con soporte CORS para pruebas locales
const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');

  if (req.url === '/') {
    res.writeHead(200);
    res.end(JSON.stringify({ linea: primeraLineaActual }));
  } else {
    res.writeHead(404);
    res.end(JSON.stringify({ error: 'Ruta no encontrada' }));
  }
});

server.listen(PUERTO, () => {
  console.log(`Servidor escuchando en http://localhost:${PUERTO}`);
});
