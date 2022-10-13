const pagar = document.querySelector('.pagar')


pagar.addEventListener('click', () => {
    Swal.fire({
        title: 'Pagado!',
        icon: 'success'
    })
})
