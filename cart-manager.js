// ============================================
// SHOPPING CART MANAGER - LocalStorage Based
// ============================================

const CartManager = {
    CART_KEY: 'mankefor_cart',
    
    // Get cart from localStorage
    getCart() {
        try {
            console.log('📖 CartManager.getCart() - Reading cart from localStorage');
            const cart = localStorage.getItem(this.CART_KEY);
            const parsedCart = cart ? JSON.parse(cart) : [];
            console.log('📖 CartManager.getCart() - Cart retrieved:', parsedCart.length, 'items');
            return parsedCart;
        } catch (error) {
            console.error('❌ CartManager.getCart() - Error reading cart:', error);
            return [];
        }
    },
    
    // Save cart to localStorage
    saveCart(cart) {
        try {
            console.log('💾 CartManager.saveCart() - Saving cart with', cart.length, 'items');
            localStorage.setItem(this.CART_KEY, JSON.stringify(cart));
            console.log('💾 CartManager.saveCart() - Cart saved successfully');
            this.updateCartBadge();
            return true;
        } catch (error) {
            console.error('❌ CartManager.saveCart() - Error saving cart:', error);
            return false;
        }
    },
    
    // Add item to cart
    addItem(product, quantity = 1, selectedSize = null) {
        console.log('🛒 CartManager.addItem() - START');
        console.log('🛒 Product received:', product);
        console.log('🛒 Quantity:', quantity);
        console.log('🛒 Selected size:', selectedSize);
        
        const cart = this.getCart();
        console.log('🛒 Current cart has', cart.length, 'items');
        
        // Create cart item
        const cartItem = {
            id: product.id || product._id,
            name: product.name,
            price: selectedSize ? selectedSize.price : product.price,
            size: selectedSize ? selectedSize.size : 'Standard',
            image: this.extractImageUrl(product.images),
            quantity: quantity,
            addedAt: new Date().toISOString()
        };
        
        console.log('🛒 Created cart item:', cartItem);
        
        // Check if item already exists in cart (same product + same size)
        const existingIndex = cart.findIndex(
            item => item.id === cartItem.id && item.size === cartItem.size
        );
        
        console.log('🛒 Existing item index:', existingIndex);
        
        if (existingIndex !== -1) {
            // Update quantity
            cart[existingIndex].quantity += quantity;
        } else {
            // Add new item
            cart.push(cartItem);
        }
        
        this.saveCart(cart);
        console.log('Item added to cart:', cartItem);
        return cartItem;
    },
    
    // Extract image URL from product images
    extractImageUrl(images) {
        if (!images || images.length === 0) return '/images/default-product.png';
        const firstImage = images[0];
        return typeof firstImage === 'string' ? firstImage : (firstImage.url || '/images/default-product.png');
    },
    
    // Remove item from cart
    removeItem(productId, size) {
        console.log('🗑️ CartManager.removeItem() - START');
        console.log('🗑️ Product ID:', productId, 'Type:', typeof productId, 'Size:', size);
        
        // Convert to number if it's a string number (handles both string and number IDs)
        const numericId = typeof productId === 'string' ? (isNaN(productId) ? productId : Number(productId)) : productId;
        console.log('🗑️ Product ID (converted):', numericId, 'Type:', typeof numericId);
        
        let cart = this.getCart();
        console.log('🗑️ Cart before removal:', cart.length, 'items');
        cart = cart.filter(item => !(item.id === numericId && item.size === size));
        console.log('🗑️ Cart after removal:', cart.length, 'items');
        this.saveCart(cart);
        console.log('🗑️ Item removed from cart');
    },
    
    // Update item quantity
    updateQuantity(productId, size, quantity) {
        console.log('🔄 CartManager.updateQuantity() - START');
        console.log('🔄 Product ID (before):', productId, 'Type:', typeof productId);
        
        // Convert to number if it's a string number (handles both string and number IDs)
        const numericId = typeof productId === 'string' ? (isNaN(productId) ? productId : Number(productId)) : productId;
        console.log('🔄 Product ID (after):', numericId, 'Type:', typeof numericId);
        console.log('🔄 Size:', size);
        console.log('🔄 New Quantity:', quantity);
        
        const cart = this.getCart();
        console.log('🔄 Cart retrieved:', cart.length, 'items');
        console.log('🔄 Cart contents:', JSON.stringify(cart, null, 2));
        
        const item = cart.find(item => item.id === numericId && item.size === size);
        console.log('🔄 Found item?', item ? 'YES' : 'NO');
        
        if (item) {
            console.log('🔄 Current item quantity:', item.quantity);
            if (quantity <= 0) {
                console.log('🔄 Quantity <= 0, removing item');
                this.removeItem(numericId, size);
            } else {
                console.log('🔄 Updating quantity from', item.quantity, 'to', quantity);
                item.quantity = quantity;
                console.log('🔄 Item after update:', JSON.stringify(item, null, 2));
                console.log('🔄 Saving cart...');
                this.saveCart(cart);
                console.log('🔄 Cart saved successfully');
            }
        } else {
            console.error('❌ Item not found in cart! Looking for ID:', numericId, '(type:', typeof numericId, ') Size:', size);
            console.error('❌ Available items:', cart.map(i => ({ id: i.id, idType: typeof i.id, size: i.size })));
        }
        console.log('🔄 CartManager.updateQuantity() - END');
    },
    
    // Clear entire cart
    clearCart() {
        localStorage.removeItem(this.CART_KEY);
        this.updateCartBadge();
        console.log('Cart cleared');
    },
    
    // Get cart total count
    getCartCount() {
        const cart = this.getCart();
        return cart.reduce((total, item) => total + item.quantity, 0);
    },
    
    // Get cart total price
    getCartTotal() {
        const cart = this.getCart();
        return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    },
    
    // Update cart badge in navbar
    updateCartBadge() {
        console.log('🔔 CartManager.updateCartBadge() - Updating badge');
        const badge = document.querySelector('.cart-badge');
        if (badge) {
            const count = this.getCartCount();
            console.log('🔔 Cart count:', count);
            badge.textContent = count;
            badge.style.display = count > 0 ? 'inline-block' : 'none';
            console.log('🔔 Badge updated to:', count);
        } else {
            console.warn('⚠️ Cart badge element not found in DOM');
        }
    },
    
    // Prepare order data for checkout
    prepareOrderData() {
        const cart = this.getCart();
        const total = this.getCartTotal();
        
        return {
            items: cart.map(item => ({
                productId: item.id,
                name: item.name,
                size: item.size,
                quantity: item.quantity,
                price: item.price,
                subtotal: item.price * item.quantity
            })),
            totalAmount: total,
            currency: 'FCFA',
            createdAt: new Date().toISOString()
        };
    },
    
    // Submit order to backend
    async checkout(shippingInfo) {
        if (!API.isAuthenticated()) {
            throw new Error('Please login to place an order');
        }
        
        const cart = this.getCart();
        if (cart.length === 0) {
            throw new Error('Your cart is empty');
        }
        
        const orderData = {
            ...this.prepareOrderData(),
            shippingAddress: shippingInfo.address,
            shippingCity: shippingInfo.city,
            shippingPhone: shippingInfo.phone,
            notes: shippingInfo.notes || ''
        };
        
        try {
            // Call API to create order
            const response = await API.createOrder(orderData);
            
            // Clear cart on successful order
            this.clearCart();
            
            return response;
        } catch (error) {
            console.error('Checkout error:', error);
            throw error;
        }
    }
};

// Initialize cart badge on page load
document.addEventListener('DOMContentLoaded', function() {
    CartManager.updateCartBadge();
});

// Export for use in other scripts
window.CartManager = CartManager;
