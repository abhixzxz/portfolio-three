export const footerStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Roboto:wght@400;500&display=swap');
  
  * {
    box-sizing: border-box;
  }
  
  @keyframes slideInUp {
    from { opacity: 0; transform: translateY(40px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  .footer-section { 
    animation: slideInUp 0.8s ease-out; 
  }
  
  .footer-bottom { 
    animation: fadeIn 1s ease-out 0.3s both; 
  }
  
  .footer-link { 
    transition: color 0.3s, transform 0.3s; 
  }
  
  .footer-link:hover { 
    color: #ffffff; 
  }
  
  .footer-icon { 
    transition: all 0.3s; 
  }
  
  .footer-link:hover .footer-icon { 
    opacity: 1; 
    transform: translateX(4px); 
  }
  
  @media (max-width: 768px) {
    .footer-section {
      grid-template-columns: 1fr !important;
      gap: 32px !important;
    }
    
    .footer-bottom {
      flex-direction: column !important;
      text-align: center;
    }
    
    .footer-bottom > div:last-child {
      order: -1;
    }
  }
  
  @media (max-width: 480px) {
    .footer-section {
      gap: 24px !important;
    }
  }
`;

export const footerContainerStyle = {
  position: "relative" as const,
  width: "100%",
  textColor: "white",
  overflow: "hidden",
  background: "linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)",
  minHeight: "clamp(450px, 100vw, 600px)",
  padding: "clamp(40px, 8vw, 80px) clamp(16px, 5vw, 48px)",
  display: "flex",
  flexDirection: "column" as const,
  justifyContent: "space-between",
};

export const contentOverlayStyle = {
  position: "relative" as const,
  zIndex: 10,
  maxWidth: "100%",
  width: "100%",
  margin: "0 auto",
  display: "flex",
  flexDirection: "column" as const,
  justifyContent: "space-between",
  flexGrow: 1,
};

export const mainGridStyle = {
  display: "grid",
  gridTemplateColumns:
    "repeat(auto-fit, minmax(clamp(200px, 25%, 280px), 1fr))",
  gap: "clamp(24px, 4vw, 48px)",
  width: "100%",
};

export const footerBottomStyle = {
  fontSize: "clamp(10px, 2vw, 12px)",
  color: "#737373",
};
