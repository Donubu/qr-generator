-- Create the QR tracking table
CREATE TABLE public.qr_tracking (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    original_url TEXT NOT NULL,
    scans INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create function to increment scans
CREATE OR REPLACE FUNCTION public.increment_scans(row_id TEXT)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    UPDATE public.qr_tracking
    SET scans = COALESCE(scans, 0) + 1,
        updated_at = timezone('utc'::text, now())
    WHERE id::TEXT = row_id;
END;
$$;

-- Create trigger to update updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_qr_tracking_updated_at
    BEFORE UPDATE ON public.qr_tracking
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();