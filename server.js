import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import fs from 'node:fs';
import readline from 'node:readline';
import path from 'node:path';

const app = express();
const PUERTO = 3000;

app.use(cors({
  origin: '*'
}));
//app.use(morgan('dev'));

function obtenerFechaFormateada() {
  const ahora = new Date();

  const dia = String(ahora.getDate()).padStart(2, '0');
  const mes = String(ahora.getMonth() + 1).padStart(2, '0');
  const anio = ahora.getFullYear();

  const horas = String(ahora.getHours()).padStart(2, '0');
  const minutos = String(ahora.getMinutes()).padStart(2, '0');

  return `${dia}_${mes}_${anio}_${horas}_${minutos}`;
}

// Función asíncrona que lee SOLO la primera línea garantizada
function leerPrimeraLinea(rutaArchivo) {
  return new Promise((resolve) => {
    if (!fs.existsSync(rutaArchivo)) {
      return resolve(null);
    }

    const stream = fs.createReadStream(rutaArchivo, { encoding: 'utf-8' });
    const rl = readline.createInterface({ input: stream, crlfDelay: Infinity });

    let primeraLineaLeida = false;

    rl.on('line', (linea) => {
      if (!primeraLineaLeida) {
        primeraLineaLeida = true;
        rl.close();
        stream.destroy();
        resolve(linea.trim());
      }
    });

    rl.on('error', () => resolve(null));
  });
}

// Ruta principal
app.get('/', async (req, res) => {
  // Generar la ruta actualizada al minuto exacto de la petición
  const rutaActual = path.join(process.cwd(), `${obtenerFechaFormateada()}.txt`);
  const nombreArchivo = path.basename(rutaActual);

  const primeraLinea = await leerPrimeraLinea(rutaActual);

  if (primeraLinea === null) {
    return res.status(404).json({
      error: 'Archivo no encontrado',
      archivoBuscado: nombreArchivo
    });
  }
    console.log(primeraLinea);
  return res.status(200).json({
    linea: primeraLinea,
    archivo: nombreArchivo
  });
});

// Manejo de rutas no encontradas
app.get('/client.js', (req, res) => {
  res.sendFile(path.join(process.cwd(), 'client.js'));
});

app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

app.listen(PUERTO, () => {
  console.log(`Servidor escuchando en http://localhost:${PUERTO}`);
});
