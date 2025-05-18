import getSupaBaseClient from "../supabase/supabase-client";
import TimeService from "./TimeService";
import DAY_OF_WEEK from "../config/days-of-week";

export const BusinessService = {
    supabaseClient: getSupaBaseClient(),

    async getAllBusiness() {
        const { error, data } = await this.supabaseClient
            .schema('com')
            .from('businesses')
            .select(`
                id,
                name,
                description,
                open_time,
                close_time,
                address,
                is_open,
                schedule (
                    day,
                    opening_time,
                    clossing_time
                )
            `);

        if(error)
            throw new Error(error);

        this.ApplySortBusinessesSchedule(data);

        return data;
    },

    isOpen(business) {
        const nowDate = new Date();
        const day = nowDate.getDay();

        for(let time of business.sortedSchedules[day]) {
            const openingTime = TimeService.convertToTime(time.opening_time);
            const clossingTime = TimeService.convertToTime(time.clossing_time);
            
            const openingDate = new Date().setHours(openingTime.hours, openingTime.minutes, openingTime.seconds);
            const clossingDate = new Date().setHours(clossingTime.hours, clossingTime.minutes, clossingTime.seconds);

            if(openingDate <= nowDate.getTime() && nowDate.getTime() < clossingDate && business.is_open)
                return true;
        }

        return false;
    },


    ApplySortBusinessesSchedule(businesses) {
        for(let business of businesses) {
            let sortedSchedules = {
               [DAY_OF_WEEK.SUNDAY]: [],
               [DAY_OF_WEEK.MONDAY]: [],
               [DAY_OF_WEEK.TUESDAY]: [],
               [DAY_OF_WEEK.WEDNESDAY]: [],
               [DAY_OF_WEEK.THURSDAY]: [],
               [DAY_OF_WEEK.FRIDAY]: [],
               [DAY_OF_WEEK.SATURDAY]: []
            };

            for(let time of business.schedule) {
                sortedSchedules[(time.day % 7)].push({
                    opening_time: time.opening_time,
                    clossing_time: time.clossing_time
                });
            }

            business.sortedSchedules = sortedSchedules;
        }
    },


    async createBusiness(newBusiness) {
        
        const { error } = await this.supabaseClient
            .schema('com')
            .from('businesses')
            .insert({
            name: newBusiness.name,
            address: newBusiness.address,
            description: newBusiness.description,
            is_open: true,
            user_id: 1,
            });

        if(error)
            throw new Error(error.message);
    },

    async updateBusiness(business, id) {
        const { error } = await this.supabaseClient
            .schema('com')
            .from('businesses')
            .update({
                name: business.name,
                description: business.description,
                address: business.address,
            })
            .eq('id', id);
    },


    async getBusinessById(businessId) {
        const { error, data } = await this.supabaseClient
            .schema('com')
            .from('businesses')
            .select(`
                id,
                name,
                description,
                address
            `)
            .eq('id', businessId)
            .single()

        debugger;
        if(error)
            throw new Error(error.message);


        return data;
    }
};

