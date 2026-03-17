import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";
import { Trash2, ShoppingBag, CreditCard, ArrowRight, Minus, Plus, Loader, Info, ShoppingCart } from "lucide-react";

const Cart = () => {
  const { cartItems, removeFromCart, clearCart, totalPrice } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    if (!user) {
      navigate("/login");
      return;
    }

    setLoading(true);
    try {
      const orderData = {
        items: cartItems.map(item => ({
          foodId: item.foodId,
          name: item.name,
          quantity: item.quantity,
          price: item.price
        })),
        totalPrice: totalPrice,
      };

      await api.post("/orders", orderData);
      clearCart();
      navigate("/orders");
    } catch (error) {
      console.error("Checkout failed", error);
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="container py-20 flex flex-col items-center justify-center min-h-[70vh] text-center reveal">
        <div className="empty-cart-icon-wrapper">
          <ShoppingCart size={80} strokeWidth={1.5} />
        </div>
        <h2 className="text-4xl font-black mb-4">Your tray is empty</h2>
        <p className="text-gray text-lg mb-10 max-w-md mx-auto font-medium">It looks like you haven't picked anything delicious yet. Head over to the menu and start your feast!</p>
        <Link to="/menu" className="btn btn-primary px-10 py-4 shadow-2xl">
          Browse Delicious Menu
          <ArrowRight size={20} />
        </Link>

        <style dangerouslySetInnerHTML={{ __html: `
          .empty-cart-icon-wrapper { width: 160px; height: 160px; background: var(--gray-soft); border-radius: 48px; display: flex; align-items: center; justify-content: center; margin-bottom: 2.5rem; color: var(--gray); shadow: inset 0 2px 4px rgba(0,0,0,0.05); }
        `}} />
      </div>
    );
  }

  return (
    <div className="container py-20 reveal">
      <div className="cart-header-row mb-12">
        <div>
          <h1 className="text-5xl font-black mb-2">My Tray</h1>
          <p className="text-gray text-lg font-bold">You have <span className="text-primary">{cartItems.length} items</span> ready for checkout.</p>
        </div>
        <button 
          onClick={clearCart}
          className="clear-btn"
        >
          <Trash2 size={18} /> Clear Entire Tray
        </button>
      </div>
      
      <div className="cart-layout-grid">
        <div className="cart-items-column">
          {cartItems.map((item) => (
            <div key={item.foodId} className="cart-item-card card">
              <div className="cart-item-image">
                <img src={item.image || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=200"} alt={item.name} />
              </div>
              <div className="cart-item-info">
                <h3 className="text-xl font-black mb-1">{item.name}</h3>
                <div className="flex items-center gap-2 mb-3">
                   <span className="qty-tag">x{item.quantity}</span>
                   <span className="price-label">₹{item.price} each</span>
                </div>
              </div>
              <div className="cart-item-total">
                <span className="total-price">₹{item.price * item.quantity}</span>
                <button 
                  onClick={() => removeFromCart(item.foodId)}
                  className="item-remove-btn"
                  title="Remove Item"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="cart-summary-column">
          <div className="summary-card card">
            <h2 className="text-2xl font-black mb-8 text-white">Order Summary</h2>
            
            <div className="summary-details">
              <div className="summary-row">
                <span className="row-label">Subtotal</span>
                <span className="row-value">₹{totalPrice}</span>
              </div>
              <div className="summary-row">
                <span className="row-label">Platform Fee</span>
                <span className="row-value text-accent">FREE</span>
              </div>
              <div className="divider"></div>
              <div className="total-row">
                <span className="total-label">Total Amount</span>
                <span className="total-value">₹{totalPrice}</span>
              </div>
            </div>

            <button 
              onClick={handleCheckout}
              disabled={loading}
              className="btn btn-primary w-full py-5 text-lg shadow-2xl mt-8"
            >
              {loading ? <Loader className="animate-spin" size={24} /> : <> <CreditCard size={24} /> Confirm & Pay </>}
            </button>
            
            <div className="cart-info-box">
               <Info className="text-primary flex-shrink-0" size={16} />
               <p>Your order will be sent to the canteen staff instantly. Watch for status updates in real-time!</p>
            </div>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .cart-header-row { display: flex; justify-content: space-between; align-items: flex-end; gap: 2rem; }
        .clear-btn { background: transparent; border: 1px solid var(--gray-soft); padding: 0.6rem 1.25rem; border-radius: 12px; font-weight: 800; color: #EF4444; cursor: pointer; display: flex; align-items: center; gap: 0.5rem; transition: all 0.3s; }
        .clear-btn:hover { background: #FEF2F2; border-color: #FEE2E2; }
        .cart-layout-grid { display: grid; grid-template-columns: 1fr; gap: 3rem; }
        @media (min-width: 991px) { .cart-layout-grid { grid-template-columns: 1.8fr 1fr; } }
        .cart-items-column { display: flex; flex-direction: column; gap: 1.5rem; }
        .cart-item-card { display: flex; align-items: center; gap: 1.5rem; padding: 1.25rem; border: 1px solid var(--gray-soft); }
        .cart-item-image { width: 100px; height: 100px; border-radius: 20px; overflow: hidden; flex-shrink: 0; box-shadow: var(--shadow-sm); }
        .cart-item-image img { width: 100%; height: 100%; object-fit: cover; }
        .cart-item-info { flex-grow: 1; }
        .qty-tag { background: var(--gray-soft); padding: 0.25rem 0.6rem; border-radius: 8px; font-size: 11px; font-weight: 900; }
        .price-label { font-size: 13px; font-weight: 700; color: var(--gray); }
        .cart-item-total { display: flex; flex-direction: column; align-items: flex-end; gap: 0.75rem; }
        .total-price { font-size: 1.25rem; font-weight: 900; color: var(--primary); }
        .item-remove-btn { background: #FEF2F2; color: #EF4444; border: none; padding: 0.6rem; border-radius: 12px; cursor: pointer; transition: all 0.3s; }
        .item-remove-btn:hover { background: #EF4444; color: white; }
        
        .summary-card { background: var(--dark); border: none; padding: 3rem 2.5rem; position: sticky; top: 120px; }
        .summary-details { margin-top: 2rem; }
        .summary-row { display: flex; justify-content: space-between; margin-bottom: 1.25rem; }
        .row-label { font-size: 12px; font-weight: 800; text-transform: uppercase; color: rgba(255,255,255,0.4); tracking-widest: 0.05em; }
        .row-value { font-weight: 900; color: white; }
        .divider { height: 1px; background: rgba(255,255,255,0.1); margin: 2rem 0; }
        .total-row { display: flex; justify-content: space-between; align-items: flex-end; }
        .total-label { font-size: 1.1rem; font-weight: 900; color: white; }
        .total-value { font-size: 2.5rem; font-weight: 900; color: var(--primary); line-height: 1; }
        .cart-info-box { margin-top: 2rem; display: flex; gap: 1rem; padding: 1.25rem; background: rgba(255,255,255,0.05); border-radius: 18px; border: 1px solid rgba(255,255,255,0.1); }
        .cart-info-box p { font-size: 11px; font-weight: 600; color: rgba(255,255,255,0.5); font-style: italic; line-height: 1.6; }
      `}} />
    </div>
  );
};

export default Cart;
