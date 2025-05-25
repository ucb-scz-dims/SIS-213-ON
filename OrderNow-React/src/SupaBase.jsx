import getSupaBaseClient from './supabase-client'

async function CreateData(schema, table, columns_names, columns_values, column_return="ninguno") {
    try{
        const supabase = getSupaBaseClient(schema);
        if (!schema || !table || !columns_names || !columns_values || !column_return) {
            console.warn("Datos incompletos al crear fila");
            return null;
        }
        if (columns_names.length !== columns_values.length) {
            console.warn("Los nombres y valores de columnas no coinciden en cantidad");
            return null;
        }
        let body = {};
        let process_state = true;
        columns_names.forEach((name, index) => {
            body[name] = columns_values[index];
        });
        const { data, error } = await supabase
            .from(table)
            .insert([
                body
            ]).select();
        if (error) {
            console.error("Error al guardar los datos en Supabase:", error);
            process_state = false;
        }
        console.log(data);
        return column_return!="ninguno"? data?.[0]?.[column_return] : process_state;
    }
    catch(e){
        console.log(e);
        return null;
    }
}

async function GetDataValue(schema, table, reference_column, reference_value, column_name="ninguno") {
    try{
        if (!schema || !table || !column_name || !reference_column || !reference_value) {
            console.warn("Datos incompletos al obtener el atributo");
            return null;
        }
        const supabase = getSupaBaseClient(schema);
        const {data, error} = await supabase
            .from(table)
            .eq(reference_column, reference_value)
            .select();
        if (error) {
            console.error("Error al obtener el atributo:", error.message);
        }
        return column_name!="ninguno"? data?.[0]?.[column_name] : data?.[0];
    }
    catch(e){
        console.log("error en el metodo get sb: ", e);
        return null;
    }
}

async function GetUserId(GuID) {
    try{
        return await GetDataValue("sec","users","GuID",GuID,"id");
    }catch(e){
        console.log(e);
        return null;
    }
}

export async function BussinessId(product_id){
    try{
        return await GetDataValue("com","products","id",product_id,"business_id");
    }catch(e){
        console.log(e);
        return null;
    }
}

export async function ProductActive(product_id){
    try{
        return await GetDataValue("com","products","id",product_id,"available");
    }catch(e){
        console.log(e);
        return false;
    }
}

export async function BussinessActive(business_id){
    try{
        const data = await GetDataValue("com","bussinesses","id",business_id);
        if(data!= undefined && data?.isOpen == true){
            const currentTime = new Date();
            const openTime = new Date(data?.openTime);
            const closeTime = new Date(data?.closeTime);
            if(currentTime >= openTime && currentTime <= closeTime){
                return true;
            }
        }
        return false;
    }catch(e){
        console.log(e);
        return false;
    }
}

export async function CreateOrder(business_id, GuID, address, total_price, metodoPago){
    try{
        const columns = ["date", "total_price", "address", "business_id", "consumer_id", "state_type_id"];
        const values = [new Date(), total_price, address, business_id, await GetUserId(GuID), 1];
        return await CreateData("com", "orders",columns,values,"id");
    }catch(e){
        console.log(e);
        return null;
    }
}

export async function CreateOrderDetail(order_id, products){
    let process_state = true;
    try{
        products.forEach(async element => {
            const columns = ["quantity", "product_id", "order_id"];
            let values = [element.quantity, element.id, order_id];
            let data = await CreateData("com", "order_details",columns,values);
            if (!data) {
                console.error(`Error al guardar el producto ${element.id} en Supabase:`);
                process_state = false;
            }
        });
        return process_state;
    }catch(e){
        console.log(e);
        return false;
    }
}

export async function CreateUser(correo, password, firstName, lastName, phone, type_user, userId) {
    try{
        if (!correo || !password || !firstName || !lastName || !phone || !type_user || !userId) {
            console.warn("Datos incompletos al crear usuario");
            return null;
        }
        const columns = ["GuID", "name", "last_name", "email", "password", "phone_number", "user_type_id"];
        const values = [userId, firstName, lastName, correo, password, phone, type_user];
        return await CreateData("sec", "users",columns,values,"id");
    }catch(e){
        console.log(e);
        return null;
    }
}

export async function CreateConsumer(userId, birthDate, user_gender) {
    try{
        if (!userId || !birthDate || !user_gender) {
            console.warn("Datos incompletos al crear consumidor");
            return null;
        }
        const columns = ["date_of_birth", "gender", "user_id"];
        const values = [birthDate, user_gender, userId];
        return await CreateData("com", "consumers",columns,values);
    }catch(e){
        console.log(e);
        return null;
    }
}
