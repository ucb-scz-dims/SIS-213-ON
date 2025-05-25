import getSupaBaseClient from "../supabase/supabase-client";

const OrderService = {
    supabaseClient: getSupaBaseClient(),

    async getOrders() {
        const { data, error } = await this.supabaseClient
            .schema("com")
            .from("orders").select(`
                id,
                date,
                address,
                total_price,
                consumer_id,
                state_type_id,
                state_types ( name )
            `);


        if(error)
            throw new Error(error.message);


        return data;
    },


    async updateOrder(orderId, newStateTypeId) {
        const { error } = await this.supabaseClient
            .schema("com")
            .from("orders")
            .update({ state_type_id: newStateTypeId })
            .eq("id", orderId);

        if(error)
            throw new Error(error.message);
    }
};


export default OrderService;