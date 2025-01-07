const NodoAst = require('../simbolo/NodoAst');
const { Expresion, TipoDato } = require("../Expresion");
const errores = require("../../analizador/utilidad/Errores.js");


class Aritmetica extends Expresion{

    constructor(izq, op, der, fila, columna){
        super("ERROR", TipoDato.ERROR, fila, columna);
        this.izq = izq;
        this.der = der;
        this.op = op;
    }

    interpretar(entorno){
        this.izq.interpretar(entorno);
        this.der.interpretar(entorno);

        


         if(this.op == "+"){
            if (this.izq.tipo == TipoDato.INT && this.der.tipo == TipoDato.INT){
                this.tipo = TipoDato.INT;
                this.valor = Number(this.izq.valor) + Number(this.der.valor);
                return this;
                    
            }
            else if (this.izq.tipo == TipoDato.INT && this.der.tipo == TipoDato.DOUBLE){
                this.tipo = TipoDato.DOUBLE;
                this.valor = Number(this.izq.valor) + Number(this.der.valor);
                this.valor = this.valor
                return this;
            }
            else if (this.izq.tipo == TipoDato.INT && this.der.tipo == TipoDato.BOOLEAN){
                this.tipo = TipoDato.INT;
                if (this.der.valor =="true"){
                    this.der.valor = true;
                }
                else{
                    this.der.valor = false;
                }
                this.valor = Number(this.izq.valor) + Number(this.der.valor);
                return this;
            }
            else if (this.izq.tipo == TipoDato.INT && this.der.tipo == TipoDato.CHAR){
                console.log(this.der.valor);
                this.der.valor = this.der.valor.charCodeAt(0);
                console.log(this.der.valor);
                this.tipo = TipoDato.INT;
                this.valor = Number(this.izq.valor) + Number(this.der.valor);
                return this;
            }
            else if (this.izq.tipo == TipoDato.INT && this.der.tipo == TipoDato.STRING){
                this.tipo = TipoDato.STRING;
                this.valor = Number(this.izq.valor) + this.der.valor;
                return this;
            }

            else if (this.izq.tipo == TipoDato.DOUBLE && this.der.tipo == TipoDato.INT){
                this.tipo = TipoDato.DOUBLE;
                this.valor = Number(this.izq.valor) + Number(this.der.valor);
                this.valor = this.valor
                return this;
            }
            else if (this.izq.tipo == TipoDato.DOUBLE && this.der.tipo == TipoDato.DOUBLE){
                this.tipo = TipoDato.DOUBLE;
                this.valor = Number(this.izq.valor) + Number(this.der.valor);
                this.valor = this.valor
                return this;
            }
            else if (this.izq.tipo == TipoDato.DOUBLE && this.der.tipo == TipoDato.BOOLEAN){
                this.tipo = TipoDato.DOUBLE;
                if (this.der.valor =="true"){
                    this.der.valor = true;
                }
                else{
                    this.der.valor = false;
                }
                this.valor = Number(this.izq.valor) + Number(this.der.valor);
                this.valor = this.valor
                return this;
            }
            else if (this.izq.tipo == TipoDato.DOUBLE && this.der.tipo == TipoDato.CHAR){
                this.tipo = TipoDato.DOUBLE;
                this.der.valor = this.der.valor.charCodeAt(0);
                this.valor = Number(this.izq.valor) + Number(this.der.valor);
                this.valor = this.valor
                return this;
            }
            else if (this.izq.tipo == TipoDato.DOUBLE && this.der.tipo == TipoDato.STRING){
                this.tipo = TipoDato.STRING;
                this.valor = Number(this.izq.valor) + this.der.valor;
                return this;
            }
            else if (this.izq.tipo == TipoDato.BOOLEAN && this.der.tipo == TipoDato.INT){
                this.tipo = TipoDato.INT;
                if (this.izq.valor =="true"){
                    this.izq.valor = true;
                }
                else{
                    this.izq.valor = false;
                }
                this.valor = Number(this.izq.valor) + Number(this.der.valor);
                return this;
            }
            else if (this.izq.tipo == TipoDato.BOOLEAN && this.der.tipo == TipoDato.DOUBLE){
                this.tipo = TipoDato.DOUBLE;
                if (this.izq.valor =="true"){
                    this.izq.valor = true;
                }
                else{
                    this.izq.valor = false;
                }
                this.valor = Number(this.izq.valor) + Number(this.der.valor);
                this.valor = this.valor
                return this;
            }
            else if (this.izq.tipo == TipoDato.BOOLEAN && this.der.tipo == TipoDato.STRING){
                this.tipo = TipoDato.STRING;
                this.valor = this.izq.valor + this.der.valor;
                return this;
            }
            else if (this.izq.tipo == TipoDato.CHAR && this.der.tipo == TipoDato.INT){
                this.tipo = TipoDato.INT;
                this.valor = this.izq.valor.charCodeAt(0) + Number(this.der.valor);
                return this;
            }
            else if (this.izq.tipo == TipoDato.CHAR && this.der.tipo == TipoDato.DOUBLE){
                this.tipo = TipoDato.DOUBLE;
                this.valor = this.izq.valor.charCodeAt(0) + Number(this.der.valor);
                this.valor = this.valor
                return this;
            }
            else if (this.izq.tipo == TipoDato.CHAR && this.der.tipo == TipoDato.CHAR){
                this.tipo = TipoDato.STRING;
                this.valor = this.izq.valor + this.der.valor;
                return this;
            }

            else if (this.izq.tipo == TipoDato.CHAR && this.der.tipo == TipoDato.STRING){
                this.tipo = TipoDato.STRING;
                this.valor = this.izq.valor + this.der.valor;
                return this;
            }
            else if (this.izq.tipo == TipoDato.STRING && this.der.tipo == TipoDato.INT){
                this.tipo = TipoDato.STRING;
                this.valor = this.izq.valor + this.der.valor;
                return this;
            }
            else if (this.izq.tipo == TipoDato.STRING && this.der.tipo == TipoDato.DOUBLE){
                this.tipo = TipoDato.STRING;
                this.valor = this.izq.valor + this.der.valor;
                return this;
            }
            else if (this.izq.tipo == TipoDato.STRING && this.der.tipo == TipoDato.BOOLEAN){
                this.tipo = TipoDato.STRING;
                this.valor = this.izq.valor + this.der.valor;
                return this;
            }
            else if (this.izq.tipo == TipoDato.STRING && this.der.tipo == TipoDato.CHAR){
                this.tipo = TipoDato.STRING;
                this.valor = this.izq.valor + this.der.valor;
                return this;
            }
            else if (this.izq.tipo == TipoDato.STRING && this.der.tipo == TipoDato.STRING){
                this.tipo = TipoDato.STRING;
                this.valor = this.izq.valor + this.der.valor;
                return this;
            }

            else{
                    
                    console.log("Error semantico: Error tipo de dato en la suma")
                    errores.crearError("Error Semántico: ","Error tipo de dato en la suma",this.fila,this.columna);
                    return this;
            }
            
    }
    else if(this.op == "-"){
        if (this.izq.tipo == TipoDato.INT && this.der.tipo == TipoDato.INT){
            this.tipo = TipoDato.INT;
            this.valor = Number(this.izq.valor) - Number(this.der.valor);
            return this;
                
        }
        else if (this.izq.tipo == TipoDato.INT && this.der.tipo == TipoDato.DOUBLE){
            this.tipo = TipoDato.DOUBLE;
            this.valor = Number(this.izq.valor) - Number(this.der.valor);
            this.valor = this.valor
            return this;
        }
        else if (this.izq.tipo == TipoDato.INT && this.der.tipo == TipoDato.BOOLEAN){
            this.tipo = TipoDato.INT;
            if (this.der.valor =="true"){
                this.der.valor = true;
            }
            else{
                this.der.valor = false;
            }
            this.valor = Number(this.izq.valor) - Number(this.der.valor);
            return this;
        }
        else if (this.izq.tipo == TipoDato.INT && this.der.tipo == TipoDato.CHAR){
            this.der.valor = this.der.valor.charCodeAt(0);
            this.tipo = TipoDato.INT;
            this.valor = Number(this.izq.valor) - Number(this.der.valor);
            return this;
        }
        else if (this.izq.tipo == TipoDato.DOUBLE && this.der.tipo == TipoDato.INT){
            this.tipo = TipoDato.DOUBLE;
            this.valor = Number(this.izq.valor) - Number(this.der.valor);
            this.valor = this.valor
            return this;
        }
        else if (this.izq.tipo == TipoDato.DOUBLE && this.der.tipo == TipoDato.DOUBLE){
            this.tipo = TipoDato.DOUBLE;
            this.valor = Number(this.izq.valor) - Number(this.der.valor);
            this.valor = this.valor
            return this;
        }
        else if (this.izq.tipo == TipoDato.DOUBLE && this.der.tipo == TipoDato.BOOLEAN){
            this.tipo = TipoDato.DOUBLE;
            if (this.der.valor =="true"){
                this.der.valor = true;
            }
            else{
                this.der.valor = false;
            }
            this.valor = Number(this.izq.valor) - Number(this.der.valor);
            this.valor = this.valor
            return this;
        }
        else if (this.izq.tipo == TipoDato.DOUBLE && this.der.tipo == TipoDato.CHAR){
            this.tipo = TipoDato.DOUBLE;
            this.der.valor = this.der.valor.charCodeAt(0);
            this.valor = Number(this.izq.valor) - Number(this.der.valor);
            this.valor = this.valor
            return this;
        }
        else if (this.izq.tipo == TipoDato.BOOLEAN && this.der.tipo == TipoDato.INT){
            this.tipo = TipoDato.INT;
            if (this.izq.valor =="true"){
                this.izq.valor = true;
            }
            else{
                this.izq.valor = false;
            }
            this.valor = Number(this.izq.valor) - Number(this.der.valor);
            return this;
        }
        else if (this.izq.tipo == TipoDato.BOOLEAN && this.der.tipo == TipoDato.DOUBLE){
            this.tipo = TipoDato.DOUBLE;
            if (this.izq.valor =="true"){
                this.izq.valor = true;
            }
            else{
                this.izq.valor = false;
            }
            this.valor = Number(this.izq.valor) - Number(this.der.valor);
            this.valor = this.valor
            return this;
        }
        else if (this.izq.tipo == TipoDato.CHAR && this.der.tipo == TipoDato.INT){
            this.tipo = TipoDato.INT;
            this.valor = this.izq.valor.charCodeAt(0) - Number(this.der.valor);
            return this;
        }
        else if (this.izq.tipo == TipoDato.CHAR && this.der.tipo == TipoDato.DOUBLE){
            this.tipo = TipoDato.DOUBLE;
            this.valor = this.izq.valor.charCodeAt(0) - Number(this.der.valor);
            this.valor = this.valor
            return this;
        }

        else{
            
            console.log("Error semantico: Error tipo de dato en la resta")
            errores.crearError("Error Semántico: ","Error tipo de dato en la resta",this.fila,this.columna);
            return this;
    }
}
    else if(this.op == "*"){
        if (this.izq.tipo == TipoDato.INT && this.der.tipo == TipoDato.INT){
            this.tipo = TipoDato.INT;
            this.valor = Number(this.izq.valor) * Number(this.der.valor);
            return this;
                
        }
        else if (this.izq.tipo == TipoDato.INT && this.der.tipo == TipoDato.DOUBLE){
            this.tipo = TipoDato.DOUBLE;
            this.valor = Number(this.izq.valor) * Number(this.der.valor);
            this.valor = this.valor
            return this;
        }
        else if (this.izq.tipo == TipoDato.INT && this.der.tipo == TipoDato.CHAR){
            this.der.valor = this.der.valor.charCodeAt(0);
            this.tipo = TipoDato.INT;
            this.valor = Number(this.izq.valor) * Number(this.der.valor);
            return this;
        }
        else if (this.izq.tipo == TipoDato.DOUBLE && this.der.tipo == TipoDato.INT){
            this.tipo = TipoDato.DOUBLE;
            this.valor = Number(this.izq.valor) * Number(this.der.valor);
            this.valor = this.valor
            return this;
        }
        else if (this.izq.tipo == TipoDato.DOUBLE && this.der.tipo == TipoDato.DOUBLE){
            this.tipo = TipoDato.DOUBLE;
            this.valor = Number(this.izq.valor) * Number(this.der.valor);
            this.valor = this.valor
            return this;
        }
        else if (this.izq.tipo == TipoDato.DOUBLE && this.der.tipo == TipoDato.CHAR){
            this.tipo = TipoDato.DOUBLE;
            this.der.valor = this.der.valor.charCodeAt(0);
            this.valor = Number(this.izq.valor) * Number(this.der.valor);
            this.valor = this.valor
            return this;
        }
        else if (this.izq.tipo == TipoDato.CHAR && this.der.tipo == TipoDato.INT){
            this.tipo = TipoDato.INT;
            this.valor = this.izq.valor.charCodeAt(0) * Number(this.der.valor);
            return this;
        }
        else if (this.izq.tipo == TipoDato.CHAR && this.der.tipo == TipoDato.DOUBLE){
            this.tipo = TipoDato.DOUBLE;
            this.valor = this.izq.valor.charCodeAt(0) * Number(this.der.valor);
            this.valor = this.valor
            return this;
        }
        else{
            
            console.log("Error semantico: Error tipo de dato en la multiplicacion");
            errores.crearError("Error Semántico: ","Error tipo de dato en la multiplicacion",this.fila,this.columna);
            return this;
        }

}
if (this.op == "/"){
    if (this.izq.tipo == TipoDato.INT && this.der.tipo == TipoDato.INT){
        
        if (Number(this.der.valor) == 0){
            console.log("Error semantico: Division por 0")
            errores.crearError("Error Semántico: ","Division por 0",this.fila,this.columna);
            return this;
        }
        this.tipo = TipoDato.DOUBLE;
        this.valor = Number(this.izq.valor) / Number(this.der.valor);
        this.valor = this.valor
        return this;
            
    }
    else if (this.izq.tipo == TipoDato.INT && this.der.tipo == TipoDato.DOUBLE){
        
        if (Number(this.der.valor) == 0){
            console.log("Error semantico: Division por 0")
            errores.crearError("Error Semántico: ","Division por 0",this.fila,this.columna);
            
            return this;
        }
        this.tipo = TipoDato.DOUBLE;
        this.valor = Number(this.izq.valor) / Number(this.der.valor);
        this.valor = this.valor
        return this;
    }
    else if (this.izq.tipo == TipoDato.INT && this.der.tipo == TipoDato.CHAR){
        this.der.valor = this.der.valor.charCodeAt(0);
        
        if (Number(this.der.valor) == 0){   
            console.log("Error semantico: Division por 0")
            errores.crearError("Error Semántico: ","Division por 0",this.fila,this.columna);
            return this;
        }
        this.tipo = TipoDato.DOUBLE;
        this.valor = Number(this.izq.valor) / Number(this.der.valor);
        this.valor = this.valor
        return this;
    }
    else if (this.izq.tipo == TipoDato.DOUBLE && this.der.tipo == TipoDato.INT){
        if (Number(this.der.valor) == 0){
            console.log("Error semantico: Division por 0")
            errores.crearError("Error Semántico: ","Division por 0",this.fila,this.columna);
            return this;
        }
        this.tipo = TipoDato.DOUBLE;
        this.valor = Number(this.izq.valor) / Number(this.der.valor);
        this.valor = this.valor
        return this;
    }
    else if (this.izq.tipo == TipoDato.DOUBLE && this.der.tipo == TipoDato.DOUBLE){
        if (Number(this.der.valor) == 0){
            console.log("Error semantico: Division por 0")
            errores.crearError("Error Semántico: ","Division por 0",this.fila,this.columna);
            return this;
        }
        this.tipo = TipoDato.DOUBLE;
        this.valor = Number(this.izq.valor) / Number(this.der.valor);
        this.valor = this.valor
        return this;
    }
    else if (this.izq.tipo == TipoDato.DOUBLE && this.der.tipo == TipoDato.CHAR){
        this.der.valor = this.der.valor.charCodeAt(0);
        if (Number(this.der.valor) == 0){
            console.log("Error semantico: Division por 0")
            errores.crearError("Error Semántico: ","Division por 0",this.fila,this.columna);
            return this;
        }
        this.tipo = TipoDato.DOUBLE;
        
        this.valor = Number(this.izq.valor) / Number(this.der.valor);
        this.valor = this.valor
        return this;
    }
    else if (this.izq.tipo == TipoDato.CHAR && this.der.tipo == TipoDato.INT){
        if (Number(this.der.valor) == 0){
            console.log("Error semantico: Division por 0")
            errores.crearError("Error Semántico: ","Division por 0",this.fila,this.columna);
            return this;
        }
        this.tipo = TipoDato.DOUBLE;
        this.valor = this.izq.valor.charCodeAt(0) / Number(this.der.valor);
        this.valor = this.valor
        return this;
    }
    else if (this.izq.tipo == TipoDato.CHAR && this.der.tipo == TipoDato.DOUBLE){
        if (Number(this.der.valor) == 0){
            console.log("Error semantico: Division por 0")
            errores.crearError("Error Semántico: ","Division por 0",this.fila,this.columna);
            return this;
        }
        this.tipo = TipoDato.DOUBLE;
        this.valor = this.izq.valor.charCodeAt(0) / Number(this.der.valor);
        this.valor = this.valor
        return this;
    }


    else{
        
        console.log("Error semantico: Error tipo de dato en la division")
        errores.crearError("Error Semántico: ","Error tipo de dato en la division",this.fila,this.columna);
        return this;
    }

}

else if (this.op == "^"){
    if (this.izq.tipo == TipoDato.INT && this.der.tipo == TipoDato.INT){
        this.tipo = TipoDato.INT;
        this.valor = Math.pow(this.izq.valor,this.der.valor);
        return this;
            
    }
    else if (this.izq.tipo == TipoDato.INT && this.der.tipo == TipoDato.DOUBLE){
        this.tipo = TipoDato.DOUBLE;
        this.valor = Math.pow(this.izq.valor,this.der.valor);
        this.valor = this.valor
        return this;
    }
    else if (this.izq.tipo == TipoDato.DOUBLE && this.der.tipo == TipoDato.INT){
        this.tipo = TipoDato.DOUBLE;
        this.valor = Math.pow(this.izq.valor,this.der.valor);
        this.valor = this.valor
        return this;
    }
    else if (this.izq.tipo == TipoDato.DOUBLE && this.der.tipo == TipoDato.DOUBLE){
        this.tipo = TipoDato.DOUBLE;
        this.valor = Math.pow(this.izq.valor,this.der.valor);
        this.valor = this.valor
        return this;
    }

    else{
        
        console.log("Error semantico: Error tipo de dato en la potencia")
        errores.crearError("Error Semántico: ","Error tipo de dato en la potencia",this.fila,this.columna);
        return this;
    }

}
else if (this.op == "%"){
    if (this.izq.tipo == TipoDato.INT && this.der.tipo == TipoDato.INT){
        this.tipo = TipoDato.DOUBLE;
        this.valor = this.izq.valor % this.der.valor;
        return this;
            
    }
    else if (this.izq.tipo == TipoDato.INT && this.der.tipo == TipoDato.DOUBLE){
        this.tipo = TipoDato.DOUBLE;
        this.valor = this.izq.valor % this.der.valor;
        this.valor = this.valor
        return this;
    }
    else if (this.izq.tipo == TipoDato.DOUBLE && this.der.tipo == TipoDato.INT){
        this.tipo = TipoDato.DOUBLE;
        this.valor = this.izq.valor % this.der.valor;
        this.valor = this.valor
        return this;
    }
    else if (this.izq.tipo == TipoDato.DOUBLE && this.der.tipo == TipoDato.DOUBLE){
        this.tipo = TipoDato.DOUBLE;
        this.valor = this.izq.valor % this.der.valor;
        this.valor = this.valor
        return this;
    }

    else{
        
        console.log("Error semantico: Error tipo de dato en el modulo")
        errores.crearError("Error Semántico: ","Error tipo de dato en el modulo",this.fila,this.columna);
        return this;
    }

}
else if (this.op == "$"){
    if (this.izq.tipo == TipoDato.INT && this.der.tipo == TipoDato.INT){
        this.tipo = TipoDato.DOUBLE;
        // Realizar la operacion de raiz de una base y valor indice de raiz
        this.valor = Math.pow(this.izq.valor,1/this.der.valor);
        this.valor = this.valor
        return this;
            
    }
    else if (this.izq.tipo == TipoDato.INT && this.der.tipo == TipoDato.DOUBLE){
        this.tipo = TipoDato.DOUBLE;
        this.valor = Math.pow(this.izq.valor,1/this.der.valor);
        this.valor = this.valor
        return this;
    }
    else if (this.izq.tipo == TipoDato.DOUBLE && this.der.tipo == TipoDato.INT){
        this.tipo = TipoDato.DOUBLE;
        this.valor = Math.pow(this.izq.valor,1/this.der.valor);
        this.valor = this.valor
        return this;
    }
    else if (this.izq.tipo == TipoDato.DOUBLE && this.der.tipo == TipoDato.DOUBLE){
        this.tipo = TipoDato.DOUBLE;
        this.valor = Math.pow(this.izq.valor,1/this.der.valor);
        this.valor = this.valor
        return this;
    }

    else{
        
        console.log("Error semantico: Error tipo de dato en la raiz")
        errores.crearError("Error Semántico: ","Error tipo de dato en la raiz",this.fila,this.columna);
        return this;
    }

}

}

getNodo() {
    try{
        let nodo = new NodoAst('EXPRESION');
        nodo.agregarHijoAST(this.izq.getNodo());
    
        switch (this.op) {
            case "+":
                nodo.agregarHijo('+');
                break;
            case "-":
                nodo.agregarHijo('-');
                break;
            case "/":
                nodo.agregarHijo('/');
                break;
            case "*":
                nodo.agregarHijo('*');
                break;
            case "%":
                nodo.agregarHijo('%');
                break;
            case "pow":
                nodo.agregarHijo('^');
                break;
            default:
                break;
        }
    
        nodo.agregarHijoAST(this.der.getNodo());
        return nodo;
    }


    catch (error) {
        console.error('Error al generar el nodo:');
        let nodo = new NodoAst('EXPRESION');
        nodo.agregarHijo("ERROR")
        return nodo;
}
}







}
module.exports = Aritmetica;