import getSupaBaseClient from "../supabase/supabase-client";
import TimeService from "./TimeService";

export const BusinessService = {
    supabaseClient: getSupaBaseClient(),

    async getAllBusiness() {
        const { error, data } = await this.supabaseClient
            .schema('com')
            .from('businesses')
            .select()

        if(error)
            throw new Error(error);

        return data;
    },

    isOpen(business) {
        const openTime = TimeService.convertToTime(business.open_time);
        const closetime = TimeService.convertToTime(business.close_time);

        const openTimeDate = new Date().setHours(openTime.hours, openTime.minutes, openTime.seconds);
        const closeTimeDate = new Date().setHours(closetime.hours, closetime.minutes, closetime.seconds);
        const nowDate = Date.now;

        return (openTimeDate <= nowDate && nowDate <= closeTimeDate && business.is_open);
    }
};

