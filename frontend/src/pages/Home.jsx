import React from "react";
import { Link } from "react-router-dom";
import { Utensils, Clock, Wallet, CheckCircle, ArrowRight, Star } from "lucide-react";

const Home = () => {
  return (
    <div className="reveal">
      {/* Hero Section */}
      <section style={{ position: 'relative', overflow: 'hidden', backgroundColor: 'white' }}>
        <div className="container">
          <div className="hero-grid">
            <div className="hero-content">
              <div className="hero-badge">
                <Star size={14} fill="currentColor" />
                Trusted by 5000+ Students
              </div>
              <h1 className="hero-title">
                Smart Dining for <br />
                <span className="text-gradient">Busy Students.</span>
              </h1>
              <p className="hero-desc">
                Experience the safest and fastest way to order your favorite campus meals. No queues, no waiting, just fresh food ready for you in minutes.
              </p>
              <div className="hero-actions">
                <Link to="/menu" className="btn btn-primary btn-lg">
                  Explore Menu
                  <ArrowRight size={20} />
                </Link>
                <Link to="/orders" className="btn btn-secondary btn-lg">
                  Track Orders
                </Link>
              </div>
              
              <div className="hero-stats">
                <Stat icon={<Clock size={16} />} label="7 Min" sub="Avg. Prep" />
                <div className="divider"></div>
                <Stat icon={<Utensils size={16} />} label="50+" sub="Daily Dishes" />
              </div>
            </div>

            <div className="hero-image-wrapper">
               <div className="image-card">
                  <img 
                    src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=1200" 
                    alt="Healthy Food" 
                  />
                  <div className="image-floating-card">
                    <div>
                      <p className="status-label">Today's Special</p>
                      <h4 className="item-name">Organic Energy Bowl</h4>
                    </div>
                    <div className="item-price">₹120</div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding" style={{ background: 'var(--gray-soft)' }}>
        <div className="container">
          <div className="section-header">
            <h2>Built for Efficiency</h2>
            <p>We've redesigned the canteen experience from the ground down.</p>
          </div>
          <div className="features-grid">
            <FeatureCard 
              icon={<Utensils size={32} />} 
              title="Curated Menu" 
              desc="Daily fresh options from nutritious meals to quick snacks." 
            />
            <FeatureCard 
              icon={<Clock size={32} />} 
              title="Smart Queue" 
              desc="Pre-order system that manages pick-ups dynamically." 
            />
            <FeatureCard 
              icon={<CheckCircle size={32} />} 
              title="Instant Alerts" 
              desc="Real-time notifications when your food hits the counter." 
            />
          </div>
        </div>
      </section>

      <style dangerouslySetInnerHTML={{ __html: `
        .hero-badge { display: inline-flex; align-items: center; gap: 0.5rem; background: #EEF2FF; color: var(--primary); padding: 0.5rem 1rem; border-radius: 100px; font-size: 12px; font-weight: 800; text-transform: uppercase; margin-bottom: 2rem; }
        .hero-title { font-size: 3.5rem; line-height: 1.1; margin-bottom: 2rem; }
        .hero-desc { font-size: 1.25rem; color: var(--gray); margin-bottom: 3rem; max-width: 500px; }
        .hero-actions { display: flex; gap: 1rem; margin-bottom: 3rem; }
        .btn-lg { padding: 1rem 2.5rem; font-size: 1.1rem; }
        .hero-stats { display: flex; align-items: center; gap: 2rem; padding-top: 2rem; border-top: 1px solid var(--gray-soft); }
        .divider { width: 1px; height: 40px; background: var(--gray-soft); }
        .hero-image-wrapper { position: relative; }
        .image-card { border-radius: 40px; overflow: hidden; box-shadow: 0 30px 60px rgba(0,0,0,0.1); position: relative; }
        .image-card img { width: 100%; height: 500px; object-cover: cover; }
        .image-floating-card { position: absolute; bottom: 2rem; left: 2rem; right: 2rem; background: rgba(255,255,255,0.9); backdrop-filter: blur(10px); padding: 1.5rem; border-radius: 20px; display: flex; justify-content: space-between; align-items: center; }
        .status-label { font-size: 10px; font-weight: 900; color: var(--gray); text-transform: uppercase; margin-bottom: 4px; }
        .item-name { font-size: 1.1rem; font-weight: 800; }
        .item-price { font-size: 1.5rem; font-weight: 900; color: var(--primary); }
        .section-header { text-align: center; margin-bottom: 4rem; }
        .section-header h2 { font-size: 3rem; margin-bottom: 1rem; }
        .features-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem; }
        
        @media (max-width: 768px) {
          .hero-title { font-size: 2.5rem; }
          .hero-actions { flex-direction: column; }
          .image-card img { height: 350px; }
        }
      `}} />
    </div>
  );
};

const FeatureCard = ({ icon, title, desc }) => (
  <div className="card" style={{ textAlign: 'center' }}>
    <div style={{ color: 'var(--primary)', marginBottom: '1.5rem' }}>{icon}</div>
    <h3 style={{ marginBottom: '1rem' }}>{title}</h3>
    <p style={{ color: 'var(--gray)', fontSize: '0.9rem' }}>{desc}</p>
  </div>
);

const Stat = ({ icon, label, sub }) => (
  <div>
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 900, fontSize: '1.2rem' }}>
      <span style={{ color: 'var(--primary)' }}>{icon}</span> {label}
    </div>
    <div style={{ fontSize: '10px', fontWeight: 800, color: 'var(--gray)', textTransform: 'uppercase' }}>{sub}</div>
  </div>
);

export default Home;
