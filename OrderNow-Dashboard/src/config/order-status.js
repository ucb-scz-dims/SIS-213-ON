export const ORDER_STATUS = {
    PENDING: 1,
    ON_THE_WAY: 2,
    DELIVERED: 3,
    CANCELED: 4,
    PREPARING: 5,
    ACCEPTED: 6
};

export const ORDER_STATUS_NAMES = {
    [ORDER_STATUS.PENDING]: "Pendiente",
    [ORDER_STATUS.ON_THE_WAY]: "En Camino",
    [ORDER_STATUS.DELIVERED]: "Entregado",
    [ORDER_STATUS.CANCELED]: "Cancelado",
    [ORDER_STATUS.ACCEPTED]: "Aceptado",
    [ORDER_STATUS.PREPARING]: "Preparando" 
}