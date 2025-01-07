import { useState, useRef, useEffect } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import usacLogo from './assets/usac.svg';
import Swal from 'sweetalert2';
import './App.css';
// import axios from 'axios';

function App() {
  const [text, setText] = useState('');

  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isReportsDropdownOpen, setReportsDropdownOpen] = useState(false);
  const [fileName, setFileName] = useState(null); // Estado para almacenar el nombre del archivo
  const [consoleOutput, setConsoleOutput] = useState(''); // Nuevo estado para la consola de salida
  const [getErrores, setErrores] = useState([]);
  const [getSimbolos, setSimbolos] = useState([]);
  const textareaRef = useRef(null);
  const lineNumbersRef = useRef(null);
  var Erroresxd = [];


  const getLineNumbers = () => {
    const lines = text.split('\n').length;
    return Array.from({ length: lines }, (_, i) => i + 1).join('\n');
  };

  function fetchSimbolos() {
    fetch("http://localhost:3000/api/simbolos") // Asegúrate de que esta ruta es la correcta
      .then(response => {
        if (!response.ok) {
          throw new Error('Error en la respuesta del servidor');
        }
        return response.json(); // Convertir la respuesta a JSON
      })
      .then(data => {
        // mensaje que los datos fueron enviados correctamente con sweetalert2
        Swal.fire({
          title: 'Datos recibidos',
          text: 'Los datos se recibieron correctamente',
          icon: 'success'
        });
        // console.log('Datos recibidos:', data);
        // console.log(data.simbolos);
        setSimbolos(data.simbolos); // Almacenar los símbolos en el estado
        renderSimbolosTable(); // Renderizar la tabla de símbolos
        setReportsDropdownOpen(false); // Cerrar el dropdown de reportes
      })
      .catch(error => {
        console.error("Error al obtener los símbolos:", error);
        Swal.fire({
          title: 'Error',
          text: 'Hubo un error al obtener los símbolos',
          icon: 'error'
        });
      });
  }
  // Quita la variable global Erroresxd
// var Erroresxd = []; // Ya no se necesita

function fetcherrores() {
  fetch("http://localhost:3000/api/errores") // Asegúrate de que esta ruta es la correcta
    .then(response => {
      if (!response.ok) {
        throw new Error('Error en la respuesta del servidor');
      }
      return response.json(); // Convertir la respuesta a JSON
    })
    .then(data => {
      Swal.fire({
        title: 'Datos recibidos',
        text: 'Los datos se recibieron correctamente',
        icon: 'success'
      });

      // Actualizamos directamente el estado `getErrores` con los datos recibidos
      setErrores(data.errores); // Almacenar los errores en el estado
      setReportsDropdownOpen(false); // Cerrar el dropdown de reportes
    })
    .catch(error => {
      console.error("Error al obtener los errores:", error);
      Swal.fire({
        title: 'Error',
        text: 'Hubo un error al obtener los errores',
        icon: 'error'
      });
    });
}

const AST = () => {
  // alert("Generando AST");
  // limpiar la consola de salida
  setConsoleOutput('');
  const code = text; // Texto del editor
  setReportsDropdownOpen(!isReportsDropdownOpen);
  fetch('http://localhost:3000/ast', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ code })
  })
    .then(response => response.json())
    .then(result => {
      if (result.success) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Se Generó el AST correctamente",
          showConfirmButton: false,
          timer: 1500
        });
        // appendToConsole(result.arreglo); // Muestra la salida del parser en la consola del frontend
      } else {
        // appendToConsole(`Error: ${result.message}`);
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "No Se Generó el AST correctamente",
          showConfirmButton: false,
          timer: 1500
        });
      }
    })
    .catch(error => {
      console.error('Error en la ejecución:', error);
      appendToConsole('Error en la ejecución.');
    });
};





