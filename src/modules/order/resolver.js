export default {
    Query: {
        orders: (_, { orderId }, { read }) => {
            return read("orders").filter(order => orderId ? order.orderId == orderId : true)
        }
    },

    Mutation: {
        //mutation Adding new user
        addOrder: (_, { userId, foodId, count }, { read, write }) => {
            const orders = read("orders")

            const newOrder = {
                userId: +userId,
                foodId: +foodId,
                count,
                orderId: orders.length ? +orders.at(-1).orderId + 1 : 1
            }

            orders.push(newOrder)
            write("orders", orders)

            return {
                status: 201,
                message: "The order created successfully!",
                data: newOrder
            }

        },

        //mutation editing order
        editOrder: (_, { orderId, foodId, userId, count }, { read, write }) => {
            const orders = read("orders")
            const order = orders.find(el => el.orderId == orderId)

            if (order) {
                order.foodId = +foodId,
                    order.count = +count
            }

            write("orders", orders)

            return {
                status: 201,
                message: "The order successfully edited",
                data: order
            }

        },

        //mutation deleting order
        deleteOrder: (_, { orderId }, { read, write }) => {
            const orders = read("orders")
            const addingOrders = orders.filter(order => order.orderId != orderId)

            write("orders", addingOrders)

            return {
                status: 201,
                message: "The order successfully deleted",
            }
        }
    }
}