function procesarSecuenciasEscape(cadena) {
    return cadena.replace(/\\\\/g, '\\')
        .replace(/\\n/g, '\n')
        .replace(/\\t/g, '\t')
        .replace(/\\'/g, "'");
}


module.exports = procesarSecuenciasEscape;