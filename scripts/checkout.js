function finalizeOrder() {
    // Grab order details from order summary section
    var orderSummary = document.getElementById('order-summary');
    var orderSummaryContent = orderSummary.innerHTML;

    // Make a request to send order to server
    alert('Finalizing order:\n\n' + orderSummaryContent);

    // Uncomment the line below to enable redirection to the order confirmation page
    window.location.href = 'order_confirmation.html';
}