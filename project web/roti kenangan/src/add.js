document.addEventListener("alpine:init", () => {
  Alpine.data("products", () => ({
    items: [
      { id: 1, name: "Croissant Original", img: "main.jpg", price: 20000 },
      { id: 2, name: "Choclate Toast", img: "unggulan.jpg", price: 25000 },
      { id: 3, name: "Croissant Cheese", img: "unggulan2.jpg", price: 30000 },
    ],
  }));

  Alpine.store("cart", {
    items: [],
    total: 0,
    quantity: 0,
    add(newItem) {
      // CEK APAKAH ADA BARANG YANG SAMA DI CART
      const cartItem = this.items.find((item) => item.id === newItem.id);

      //JIKA BELUM ADA / CART MASIH KOSONG
      if (!cartItem) {
        this.items.push({ ...newItem, quantity: 1, total: newItem.price });
        this.quantity++;
        this.total += newItem.price;
      } else {
        // JIKA BARANG NYA UDAH ADA,  CEK APAKAH BARANG BEDA ATAU SAMA DENGAN YG ADA DI CART
        this.items = this.items.map((item) => {
          // JIKA BARANG BERBEDA
          if (item.id !== newItem.id) {
            return item;
          } else {
            // JIKA BARANG SUDAH ADA, MAKA TAMBAH QUANTITY & TOTALNYA
            item.quantity++;
            item.total = item.price * item.quantity;
            this.quantity++;
            this.total += item.price;
            return item;
          }
        });
      }
    },

    remove(id) {
      // AMBIL ITEM YG MAU DI REMOVE BERDASARKAN ID NYA
      const cartItem = this.items.find((item) => item.id === id);

      // JIKA ITEM LEBIH DARI 1
      if (cartItem.quantity > 1) {
        // TELUSURI 1 1
        this.items = this.items.map((item) => {
          // JIKA BUKAN BARANG YANG DI KLIK
          if (item.id !== id) {
            return item;
          } else {
            item.quantity--;
            item.total = item.price * item.quantity;
            this.quantity--;
            this.total -= item.price;
            return item;
          }
        });
      } else if (cartItem.quantity === 1) {
        // JIKA BARANGNYA SISA 1
        this.items = this.items.filter((item) => item.id !== id);
        this.quantity--;
        this.total -= cartItem.price;
      }
    },
  });
});

// Konversi Ke Rupiah
const rupiah = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(number);
};
