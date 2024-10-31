document.addEventListener('DOMContentLoaded', () => {                //Esperar a que el DOM este completamente cargado
    const productosContainer = document.getElementById('productos');    //Muestra los productos por el ID
    const carrito = [];
    const total = 0;
    
  

    // Función para mostrar los productos

    const mostrarProductos = () => {          
        productos.forEach(producto => {      //Recorre cada producto de la lista de productos
            const divProducto = document.createElement('div');        //Hay un div para cada producto 
            divProducto.classList.add('producto');
            divProducto.innerHTML = /*Esto trae el contenido de data.js a para que se visualice en la página*/ `                        
                <img src="${producto.imagen}" alt="${producto.nombre}">
                <h3>${producto.nombre}</h3>
                <p>${producto.descripcion}</p>
                <p>Precio: ${(producto.precio).toFixed(2)} €</p> 
                <button id="agregar-${producto.id}">Agregar al Carrito</button>
            `;
            productosContainer.appendChild(divProducto);   //agrega el producto al div contenedor
        });
    };

    mostrarProductos();  //Llamamos a la función desarrollada arriba

}); 
//HASTA AQUI NO BORRAR

// Agregar un producto al carrito
function agregarAlCarrito(id) {
    const producto = productos.find(p => p.id === id);
    if (producto.stock > 0) {
        carrito.push(producto);
        producto.stock--;
        total += producto.precio;
        actualizarCarrito();
    } else {
        alert("No hay suficiente stock de " + producto.nombre);
    }
}

// Actualizar la vista del carrito
function actualizarCarrito() {
    const carritoDiv = document.getElementById('carrito');
    carritoDiv.innerHTML = '';
    carrito.forEach((item, index) => {
        carritoDiv.innerHTML += `
            <div>
                <p>${item.nombre} - $${item.precio.toFixed(2)} 
                <button onclick="eliminarDelCarrito(${index})">-</button> 
                <button onclick="agregarAlCarrito(${item.id})">+</button></p>
            </div>
        `;
    });
    document.getElementById('total').innerText = `Total: $${total.toFixed(2)}`;
}

function eliminarDelCarrito(index) {
    const producto = carrito[index];
    carrito.splice(index, 1);
    total -= producto.precio;
    producto.stock++;
    actualizarCarrito();
}

function finalizarCompra() {
    alert("Compra realizada");
    carrito = [];
    total = 0;
    actualizarCarrito();
}

// Eliminar un producto del carrito
function eliminarDelCarrito(id) {
    const item = carrito.find(item => item.id === id);
    if (item) {
        const productoOriginal = productos.find(prod => prod.id === id);
        productoOriginal.stock += item.cantidad;
        carrito = carrito.filter(item => item.id !== id);
        actualizarCarrito();
    }
}

// Mostrar/Ocultar el carrito
document.getElementById('carrito').addEventListener('click', () => {
    const carritoElement = document.getElementById('carrito');
    carritoElement.classList.toggle('oculto');
});

// Proceder a la compra
document.getElementById('comprar').addEventListener('click', (carrito) => {
    if (carrito.length === 0) {
        alert('El carrito está vacío');
    } else {
        alert('Compra realizada con éxito');
        carrito = [];
        productos.forEach(prod => prod.stock = 15); // Restaurar el stock inicial
        actualizarCarrito();
        cargarProductos();
        
    }
    comprar ();
});
