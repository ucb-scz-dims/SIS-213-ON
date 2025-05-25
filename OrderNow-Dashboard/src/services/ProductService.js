import { getSupaBaseClient } from '../supabase/supabase-client'

const ProductService = {
    supabaseClient: getSupaBaseClient(),
    
    async getProductsByBusiness(businessId) {
        const { error, data } = await this.supabaseClient
            .schema('com')
            .from('products')
            .select(`
                id,
                name,
                description,
                price,
                available    
            `)
            .eq('business_id', businessId)

        if(error)
            throw new Error(error.message);

        return data;
    }
};


export default ProductService;