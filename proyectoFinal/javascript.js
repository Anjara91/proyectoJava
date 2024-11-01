document.addEventListener('DOMContentLoaded', () => {                //Esperar a que el DOM este completamente cargado
    const productosContainer = document.getElementById('productos');    //Muestra los productos por el ID
    const listaCarrito = document.getElementById("lista-carrito");  
    const totalSpan = document.getElementById("total");  
    const carrito = [];
      

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
                <button id="agregar-${producto.id}" data-id="${producto.id}">Agregar al Carrito</button>   
            `;
            productosContainer.appendChild(divProducto);   //agrega el producto al div contenedor

            const botonAgregar = divProducto.querySelector(`button[id="agregar-${producto.id}"]`);  
            botonAgregar.addEventListener("click", () => {
                agregarAlCarrito(producto);
            });
        });
    };
// Función para agregar al carrito
const agregarAlCarrito = (producto) => {
    const productoEnCarrito = carrito.find(item => item.id === producto.id);
    if (productoEnCarrito) {
        // Si ya está en el carrito, solo incrementa la cantidad
        if (productoEnCarrito.cantidad < producto.stock) {
            productoEnCarrito.cantidad++;
        } else {
            alert('No hay suficiente stock');
            return;
        }
    } else {
        // Si no está, agrégalo al carrito
        carrito.push({ ...producto, cantidad: 1 });
    }
    actualizarCarrito();
};

// Función para actualizar el carrito
const actualizarCarrito = () => {
    const listaCarrito = document.getElementById("lista-carrito");
    listaCarrito.innerHTML = ''; // Limpiar la lista actual
    let total = 0;

    carrito.forEach(item => {
        const precioTotal = item.precio * item.cantidad;
        total += precioTotal; // Calcular el total

        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${item.nombre}</td>
            <td>
        <button class="btn-restar" data-id="${item.id}">-</button>
        ${item.cantidad}
        <button class="btn-sumar" data-id="${item.id}">+</button>
    </td>
            <td>${precioTotal.toFixed(2)} €</td>
        `;
        listaCarrito.appendChild(fila);
    });

    document.getElementById('total').textContent = total.toFixed(2); // Actualizar el total
};

mostrarProductos(); // Llamamos a la función para mostrar los productos

// Mostrar/Ocultar el carrito
document.getElementById('toggle-carrito').addEventListener('click', () => {
    const carritoElement = document.getElementById('carrito');
    carritoElement.classList.toggle('oculto');
});

// Proceder a la compra
document.getElementById('comprar').addEventListener('click', () => {
    if (carrito.length === 0) {
        alert('El carrito está vacío');
    } else {
        alert('Compra realizada con éxito');
        carrito.length = 0; // Vaciar el carrito
        totalSpan.textContent = '0.00'; // Resetear total
        listaCarrito.innerHTML = ''; // Limpiar la lista del carrito
        productos.forEach(prod => prod.stock = 15); // Restaurar el stock inicial
    }
});
});
