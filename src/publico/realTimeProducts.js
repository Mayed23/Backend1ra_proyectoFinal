const socket = io()

document.getElementById('prod-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const nameInput = document.getElementById('name');
    const name = nameInput.value;
    nameInput.value = '';

    const modelInput = document.getElementById('model');
    const model = modelInput.value;
    descInput.value = '';

    const codeInput = document.getElementById('codigo');
    const code = codeInput.value;
    codeInput.value = '';

    const priceInput = document.getElementById('price');
    const price = priceInput.value;
    priceInput.value = '';

    const stockInput = document.getElementById('stock');
    const stock = stockInput.value;
    stockInput.value = '';

    const categoryInput = document.getElementById('category');
    const category = categoryInput.value;
    categoryInput.value = '';

    const imgInput = document.getElementById('img');
    const img = imgInput.value;
    imgInput.value = '';

    const newProduct = {
        name: name,
        model: model,
        code: code,
        price: price,
        stock: stock,
        category: category,
        img: img
    };
    socket.emit("newProd", newProduct);
});

socket.on("success", (data) => {
    Swal.fire({
        icon: 'success',
        title: data,
        text: `A continuación verás la lista actualizada`,
        confirmButtonText: 'Aceptar', // Cambia el texto del botón Aceptar
    }).then((result) => {
        if (result.isConfirmed) {
            location.reload(); // Recarga la página cuando se hace clic en Aceptar
        }
    });
});