
const API_URL = "http://127.0.0.1:3000"

const xhr =  new XMLHttpRequest();

/*
function onrequest(){
    if(this.readyState == 4 && this.status == 200){

        console.log("esto",this.response);
    }
}
*/
var json;


function Ejecutar(){

    let Atext = document.getElementById('textarea1');
    let texto = Atext.value;
    console.log(texto);

    var code = {
        code: texto
    };

    var jsoncode = JSON.stringify(code);

    console.log(jsoncode);

    xhr.addEventListener('load', function() {
    if (xhr.status === 200) {
        var response = JSON.parse(xhr.responseText);
        console.log(response.consola);

        let areatext2 = document.getElementById('textarea2');
        areatext2.value = response.consola;
        // Aquí puedes manejar la respuesta del servidor
    } else {
        console.error('Error:', xhr.statusText);
    }
    });

    xhr.addEventListener('error', function() {
    console.error('Error:', xhr.statusText);
    });

    
    xhr.open("POST", `${API_URL}/interprete/interpreter`);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.send(jsoncode);
     
    
}


function abrirArchivo(event) {
    event.preventDefault();

    let areatext1 = document.getElementById('textarea1');

    // Obtener el elemento del input de archivo
    var inputFile = document.getElementById('inputFile');

    // Obtener el archivo seleccionado
    var file = inputFile.files[0];

    // Crear un objeto FileReader para leer el contenido del archivo
    var reader = new FileReader();

    // Configurar el evento onload del FileReader para manejar la lectura del archivo
    reader.onload = function() {
        // Obtener el contenido del archivo como texto
        var fileContent = reader.result;

        // Hacer lo que necesites con el contenido del archivo, por ejemplo:
        console.log(fileContent);
        areatext1.value = fileContent;
    };

    // Leer el contenido del archivo como texto
    reader.readAsText(file);





}   


/*
xhr.addEventListener("load", onrequest);
xhr.open("GET", `${API_URL}/interprete/ping`);
xhr.send();

*/
