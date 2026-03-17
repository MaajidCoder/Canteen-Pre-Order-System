import React, { useState, useEffect } from "react";
import api from "../services/api";
import { useCart } from "../context/CartContext";
import { Search, Plus, Check, Loader, Filter, Star, Utensils } from "lucide-react";

const Menu = () => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const { addToCart, cartItems } = useCart();

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const { data } = await api.get("/food");
        setFoods(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    fetchFoods();
  }, []);

  const categories = ["All", ...new Set(foods.map((food) => food.category))];
  const filteredFoods = foods.filter((food) => {
    const matchesSearch = food.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === "All" || food.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <div className="container py-20 flex flex-col items-center justify-center min-h-[60vh]">
        <Loader className="animate-spin text-primary mb-4" size={48} />
        <p className="font-bold text-gray uppercase tracking-widest text-xs">Loading Fresh Flavors...</p>
      </div>
    );
  }

  return (
    <div className="reveal">
      {/* Menu Header Area */}
      <div className="menu-header">
        <div className="container">
          <div className="flex flex-col md-flex-row justify-between items-end gap-8">
            <div className="header-text">
               <h1 className="text-5xl font-black mb-4">The Daily Menu</h1>
               <p className="text-gray text-lg font-medium">Hand-picked, freshly prepared meals from our expert chefs. No more long queues, just great food.</p>
            </div>
            <div className="search-wrapper">
               <Search className="search-icon" size={20} />
               <input 
                  type="text" 
                  placeholder="Craving something specific?" 
                  className="search-input"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
               />
            </div>
          </div>
        </div>
      </div>

      <div className="container py-12">
        {/* Category Filter */}
        <div className="filter-row">
          <div className="filter-icon-box">
            <Filter size={20} />
          </div>
          <div className="filter-buttons">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`filter-btn ${activeCategory === cat ? "active" : ""}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="menu-grid">
          {filteredFoods.map((food, idx) => (
            <FoodCard 
              key={food._id}
              food={food} 
              onAdd={() => addToCart(food)} 
              isInCart={cartItems.some(item => item.foodId === food._id)}
            />
          ))}
        </div>

        {filteredFoods.length === 0 && (
          <div className="empty-state card">
            <Utensils className="empty-icon" size={64} />
            <h3 className="text-2xl font-black mb-2">Nothing found</h3>
            <p className="text-gray font-medium">Maybe try searching for something else, or if you're an admin, add some delicious items in the dashboard!</p>
            <button onClick={() => {setSearchTerm(""); setActiveCategory("All")}} className="btn btn-secondary mt-6">Clear Filters</button>
          </div>
        )}
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .menu-header { background: white; border-bottom: 1px solid var(--gray-soft); padding: 4rem 0; }
        .header-text { max-width: 600px; }
        .search-wrapper { position: relative; width: 100%; max-width: 400px; }
        .search-icon { position: absolute; left: 1.25rem; top: 50%; transform: translateY(-50%); color: var(--gray); z-index: 1; }
        .search-input { width: 100%; padding: 1rem 1rem 1rem 3.5rem; border-radius: 16px; border: 2px solid var(--gray-soft); background: var(--light); font-size: 1rem; outline: none; transition: var(--transition); }
        .search-input:focus { border-color: var(--primary); background: white; box-shadow: 0 0 0 4px var(--primary-glow); }
        .filter-row { display: flex; align-items: center; gap: 1rem; margin-bottom: 3rem; }
        .filter-icon-box { background: white; border: 1px solid var(--gray-soft); padding: 0.75rem; border-radius: 14px; color: var(--primary); box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); }
        .filter-buttons { display: flex; gap: 0.75rem; overflow-x: auto; padding-bottom: 5px; }
        .filter-btn { padding: 0.75rem 1.5rem; border-radius: 14px; border: 1px solid var(--gray-soft); background: white; font-weight: 700; color: var(--gray); cursor: pointer; transition: var(--transition); white-space: nowrap; }
        .filter-btn:hover { border-color: var(--primary); color: var(--primary); }
        .filter-btn.active { background: var(--primary); color: white; border-color: var(--primary); box-shadow: 0 10px 15px -3px var(--primary-glow); }
        .menu-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 2rem; }
        .empty-state { text-align: center; padding: 5rem 2rem; background: var(--light); border: 2px dashed var(--gray-soft); border-radius: 32px; }
        .empty-icon { color: var(--gray-soft); margin-bottom: 1.5rem; }
        
        /* Food Card Enhancement */
        .food-card { border-radius: 24px; overflow: hidden; background: white; transition: var(--transition); border: 1px solid var(--gray-soft); }
        .food-card:hover { transform: translateY(-8px); box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1); }
        .card-image-box { position: relative; height: 220px; overflow: hidden; }
        .card-image-box img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.6s ease; }
        .food-card:hover .card-image-box img { transform: scale(1.1); }
        .category-tag { position: absolute; top: 1rem; left: 1rem; background: rgba(255,255,255,0.9); padding: 0.4rem 1rem; border-radius: 100px; font-size: 10px; font-weight: 900; text-transform: uppercase; color: var(--primary); tracking-wider: 0.05em; z-index: 2; border: 1px solid var(--gray-soft); }
        .sold-out-overlay { position: absolute; inset: 0; background: rgba(15, 23, 42, 0.7); backdrop-filter: blur(4px); display: flex; items-center: center; justify-content: center; z-index: 3; }
        .sold-out-badge { border: 2px solid white; color: white; padding: 0.5rem 1.5rem; border-radius: 12px; font-weight: 900; text-transform: uppercase; font-size: 1.2rem; }
        .card-content { padding: 1.5rem; }
        .card-header { display: flex; justify-content: space-between; align-items: start; margin-bottom: 1rem; }
        .food-name { font-size: 1.25rem; font-weight: 800; }
        .food-price-tag { background: var(--gray-soft); padding: 0.4rem 0.8rem; border-radius: 10px; font-weight: 900; color: var(--primary); font-size: 1.1rem; }
        .rating-row { display: flex; items-center: center; gap: 0.25rem; color: #F59E0B; margin-bottom: 1.5rem; font-size: 12px; font-weight: 700; }
        .add-btn { width: 100%; padding: 1rem; border-radius: 14px; border: none; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; cursor: pointer; transition: all 0.3s; display: flex; align-items: center; justify-content: center; gap: 0.5rem; }
        .add-btn-primary { background: var(--primary); color: white; }
        .add-btn-added { background: var(--accent); color: white; }
        .add-btn:disabled { opacity: 0.5; cursor: not-allowed; }
      `}} />
    </div>
  );
};

const FoodCard = ({ food, onAdd, isInCart }) => (
  <div className="food-card">
    <div className="card-image-box">
      <div className="category-tag">{food.category}</div>
      <img 
        src={food.image || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500"} 
        alt={food.name} 
      />
      {!food.available && (
        <div className="sold-out-overlay">
          <div className="sold-out-badge">Sold Out</div>
        </div>
      )}
    </div>
    
    <div className="card-content">
      <div className="card-header">
        <h3 className="food-name">{food.name}</h3>
        <div className="food-price-tag">₹{food.price}</div>
      </div>
      
      <div className="rating-row">
        {[...Array(5)].map((_, i) => <Star key={i} size={12} fill="currentColor" />)}
        <span style={{ color: 'var(--gray)', marginLeft: '4px' }}>4.8</span>
      </div>
      
      <button
        onClick={onAdd}
        disabled={!food.available}
        className={`add-btn ${isInCart ? "add-btn-added" : "add-btn-primary"}`}
      >
        {isInCart ? (
          <> <Check size={18} /> Added </>
        ) : (
          <> <Plus size={18} /> Add to Cart </>
        )}
      </button>
    </div>
  </div>
);

export default Menu;
