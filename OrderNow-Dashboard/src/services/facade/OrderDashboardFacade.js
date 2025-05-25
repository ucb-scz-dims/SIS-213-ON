import UserService from '../UserService';
import ConsumerService from '../ConsumerService';
import OrderService from '../OrderService';

const OrderDashboardFacade = {
    getUsers() {
        return UserService.getUsers();
    },
    
    getOrders() {
        return OrderService.getOrders();
    },

    getConsumers() {
        return ConsumerService.getConsumers();
    },

    async changeStatusOrder(orderId, newStatusTypeId) {
        await OrderService.updateOrder(orderId, newStatusTypeId);
    },

    async getDashboardOrders() {

        try {
            const ordersData = await this.getOrders();
            const consumerData = await this.getConsumers();
            const usersData = await this.getUsers();

            const enrichedOrders = ordersData.map((order) => {
                const consumer = consumerData.find((c) => c.id === order.consumer_id);
                const user = consumer
                    ? usersData.find((u) => u.id === consumer.user_id)
                    : null;

                return {
                    ...order,
                    consumer_name: user ? `${user.name} ${user.last_name}` : "Desconocido",
                    status: order.state_types?.name || "Desconocido",
                };
            });

            return enrichedOrders;

        }
        catch(error){
            console.error(error);
        }
    }
};

export default OrderDashboardFacade;