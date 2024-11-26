import { redirect } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default async function RedirectPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const { id, url } = searchParams;

  if (!id || !url) {
    redirect('/');
  }

  try {
    const { error } = await supabase
      .rpc('increment_scans', { 
        row_id: id 
      });

    if (error) {
      console.error('Error updating scan count:', error);
    }
  } catch (error) {
    console.error('Error updating scan count:', error);
  }

  redirect(decodeURIComponent(url));
}