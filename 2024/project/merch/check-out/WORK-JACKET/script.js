const HARGA_SATUAN = 300000;

    function formatRupiah(angka) {
      return `Rp${angka.toLocaleString('id-ID')}`;
    }

    function updateTotal() {
      const qty = parseInt(document.getElementById("quantity").value);
      const total = qty * HARGA_SATUAN;
      document.getElementById("totalHarga").textContent = `Price: ${formatRupiah(total)}`;
      document.getElementById("popupTotal").textContent = `Price: ${formatRupiah(total)}`;
    }

    function changeQty(amount) {
      const qtyInput = document.getElementById("quantity");
      let qty = parseInt(qtyInput.value);
      qty = Math.max(1, qty + amount);
      qtyInput.value = qty;
      updateTotal();
    }

    function showPopup() {
      document.getElementById("checkoutPopup").style.display = "block";
      document.getElementById("overlay").style.display = "block";
      updateTotal();
    }

    function hidePopup() {
      document.getElementById("checkoutPopup").style.display = "none";
      document.getElementById("overlay").style.display = "none";
    }

    function submitOrder() {
      const name = document.getElementById("name").value;
      const phone = document.getElementById("phone").value;
      const address = document.getElementById("address").value;
      const size = document.getElementById("size").value;
      const color = document.getElementById("color").value;

      if (!name || !phone || !address || !size || !color) {
        alert("Mohon lengkapi semua data.");
        return;
      }

      hidePopup();

      setTimeout(() => {
        document.getElementById("successModal").style.display = "block";
        document.getElementById("overlay").style.display = "block";
      }, 300);
    }

    function closeSuccess() {
      document.getElementById("successModal").style.display = "none";
      document.getElementById("overlay").style.display = "none";
    }

    // Inisialisasi total harga saat pertama kali halaman dimuat
    window.onload = updateTotal;
    