const fs = require('fs');
const { exec } = require('child_process');

function graficarArbol(arbolitos) {
    global.cuerpo = '';
    global.contador = 0;

    global.contador = 1;
    global.cuerpo = '';
    graphAST('n0', arbolitos);
    let principal = `digraph arbolAST{ 
        n0[label="${arbolitos.valor.replace('"', '\\"')}"];
        ${cuerpo}
    }`;
    fs.writeFile('arbolAST.dot', principal, () => {});
    exec('dot -Tjpg arbolAST.dot -o arbolAST.jpg', (error, stdout, stderr) => {
        if (error) {
            return;
        }
        if (stderr) {
            return;
        }

        
        exec('start arbolAST.jpg', (openError, openStdout, openStderr) => {
            if (openError) {
                console.error('Error al abrir la imagen:', openError);
            }
        });
    });
    return principal;
}

function graphAST(texto, padre) {
    for (let hijo of padre.listaHijos) {
        let nombreHijo = `n${global.contador}`;
        global.cuerpo += `${nombreHijo}[label="${hijo.valor.replace('"', '\\"')}"];
        ${texto} -> ${nombreHijo};\n`;
        global.contador++;
        graphAST(nombreHijo, hijo);
    }
}

module.exports = graficarArbol;
