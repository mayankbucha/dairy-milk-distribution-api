const express = require('express')
const Order = require('../models/order')

const router = new express.Router()

router.post('/add', async (req, res) => {
    const task = new Order({
        ...req.body,
    })

    try {
        await task.save();
        res.status(201).send(task)
    } catch (error) {
        res.status(400).send({error: error.message})
    }
});

router.patch('/update/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['quantityInLiters', 'deliveryDate']
    const isValidOperations = updates.every((update) => allowedUpdates.includes(update))

    if(!isValidOperations)
        return res.status(400).send({error: 'Invalid Updates'})

    try {
        const order = await Order.findOne({_id: req.params.id})

        if(!order)
            return res.status(404).send({error: 'Order not found'})
        
        updates.forEach((update) => order[update] = req.body[update]) 
        await order.save()
        res.send(order)
    } catch (error) {
        res.status(500).send({error: error.message})
    }
})

router.patch('/updateStatus/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['orderStatus']
    const isValidOperations = updates.every((update) => allowedUpdates.includes(update))

    if(!isValidOperations)
        return res.status(400).send({error: 'Invalid Updates'})

    try {
        const order = await Order.findOne({_id: req.params.id})

        if(!order)
            return res.status(404).send({error: 'Order Not Found'})
        
        order['orderStatus'] = req.body['orderStatus']
        await order.save()
        res.send(order)
    } catch (error) {
        res.status(500).send(error)
    }
})

router.delete('/delete/:id', async (req, res) => {
    try {
        const order = await Order.findOneAndDelete({_id: req.params.id})
        if(!order)
            return res.status(404).send({error: 'Order Not Found'})
        res.send(order)
    } catch (error) {
        res.status(500).send({error: error.message})
    }
})

router.get('/check/:date', async (req, res) => {
    try {
        const orders = await Order.find({deliveryDate: req.params.date});
        let remain = parseInt(process.env.MAX_CAPACITY)
        orders.forEach(order => {
           remain -= order.quantityInLiters 
        });
        return res.send({remain})

    } catch (error) {
        res.status(500).send({error: error.message})
    }
})

module.exports = router
