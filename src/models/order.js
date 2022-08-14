const mongoose = require('mongoose');
const dayjs = require('dayjs');

const orderSchema = new mongoose.Schema({
    quantityInLiters: {
        type: Number,
        required: true,
        validate(value) {
            if(value < 0) {
                throw new Error('Quantity must be a positive number');
            }
        }
    },
    orderStatus: {
        type: String,
        required: true,
        default: 'packed',
        trim: true,
        lowercase: true,
        enum: {
            values: [ 'placed', 'packed', 'dispatched', 'delivered'],
            message: '{VALUE} is not supported'
        }
    },
    deliveryDate: {
        type: String,
        trim: true,
        default: dayjs().format('DD-MM-YYYY'),
    }
}, {
    timestamps: true
})

orderSchema.pre('save', async function(next) {
    const orders = await Order.find();
    const order = this
    const capacity = process.env.MAX_CAPACITY
    let currentCapacity = 0;
    orders.forEach((ord) => {
        currentCapacity+=ord.quantityInLiters;
    })
    
    const currentOrder = await Order.findById(order._id)

    if(currentOrder) {
        currentCapacity -= currentOrder.quantityInLiters;
    }

    if(order.quantityInLiters + currentCapacity > capacity) {
        throw new Error('Maximum Capacity Limit Breached')
    }

    next()
})

orderSchema.pre('save', async function(next) {
    const order = this
    if(order.deliveryDate) {
        order.deliveryDate = dayjs(order.deliveryDate).format('DD-MM-YYYY');
    }

    if(order.deliveryDate == 'Invalid Date') {
        throw new Error('Please Enter Valid Date')
    }

    next()
})

const Order = mongoose.model('Task', orderSchema)

module.exports = Order;