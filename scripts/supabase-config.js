import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

// TODO: Substitua pelos dados reais do seu projeto Supabase no painel de configurações (Settings -> API)
const supabaseUrl = 'YOUR_SUPABASE_URL';
const supabaseKey = 'YOUR_SUPABASE_ANON_KEY';

export const supabase = createClient(supabaseUrl, supabaseKey);
