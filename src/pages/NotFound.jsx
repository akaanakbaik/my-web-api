import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <>
      <style>{`
        .notfound-wrapper {
            font-family: 'Arial Black', 'Helvetica Neue', sans-serif;
            background: #f0f0f0;
            color: #000;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            z-index: 9999;
        }
        .nf-container {
            max-width: 1200px;
            width: 100%;
            position: relative;
            z-index: 2;
            padding: 20px;
        }
        .nf-error-content {
            background: #fff;
            border: 8px solid #000;
            box-shadow: 15px 15px 0 #000;
            padding: 60px 40px;
            position: relative;
            transform: rotate(-1deg);
            transition: transform 0.3s ease;
            text-align: center;
        }
        .nf-error-content:hover {
            transform: rotate(0deg);
        }
        .nf-error-code {
            font-size: clamp(100px, 15vw, 180px);
            font-weight: 900;
            line-height: 0.8;
            letter-spacing: -5px;
            color: #000;
            position: relative;
            display: inline-block;
            margin-bottom: 20px;
        }
        .nf-error-code::after {
            content: '404';
            position: absolute;
            top: 5px;
            left: 5px;
            color: #ff00ff;
            z-index: -1;
        }
        .nf-error-message {
            font-size: clamp(24px, 4vw, 36px);
            font-weight: 800;
            margin-bottom: 20px;
            text-transform: uppercase;
            line-height: 1.2;
        }
        .nf-error-description {
            font-size: clamp(16px, 2.5vw, 20px);
            margin-bottom: 40px;
            font-weight: 600;
            max-width: 600px;
            margin-left: auto;
            margin-right: auto;
            line-height: 1.5;
        }
        .nf-home-button {
            display: inline-block;
            background: #0000ff;
            color: #fff;
            border: 4px solid #000;
            padding: 15px 40px;
            font-size: 18px;
            font-weight: 800;
            text-decoration: none;
            text-transform: uppercase;
            box-shadow: 8px 8px 0 #000;
            transition: all 0.2s ease;
            cursor: pointer;
        }
        .nf-home-button:hover {
            transform: translate(4px, 4px);
            box-shadow: 4px 4px 0 #000;
            background: #ff00ff;
        }
        .nf-geometric-shapes {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 1;
        }
        .nf-shape {
            position: absolute;
            border: 4px solid #000;
            background: #ffff00;
        }
        .nf-shape-1 {
            width: 80px;
            height: 80px;
            top: 10%;
            right: 10%;
            transform: rotate(45deg);
            animation: float 4s ease-in-out infinite;
        }
        .nf-shape-2 {
            width: 120px;
            height: 40px;
            bottom: 15%;
            left: 5%;
            background: #ff0000;
            animation: float 5s ease-in-out infinite reverse;
        }
        .nf-shape-3 {
            width: 60px;
            height: 60px;
            top: 50%;
            right: 5%;
            background: #00ff00;
            border-radius: 50%;
            animation: float 3s ease-in-out infinite;
        }
        .nf-grid-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-image: 
                repeating-linear-gradient(0deg, transparent, transparent 20px, #ddd 20px, #ddd 21px),
                repeating-linear-gradient(90deg, transparent, transparent 20px, #ddd 20px, #ddd 21px);
            opacity: 0.3;
            z-index: 0;
        }
        @keyframes float {
            0%, 100% { transform: translateY(0) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(180deg); }
        }
      `}</style>

      <div className="notfound-wrapper">
        <div className="nf-grid-overlay"></div>
        <div className="nf-geometric-shapes">
            <div className="nf-shape nf-shape-1"></div>
            <div className="nf-shape nf-shape-2"></div>
            <div className="nf-shape nf-shape-3"></div>
        </div>
        <div className="nf-container">
            <div className="nf-error-content">
                <div className="nf-error-code">404</div>
                <h1 className="nf-error-message">HALAMAN HILANG!</h1>
                <p className="nf-error-description">
                    Sepertinya halaman yang Anda cari telah terhapus, dipindahkan, atau tidak pernah ada. Jangan khawatir, ini bukan kesalahan Anda!
                </p>
                <Link to="/" className="nf-home-button">KEMBALI KE BERANDA</Link>
            </div>
        </div>
      </div>
    </>
  );
};

export default NotFound;
