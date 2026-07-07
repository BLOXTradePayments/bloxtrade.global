import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const supabaseUrl = 'https://fqynjmlsuuvwzakcwijq.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZxeW5qbWxzdXV2d3pha2N3aWpxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk5ODEzMTksImV4cCI6MjA5NTU1NzMxOX0.xX3SUQqyu9mLCEVCoKNZyam8QOCimogGVwWchE4nYCA';

let supabaseClient = null;

if (supabaseUrl && supabaseUrl !== 'YOUR_SUPABASE_URL' && supabaseUrl.startsWith('http')) {
  try {
    supabaseClient = createClient(supabaseUrl, supabaseKey);
  } catch (error) {
    console.error('Erro ao inicializar o cliente Supabase:', error);
  }
} else {
  console.warn('Supabase não configurado ou credenciais inválidas. O banco de dados de artigos não estará disponível.');
}

export const supabase = supabaseClient;
