import	{ createClient } from '@supabase/supabase-js'


export const supabase = createClient('https://kvanlyhvlmnbkflyyqvi.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt2YW5seWh2bG1uYmtmbHl5cXZpIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjY4Mzk2NDksImV4cCI6MTk4MjQxNTY0OX0.MLcvKjo-6bdIxUXjGDR7Ptu9QYYE_2I4jfLs0aDcrF8')