import getSupaBaseClient from './supabase-client'

export async function CreateUser(correo, password, firstName, lastName, phone, type_user, userId) {
    try{
        const supabase = getSupaBaseClient("sec");
        if (!correo || !password || !firstName || !lastName || !phone || !type_user || !userId) {
            console.warn("Datos incompletos al crear usuario");
            return null;
        }
        const { data, error } = await supabase
        .from('users')
        .insert([{
            GuID: userId,
            name: firstName,
            last_name: lastName,
            email: correo,
            password: password,
            phone_number: phone,
            user_type_id: type_user
        }]).select('id');
        if (error) {
            console.error("Error al guardar los datos en Supabase:", error.message);
        }
        return data?.[0]?.id;
    }catch(e){
        console.log(e);
        return null;
    }
}

export async function CreateConsumer(userId, birthDate, user_gender) {
    const supabase = getSupaBaseClient("com");
    if (!userId || !birthDate || !user_gender) {
        console.warn("Datos incompletos al crear consumidor");
        return null;
    }
    const { data, error } = await supabase
        .from('consumers')
        .insert([{
            date_of_birth: birthDate,
            gender: user_gender,
            user_id: userId,
        }]).select('id');
    if (error) {
        console.error("Error al guardar los datos en Supabase:", error.message);
    }
    return data?.[0]?.id;
}


export async function GetUserId(email, password) {
    const supabase = getSupaBaseClient("sec");
    const { data, error } = await supabase
        .from('users')
        .select('id')
        .eq('email', email)
        .eq('password', password)
        .single();
    if (error) {
        console.error("Error al obtener el usuario:", error.message);
    }
    return data?.id;
}