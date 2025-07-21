  // Data merchandise
        const merchandise = [
            { 
                id: 1,
                direction: "check-out/alone-insilence/index.html", 
                name: "ALONE INSTANCE", 
                type: "tshirt", 
                price: "120,000 IDR",
                image: "/img/tshirt/alone-insilence.png",
                badge: "New"
            },
            { 
                id: 2, 
                direction: "check-out/TOBW/index.html", 
                name: "T-Shirt TODW", 
                type: "tshirt", 
                price: "120,000 IDR",
                image: "/img/tshirt/tobw.png"
            },
            { 
                id: 3, 
                direction: "check-out/CELEBRATE/index.html",
                name: "T-Shirt CELEBRATE", 
                type: "tshirt", 
                price: "120,000 IDR",
                image: "/img/tshirt/celebrate.png"
            },
            { 
                id: 4, 
                direction: "check-out/FOR-REVENGE/index.html",
                name: "T-Shirt For Revenge", 
                type: "tshirt", 
                price: "120,000 IDR",
                image: "/img/tshirt/for-revenge.png"
            },
            { 
                id: 5, 
                direction: "check-out/3RD-COLLECTION/index.html",
                name: "Jacket - 3rd collection", 
                type: "jacket", 
                price: "300,000 IDR",
                image: "/img/tshirt/jacket-for-revenge.jpg",
                badge: "Popular"
            },
            { 
                id: 6, 
                direction: "check-out/WORK-JACKET/index.html",
                name: "Jacket - Work 3rd collection", 
                type: "jacket", 
                price: "300,000 IDR",
                image: "/img/tshirt/work-jacket.jpg"
            },
            { 
                id: 7, 
                direction: "check-out/BROKEN-HEART/index.html",
                name: "T-Shirt Brokenheart", 
                type: "tshirt", 
                price: "130,000 IDR",
                image: "/img/tshirt/broken-heart.jpg"
            },
            { 
                id: 8, 
                direction: "check-out/CAPS/index.html",
                name: "Caps - For Revenge", 
                type: "caps", 
                price: "100,000 IDR",
                image: "/img/tshirt/caps-for-revenge.jpg"
            },
            { 
                id: 9, 
                direction: "check-out/STICKER/index.html",
                name: "Sticker - Collection", 
                type: "sticker", 
                price: "30,000 IDR",
                image: "/img/tshirt/sticker.jpg"
            },
            { 
                id: 10, 
                name: "T-Shirt State of Denial", 
                type: "tshirt", 
                price: "130,000 IDR",
                image: "/img/tshirt/state-denial.jpg"
            },
            { 
                id: 11, 
                name: "Jacket - Denial Blue", 
                type: "jacket", 
                price: "360,000 IDR",
                image: "/img/tshirt/denial-blue.jpg",
                badge: "Limited"
            },
            { 
                id: 12, 
                name: "T-Shirt Blue Fly", 
                type: "tshirt", 
                price: "150,000 IDR",
                image: "/img/tshirt/blue-fly.jpg"
            },
            { 
                id: 13, 
                name: "T-Shirt Eye old", 
                type: "tshirt", 
                price: "120,000 IDR",
                image: "/img/tshirt/eye-old.jpg"
            },
            { 
                id: 14, 
                name: "T-Shirt You Hate thing", 
                type: "tshirt", 
                price: "120,000 IDR",
                image: "/img/tshirt/you-hate-thing.jpg"
            },
            { 
                id: 15, 
                name: "T-Shirt Destruction Mind", 
                type: "tshirt", 
                price: "120,000 IDR",
                image: "/img/tshirt/destructive-mind.jpg"
            }
        ];

        // Fungsi untuk menampilkan merchandise
        function displayMerchandise(filter = 'all') {
            const merchGrid = document.getElementById('merch-grid');
            merchGrid.innerHTML = '';

            const filteredMerch = filter === 'all' 
                ? merchandise 
                : merchandise.filter(item => item.type === filter);

            filteredMerch.forEach(item => {
                const merchItem = document.createElement('div');
                merchItem.className = 'merch-item';
                
                // Tambahkan badge jika ada
                const badgeHtml = item.badge 
                    ? `<div class="merch-badge">${item.badge}</div>` 
                    : '';
                
                merchItem.innerHTML = `
                    ${badgeHtml}
                    <img src="${item.image}" alt="${item.name}" class="merch-image">
                    <div class="merch-info">
                        <div class="merch-title">${item.name}</div>
                        <div class="merch-price">${item.price}</div>
                    </div>
                `;
                
                // Tambahkan event click untuk mengarahkan ke halaman detail produk
                merchItem.addEventListener('click', function() {
                    // Ganti URL dengan halaman detail produk yang sesuai
                    window.location.href = `${item.direction}`;
                });
                
                merchGrid.appendChild(merchItem);
            });
        }

        // Event listener untuk filter
        document.getElementById('category-filter').addEventListener('change', function() {
            displayMerchandise(this.value);
        });

        // Tampilkan semua merchandise saat halaman dimuat
        window.onload = function() {
            displayMerchandise();
        };