document.addEventListener('DOMContentLoaded', () => {
    const cartItems = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');
    const buyButton = document.getElementById('buy-button');
    const paymentSection = document.getElementById('payment');
    const paymentForm = document.getElementById('payment-form');
    let totalPrice = 0;

    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', () => {
            const product = button.parentElement;
            const productName = product.querySelector('h3').innerText;
            const productPrice = parseInt(product.getAttribute('data-price'));

            // Tambahkan produk ke keranjang
            const cartItem = document.createElement('li');
            cartItem.innerText = `${productName} - Rp ${productPrice}`;
            cartItems.appendChild(cartItem);

            // Update total harga
            totalPrice += productPrice;
            totalPriceElement.innerText = totalPrice;
        });
    });

    buyButton.addEventListener('click', () => {
        if (totalPrice === 0) {
            alert('Keranjang Anda kosong!');
        } else {
            paymentSection.style.display = 'block';
            window.scrollTo(0, document.body.scrollHeight);
        }
    });

    paymentForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const paymentMethod = document.querySelector('input[name="payment-method"]:checked').value;
        const cartItemList = document.querySelectorAll('#cart-items li');
        let orderDetails = 'Detail Pesanan:\n';

        cartItemList.forEach(item => {
            orderDetails += `${item.innerText}\n`;
        });

        orderDetails += `\nTotal: Rp ${totalPrice}\n`;
        orderDetails += `Metode Pembayaran: ${paymentMethod}\n`;

        // Kirim pesan ke WhatsApp
        const phoneNumber = '62895606132341'; // Ganti dengan nomor telepon Anda
        const whatsappMessage = encodeURIComponent(orderDetails);
        const whatsappUrl = `https://wa.me/62895606132341`;
        window.open(whatsappUrl, '_blank');

        // Simulasi pembayaran
        alert('Pembayaran Anda sedang diproses. Terima kasih telah berbelanja!');
        
        // Reset keranjang dan total harga
        cartItems.innerHTML = '';
        totalPrice = 0;
        totalPriceElement.innerText = totalPrice;
        paymentSection.style.display = 'none';
    });
});