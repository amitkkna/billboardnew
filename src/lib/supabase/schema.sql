-- Create tables for the billboard advertising platform

-- Users table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  company_name TEXT,
  contact_name TEXT,
  contact_email TEXT,
  contact_phone TEXT,
  address TEXT,
  city TEXT,
  state TEXT,
  zip_code TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Billboards table
CREATE TABLE IF NOT EXISTS public.billboards (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  title TEXT NOT NULL,
  type TEXT NOT NULL,
  location TEXT NOT NULL,
  address TEXT,
  city TEXT,
  state TEXT,
  zip_code TEXT,
  width TEXT,
  height TEXT,
  size TEXT GENERATED ALWAYS AS (width || ' x ' || height) STORED,
  price DECIMAL(10, 2) NOT NULL,
  description TEXT,
  features TEXT[] DEFAULT '{}',
  material TEXT,
  angle TEXT,
  illumination TEXT,
  status TEXT DEFAULT 'Active',
  views INTEGER DEFAULT 0,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Inquiries table
CREATE TABLE IF NOT EXISTS public.inquiries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  billboard_id UUID REFERENCES public.billboards(id) NOT NULL,
  client_name TEXT NOT NULL,
  client_email TEXT NOT NULL,
  client_phone TEXT,
  client_company TEXT,
  message TEXT NOT NULL,
  start_date DATE,
  duration INTEGER,
  status TEXT DEFAULT 'New',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Bookings table
CREATE TABLE IF NOT EXISTS public.bookings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  billboard_id UUID REFERENCES public.billboards(id) NOT NULL,
  client_id UUID REFERENCES auth.users(id),
  client_name TEXT NOT NULL,
  client_email TEXT NOT NULL,
  client_phone TEXT,
  client_company TEXT,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  duration INTEGER GENERATED ALWAYS AS (
    EXTRACT(MONTH FROM AGE(end_date, start_date)) + 
    CASE WHEN EXTRACT(DAY FROM AGE(end_date, start_date)) > 0 THEN 1 ELSE 0 END
  ) STORED,
  total_amount DECIMAL(10, 2) NOT NULL,
  status TEXT DEFAULT 'Pending',
  payment_status TEXT DEFAULT 'Unpaid',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Analytics table for tracking views and interactions
CREATE TABLE IF NOT EXISTS public.analytics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  billboard_id UUID REFERENCES public.billboards(id) NOT NULL,
  view_count INTEGER DEFAULT 0,
  inquiry_count INTEGER DEFAULT 0,
  booking_count INTEGER DEFAULT 0,
  revenue DECIMAL(10, 2) DEFAULT 0,
  date DATE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(billboard_id, date)
);

-- Create functions and triggers for real-time analytics

-- Function to update billboard views
CREATE OR REPLACE FUNCTION increment_billboard_views()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE public.billboards
  SET views = views + 1
  WHERE id = NEW.billboard_id;
  
  -- Update or insert analytics record
  INSERT INTO public.analytics (billboard_id, view_count, date)
  VALUES (NEW.billboard_id, 1, CURRENT_DATE)
  ON CONFLICT (billboard_id, date)
  DO UPDATE SET view_count = public.analytics.view_count + 1;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Function to update inquiry analytics
CREATE OR REPLACE FUNCTION update_inquiry_analytics()
RETURNS TRIGGER AS $$
BEGIN
  -- Update or insert analytics record
  INSERT INTO public.analytics (billboard_id, inquiry_count, date)
  VALUES (NEW.billboard_id, 1, CURRENT_DATE)
  ON CONFLICT (billboard_id, date)
  DO UPDATE SET inquiry_count = public.analytics.inquiry_count + 1;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Function to update booking analytics
CREATE OR REPLACE FUNCTION update_booking_analytics()
RETURNS TRIGGER AS $$
BEGIN
  -- Update or insert analytics record
  INSERT INTO public.analytics (billboard_id, booking_count, revenue, date)
  VALUES (NEW.billboard_id, 1, NEW.total_amount, CURRENT_DATE)
  ON CONFLICT (billboard_id, date)
  DO UPDATE SET 
    booking_count = public.analytics.booking_count + 1,
    revenue = public.analytics.revenue + NEW.total_amount;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers
CREATE TRIGGER after_billboard_view
AFTER INSERT ON public.billboard_views
FOR EACH ROW EXECUTE FUNCTION increment_billboard_views();

CREATE TRIGGER after_inquiry_insert
AFTER INSERT ON public.inquiries
FOR EACH ROW EXECUTE FUNCTION update_inquiry_analytics();

CREATE TRIGGER after_booking_insert
AFTER INSERT ON public.bookings
FOR EACH ROW EXECUTE FUNCTION update_booking_analytics();

-- Create RLS policies
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.billboards ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analytics ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view their own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- Billboard policies
CREATE POLICY "Billboards are viewable by everyone"
  ON public.billboards FOR SELECT
  USING (true);

CREATE POLICY "Users can insert their own billboards"
  ON public.billboards FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own billboards"
  ON public.billboards FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own billboards"
  ON public.billboards FOR DELETE
  USING (auth.uid() = user_id);

-- Inquiry policies
CREATE POLICY "Users can view inquiries for their billboards"
  ON public.inquiries FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM public.billboards
    WHERE billboards.id = inquiries.billboard_id
    AND billboards.user_id = auth.uid()
  ));

CREATE POLICY "Anyone can create inquiries"
  ON public.inquiries FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Users can update inquiries for their billboards"
  ON public.inquiries FOR UPDATE
  USING (EXISTS (
    SELECT 1 FROM public.billboards
    WHERE billboards.id = inquiries.billboard_id
    AND billboards.user_id = auth.uid()
  ));

-- Booking policies
CREATE POLICY "Users can view bookings for their billboards"
  ON public.bookings FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM public.billboards
    WHERE billboards.id = bookings.billboard_id
    AND billboards.user_id = auth.uid()
  ));

CREATE POLICY "Users can create bookings for their billboards"
  ON public.bookings FOR INSERT
  WITH CHECK (EXISTS (
    SELECT 1 FROM public.billboards
    WHERE billboards.id = bookings.billboard_id
    AND billboards.user_id = auth.uid()
  ));

CREATE POLICY "Users can update bookings for their billboards"
  ON public.bookings FOR UPDATE
  USING (EXISTS (
    SELECT 1 FROM public.billboards
    WHERE billboards.id = bookings.billboard_id
    AND billboards.user_id = auth.uid()
  ));

-- Analytics policies
CREATE POLICY "Users can view analytics for their billboards"
  ON public.analytics FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM public.billboards
    WHERE billboards.id = analytics.billboard_id
    AND billboards.user_id = auth.uid()
  ));
