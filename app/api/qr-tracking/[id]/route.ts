import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import { RowDataPacket, ResultSetHeader } from 'mysql2';

interface QRTrackingRow extends RowDataPacket {
  id: string;
  name: string;
  original_url: string;
  user_email: string;
  qr_type: string;
  scans: number;
  created_at: Date;
}

// GET - Obtener un QR específico
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const [rows] = await pool.query<QRTrackingRow[]>(
      'SELECT * FROM qr_tracking WHERE id = ?',
      [params.id]
    );

    if (rows.length === 0) {
      return NextResponse.json(
        { error: 'QR no encontrado' },
        { status: 404 }
      );
    }

    return NextResponse.json(rows[0]);
  } catch (error) {
    console.error('Error fetching QR:', error);
    return NextResponse.json(
      { error: 'Error al obtener el código QR' },
      { status: 500 }
    );
  }
}

// PATCH - Incrementar escaneos
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const [result] = await pool.query<ResultSetHeader>(
      'UPDATE qr_tracking SET scans = scans + 1 WHERE id = ?',
      [params.id]
    );

    if (result.affectedRows === 0) {
      return NextResponse.json(
        { error: 'QR no encontrado' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error incrementing scans:', error);
    return NextResponse.json(
      { error: 'Error al actualizar escaneos' },
      { status: 500 }
    );
  }
}
