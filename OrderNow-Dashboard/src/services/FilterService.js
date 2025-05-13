export default class FilterService {
    filterByStatus(orders, selectedStatusId) {

        if(selectedStatusId.length === 0)
            return orders;

        try {

            selectedStatusId = selectedStatusId.map(id => parseInt(id));
            orders = orders.filter((order) => selectedStatusId.includes(order.state_type_id));
            
            return orders;
        }
        catch(err)
        {
            console.error("Ha ocurrido un error inesperado", err);
        }

    }
}