class Vehiculo {
    constructor(id, modelo, anoFabricacion, velMax) {

        this.id = id;
        this.modelo = modelo;
        this.anoFabricacion = anoFabricacion;
        this.velMax = velMax;
    }

    toString() {
        return "Id: ${this.id}, Modelo: ${this.modelo}, Ano Fabricacion: ${this.anoFabricacion}, Velocidad Maxima: ${this.velMax}";
    }
}

class Auto extends Vehiculo {
    constructor(id, modelo, anoFabricacion, velMax, cantidadPuertas, asientos) {
        super(id, modelo, anoFabricacion, velMax);
        if (typeof cantidadPuertas === "number" && cantidadPuertas >= 2 && typeof asientos === "number" && asientos >= 2) {
            this.cantidadPuertas = cantidadPuertas;
            this.asientos = asientos;
        }
    }

    toString() {
        return "${super.toString()}, cantidadPuertas: ${this.cantidadPuertas}, asientos: ${this.asientos}";
    }
}

class Camion extends Vehiculo {
    constructor(id, modelo, anoFabricacion, velMax, carga, autonomia) {
        super(id, modelo, anoFabricacion, velMax);
        if (typeof carga === "number" && carga > 0 && typeof autonomia === "number" && autonomia > 0) {
            this.carga = carga;
            this.autonomia = autonomia;
        }
    }

    toString() {
        return "${super.toString()}, carga: ${this.carga}, autonomia: ${this.autonomia}";
    }
}

const stringVehiculos = '[{"id":1,"modelo":"Fiat 100","anoFabricacion":1987,"velMax":60,"cantidadPuertas":4,"asientos":4},{"id":2,"modelo":"Ford Mustang","anoFabricacion":1960,"velMax":100,"cantidadPuertas":2,"asientos":2},{"id":3,"modelo":"Ferrary F100","anoFabricacion":1999,"velMax":200,"cantidadPuertas":2,"asientos":2},{"id":4,"modelo":"Escania","anoFabricacion":1987,"velMax":60,"carga":5550,"autonomia":300},{"id":5,"modelo":"Dodge Ram","anoFabricacion":1970,"velMax":100,"carga":2333,"autonomia":400},{"id":666,"modelo":"Chevy Silverado","anoFabricacion":1994,"velMax":80,"carga":1000,"autonomia":450}]'
const jsonVehiculos = JSON.parse(stringVehiculos);

var arrayVehiculos = [];
function ParsearAJson(array) {
    array.forEach(element => {
        if (element.cantidadPuertas) {
            let auto = new Auto(element.id, element.modelo, element.anoFabricacion, element.velMax, element.cantidadPuertas, element.asientos);
            arrayVehiculos.push(auto);
        }
        else if (element.carga) {
            let camion = new Camion(element.id, element.modelo, element.anoFabricacion, element.velMax, element.carga, element.autonomia);
            arrayVehiculos.push(camion);
        }
    });
}
ParsearAJson(jsonVehiculos);
//obtener por id
const selectTabla = document.getElementById("tabla_Vehiculos");
const selectForm = document.getElementById("form_Vehiculos");
const selectorFormulario = document.getElementById("valor_Auto");
const btn_Crear = document.getElementById("btn_Crear");
const btn_Modificar = document.getElementById("btn_Modificar");
const btn_Agregar = document.getElementById("btn_Agregar");
const btn_Cancelar = document.getElementById("btn_Cancelar");
const btn_Eliminar = document.getElementById("btn_Eliminar");
const selectOpciones = document.getElementById("seleccion_Tipo");
const campoCantidadPuertas = document.getElementById("div_Lbl_CantidadPuertas");
const campoAsientos = document.getElementById("div_Lbl_Asientos");
const campoCarga = document.getElementById("div_Lbl_Carga");
const campoAutonomia = document.getElementById("div_Lbl_Autonomia");
const filas = document.getElementsByTagName("tr");
const abmCampoId = document.getElementById("input_Id");
const abmCampoModelo = document.getElementById("input_Modelo");
const abmCampoAnoFabricacion = document.getElementById("input_AnoFabricacion");
const abmCampoVelMax = document.getElementById("input_VelMaxima");
const abmCampoCantidadPuertas = document.getElementById("input_CantidadPuertas");
const abmCampoAsientos = document.getElementById("input_Asientos");
const abmCampoCarga = document.getElementById("input_Carga");
const abmCampoAutonomia = document.getElementById("input_Autonomia");
const seleccion = document.getElementById("opciones_FiltrarPor");
const botonCalcular = document.getElementById("btn_Calcular");
var celdas = document.getElementsByTagName("td");

