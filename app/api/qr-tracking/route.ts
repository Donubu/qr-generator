import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import { RowDataPacket, ResultSetHeader } from 'mysql2';
import crypto from 'crypto';

interface QRTrackingRow extends RowDataPacket {
  id: string;
  name: string;
  original_url: string;
  user_email: string;
  qr_type: string;
  scans: number;
  created_at: Date;
}

// GET - Obtener todos los QR codes
export async function GET() {
  try {
    const [rows] = await pool.query<QRTrackingRow[]>(
      'SELECT * FROM qr_tracking ORDER BY created_at DESC'
    );

    return NextResponse.json(rows);
  } catch (error) {
    console.error('Error fetching QR codes:', error);
    return NextResponse.json(
      { error: 'Error al obtener los códigos QR' },
      { status: 500 }
    );
  }
}

// POST - Crear un nuevo QR tracking
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, original_url, user_email, qr_type } = body;

    if (!original_url || !user_email) {
      return NextResponse.json(
        { error: 'URL y email son requeridos' },
        { status: 400 }
      );
    }

    const id = crypto.randomUUID();

    const [result] = await pool.query<ResultSetHeader>(
      `INSERT INTO qr_tracking (id, name, original_url, user_email, qr_type, scans, created_at)
       VALUES (?, ?, ?, ?, ?, 0, NOW())`,
      [id, name || '', original_url, user_email, qr_type || 'url']
    );

    if (result.affectedRows === 1) {
      return NextResponse.json({ id, name, original_url, user_email, qr_type });
    }

    return NextResponse.json(
      { error: 'Error al crear el registro' },
      { status: 500 }
    );
  } catch (error) {
    console.error('Error creating QR tracking:', error);
    return NextResponse.json(
      { error: 'Error al crear el seguimiento QR' },
      { status: 500 }
    );
  }
}
