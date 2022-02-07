// /* Variables */
// $color-blanco: #fff;
// $color-negro: #000;
// $color-azul-pepsi: #004b93;
// $color-azul2-pepsi: #005cb4;
// $color-rojo-pepsi: #c9002b;
// $sombreado-logo-footer: drop-shadow(0 0 0.5rem $color-rojo-pepsi);

const alertAddProductToCart = document.getElementsByClassName('add-product-cart');
const alertDeleteCart = document.getElementsByClassName('reset-cart');
const alertBuyProducts = document.getElementsByClassName('buy');

//* Alerta al cliente que su producto seleccionado fue agregado al carrito.
for (const product of alertAddProductToCart) {
    product.addEventListener('click', () => {
        const Toast = Swal.mixin({
            toast: true,
            position: 'bottom-end',
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            },
          })
          
          Toast.fire({
            icon: 'success',
            title: 'AGREGADO AL CARRITO',
          })
    });
};

//* Alerta al cliente que su carrito fue eliminado.
alertDeleteCart[0].addEventListener('click', () => {
    Swal.fire({
        icon: 'success',
        title: 'CARRITO ELIMINADO',
    })
});