import React, { useState, useEffect } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";
import io from "socket.io-client";
import { Package, Clock, CheckCircle2, RefreshCcw, ArrowRight, Loader, MapPin } from "lucide-react";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const { data } = await api.get("/orders/myorders");
      setOrders(data.reverse());
      setLoading(false);
    } catch (error) {
      console.error("Error fetching orders", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();

    const socket = io("/");
    socket.on("orderUpdated", (updatedOrder) => {
      setOrders((prevOrders) => 
        prevOrders.map(order => order._id === updatedOrder._id ? updatedOrder : order)
      );
    });

    return () => socket.disconnect();
  }, []);

  if (loading) {
    return (
      <div className="container py-20 flex flex-col items-center justify-center min-h-[60vh]">
        <Loader className="animate-spin text-primary mb-4" size={48} />
        <p className="font-black text-gray uppercase tracking-widest text-xs">Syncing Your Kitchen...</p>
      </div>
    );
  }

  return (
    <div className="container py-20 reveal">
      <div className="flex flex-col md-flex-row justify-between items-end gap-10 mb-12">
        <div>
          <h1 className="text-5xl font-black mb-2">My Orders</h1>
          <p className="text-gray text-lg font-bold">Track your meal's journey in real-time.</p>
        </div>
        <button onClick={fetchOrders} className="refresh-status-btn group">
          <RefreshCcw size={18} className="rotate-icon" />
          Refresh Status
        </button>
      </div>

      {orders.length === 0 ? (
        <div className="empty-orders-card card">
          <Package className="empty-pkg-icon" size={80} />
          <h3 className="text-3xl font-black mb-4">No active orders</h3>
          <p className="text-gray mb-10 max-w-sm mx-auto font-medium">Hungry? Head over to the menu and place your first pre-order today!</p>
          <Link to="/menu" className="btn btn-primary px-10 py-4 shadow-2xl">
            Explore Menu
            <ArrowRight size={20} />
          </Link>
        </div>
      ) : (
        <div className="orders-stack">
          {orders.map((order) => (
            <div key={order._id} className="order-item-container card">
               <div className={`status-indicator-bar ${order.status.toLowerCase()}`}></div>
               
               <div className="order-item-content">
                  <div className="order-item-header">
                     <div className="order-meta-info">
                        <div className="flex items-center gap-3 mb-4">
                           <span className="order-id-badge">#{order._id.slice(-6).toUpperCase()}</span>
                           <span className="order-date">{new Date(order.createdAt).toLocaleTimeString()} • {new Date(order.createdAt).toLocaleDateString()}</span>
                        </div>
                        <h3 className="order-details-text">
                           {order.items.map(i => `${i.quantity}x ${i.name}`).join(", ")}
                        </h3>
                     </div>

                     <div className="order-status-visual">
                        <StatusBadge status={order.status} />
                     </div>
                  </div>

                  <div className="order-footer-details">
                     <div className="footer-metric">
                        <span className="metric-label">Payment Total</span>
                        <span className="metric-value">₹{order.totalPrice}</span>
                     </div>
                     <div className="footer-metric">
                        <span className="metric-label">Collection Point</span>
                        <div className="location-box">
                           <MapPin size={14} className="text-primary" />
                           <span className="metric-value-sm">Main Canteen Counter 1</span>
                        </div>
                     </div>
                     
                     {order.status === 'Ready' && (
                        <div className="collect-callout animate-pulse">
                           <CheckCircle2 size={16} />
                           <span>Your food is waiting! Please collect now.</span>
                        </div>
                     )}
                  </div>
               </div>
            </div>
          ))}
        </div>
      )}

      <style dangerouslySetInnerHTML={{ __html: `
        .refresh-status-btn { background: white; border: 1px solid var(--gray-soft); padding: 0.8rem 1.5rem; border-radius: 14px; font-weight: 800; color: var(--gray); cursor: pointer; display: flex; align-items: center; gap: 0.75rem; transition: all 0.3s; }
        .refresh-status-btn:hover { color: var(--primary); border-color: var(--primary); transform: translateY(-2px); }
        .refresh-status-btn:hover .rotate-icon { transform: rotate(180deg); transition: transform 0.5s ease; }
        .empty-orders-card { text-align: center; padding: 6rem 2rem; border: 2px dashed var(--gray-soft); background: var(--light); border-radius: 32px; }
        .empty-pkg-icon { color: var(--gray-soft); margin-bottom: 2rem; opacity: 0.5; }
        .orders-stack { display: flex; flex-direction: column; gap: 2rem; }
        .order-item-container { padding: 0; overflow: hidden; display: flex; border: 1px solid var(--gray-soft); transition: var(--transition); }
        .order-item-container:hover { transform: translateX(8px); border-color: var(--primary-glow); }
        .status-indicator-bar { width: 12px; flex-shrink: 0; }
        .status-indicator-bar.preparing { background: #F59E0B; }
        .status-indicator-bar.ready { background: #10B981; }
        .status-indicator-bar.completed { background: var(--gray); }
        .order-item-content { flex-grow: 1; padding: 2.5rem; }
        .order-item-header { display: flex; justify-content: space-between; align-items: flex-start; gap: 2rem; margin-bottom: 2.5rem; }
        @media (max-width: 768px) { .order-item-header { flex-direction: column; align-items: center; text-align: center; } }
        .order-id-badge { background: var(--dark); color: white; padding: 0.3rem 0.8rem; border-radius: 100px; font-size: 10px; font-weight: 900; letter-spacing: 0.5px; }
        .order-date { color: var(--gray); font-size: 12px; font-weight: 700; text-transform: uppercase; }
        .order-details-text { font-size: 1.5rem; font-weight: 900; line-height: 1.2; }
        .order-status-visual { display: flex; flex-direction: column; align-items: center; gap: 1rem; }
        .order-footer-details { display: flex; flex-wrap: wrap; gap: 3rem; align-items: flex-end; padding-top: 2rem; border-top: 1px solid var(--gray-soft); }
        @media (max-width: 768px) { .order-footer-details { justify-content: center; text-align: center; } }
        .footer-metric { display: flex; flex-direction: column; gap: 0.5rem; }
        .metric-label { font-size: 10px; font-weight: 900; text-transform: uppercase; color: var(--gray); tracking-widest: 0.05em; }
        .metric-value { font-size: 1.5rem; font-weight: 900; color: var(--dark); }
        .location-box { display: flex; align-items: center; gap: 0.5rem; }
        .metric-value-sm { font-size: 0.9rem; font-weight: 800; color: var(--dark); }
        .collect-callout { background: #ECFDF5; color: #059669; padding: 0.75rem 1.5rem; border-radius: 14px; border: 1px solid #A7F3D0; display: flex; align-items: center; gap: 0.75rem; font-weight: 800; font-size: 12px; }
        
        /* Status Badge Enhancements */
        .status-badge-premium { padding: 1.25rem 2.5rem; border-radius: 20px; font-weight: 900; font-size: 1.25rem; display: flex; align-items: center; gap: 1rem; box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1); border-width: 2px; }
        .status-preparing { background: #FFFBEB; color: #D97706; border-color: #FEF3C7; }
        .status-ready { background: #ECFDF5; color: #059669; border-color: #D1FAE5; }
        .status-completed { background: #F3F4F6; color: var(--gray); border-color: #E5E7EB; }
      `}} />
    </div>
  );
};

const StatusBadge = ({ status }) => {
  const icons = {
    Preparing: <RefreshCcw size={24} className="animate-spin" />,
    Ready: <CheckCircle2 size={24} className="animate-bounce" />,
    Completed: <Package size={24} />
  };

  const getStyleClass = (s) => {
    switch(s) {
      case 'Preparing': return 'status-preparing';
      case 'Ready': return 'status-ready';
      case 'Completed': return 'status-completed';
      default: return '';
    }
  };

  return (
    <div className={`status-badge-premium ${getStyleClass(status)}`}>
      {icons[status]}
      {status}
    </div>
  );
};

export default Orders;
