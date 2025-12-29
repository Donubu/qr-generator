-- Crear la base de datos (opcional, ejecutar como admin)
-- CREATE DATABASE qr_generator;
-- USE qr_generator;

-- Tabla para tracking de códigos QR
CREATE TABLE IF NOT EXISTS qr_tracking (
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(255) DEFAULT '',
    original_url TEXT NOT NULL,
    user_email VARCHAR(255) NOT NULL,
    qr_type VARCHAR(50) DEFAULT 'url',
    scans INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_user_email (user_email),
    INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
