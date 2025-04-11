import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supaBaseClients = {}

export function getSupaBaseClient(schema = "api") {
    if (!supaBaseClients[schema]) {
        supaBaseClients[schema] = createClient(supabaseUrl, supabaseKey, { db: { schema } })
    }

    return supaBaseClients[schema]
}


export default getSupaBaseClient;