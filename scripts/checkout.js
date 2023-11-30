function submitOrder() {
    // Grab order details from order summary section
    var orderSummary = document.getElementById('order-summary');
    var orderSummaryContent = orderSummary.innerHTML;

    // Make a request to send order to server
    alert('Finalizing order:\n\n' + orderSummaryContent);

    window.location.href = 'order_confirmation.html';
}