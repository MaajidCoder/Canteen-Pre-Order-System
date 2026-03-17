import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { LogIn, Mail, Lock, AlertCircle, ArrowRight } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="container py-20 reveal flex justify-center items-center" style={{ minHeight: '80vh' }}>
      <div className="card auth-card shadow-2xl overflow-hidden">
        {/* Top Accent Bar */}
        <div className="accent-bar bg-primary"></div>

        <div className="text-center mb-10 pt-4">
          <div className="auth-icon-wrapper bg-indigo-50 text-primary">
            <LogIn size={36} />
          </div>
          <h1 className="text-4xl font-black mb-2">Welcome Back</h1>
          <p className="text-gray font-bold">Log in to your CanteenHub account</p>
        </div>

        {error && (
          <div className="error-box">
            <AlertCircle size={20} />
            <span className="text-sm font-bold">{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="form-group">
            <label className="input-label">Student Email</label>
            <div className="input-wrapper">
              <Mail className="input-icon" size={20} />
              <input 
                type="email" 
                placeholder="email@college.edu" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
                className="input-control"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <div className="flex justify-between items-center mb-2">
               <label className="input-label mb-0">Password</label>
               <a href="#" className="forgot-link">Forgot?</a>
            </div>
            <div className="input-wrapper">
              <Lock className="input-icon" size={20} />
              <input 
                type="password" 
                placeholder="••••••••" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
                className="input-control"
                required
              />
            </div>
          </div>

          <button type="submit" className="btn btn-primary w-full py-4 text-lg">
            Sign In
            <ArrowRight size={20} />
          </button>
        </form>

        <div className="footer-link-box">
            <p className="text-gray font-bold text-center">
                New to CanteenHub? <Link to="/register" className="text-primary font-black ml-1" style={{ textDecoration: 'none' }}>Create Account</Link>
            </p>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .auth-card {
          width: 100%;
          max-width: 480px;
          background: white;
          border-radius: 24px;
          padding: 3rem 2.5rem;
          position: relative;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15);
        }
        .accent-bar {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 8px;
        }
        .auth-icon-wrapper {
          width: 80px;
          height: 80px;
          border-radius: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1.5rem;
        }
        .error-box {
          background: #FEF2F2;
          border: 1px solid #FEE2E2;
          color: #DC2626;
          padding: 1rem;
          border-radius: 16px;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 2rem;
        }
        .form-group { margin-bottom: 1.5rem; }
        .input-label { display: block; font-size: 12px; font-weight: 800; text-transform: uppercase; color: var(--gray); margin-bottom: 0.5rem; letter-spacing: 0.05em; }
        .input-wrapper { position: relative; }
        .input-icon { position: absolute; left: 1rem; top: 50%; transform: translateY(-50%); color: var(--gray); transition: color 0.3s; pointer-events: none; }
        .input-control {
          width: 100%;
          padding: 1rem 1rem 1rem 3.5rem;
          background: var(--gray-soft);
          border: 2px solid transparent;
          border-radius: 12px;
          font-size: 1rem;
          outline: none;
          transition: all 0.3s;
        }
        .input-control:focus {
          border-color: var(--primary);
          background: white;
          box-shadow: 0 0 0 4px var(--primary-glow);
        }
        .input-wrapper:focus-within .input-icon { color: var(--primary); }
        .forgot-link { color: var(--primary); font-size: 12px; font-weight: 800; text-decoration: none; }
        .footer-link-box { margin-top: 2rem; padding-top: 2rem; border-top: 1px solid var(--gray-soft); }
      `}} />
    </div>
  );
};

export default Login;
