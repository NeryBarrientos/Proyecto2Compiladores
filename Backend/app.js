const analizador = require('./analizador/parser.js');
const express = require("express");
const path = require("path");
const fs = require("fs");
const cors = require("cors");
const bodyParser = require('body-parser');
const NodoAst = require('./interprete/simbolo/NodoAst.js');
const graficarArbol = require('./interprete/Graficar.js')
const errores = require("./analizador/utilidad/Errores.js");
const simbolos = require("./analizador/utilidad/Simbolos.js");
const Entorno = require('./interprete/entorno/Entorno.js');
const { arreglo } = require('./analizador/utilidad/Datos.js');

let Er = errores.mostrarErrores();
let sim = simbolos.mostrarSimbolos();
const app = express();

// Middleware para aceptar JSON
app.use(express.json());
app.use(bodyParser.json()); // Permite leer JSON en el cuerpo de la petición

// Usa CORS para permitir solicitudes desde el frontend (localhost:5173)
app.use(cors({
    origin: 'http://localhost:5173'
}));

// Endpoint principal
app.get("/", (req, res) => {
    res.send("Hello World xD");
});

// Obtenemos entrada del editor de texto
app.post('/execute', (req, res) => {
    const { code } = req.body;
    while (arreglo.length > 0) {
        arreglo.pop();
    }

    if (Er.length > 0) {
        while (Er.length > 0) {
            Er.pop();
        }
    }

    if (sim.length > 0) {
        while (sim.length > 0) {
            sim.pop();
        }
    }
    global.break = false;
    global.continue = false;
    global.ciclo = false;
    global.retorno = false;
    global.retornoval = false;
    try {
        let resultado = analizador.parse(code);
        let entornoGlobal = new Entorno("GLOBAL", null);

        resultado.forEach(instruccion => {
            try {
                if (instruccion.tipo != "EXECUTE") {
                    const result = instruccion.interpretar(entornoGlobal);
                    // console.log(typeof (result));
                    // console.log(result);
                }
            } catch (error) {
                console.error('Error en la interpretación:', error);
                arreglo.push(`Error en la interpretación: ${error.message}`);
                return; // Detener la ejecución
            }
            let executeIniciado = false;
            resultado.forEach(instruccion => {
                try {
                    if (instruccion.tipo == "EXECUTE" && !executeIniciado) {
                        executeIniciado = true;
                        instruccion.interpretar(entornoGlobal);
                    } else if (instruccion.tipo == "EXECUTE" && executeIniciado) {
                        console.error('Error Semantico:', "Ya se ha ejecutado un execute");
                        errores.crearError("Error Semántico: ", "Ya se ha ejecutado un execute", instruccion.fila, instruccion.columna);
                    }
                } catch (error) {

                    console.error('Error al interpretar la instrucción:', error);

                    return;
                }
            });
        });

        res.json({ success: true, arreglo: arreglo.join('\n') }); // Enviamos la salida como respuesta
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

app.post('/ast', (req, res) => {
    console.log("xd");
    const { code } = req.body;
    global.break = false;
    global.continue = false;
    global.ciclo = false;
    global.retorno = false;
    global.retornoval = false;
    global.valorfinal = "";

    // Limpiamos los arreglos globales
    while (arreglo.length > 0) {
        arreglo.pop();
    }
    if (Er.length > 0) {
        while (Er.length > 0) {
            Er.pop();
        }
    }
    if (sim.length > 0) {
        while (sim.length > 0) {
            sim.pop();
        }
    }

    try {
        // Enviamos la entrada a analizar
        let resultado = analizador.parse(code);
        let entornoGlobal = new Entorno("GLOBAL", null);

        // Ejecutamos las instrucciones
        resultado.forEach(instruccion => {
            try {
                if (instruccion.tipo != "EXECUTE") {
                    instruccion.interpretar(entornoGlobal);
                }
            } catch (error) {
                console.error('Error en la interpretación:', error);
                arreglo.push(`Error en la interpretación: ${error.message}`);
                return; // Detener la ejecución en caso de error
            }
        });

        let executeIniciado = false;
        resultado.forEach(instruccion => {
            try {
                if (instruccion.tipo == "EXECUTE" && !executeIniciado) {
                    executeIniciado = true;
                    instruccion.interpretar(entornoGlobal);
                } else if (instruccion.tipo == "EXECUTE" && executeIniciado) {
                    console.error('Error Semantico:', "Ya se ha ejecutado un execute");
                    errores.crearError("Error Semántico: ", "Ya se ha ejecutado un execute", instruccion.fila, instruccion.columna);
                }
            } catch (error) {
                console.error('Error al interpretar la instrucción:', error);
                return; // Detener la ejecución en caso de error
            }
        });

        // Generar el AST
        let init = new NodoAst('INIT');
        let instrucciones = new NodoAst('INSTRUCCIONES');
        for (const iterar of resultado) {
            try {
                instrucciones.agregarHijoAST(iterar.getNodo());
            } catch (error) {
                console.error("Error al agregar hijo al AST:", error);
                continue;
            }
        }
        init.agregarHijoAST(instrucciones);

        // Responder con el AST graficado
        let respuesta = { result: graficarArbol(init) };
        return res.json({ success: true, ast: JSON.stringify(respuesta) });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
});





// let resultado = analizador.parse("echo \"Hola Mundo\"; echo 5 ;");

// Endpoint para obtener el nombre del archivo
app.post("/upload", (req, res) => {
    const { fileName } = req.body;

    if (!fileName) {
        return res.status(400).send("No se proporcionó un nombre de archivo");
    }

    res.status(200).json({
        message: "Nombre del archivo recibido correctamente",
        fileName: fileName
    });
});

// Endpoint para actualizar el archivo y devolverlo
app.post("/update-file", (req, res) => {
    const { fileName, newContent } = req.body;

    if (!fileName || !newContent) {
        return res.status(400).send("No se ha proporcionado el nombre del archivo o el contenido");
    }

    const filePath = path.join(__dirname, 'uploads', fileName);

    // Sobrescribir el archivo con el nuevo contenido
    fs.writeFile(filePath, newContent, (err) => {
        if (err) {
            console.error('Error al escribir el archivo:', err);
            return res.status(500).send("Error al actualizar el archivo");
        }

        // Devolver el archivo actualizado como respuesta
        res.download(filePath, fileName, (err) => {
            if (err) {
                console.error('Error al descargar el archivo:', err);
                return res.status(500).send("Error al enviar el archivo actualizado");
            }
        });
    });
});


// Ruta para obtener los símbolos
app.get('/api/simbolos', (req, res) => {
    const sim = simbolos.mostrarSimbolos();
    // console.log(sim[0]);
    res.status(200).json({ simbolos: sim });
});
// Ruta para obtener los símbolos
app.get('/api/errores', (req, res) => {
    const Er = errores.mostrarErrores();
    console.log(Er);
    res.status(200).json({ errores: Er });
});


app.listen(3000, () => {
    console.log('Servidor escuchando en el puerto 3000');
});
