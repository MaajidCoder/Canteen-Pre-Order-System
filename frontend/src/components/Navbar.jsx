import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { ShoppingCart, LogOut, Utensils, ChefHat, Menu as MenuIcon, X } from "lucide-react";

const Navbar = () => {
  const { user, logout } = useAuth();
  const { cartItems } = useCart();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="glass-nav">
      <div className="container flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 text-2xl font-bold font-heading text-primary" style={{ textDecoration: 'none' }}>
          <div className="bg-primary text-white p-2 rounded-xl">
            <Utensils size={24} />
          </div>
          <span>Canteen<span style={{color: 'var(--dark)'}}>Hub</span></span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md-flex items-center gap-8">
          <Link to="/menu" className="nav-link">Menu</Link>
          {user && user.role !== 'admin' && <Link to="/orders" className="nav-link">My Orders</Link>}
          {user?.role === 'admin' && (
            <Link to="/admin" className="flex items-center gap-2 font-bold text-primary">
              <ChefHat size={18} /> Admin Dashboard
            </Link>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <Link to="/cart" className="relative p-2 bg-gray-soft rounded-full" style={{ position: 'relative' }}>
            <ShoppingCart size={22} style={{ color: 'var(--gray)' }} />
            {cartItems.length > 0 && (
              <span className="cart-badge">{cartItems.length}</span>
            )}
          </Link>

          {user ? (
            <div className="hidden md-flex items-center gap-4">
              <div className="user-profile">
                <div className="user-avatar">{user.name[0]}</div>
                <span className="font-bold text-sm">{user.name}</span>
              </div>
              <button 
                onClick={handleLogout}
                className="p-2 text-gray hover:text-red-500 transition-colors"
                title="Logout"
              >
                <LogOut size={20} />
              </button>
            </div>
          ) : (
            <div className="hidden md-flex items-center gap-4">
              <Link to="/login" className="font-bold text-gray" style={{ textDecoration: 'none' }}>Login</Link>
              <Link to="/register" className="btn btn-primary">Join Now</Link>
            </div>
          )}

          {/* Mobile Toggle */}
          <button 
            className="md-hidden"
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0.5rem' }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={28} /> : <MenuIcon size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="mobile-menu-overlay md-hidden">
          <div className="flex flex-col gap-6 p-8 bg-white shadow-2xl">
            <Link to="/menu" onClick={() => setIsMobileMenuOpen(false)}>Menu</Link>
            {user && user.role !== 'admin' && <Link to="/orders" onClick={() => setIsMobileMenuOpen(false)}>My Orders</Link>}
            <hr />
            {!user ? (
              <>
                <Link to="/login" className="btn btn-secondary" onClick={() => setIsMobileMenuOpen(false)}>Login</Link>
                <Link to="/register" className="btn btn-primary" onClick={() => setIsMobileMenuOpen(false)}>Join Now</Link>
              </>
            ) : (
              <button onClick={handleLogout} className="btn btn-secondary">Logout</button>
            )}
          </div>
        </div>
      )}

      <style dangerouslySetInnerHTML={{ __html: `
        .nav-link { color: var(--gray); font-weight: 700; text-decoration: none; transition: color 0.3s; }
        .nav-link:hover { color: var(--primary); }
        .cart-badge {
          position: absolute; top: -5px; right: -5px;
          background: var(--secondary); color: white;
          font-size: 10px; font-weight: 900;
          width: 18px; height: 18px;
          display: flex; align-items: center; justify-content: center;
          border-radius: 50%; border: 2px solid white;
        }
        .user-profile { display: flex; align-items: center; gap: 0.5rem; background: var(--gray-soft); padding-right: 1rem; border-radius: 100px; }
        .user-avatar { width: 32px; height: 32px; background: var(--primary); color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 900; }
        .mobile-menu-overlay { position: absolute; top: 80px; left: 0; width: 100%; z-index: 999; }
      `}} />
    </nav>
  );
};

export default Navbar;
