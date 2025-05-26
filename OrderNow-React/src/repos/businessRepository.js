import getSupaBaseClient from "../supabase-client";

const supaBaseCom = getSupaBaseClient("com");


export const getAllBusinesses = async () => {
    const { data, error } = await supaBaseCom.from("businesses").select("*");
    if (error) throw new Error("Error fetching businesses");
    return data;
};

export const getAllCategories = async () => {
    const { data, error } = await supaBaseCom.from("category").select("*");
    if (error) throw new Error("Error fetching categories");
    return data;
};

export const getBusinessCategories = async () => {
    const { data, error } = await supaBaseCom.from("business_category").select("*");
    if (error) throw new Error("Error fetching business-category relations");
    return data;
};

export const getBusinessById = async (id) => {
    const { data, error } = await supaBaseCom
        .from("businesses")
        .select("*, rating")
        .eq("id", id)
        .single();

    if (error) throw new Error("Error fetching business");
    return data;
};

export const getTodaySchedule = async (businessId, dayNumber) => {
    const { data, error } = await supaBaseCom
        .from("schedule")
        .select("opening_time, clossing_time")
        .eq("business_id", businessId)
        .eq("day", dayNumber)
        .order("opening_time", { ascending: true });

    if (error) throw new Error("Error fetching schedule");
    return data;
};
