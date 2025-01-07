const analizador = require('./analizador/parser.js');
const Entorno = require('./interprete/Entorno/Entorno.js');

let resultado = analizador.parse("echo 5;\necho \"Hola Mundo\";\necho 'a';\necho true;\necho 54.25;\necho 55 + 25;");


let entornoGlobal = new Entorno("GLOBAL", null);
// resultado.interpretar(entornoGlobal);

resultado.forEach(instruccion => {
    instruccion.interpretar(entornoGlobal);
});
