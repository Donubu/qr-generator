import {redirect} from 'next/navigation';
import pool from '@/lib/db';
import { RowDataPacket } from 'mysql2';

export const dynamic = 'force-dynamic';

interface QRRow extends RowDataPacket {
    original_url: string;
}

export default async function RedirectPage({
    searchParams,
}: {
    searchParams: { [key: string]: string | undefined };
}) {
    const {id, url} = searchParams;

    if (!id || !url) {
        redirect('/');
    }

    try {
        // Incrementar escaneos
        await pool.query(
            'UPDATE qr_tracking SET scans = scans + 1 WHERE id = ?',
            [id]
        );
    } catch (error) {
        console.error('Error updating scan count:', error);
    }

    try {
        const [rows] = await pool.query<QRRow[]>(
            'SELECT original_url FROM qr_tracking WHERE id = ?',
            [id]
        );

        if (rows.length > 0) {
            redirect(decodeURIComponent(rows[0].original_url));
        }
    } catch (error) {
        console.error('Error fetching QR:', error);
    }

    redirect(decodeURIComponent(url));
}