// src/lib/supabaseClient.ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://hdscxhiahehlrqdvcyez.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhkc2N4aGlhaGVobHJxZHZjeWV6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA3Njc5OTUsImV4cCI6MjA2NjM0Mzk5NX0.7m93M-5K46ZH4vcszHy9qMnMmdonAL9dpGWC1IDeTLE';


export const supabase = createClient(supabaseUrl, supabaseAnonKey)
