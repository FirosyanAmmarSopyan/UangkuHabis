function changeRupiah(price){
    let rupiah = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
    });
    return `${rupiah.format(price)}`
}

module.exports = changeRupiah