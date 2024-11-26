-- Enable RLS
ALTER TABLE public.qr_tracking ENABLE ROW LEVEL SECURITY;

-- Create policies for anonymous access
CREATE POLICY "Allow anonymous insert"
    ON public.qr_tracking
    FOR INSERT
    TO anon
    WITH CHECK (true);

CREATE POLICY "Allow anonymous select"
    ON public.qr_tracking
    FOR SELECT
    TO anon
    USING (true);

CREATE POLICY "Allow anonymous update"
    ON public.qr_tracking
    FOR UPDATE
    TO anon
    USING (true)
    WITH CHECK (true);

-- Grant necessary permissions to anonymous users
GRANT ALL ON public.qr_tracking TO anon;
GRANT EXECUTE ON FUNCTION public.increment_scans TO anon;
GRANT EXECUTE ON FUNCTION public.update_updated_at_column TO anon;