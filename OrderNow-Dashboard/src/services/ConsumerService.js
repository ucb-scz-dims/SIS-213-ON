import getSupaBaseClient from "../supabase/supabase-client";

const ConsumerService = {
    supabaseClient: getSupaBaseClient(),

    async getConsumers() {
        const { data, error } = await this.supabaseClient
            .schema("com")
            .from("consumers").select(`
                id,
                user_id
            `);


        if(error)
            throw new Error(error.message);


        return data;
    }
};


export default ConsumerService;