//Definir funcionalidad de botones
btn_Agregar.addEventListener("click", function () {
    selectForm.style.display = "block";
    selectTabla.style.display = "none";
    btn_Modificar.style.visibility = "hidden";
    btn_Eliminar.style.visibility = "hidden";
    abmCampoId.value = "";
    abmCampoModelo.value = "";
    abmCampoAnoFabricacion.value = "";
    abmCampoVelMax.value = "";
    if (selectorFormulario.value == "auto") {
        abmCampoCantidadPuertas.style.visibility = "visible";
        abmCampoAsientos.style.visibility = "visible";
    }
    else if (selectorFormulario.value == "camion") {
        abmCampoCarga.style.visibility = "visible";
        abmCampoAutonomia.style.visibility = "visible";
    }
    btn_Crear.style.visibility = "visible";
});


btn_Cancelar.addEventListener("click", function () {
    selectForm.style.display = "none";
    selectTabla.style.display = "block";
});

btn_Crear.addEventListener("click", function () {
    CrearVehiculo();
    selectForm.style.display = "none";
    selectTabla.style.display = "block";
    cargarTabla(arrayVehiculos);
    console.log(arrayVehiculos);
});

btn_Modificar.addEventListener("click", function () {
    ModificarVehiculo(vehiculoSeleccionado);
    selectForm.style.display = "none";
    selectTabla.style.display = "block";
});

btn_Eliminar.addEventListener("click", function () {
    EliminarVehiculo(vehiculoSeleccionado.id);
    selectForm.style.display = "none";
    selectTabla.style.display = "block";
});
//Metodos
function cargarTabla(array) {
    let tabla = selectTabla.getElementsByTagName("tbody")[0];
    tabla.innerHTML = "";
    array.forEach((vehiculo) => {
        let fila = document.createElement("tr");
        const atributos = ["id", "modelo", "anoFabricacion", "velMax", "cantidadPuertas", "asientos", "carga", "autonomia"];
        atributos.forEach((atributo) => {
            let celda = document.createElement("td");
            celda.textContent = vehiculo[atributo] || "N/A";
            fila.appendChild(celda);
        });
        tabla.appendChild(fila);
    });
    MostrarTablaYObtenerDatosAlHacerDobleClick();
}

cargarTabla(arrayVehiculos);


function mostrarOcultarCampoTexto() {
    if (selectOpciones.value === "auto") {
        campoCantidadPuertas.style.display = "block";
        campoAsientos.style.display = "block";
        campoCarga.style.display = "none";
        campoAutonomia.style.display = "none";
    }
    else if (selectOpciones.value === "camion") {
        campoCarga.style.display = "block";
        campoAutonomia.style.display = "block";
        campoCantidadPuertas.style.display = "none";
        campoAsientos.style.display = "none";
    }
}
selectOpciones.addEventListener("change", mostrarOcultarCampoTexto);

let tabla = selectTabla.getElementsByTagName("tbody")[0];
function filtrarPersonas() {
    tabla.innerHTML = "";
    arrayVehiculos.forEach((vehiculo) => {
        if (seleccion.value === "todos" ||
            (seleccion.value === "auto" && vehiculo instanceof Auto) ||
            (seleccion.value === "camion" && vehiculo instanceof Camion)) {
            let fila = document.createElement("tr");
            let atributos = ["id", "modelo", "anoFabricacion", "velMax", "cantidadPuertas", "asientos", "carga", "autonomia"];
            atributos.forEach((atributo) => {
                let celda = document.createElement("td");
                celda.textContent = vehiculo[atributo] || "N/A";
                fila.appendChild(celda);
            });
            tabla.appendChild(fila);
        }
    });
}

seleccion.addEventListener("change", filtrarPersonas);

function calcularPromedioVelocidad(vehiculos) {
    let acumuladorVelocidad = 0;
    let contadorVehiculos = 0;
    vehiculosMapeados = vehiculos.map(vehiculo => {
        if (seleccion.value === "todos" ||
            (seleccion.value === "auto" && vehiculo instanceof Auto) ||
            (seleccion.value === "camion" && vehiculo instanceof Camion)) {
            contadorVehiculos++;
            acumuladorVelocidad += vehiculo.velMax;
        }
    });
    return acumuladorVelocidad / contadorVehiculos;
}

