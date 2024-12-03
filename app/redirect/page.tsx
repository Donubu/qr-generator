import {redirect} from 'next/navigation';
import {supabase} from '@/lib/supabase';

export const dynamic = 'force-dynamic';

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
        const {error} = await supabase
            .rpc('increment_scans', {
                row_id: id
            });

        if (error) {
            console.error('Error updating scan count:', error);
        }
    } catch (error) {
        console.error('Error updating scan count:', error);
    }

    const {data, error} = await supabase
        .from("qr_tracking")
        .select("original_url")
        .eq('id', id)
        .order("created_at", {ascending: false});

    if (error || data.length < 1) {
        redirect(decodeURIComponent(url));
    }

    const {original_url} = data[0];
    redirect(decodeURIComponent(original_url));
}