const renderErroresTable = () => {
  if (getErrores.length === 0) {
    return null; // Si no hay errores, no se renderiza la tabla
  }

  return (
    <>
      <h1>Errores</h1>
      <table className="table-auto mt-4 border-collapse border border-gray-300 w-full">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">No.</th>
            <th className="border border-gray-300 px-4 py-2">Nombre</th>
            <th className="border border-gray-300 px-4 py-2">Simbolo</th>
            <th className="border border-gray-300 px-4 py-2">Fila</th>
            <th className="border border-gray-300 px-4 py-2">Columna</th>
          </tr>
        </thead>
        <tbody>
          {getErrores.map((error, index) => (
            <tr key={index}>
              <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
              <td className="border border-gray-300 px-4 py-2">{error.nombre}</td>
              <td className="border border-gray-300 px-4 py-2">{error.simbolo}</td>
              <td className="border border-gray-300 px-4 py-2">{error.fila}</td>
              <td className="border border-gray-300 px-4 py-2">{error.columna}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};


  // Función para renderizar la tabla de simbolos
  const renderSimbolosTable = () => {
    if (getSimbolos.length === 0) {
      return null; // Si no hay símbolos, no se renderiza la tabla
    } else {
      let prueba = getSimbolos;
    }

    return (
      <><h1>Tabla de símbolos</h1><table className="table-auto mt-4 border-collapse border border-gray-300 w-full">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">No.</th>
            <th className="border border-gray-300 px-4 py-2">Nombre</th>
            <th className="border border-gray-300 px-4 py-2">Tipo</th>
            <th className="border border-gray-300 px-4 py-2">Ambito</th>
            <th className="border border-gray-300 px-4 py-2">Fila</th>
            <th className="border border-gray-300 px-4 py-2">Columna</th>
            
          </tr>
        </thead>
        <tbody>
          {getSimbolos.map((simbolo, index) => (
            <tr key={index}>
              <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
              <td className="border border-gray-300 px-4 py-2">{simbolo.id}</td>
              <td className="border border-gray-300 px-4 py-2">{simbolo.tipoVar}</td>
              <td className="border border-gray-300 px-4 py-2">{simbolo.entorno}</td>
              <td className="border border-gray-300 px-4 py-2">{simbolo.fila}</td>
              <td className="border border-gray-300 px-4 py-2">{simbolo.columna}</td>
            </tr>
          ))}
        </tbody>
      </table></>
    );
  };
  


  // Manejador para el botón de "Generar Errores"
  const handleGenerateErrorsClick = () => {
    fetchErrores(); // Llamar la función para obtener los errores
    setReportsDropdownOpen(false); // Cerrar el dropdown de reportes
  };
  const changeText = (text) => {
    setText(text);
  };

  const handleLoadClick = () => {
    Swal.fire({
      title: 'Cargar archivo',
      text: 'Selecciona un archivo para cargarlo',
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Cargar archivo',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        // Crear el input de tipo 'file'
        const input = document.createElement('input');
        input.type = 'file';

        // Al seleccionar un archivo, llama a handleFileChange
        input.addEventListener('change', handleFileChange);
        input.click();
      }
    });

    // Esconde el dropdown (esto lo mantengo si es necesario para tu UI)
    setDropdownOpen(false);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0]; // Selecciona el archivo

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target.result; // Contenido del archivo
        const fileName = file.name; // Obtiene solo el nombre del archivo

        fetch('http://localhost:3000/upload', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ fileName }) // Enviamos solo el nombre del archivo
        })
          .then(response => response.json())
          .then(result => {
            console.log('Nombre del archivo:', result.fileName);

            // Colocar el contenido del archivo en el editor de texto
            setText(content);

            // Guarda el nombre del archivo en sessionStorage
            sessionStorage.setItem('fileName', result.fileName);

            // Agregar el nombre del archivo cargado a la consola
            // appendToConsole(`Archivo cargado: ${result.fileName}`);
          })
          .catch(error => {
            console.error('Error al procesar el archivo:', error);
            // appendToConsole('Error al cargar el archivo.');
          });
      };

      // Lee el contenido del archivo como texto
      reader.readAsText(file);
    }
  };

  const handleNewFile = () => {
    // Limpia el contenido del editor
    setText('');
    // Elimina el nombre del archivo de sessionStorage
    setFileName(null); // Reinicia el nombre del archivo
    // Limpiar la consola de salida
    setConsoleOutput('');
    // appendToConsole('Nuevo archivo creado.');
    setDropdownOpen(false);
  };

  const handleSaveFile = () => {
    const updatedContent = text; // Contenido actualizado
    let fileName = sessionStorage.getItem('fileName'); // Obtén el nombre del archivo de sessionStorage
    console.log('Nombre del archivo:', fileName);

    // Verificación que haya contenido en el editor
    if (!updatedContent) {
      return Swal.fire({
        title: 'Error',
        text: 'No hay contenido para guardar',
        icon: 'error'
      });
    }

    if (!fileName) {
      // Si no hay nombre del archivo, pedir al usuario que lo introduzca
      return Swal.fire({
        title: 'Error',
        text: 'No se ha especificado el nombre del archivo',
        icon: 'error',
        showCancelButton: true,
        confirmButtonText: 'Introducir nombre de archivo',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          // Abrir un input para que el usuario introduzca el nombre del archivo
          Swal.fire({
            title: 'Introduce el nombre del archivo',
            input: 'text',
            inputPlaceholder: 'Nombre del archivo',
            showCancelButton: true,
            confirmButtonText: 'Guardar',
            cancelButtonText: 'Cancelar',
            inputValidator: (value) => {
              if (!value) {
                return 'Debes escribir un nombre de archivo';
              }
            }
          }).then((inputResult) => {
            if (inputResult.isConfirmed) {
              fileName = inputResult.value; // Asigna el valor introducido al nombre del archivo
              sessionStorage.setItem('fileName', fileName); // Guarda el nombre en sessionStorage

              // Llamar a la función de descarga
              saveFile(fileName, updatedContent);
            }
          });
        }
      });
    } else {
      // Si el nombre ya existe, procede a guardar el archivo
      saveFile(fileName, updatedContent);
    }
  };

  // Función para guardar el archivo
  const saveFile = (fileName, content) => {
    // Crear archivo con el contenido actualizado y descargarlo
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    // appendToConsole(`Archivo guardado como: ${fileName}`);
    setDropdownOpen(false);
  };


  // Función para agregar mensajes a la consola de salida
  const appendToConsole = (message) => {
    setConsoleOutput(prevOutput => prevOutput + '\n' + message);
  };

  const handleExecuteClick = () => {
    const code = text; // Texto del editor
    // Limpiar la consola de salida
    setConsoleOutput('');
    fetch('http://localhost:3000/execute', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ code })
    })
      .then(response => response.json())
      .then(result => {
        if (result.success) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Se Ejecutó correctamente",
            showConfirmButton: false,
            timer: 1500
          });
          appendToConsole(result.arreglo); // Muestra la salida del parser en la consola del frontend
        } else {
          appendToConsole(`Error: ${result.message}`);
          Swal.fire({
            position: "top-end",
            icon: "error",
            title: "No Se Ejecutó correctamente",
            showConfirmButton: false,
            timer: 1500
          });
        }
      })
      .catch(error => {
        console.error('Error en la ejecución:', error);
        appendToConsole('Error en la ejecución.');
      });
  };


  const toggleDropdown = () => {
    setReportsDropdownOpen(false);
    setDropdownOpen(!isDropdownOpen);
  };

  const toggleReportsDropdown = () => {
    setDropdownOpen(false);
    setReportsDropdownOpen(!isReportsDropdownOpen);
  };

  const handleScroll = () => {
    lineNumbersRef.current.scrollTop = textareaRef.current.scrollTop;
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0">
                <a href="https://portal.ingenieria.usac.edu.gt/" target="_blank" rel="noreferrer">
                  <img src={usacLogo} className="h-8 w-auto" alt="Usac logo" />
                </a>
              </div>
            </div>
            <div className="flex space-x-4 items-center relative">
              <button
                className="text-gray-800 hover:bg-gray-200 px-3 py-2 rounded-md text-sm font-medium"
                onClick={toggleDropdown}
              >
                Archivo
              </button>
              {isDropdownOpen && (
                <div className="absolute bg-white shadow-lg rounded-lg mt-2 py-2 w-48">
                  <button
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                    onClick={handleNewFile}
                  >
                    Nuevo Archivo
                  </button>
                  <button
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                    onClick={handleLoadClick}
                  >
                    Abrir Archivo
                  </button>
                  <button
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                    onClick={handleSaveFile}
                  >
                    Guardar
                  </button>
                </div>
              )}
              <button onClick={handleExecuteClick}
                className="text-gray-800 hover:bg-gray-200 px-3 py-2 rounded-md text-sm font-medium">
                Ejecutar
              </button>
              <button className="text-gray-800 hover:bg-gray-200 px-3 py-2 rounded-md text-sm font-medium"
                onClick={toggleReportsDropdown}>
                Reportes
              </button>
              {isReportsDropdownOpen && (
                <div className="absolute bg-white shadow-lg rounded-lg mt-2 py-2 w-48">
                  <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                    onClick={fetcherrores}>
                    Generar Errores
                  </button>
                  <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                    onClick={fetchSimbolos}>
                    Tabla de símbolos</button>
                  <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                  onClick={AST}>
                    Árbol</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      <main className="p-6">
        <div className="mt-8 grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="textEditor" className="block text-lg font-medium text-gray-700">
              Editor de texto
            </label>

            <div className="flex mt-2 relative">
              <div
                ref={lineNumbersRef}
                className="bg-gray-200 text-right pr-2 pt-4 absolute top-0 left-0 h-full w-12 overflow-hidden text-gray-600 select-none border border-gray-300 rounded-l-lg"
              >
                <pre>{getLineNumbers()}</pre>
              </div>

              <textarea
                ref={textareaRef}
                id="textEditor"
                className="flex-grow h-64 p-4 pl-14 border border-gray-300 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none overflow-auto"
                placeholder="Escribe aquí..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                onScroll={handleScroll}
              ></textarea>
            </div>
          </div>

          <div>
            <label htmlFor="outputConsole" className="block text-lg font-medium text-gray-700">
              Consola de Salida
            </label>
            <div
              id="outputConsole"
              className="mt-2 w-full h-64 p-4 bg-black text-green-400 border border-gray-300 rounded-lg overflow-y-auto"
            >
              <pre>{consoleOutput}</pre>
            </div>
          </div>
        </div>

        {/* Agregar aquí el render de la tabla de símbolos */}
        <div className="mt-4">
          {renderSimbolosTable()}
        </div>
        <div className="mt-4">
          {renderErroresTable()}
        </div>
      </main>

    </div>
  );
}

export default App;
