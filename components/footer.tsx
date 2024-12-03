import React from 'react';

const Footer = () => {
  return (
    <footer className="text-center py-4 text-sm text-muted-foreground">
        Desarrollado por
        <a
          href="https://puer.to"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium underline hover:text-foreground transition-colors"
        >
          Agencia Puerto
        </a>
      </footer>
  );
};

export default Footer;