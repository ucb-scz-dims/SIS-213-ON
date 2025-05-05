import getSupaBaseClient from './supabase-client'

export async function BussinessId(product_id){
    try{
        const supabase = getSupaBaseClient("com");
        if (!product_id) {
            console.warn("Identificador de producto no reconocido");
            return null;
        }
        const { data, error } = await supabase
        .from('products')
        .select('business_id')
        .eq('id', product_id)
        .single();
        if (error) {
            console.error("Error al recuperar datos del producto de un restaurante en Supabase:", error.message);
        }
        return data?.[0]?.business_id;
    }catch(e){
        console.log(e);
        return null;
    }
}

export async function ProductActive(product_id){
    try{
        const supabase = getSupaBaseClient("com");
        if (!product_id) {
            console.warn("Identificador de producto no reconocido");
            return false;
        }
        const { data, error } = await supabase
        .from('products')
        .select('available')
        .eq('id', product_id)
        .single();
        if (error) {
            console.error("Error al recuperar estado de un producto en Supabase:", error.message);
        }
        return data?.[0]?.available;
    }catch(e){
        console.log(e);
        return false;
    }
}

export async function BussinessActive(business_id){
    try{
        const supabase = getSupaBaseClient("com");
        if (!business_id) {
            console.warn("Identificador de restaurante no reconocido");
            return false;
        }
        const { data, error } = await supabase
        .from('bussinesses')
        .select('isOpen', 'open_time', 'close_time')
        .eq('id', business_id)
        .single();
        if (error) {
            console.error("Error al recuperar datos del restaurante en Supabase:", error.message);
        }
        if(data!= undefined && data?.isOpen == true){
            const currentTime = new Date();
            const openTime = new Date(data?.openTime);
            const closeTime = new Date(data?.closeTime);
            if(currentTime >= openTime && currentTime <= closeTime){
                return true;
            }else{
                return false;
            }
        }
        return false;
    }catch(e){
        console.log(e);
        return false;
    }
}

export async function CreateOrderDetail(order_id, products){
    let correct_creation = true;
    try{
        const supabase = getSupaBaseClient("com");
        if (!order_id || !products) {
            console.warn("Datos no reconocidos para hacer el detalle");
            return !correct_creation;
        }
        products.forEach(async element => {
            const { data, error } = await supabase
            .from('order_details')
            .insert([{
                quantity: element.quantity,
                product_id: element.id,
                order_id: order_id
            }]).select('id');
            if (data?.[0]?.id == undefined) {
                console.error(`Error al guardar el producto ${element.id} en Supabase:`);
                correct_creation = false;
            }
            if (error) {
                console.error("Error al guardar los datos en Supabase:", error.message);
            }
        });
        return correct_creation;
    }catch(e){
        console.log(e);
        return false;
    }
}

export async function CreateOrder(business_id, GuID, address, total_price, metodoPago){
    try{
        const supabase = getSupaBaseClient("com");
        if (!business_id || !consumer_id || !address || !total_price || !metodoPago) {
            console.warn("Datos no reconocidos para hacer el pedido");
            return null;
        }
        const { data, error } = await supabase
        .from('orders')
        .insert([{
            date: new Date(),
            total_price: total_price,
            address: address,
            business_id: business_id,
            consumer_id: await GetUserId(GuID),
            state_type_id: 1
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


export async function GetUserId(GuID) {
    const supabase = getSupaBaseClient("sec");
    const { data, error } = await supabase
        .from('users')
        .select('id')
        .eq('GuID', GuID)
        .single();
    if (error) {
        console.error("Error al obtener el usuario:", error.message);
    }
    return data?.id;
}