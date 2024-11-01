document.addEventListener('DOMContentLoaded', () => {
    const productosContainer = document.getElementById('productos');
    const listaCarrito = document.getElementById("lista-carrito");
    const totalSpan = document.getElementById("total");
    const carrito = [];

    // Función para mostrar los productos
    const mostrarProductos = () => {
        productos.forEach(producto => {
            const divProducto = document.createElement('div');
            divProducto.classList.add('producto');
            divProducto.innerHTML = `
                <img src="${producto.imagen}" alt="${producto.nombre}">
                <h3>${producto.nombre}</h3>
                <p>${producto.descripcion}</p>
                <p>Precio: ${(producto.precio).toFixed(2)} €</p>
                <p>Stock: ${producto.stock}</p>
                <button id="agregar-${producto.id}" data-id="${producto.id}">Agregar al Carrito</button>
            `;
            productosContainer.appendChild(divProducto);

            const botonAgregar = divProducto.querySelector(`button[id="agregar-${producto.id}"]`);
            botonAgregar.addEventListener("click", () => {
                agregarAlCarrito(producto);
            });
        });
    };

    // Función para agregar al carrito
    const agregarAlCarrito = (producto) => {
        if (producto.stock === 0) {
            alert('No hay unidades disponibles para la Rosa del desierto.');
            return;
        }

        const productoEnCarrito = carrito.find(item => item.id === producto.id);
        if (productoEnCarrito) {
            if (productoEnCarrito.cantidad < producto.stock) {
                productoEnCarrito.cantidad++;
            } else {
                alert('No hay suficiente stock');
                return;
            }
        } else {
            carrito.push({ ...producto, cantidad: 1 });
        }
        actualizarCarrito();
        actualizarContadorCarrito();
    };

    // Función para actualizar el carrito
    const actualizarCarrito = () => {
        listaCarrito.innerHTML = '';
        let total = 0;

        carrito.forEach(item => {
            const precioTotal = item.precio * item.cantidad;
            total += precioTotal;

            const fila = document.createElement('tr');
            fila.innerHTML = `
                <td>${item.nombre}</td>
                <td>
                    <button class="btn-restar" data-id="${item.id}">-</button>
                    ${item.cantidad}
                    <button class="btn-sumar" data-id="${item.id}">+</button>
                </td>
                <td>${(item.precio).toFixed(2)} €</td>
                <td>${precioTotal.toFixed(2)} €</td>
            `;
            listaCarrito.appendChild(fila);

            // Agregar eventos para sumar y restar
            fila.querySelector('.btn-sumar').addEventListener('click', (event) => {
                event.stopPropagation(); // Evitar el cierre del carrito
                agregarCantidad(item);
            });

            fila.querySelector('.btn-restar').addEventListener('click', (event) => {
                event.stopPropagation(); // Evitar el cierre del carrito
                restarCantidad(item);
            });
        });

        totalSpan.textContent = total.toFixed(2);
    };

    // Función para agregar cantidad
    const agregarCantidad = (item) => {
        const producto = productos.find(prod => prod.id === item.id);
        if (item.cantidad < producto.stock) {
            item.cantidad++;
            actualizarCarrito();
            actualizarContadorCarrito();
        } else {
            alert('No hay suficiente stock para sumar.');
        }
    };

    // Función para restar cantidad
    const restarCantidad = (item) => {
        if (item.cantidad > 1) {
            item.cantidad--;
            actualizarCarrito();
            actualizarContadorCarrito();
        } else {
            carrito.splice(carrito.indexOf(item), 1); // Eliminar el producto si la cantidad es 1
            actualizarCarrito();
            actualizarContadorCarrito();
        }
    };

    mostrarProductos();

    const actualizarContadorCarrito = () => {
        const contador = document.getElementById('contador-carrito');
        const totalProductos = carrito.reduce((total, item) => total + item.cantidad, 0);
        contador.textContent = totalProductos;
    };

    // Mostrar/Ocultar el carrito
    document.getElementById('toggle-carrito').addEventListener('click', (event) => {
        event.stopPropagation(); // Evitar el cierre inmediato
        const carritoElement = document.getElementById('carrito');
        carritoElement.classList.toggle('oculto');
    });

    // Cerrar carrito al hacer clic fuera de él
    document.addEventListener('click', (event) => {
        const carritoElement = document.getElementById('carrito');
        const toggleCarritoBtn = document.getElementById('toggle-carrito');
        if (!carritoElement.contains(event.target) && !toggleCarritoBtn.contains(event.target)) {
            carritoElement.classList.add('oculto');
        }
    });

    // Proceder a la compra
    document.getElementById('comprar').addEventListener('click', () => {
        if (carrito.length === 0) {
            alert('El carrito está vacío');
        } else {
            alert('Compra realizada con éxito');
            carrito.length = 0;
            totalSpan.textContent = '0.00';
            listaCarrito.innerHTML = '';
            productos.forEach(prod => prod.stock = 15);
            actualizarContadorCarrito(); // Reiniciar contador a 0
        }
    });
});

//arreglar que al darle a agregar se quede abierto el carrito
//poner el menú fijo al bajar
//icons botones
//papelera para eliminar todos los productos a la vez
