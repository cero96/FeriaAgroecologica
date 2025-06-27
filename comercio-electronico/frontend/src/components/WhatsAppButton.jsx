import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';

const WhatsAppButton = ({ phoneNumber }) => {
  const whatsappLink = `https://wa.me/${phoneNumber}`;

  const styles = {
    container: {
      position: 'fixed',
      bottom: '20px',
      left: '20px',
      zIndex: 1000,
    },
    button: {
      backgroundColor: '#25D366',
      color: 'white',
      borderRadius: '50%',
      width: '60px',
      height: '60px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
      textDecoration: 'none',
    }
  };

  return (
    <div style={styles.container}>
      <a href={whatsappLink} target="_blank" rel="noopener noreferrer" style={styles.button}>
        <FaWhatsapp size={32} />
      </a>
    </div>
  );
};

export default WhatsAppButton;
