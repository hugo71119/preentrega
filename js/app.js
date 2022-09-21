const listaCompras = document.querySelector('.lista-compras')
const resultadoCarrito = document.querySelector('.resultadoCarrito')
const indicadores = document.querySelector('.indicadores')
const btn = document.querySelector('.boton')
const botonVacio = document.querySelector('.botonVacio')
const cerrarCarrito = document.querySelector('.cerrarCarrito')
const totalCarrito = document.querySelector('.totalCarrito')
let articulosCarrito = []
let precios = []

cargarEventos()
function cargarEventos(){
    listaCompras.addEventListener('click', agregarCompra);

    btn.addEventListener('click', suma)

    resultadoCarrito.addEventListener('click', eliminarCarrito)

    botonVacio.addEventListener('click', () => {
        articulosCarrito = []

        limpiarHTML();
        suma()
    })
    cerrarCarrito.addEventListener('click', () => {
        resultadoCarrito.classList.add('d-none')
        indicadores.classList.add('d-none')
        botonVacio.classList.add('d-none')
        cerrarCarrito.classList.add('d-none')
        btn.classList.remove('d-none')
        totalCarrito.classList.add('d-none')
    })
    totalCarrito.addEventListener('click', () => {
        articulosCarrito.forEach(precio => {
            const total = parseInt(precio.precio.slice(1,4)) * precio.cantidad
            
            precios.push(total)
            console.log(precios)
            
        })
        console.log('holaaaa')
        console.log(precios)

        const resultado = precios.reduce((valorPrevio, valorActual) => valorPrevio + valorActual, 0)
        alert(`El total de su carrito es: $${resultado} USD`)

        precios = []
        console.log(precios)
    })
}


function agregarCompra(e){
    e.preventDefault();

    if (e.target.classList.contains('agregar-carrito')) {
        const compraSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(compraSeleccionado);
    }
}

function leerDatosCurso(compra){
    const infoCompra = {
        imagen: compra.querySelector('img').src,
        titulo: compra.querySelector('h5').textContent,
        precio: compra.querySelector('.precio').textContent,
        id: compra.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    };
    console.log(infoCompra)

    // Revisa si un elemento ya existe en el carrito
    const existe = articulosCarrito.some( compra => compra.id === infoCompra.id );
    if (existe) {
        // Actualizamos la cantidad 
        const compras = articulosCarrito.map( compra => {
            if (compra.id === infoCompra.id) {
                compra.cantidad++;
                return compra; // Retorna el objeto actualizado
            }else{
                return compra;// Retorna el objeto que no son duplicados
            }
        });
        articulosCarrito = [...compras];
    }else{
        // Agrega elementos al arreglo del carrito
        articulosCarrito = [...articulosCarrito, infoCompra];
    }

    console.log(articulosCarrito);

    carrito()    
}

function carrito(){
    limpiarHTML()

    articulosCarrito.forEach( compra => {
        const row = document.createElement('div');
        row.classList.add('alineacion')
        row.innerHTML = `
            <div>
                <img src="${compra.imagen}" width = "100">
            </div>
            <p>${compra.titulo}</p>
            <p>${compra.precio}</p>
            <p>${compra.cantidad}</p>
            <p>
                <a href = "#" class = "borrar-compra" data-id = "${compra.id}">X</a>            </p>
        `;


        resultadoCarrito.appendChild(row);
    });
}

function suma(){
    console.log(articulosCarrito)
    if (articulosCarrito.length === 0) {
        resultadoCarrito.classList.add('d-none')
        indicadores.classList.add('d-none')
        botonVacio.classList.add('d-none')
        btn.classList.remove('d-none')
        cerrarCarrito.classList.add('d-none')
        totalCarrito.classList.add('d-none')
        alert('Carrito Vacío')

    }else{
        resultadoCarrito.classList.remove('d-none')
        indicadores.classList.remove('d-none')
        cerrarCarrito.classList.remove('d-none')
        btn.classList.add('d-none')
        botonVacio.classList.remove('d-none')
        totalCarrito.classList.remove('d-none')
    }
}

function eliminarCarrito(e){
    if (e.target.classList.contains('borrar-compra')) {
        const compraId = e.target.getAttribute('data-id');

        articulosCarrito = articulosCarrito.filter( compra => {
            if (compra.id === compraId) {
                if (compra.cantidad > 1) {
                    compra.cantidad--
                    return compra
                }else{
                    delete compra
                }
            }else{
                return compra
            }
        } );

        carrito();
        suma()
    }
}

function limpiarHTML() {
    while(resultadoCarrito.firstChild){
        resultadoCarrito.removeChild(resultadoCarrito.firstChild)
    }
}