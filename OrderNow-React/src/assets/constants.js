export const COLORS = {
    primary: "#007bff",
    secondary: "#6c757d",
    success: "#28a745",
    danger: "#dc3545",
    warning: "#ffc107",
    info: "#17a2b8",
    light: "#f8f9fa",
    dark: "#343a40",
    white: "#ffffff",
    black: "#000000",
    gray: "#6c757d",
    red: "#dc3545",
    green: "#28a745",
}


export const ICONS = {
    cart: "🛒",
    check: "✅",
    warning: "⚠️",
    error: "❌",
    success: "🎉",
    info: "ℹ️",
    close: "X",
    edit: "✏️",
    delete: "🗑️",
    add: "➕",
    remove: "➖",
    search: "🔍",
    filter: "🔧",
    sort: "🔽",
}

export const MESSAGES = {
    pedido_exitoso: "Tu pedido se ha realizado con éxito",
    no_user: "usuario no registrado",
    no_card: "carrito vacío",
    no_bussiness: "restaurante no disponible",
    product_different: (product_name)=>{`producto "${product_name}" no pertenece al mismo restaurante que tus otros productos`},
    product_unable: (product_name)=>{`producto "${product_name}" no disponible`},
    order_error: "Error creando tu orden, revisa tu carrito e intenta nuevamente",
    order_detail_error: "Algunos productos no se añadieron a tu orden",


}
export const SUBMESSAGES = {
    pedido_exitoso: "Se envio tu solicitud al restaurante, puedes seguir comprando.",
    order_detail_error: "revisa tu orden, cancelala o mantenla depende a tu preferencia"
}


export const VALIDATIONS = {
    ArrayVacio : (array) => { return (array.length==0 || OutPutNotAcceptable(array))? true:false;},
    OutPutNotAcceptable : (output) => {return (output==null || output==undefined || output ==false)? true:false;},
    Equals : (inputA,inputB) => {return (inputA==inputB)? true:false;},
}
