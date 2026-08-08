// Global Cart Variables
let cartTotalItems = 0;
let cartTotalPrice = 0;

// Global Functions so buttons in HTML can find them
window.openCart = function() {
    const cartOverlay = document.getElementById('cartOverlay');
    const cartDrawer = document.getElementById('cartDrawer');
    if(cartOverlay && cartDrawer) {
        cartOverlay.style.display = 'block';
        setTimeout(() => {
            cartOverlay.style.opacity = '1';
            cartDrawer.classList.add('open');
        }, 10);
    }
};

window.closeCart = function() {
    const cartOverlay = document.getElementById('cartOverlay');
    const cartDrawer = document.getElementById('cartDrawer');
    if(cartOverlay && cartDrawer) {
        cartDrawer.classList.remove('open');
        cartOverlay.style.opacity = '0';
        setTimeout(() => {
            cartOverlay.style.display = 'none';
        }, 300);
    }
};

window.showToast = function() {
    const cartToast = document.getElementById('cartToast');
    if(cartToast) {
        cartToast.classList.add('show');
        setTimeout(() => {
            cartToast.classList.remove('show');
        }, 3000);
    } else {
        alert("✅ Product added to cart!"); // Fallback if toast HTML is missing
    }
};

// ADD TO CART FUNCTION
window.addToCart = function(productName, price) {
    cartTotalItems++;
    cartTotalPrice += price;

    // Update Header Icons
    const cartIcons = document.querySelectorAll('.cart-icon-btn');
    cartIcons.forEach(icon => {
        icon.innerHTML = `🛒 (${cartTotalItems})`;
    });

    // Add Item to Drawer
    const cartItemsContainer = document.querySelector('.cart-items');
    if(cartItemsContainer) {
        if(cartTotalItems === 1) cartItemsContainer.innerHTML = ''; // Clear empty message
        
        cartItemsContainer.innerHTML += `
            <div style="display: flex; gap: 15px; border-bottom: 1px solid #eee; padding-bottom: 15px; margin-bottom: 15px;">
                <div style="width: 70px; height: 70px; background: #f9f9f9; border: 1px solid #e0e0e0; border-radius: 6px;"></div>
                <div style="flex: 1; text-align: left;">
                    <h4 class="font-serif" style="color: var(--brand-green); font-size: 1rem; margin: 0 0 5px 0;">[Brand Name] Ghee</h4>
                    <p style="font-size: 0.85rem; color: #666; margin: 0 0 5px 0;">${productName}</p>
                    <p style="font-weight: bold; color: var(--brand-gold); margin: 0;">₹${price}</p>
                </div>
            </div>
        `;
    }

    // Update Total Price
    const cartFooter = document.querySelector('.cart-footer span:nth-child(2)');
    if(cartFooter) {
        cartFooter.innerHTML = `₹${cartTotalPrice.toFixed(2)}`;
    }

    // Trigger feedback
    window.showToast();
    window.openCart(); 
};

// BUY NOW FUNCTION
window.buyNow = function(productName) {
    // Redirects immediately to product page
    window.location.href = 'product.html'; 
};

// ==========================================
// Wait for page to load before attaching clicks
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    
    // Attach Cart Close Buttons
    const closeCartBtn = document.getElementById('closeCart');
    const cartOverlay = document.getElementById('cartOverlay');
    
    if(closeCartBtn) closeCartBtn.addEventListener('click', window.closeCart);
    if(cartOverlay) cartOverlay.addEventListener('click', window.closeCart);

    // Attach Header Cart Icon Clicks
    const cartIcons = document.querySelectorAll('.cart-icon-btn');
    cartIcons.forEach(icon => {
        icon.addEventListener('click', (e) => {
            e.preventDefault();
            window.openCart();
        });
    });

    // Mobile Menu Logic
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileNav = document.getElementById('mobileNav');
    if(mobileMenuBtn && mobileNav) {
        mobileMenuBtn.addEventListener('click', () => {
            if(mobileNav.style.display === 'flex') {
                mobileNav.style.display = 'none';
            } else {
                mobileNav.style.display = 'flex';
            }
        });
    }
});


    
        document.addEventListener('DOMContentLoaded', () => {
            const track = document.getElementById('reviewTrack');
            let isDown = false;
            let startX;
            let scrollLeft;
            let isHovered = false;
            let scrollSpeed = 1; // You can change this to 2 to make it scroll faster

            // The continuous automatic loop
            function autoScroll() {
                if (!isHovered && !isDown) {
                    track.scrollLeft += scrollSpeed;
                }

                // Seamlessly loops forward or backward infinitely
                if (track.scrollLeft >= track.scrollWidth / 2) {
                    track.scrollLeft -= track.scrollWidth / 2;
                } else if (track.scrollLeft <= 0) {
                    track.scrollLeft += track.scrollWidth / 2;
                }

                requestAnimationFrame(autoScroll);
            }

            requestAnimationFrame(autoScroll); // Start the engine

            // Manual Drag-to-Scroll for Desktop
            track.addEventListener('mousedown', (e) => {
                isDown = true;
                startX = e.pageX - track.offsetLeft;
                scrollLeft = track.scrollLeft;
            });
            track.addEventListener('mouseleave', () => { isDown = false; });
            track.addEventListener('mouseup', () => { isDown = false; });
            track.addEventListener('mousemove', (e) => {
                if (!isDown) return;
                e.preventDefault();
                const x = e.pageX - track.offsetLeft;
                const walk = (x - startX) * 2; // Multiplier adjusts drag sensitivity
                track.scrollLeft = scrollLeft - walk;
            });

            // Pause on Hover & Touch
            const cards = document.querySelectorAll('.interactive-card');
            cards.forEach(card => {
                card.addEventListener('mouseenter', () => isHovered = true);
                card.addEventListener('mouseleave', () => isHovered = false);
                card.addEventListener('touchstart', () => isHovered = true, {passive: true});
                card.addEventListener('touchend', () => {
                    setTimeout(() => isHovered = false, 1500); // Resumes 1.5s after touch ends
                });
            });
        });
    
