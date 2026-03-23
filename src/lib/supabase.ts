import { createClient } from '@supabase/supabase-js';


// Initialize database client
const supabaseUrl = 'https://oljnookkpizuefnqzqto.databasepad.com';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjY4YmU1ZTFjLTRkZDEtNDY5Zi1hMDgyLWMyMWRjZjE1OWYyMyJ9.eyJwcm9qZWN0SWQiOiJvbGpub29ra3BpenVlZm5xenF0byIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNzc0MDEzNTEzLCJleHAiOjIwODkzNzM1MTMsImlzcyI6ImZhbW91cy5kYXRhYmFzZXBhZCIsImF1ZCI6ImZhbW91cy5jbGllbnRzIn0.GywRa2Rg_cOLJZ80ayBm373aU79pf3jYPXmJ5lJzof4';
const supabase = createClient(supabaseUrl, supabaseKey);


export { supabase };