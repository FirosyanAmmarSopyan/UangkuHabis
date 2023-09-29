function changeRupiah(price){
    let rupiah = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
    });
    return `${rupiah.format(price)}`
}

function createInvoice(data) {
    easyinvoice.createInvoice(data, function(result) {
      document.getElementById('invoiceBase64').innerText = result.pdf;
      /* console.log(result.pdf); */
    });
  }
  
  function downloadInvoice(data) {
    easyinvoice.createInvoice(data, function(result) {
      easyinvoice.download('myInvoice.pdf', result.pdf);
      //	you can download like this as well:
      //	easyinvoice.download();
      //	easyinvoice.download('myInvoice.pdf');
    });
  }
  
  function renderInvoice(data){
    document.getElementById("pdf").innerHTML = "loading...";
    easyinvoice.createInvoice(data, function(result) {
      easyinvoice.render('pdf', result.pdf);
    });
  }

module.exports = { changeRupiah, createInvoice, downloadInvoice, renderInvoice }