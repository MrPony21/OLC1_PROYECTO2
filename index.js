
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
let ast;

function Ejecutar(){

    let Atext = document.getElementById('textarea1');
    let texto = Atext.value;
   // console.log(texto);

    var code = {
        code: texto
    };

    var jsoncode = JSON.stringify(code);

    //console.log(jsoncode);

    xhr.addEventListener('load', function() {
    if (xhr.status === 200) {
        var response = JSON.parse(xhr.responseText);
       //console.log(response.consola);
       //console.log(response.consola)
        //console.log(response.errores);
        //console.log(response.ast);
        ast = response.ast;
        //console.log(ast);
       // console.log(response.tabla);

        let areatext2 = document.getElementById('textarea2');
        areatext2.value = response.consola;

        ErroresTabla(response.errores);
        showarbol(response.ast);
        tabla_simbolos(response.tabla);


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

function ErroresTabla(errores){

    let er = [];
    er = JSON.parse(errores);
    let contador = 0;

    $('#tablaer tbody').html(
        er.map((item, index)=>{
            contador++
            return(`
                <tr>
                    <th>${index+1}</th>
                    <th>${item.tipo}</th>
                    <th>${item.descripcion}</th>
                    <th>${item.linea}</th>
                    <th>${item.columna}</th>
                </tr>
            `)
        }).join('')

    )

    $('#tablaer tfoot').html(
        `
         <tr>
            <td colspan="3">Total de errores: ${contador}</td>
        </tr>       
        `

    );
    


}


function tabla_simbolos(symbolos){
    
    let simbolos = [];
    simbolos = JSON.parse(symbolos);
    let contador = 0;

    $('#tabla_simbol tbody').html(
        simbolos.map((item, index)=>{
            contador++
            return(`
                <tr>
                    <th>${index+1}</th>
                    <th>${item.identificador}</th>
                    <th>${item.tipo_declaracion}</th>
                    <th>${item.tipo_dato}</th>
                    <th>${item.entorno}</th>
                    <th>${item.linea}</th>
                    <th>${item.columna}</th>
                </tr>
            `)
        }).join('')

    )

    $('#tabla_simbol tfoot').html(
        `
         <tr>
            <td colspan="3">Total de simbolos: ${contador}</td>
        </tr>       
        `

    );

}


function showarbol(ast){

    let body = ast;

    d3.select("#graph").graphviz()
        .renderDot(body);


}


function errores() {
    document.getElementById('tabla').style.display="none";
    document.getElementById('trees').style.display="none";
    document.getElementById('home').style.display="none";
    document.getElementById('errores').style.display="block";
}

function home(){
    document.getElementById('tabla').style.display="none";
    document.getElementById('trees').style.display="none";
    document.getElementById('errores').style.display="none";
    document.getElementById('home').style.display="block";
}

function arboles(){
    document.getElementById('tabla').style.display="none";
    document.getElementById('home').style.display="none";
    document.getElementById('errores').style.display="none";
    document.getElementById('trees').style.display="block";

}

function tablas(){
    document.getElementById('trees').style.display="none";
    document.getElementById('home').style.display="none";
    document.getElementById('errores').style.display="none";
    document.getElementById('tabla').style.display="block";
}


/*
xhr.addEventListener("load", onrequest);
xhr.open("GET", `${API_URL}/interprete/ping`);
xhr.send();

*/
