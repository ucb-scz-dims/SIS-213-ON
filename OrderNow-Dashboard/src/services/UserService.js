import getSupaBaseClient from "../supabase/supabase-client";

const UserService = {
    supabaseClient: getSupaBaseClient(),

    async getUsers() {
        const { data, error } = await this.supabaseClient
            .schema("sec")
            .from("users").select(`
                id,
                name,
                last_name
            `);


        if(error)
            throw new Error(error.message);

        return data;
    }
};

export default UserService;