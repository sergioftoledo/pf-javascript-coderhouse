const URLArgentinaProvince = 'https://apis.datos.gob.ar/georef/api/provincias';

$('#first-section-form').append(`
<div class="container-fluid">
<div class="row">
    <div class="col-md-8 offset-md-2 fondo-formulario">
        <form action="#" method="post" class="formulario-contacto">
            <div class="titulo-contacto mt-3 d-flex justify-content-center">
                <h2>datos de compra</h2>
            </div>
            <div class="row ">
                <div class="col-md-6 d-flex flex-column mt-3">
                    <label for="name"> NOMBRE:</label>
                    <input class="text-capitalize" type="text" id="name" name="name" placeholder="INGRESE SU NOMBRE" autocomplete="off">
                </div>
                <div class="col-md-6  d-flex flex-column mt-3">
                    <label for="last-name"> APELLIDO:</label>
                    <input class="text-capitalize" type="text" id="last-name" name="last-name" placeholder="INGRESE SU APELLIDO" autocomplete="off">
                </div>
                <div class="col-md-6  d-flex flex-column mt-3">
                <label for="email"> EMAIL:</label>
                    <input type="email" id="email" name="email" placeholder="INGRESE SU E-MAIL" autocomplete="off">
                </div>
                <div class="col-md-6  d-flex flex-column mt-3">
                <label for="telephone"> N° CELULAR:</label>
                    <input type="tel" id="telephone" name="telephone" placeholder="N° CELULAR (OPCIONAL)" autocomplete="off">
                </div>
                <div class="col-md-6 col-sm-6 select-province mt-5 mb-3">
                
                </div>
                <div class="col-md-6 col-sm-6 select-municipalities mt-5 mb-3">

                </div>
                <div class="col-md-6  d-flex flex-column mt-3">
                    <label for="street"> CALLE:</label>
                    <input class="text-capitalize" type="text" id="street" name="street" placeholder="CALLE DE SU DOMICILIO" autocomplete="off">
                </div>
                <div class="col-md-3  d-flex flex-column mt-3">
                    <label for="floor"> PISO:</label>
                    <input type="number" id="floor" name="floor" placeholder="N° DE PISO" autocomplete="off">
                </div>
                <div class="col-md-3  d-flex flex-column mt-3">
                    <label for="flat"> APARTAMENTO:</label>
                    <input type="number" id="flat" name="flat" placeholder="N° DE APARTAMENTO" autocomplete="off">
                </div>
                <div class="boton-contacto d-flex justify-content-center mt-5 mb-3">
                    <button type="submit" class="buy">FINALIZAR COMPRA</button>
                </div>
            </div>
        </form>
    </div>
</div>
</div>`);

// Genera las opciones en el select al recibir el array de provincias.
function selectProvince(array, id) {
    let innerHTML = '';
    array.forEach(province => {
        innerHTML +=` <option value="${province.id}">${province.nombre}</option>`
    });
    return `<select id="${id}">${innerHTML}</select>`
};

// Array donde se ingresan las provincias recibidas desde la API.
let provinces = [{id: 0, nombre: 'SELECCIONE SU PROVINCIA'}];

// FUncion que ademas de pushear las provincias provenientes de la API, incorpora contenido html a los selects.
$.get(URLArgentinaProvince, (response, status) => {
    if(status === 'success') {
        provinces.push(...response.provincias);
        $('.select-province').append(selectProvince(provinces, 'select-province'));
        $('.select-municipalities').html(selectMunicipalities([{nombre: 'SELECCIONE SU LOCALIDAD'}]));
        // Se captura el id donde se escucha el evento change y se ejecuta la funcion de obtener los datos de los municipios.
        $('#select-province').change(e => {
            getMunicipalities(e.target.value);
        });
    };
});

// Genera las opciones en el select al recibir el array de municipios.
function selectMunicipalities(array) {
    let innerHTML = '';
    array.forEach(municipality => {
        innerHTML +=` <option>${municipality.nombre}</option>`
    });
    return `<select>${innerHTML}</select>`
};

// FUncion que ademas de pushear los municipios provenientes de la API, incorpora contenido html a los selects.
function getMunicipalities(id) {
    municipalities = [{nombre: 'SELECCIONE SU LOCALIDAD'}];
    $.get(`https://apis.datos.gob.ar/georef/api/municipios?provincia=${id}&campos=id,nombre&max=100`, (response, status) => {
        if (status === 'success') {
            municipalities.push(...response.municipios)
                $('.select-municipalities').html(selectMunicipalities(municipalities));
        };
    });
};