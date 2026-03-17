import React, { useState, useEffect } from "react";
import api from "../services/api";
import { Package, Plus, Trash2, CheckCircle2, RefreshCcw, ChefHat, LayoutGrid, ListOrdered, Loader, Trash, X, ArrowRight } from "lucide-react";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("orders");
  const [orders, setOrders] = useState([]);
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);

  // Form State
  const [showAddForm, setShowAddForm] = useState(false);
  const [newFood, setNewFood] = useState({ name: "", price: "", category: "Snacks", image: "" });

  const fetchData = async () => {
    setLoading(true);
    try {
      const [ordersRes, foodRes] = await Promise.all([
        api.get("/orders"),
        api.get("/food")
      ]);
      setOrders(ordersRes.data.reverse());
      setFoods(foodRes.data);
      setLoading(false);
    } catch (err) {
      console.error("Admin fetch failed", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await api.put(`/orders/${id}/status`, { status });
      fetchData();
    } catch (err) { console.error(err); }
  };

  const handleAddFood = async (e) => {
    e.preventDefault();
    try {
      await api.post("/food", newFood);
      setShowAddForm(false);
      setNewFood({ name: "", price: "", category: "Snacks", image: "" });
      fetchData();
    } catch (err) { console.error(err); }
  };

  const deleteFood = async (id) => {
    if (window.confirm("Are you sure you want to remove this item from the menu?")) {
      try {
        await api.delete(`/food/${id}`);
        fetchData();
      } catch (err) { console.error(err); }
    }
  };

  return (
    <div className="container py-20 reveal" style={{ minHeight: '90vh' }}>
      <div className="admin-header">
        <div className="flex flex-col md-flex-row justify-between items-start md-items-center gap-8">
          <div>
             <div className="flex items-center gap-4 mb-2">
                <div className="bg-primary text-white p-3 rounded-2xl shadow-lg">
                   <ChefHat size={32} />
                </div>
                <h1 className="text-4xl md:text-5xl font-black">Staff Control</h1>
             </div>
             <p className="text-gray text-lg font-medium">Manage your canteen's menu and order fulfillment.</p>
          </div>
          <div className="flex items-center gap-3">
             <div className="live-status">
                <div className="pulse-dot"></div>
                <span>Live System</span>
             </div>
             <button onClick={fetchData} className="refresh-btn">
                <RefreshCcw size={18} />
             </button>
          </div>
        </div>
      </div>

      <div className="tab-container">
        <div className="tab-wrapper">
          <TabButton 
            active={activeTab === 'orders'} 
            onClick={() => setActiveTab("orders")}
            icon={<ListOrdered size={20} />}
            label="Orders"
          />
          <TabButton 
            active={activeTab === 'menu'} 
            onClick={() => setActiveTab("menu")}
            icon={<LayoutGrid size={20} />}
            label="Menu Manager"
          />
        </div>
      </div>

      {loading ? (
        <div className="loading-state">
          <Loader className="animate-spin text-primary mb-4" size={48} />
          <p className="font-black text-gray uppercase tracking-widest text-xs">Fetching Live Data...</p>
        </div>
      ) : activeTab === "orders" ? (
        /* Orders View Refined */
        <div className="order-list">
          {orders.length === 0 && (
            <div className="empty-order-state card">
               <Package className="empty-pkg-icon" size={64} />
               <p className="font-bold text-gray">No active orders found.</p>
            </div>
          )}
          {orders.map(order => (
            <div key={order._id} className="order-card card">
               <div className="order-body">
                  <div className="order-meta">
                    <span className="order-id">ORD #{order._id.slice(-6).toUpperCase()}</span>
                    <span className="student-name">By: {order.studentId?.name || "Student"}</span>
                  </div>
                  <div className="order-items">
                    {order.items.map((i, idx) => (
                      <div key={idx} className="item-badge">
                         <span className="item-name">{i.name}</span>
                         <span className="item-qty">x{i.quantity}</span>
                      </div>
                    ))}
                  </div>
               </div>
               
               <div className="order-action-area">
                  <div className="status-label-group">
                     <p className="label-text">Current Status</p>
                     <span className={`status-pill ${order.status.toLowerCase()}`}>
                        {order.status}
                     </span>
                  </div>
                  
                  <div className="action-button-group">
                    {order.status === "Preparing" && (
                      <button onClick={() => updateStatus(order._id, "Ready")} className="btn btn-primary btn-sm">
                         Ready
                      </button>
                    )}
                    {order.status === "Ready" && (
                      <button onClick={() => updateStatus(order._id, "Completed")} className="btn btn-accent btn-sm">
                         Done
                      </button>
                    )}
                  </div>
               </div>
            </div>
          ))}
        </div>
      ) : (
        /* Menu Manager Refined */
        <div>
          <div className="flex flex-col md-flex-row justify-between items-start md-items-center mb-10 gap-6">
            <h2 className="text-3xl font-black">Menu Inventory <span className="text-gray text-lg ml-2 font-medium">({foods.length} items)</span></h2>
            <button 
              onClick={() => setShowAddForm(!showAddForm)} 
              className={`btn ${showAddForm ? 'btn-secondary' : 'btn-accent'} px-8`}
            >
              {showAddForm ? <><X size={20} /> Close Form</> : <><Plus size={20} /> Add New Item</>}
            </button>
          </div>

          {showAddForm && (
            <div className="card add-form-card">
               <h3 className="text-xl font-bold mb-8">Item Details</h3>
               <form onSubmit={handleAddFood} className="add-food-form">
                <div className="admin-input-group">
                  <label>Item Name</label>
                  <input type="text" placeholder="e.g. Special Sandwich" value={newFood.name} onChange={e => setNewFood({...newFood, name: e.target.value})} required />
                </div>
                <div className="admin-input-group">
                  <label>Price (₹)</label>
                  <input type="number" placeholder="50" value={newFood.price} onChange={e => setNewFood({...newFood, price: e.target.value})} required />
                </div>
                <div className="admin-input-group">
                  <label>Category</label>
                  <select value={newFood.category} onChange={e => setNewFood({...newFood, category: e.target.value})} required>
                    <option value="Snacks">Snacks</option>
                    <option value="Drinks">Drinks</option>
                    <option value="Meals">Meals</option>
                    <option value="Desserts">Desserts</option>
                  </select>
                </div>
                <div className="admin-input-group">
                  <label>Image URL</label>
                  <input type="text" placeholder="https://unsplash..." value={newFood.image} onChange={e => setNewFood({...newFood, image: e.target.value})} />
                </div>
                <button className="btn btn-accent save-btn">Save to Menu <ArrowRight size={18} /></button>
              </form>
            </div>
          )}

          <div className="menu-admin-grid">
            {foods.map(food => (
              <div key={food._id} className="menu-admin-card card">
                <img src={food.image || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=200"} alt={food.name} className="food-thumb" />
                <div className="food-info">
                  <div className="food-title">{food.name}</div>
                  <div className="food-price">₹{food.price}</div>
                  <div className="food-cat-tag">{food.category}</div>
                </div>
                <button 
                  onClick={() => deleteFood(food._id)} 
                  className="trash-btn"
                  title="Remove Item"
                >
                  <Trash size={18} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <style dangerouslySetInnerHTML={{ __html: `
        .admin-header { margin-bottom: 3rem; }
        .live-status { background: white; border: 1px solid var(--gray-soft); px-4: 1rem; padding: 0.5rem 1rem; border-radius: 100px; display: flex; align-items: center; gap: 0.5rem; font-size: 11px; font-weight: 900; text-transform: uppercase; color: var(--dark); box-shadow: var(--shadow-sm); }
        .pulse-dot { width: 8px; height: 8px; background: var(--accent); border-radius: 50%; animation: pulse 2s infinite; }
        @keyframes pulse { 0% { opacity: 1; transform: scale(1); } 50% { opacity: 0.5; transform: scale(1.2); } 100% { opacity: 1; transform: scale(1); } }
        .refresh-btn { background: white; border: 1px solid var(--gray-soft); padding: 0.6rem; border-radius: 14px; cursor: pointer; color: var(--gray); transition: all 0.3s; }
        .refresh-btn:hover { color: var(--primary); transform: rotate(180deg); }
        .tab-container { margin-bottom: 3rem; }
        .tab-wrapper { background: white; padding: 0.5rem; border-radius: 20px; border: 1px solid var(--gray-soft); width: fit-content; display: flex; gap: 0.5rem; box-shadow: var(--shadow-sm); }
        .tab-btn { padding: 0.8rem 1.5rem; border-radius: 16px; font-weight: 800; text-transform: uppercase; font-size: 12px; cursor: pointer; border: none; background: transparent; color: var(--gray); display: flex; align-items: center; gap: 0.5rem; transition: all 0.3s; }
        .tab-btn.active { background: var(--dark); color: white; box-shadow: 0 10px 20px -5px rgba(0,0,0,0.2); }
        .loading-state { padding: 5rem 0; text-align: center; }
        .order-list { display: flex; flex-direction: column; gap: 1.5rem; }
        .order-card { display: flex; flex-direction: column; gap: 2rem; border: 1px solid var(--gray-soft); transition: var(--transition); }
        @media (min-width: 991px) { .order-card { flex-direction: row; align-items: center; justify-content: space-between; } }
        .order-body { flex-grow: 1; }
        .order-meta { display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem; }
        .order-id { background: var(--dark); color: white; padding: 0.3rem 0.8rem; border-radius: 100px; font-size: 10px; font-weight: 900; letter-spacing: 0.5px; }
        .student-name { color: var(--gray); font-size: 12px; font-weight: 700; text-transform: uppercase; }
        .order-items { display: flex; flex-wrap: wrap; gap: 0.5rem; }
        .item-badge { background: var(--gray-soft); padding: 0.5rem 1rem; border-radius: 12px; border: 1px solid rgba(0,0,0,0.05); display: flex; align-items: center; gap: 0.5rem; font-weight: 800; }
        .item-qty { background: white; color: var(--primary); width: 22px; height: 22px; display: flex; align-items: center; justify-content: center; border-radius: 6px; font-size: 10px; }
        .order-action-area { display: flex; align-items: center; gap: 2rem; background: #EEF2FF; padding: 1.5rem 2rem; border-radius: 20px; border: 1px solid #E0E7FF; min-width: 280px; justify-content: space-between; }
        .status-label-group { display: flex; flex-direction: column; gap: 0.25rem; }
        .label-text { font-size: 10px; font-weight: 900; text-transform: uppercase; color: var(--gray); }
        .status-pill { padding: 0.4rem 1rem; border-radius: 8px; font-size: 11px; font-weight: 900; text-transform: uppercase; }
        .status-pill.preparing { background: #F59E0B; color: white; }
        .status-pill.ready { background: #10B981; color: white; }
        .status-pill.completed { background: var(--gray); color: white; }
        .action-button-group { flex-grow: 1; display: flex; justify-content: flex-end; }
        .btn-sm { padding: 0.6rem 1.2rem; font-size: 12px; width: 100%; }
        
        .add-form-card { border: 2px solid var(--secondary); background: #FFFBEB; margin-bottom: 3rem; padding: 3rem; }
        .add-food-form { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1.5rem; align-items: flex-end; }
        .admin-input-group { display: flex; flex-direction: column; gap: 0.5rem; }
        .admin-input-group label { font-size: 11px; font-weight: 800; text-transform: uppercase; color: var(--gray); }
        .admin-input-group input, .admin-input-group select { padding: 1rem; border-radius: 12px; border: 2px solid #FEF3C7; outline: none; transition: all 0.3s; background: white; font-size: 1rem; }
        .admin-input-group input:focus { border-color: var(--secondary); box-shadow: 0 0 0 4px var(--secondary-glow); }
        .save-btn { grid-column: 1 / -1; justify-content: center; padding: 1rem; font-size: 1.1rem; }
        
        .menu-admin-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 1.5rem; }
        .menu-admin-card { display: flex; align-items: center; gap: 1.5rem; padding: 1.25rem; border: 1px solid var(--gray-soft); }
        .food-thumb { width: 70px; height: 70px; border-radius: 18px; object-fit: cover; box-shadow: var(--shadow-sm); }
        .food-info { flex-grow: 1; }
        .food-title { font-weight: 800; font-size: 1.1rem; margin-bottom: 0.25rem; }
        .food-price { color: var(--primary); font-weight: 900; font-size: 1rem; }
        .food-cat-tag { font-size: 9px; font-weight: 900; text-transform: uppercase; color: var(--gray); margin-top: 0.5rem; }
        .trash-btn { background: #FEF2F2; color: #EF4444; border: 1px solid #FEE2E2; padding: 0.6rem; border-radius: 12px; cursor: pointer; transition: all 0.3s; }
        .trash-btn:hover { background: #EF4444; color: white; }
        .empty-order-state { text-align: center; padding: 5rem 0; border: 2px dashed var(--gray-soft); }
        .empty-pkg-icon { color: var(--gray-soft); margin-bottom: 1rem; }
      `}} />
    </div>
  );
};

const TabButton = ({ active, onClick, icon, label }) => (
  <button 
    onClick={onClick}
    className={`tab-btn ${active ? 'active' : ''}`}
  >
    {icon}
    {label}
  </button>
);

export default AdminDashboard;