botonCalcular.addEventListener("click", function () {
    const textBoxPromedio = document.getElementById("txt_Calcular");
    const velPromedio = calcularPromedioVelocidad(arrayVehiculos);
    textBoxPromedio.value = velPromedio;
}
);

var vehiculoSeleccionado = null;
function MostrarTablaYObtenerDatosAlHacerDobleClick() {

    for (let index = 0; index < celdas.length; index++) {
        celdas[index].addEventListener("dblclick", function () {
            selectForm.style.display = "block";
            selectTabla.style.display = "none";
            let dato = celdas[index].textContent;
            arrayVehiculos.forEach(vehiculo => {
                let atributos = ["id", "modelo", "anoFabricacion", "velMax", "cantidadPuertas", "asientos", "carga", "autonomia"];
                atributos.forEach((atributo) => {
                    if (dato == vehiculo[atributo]) {
                        mostrarOcultarCampoTexto();
                        abmCampoId.value = vehiculo["id"];
                        abmCampoModelo.value = vehiculo["modelo"];
                        abmCampoAnoFabricacion.value = vehiculo["anoFabricacion"];
                        abmCampoVelMax.value = vehiculo["velMax"];
                        abmCampoCantidadPuertas.value = vehiculo["cantidadPuertas"] || "N/A";
                        abmCampoAsientos.value = vehiculo["asientos"] || "N/A";
                        abmCampoCarga.value = vehiculo["carga"] || "N/A";
                        abmCampoAutonomia.value = vehiculo["autonomia"] || "N/A";
                        btn_Crear.style.visibility = "hidden";
                        btn_Modificar.style.visibility = "visible";
                        vehiculoSeleccionado = vehiculo;
                    }
                });
            });
        });
    }
}


function IdAutoincremental() {
    let id = 1000;
    return function () {
        id += 1;
        return id;
    };
}

let idAutomatico = IdAutoincremental();

function CrearVehiculo() {
    let id = idAutomatico();
    if (abmCampoModelo.value !== ""
        && abmCampoAnoFabricacion.value > 1985 && abmCampoVelMax.value > 0) {
        if (selectOpciones.value == "auto"
            && abmCampoCantidadPuertas.value > 2
            && abmCampoAsientos.value > 2) {
            let auto = new Auto(id, abmCampoModelo.value, abmCampoAnoFabricacion.value, abmCampoVelMax.value, abmCampoCantidadPuertas.value, abmCampoAsientos.value);
            arrayVehiculos.push(auto);
        } else if (selectOpciones.value == "camion"
            && abmCampoAutonomia.value > 0 && abmCampoCarga.value > 0) {
            let camion = new Camion(id, abmCampoModelo.value, abmCampoAnoFabricacion.value, abmCampoVelMax.value, abmCampoCarga.value, abmCampoAutonomia.value);
            arrayVehiculos.push(camion);
        }
    }
    else {
        alert("Ingresó datos incorrectos");

    }
}

function ModificarVehiculo(vehiculo) {
    if (abmCampoModelo.value !== ""
    && abmCampoAnoFabricacion.value > 1985 && abmCampoVelMax.value > 0) {
        vehiculo.modelo = abmCampoModelo.value;
        vehiculo.anoFabricacion = abmCampoAnoFabricacion.value;
        vehiculo.velMax = abmCampoVelMax.value;
        if (selectOpciones.value == "auto"
            && abmCampoCantidadPuertas.value > 2
            && abmCampoAsientos.value > 2) {
            vehiculo.cantidadPuertas = abmCampoCantidadPuertas.value;
            vehiculo.asientos = abmCampoAsientos.value;

        } else if (selectOpciones.value == "camion" && abmCampoAutonomia.value > 0 && abmCampoCarga.value > 0) {
            vehiculo.carga = abmCampoCarga.value;
            vehiculo.autonomia = abmCampoAutonomia.value;
        }
    }
    else {
        alert("Ingresó datos incorrectos");
    }
    cargarTabla(arrayVehiculos);

    console.log(arrayVehiculos);
}

function EliminarVehiculo(vehiculoId){
    arrayVehiculos = arrayVehiculos.filter(vehiculo => vehiculo.id != vehiculoId);
    cargarTabla(arrayVehiculos);
}
