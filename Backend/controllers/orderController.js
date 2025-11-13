import Order from '../models/orderModel.js';
import User from '../models/userModel.js';
import Stripe from 'stripe';

const stripeKey = process.env.STRIPE_KEY;
if (!stripeKey) {
    console.warn('WARNING: STRIPE_KEY environment variable is not set. Payment functionality will not work.');
}

const stripe = stripeKey ? new Stripe(stripeKey) : null;

// Place orderFrom frontend
const placeOrder = async (req, res) => {
    if (!stripe) {
        return res.json({ success: false, Error: 'Stripe is not configured. Please set STRIPE_KEY in .env file' });
    }
    const furl = req.headers.origin || process.env.FRONTEND_URL || 'http://localhost:5173';
    try {
        // Extract phone and address from address object if it's JSON
        const addressObj = req.body.address || {};
        const phoneNo = addressObj.phone || addressObj.Phone_No || '';
        const addressStr = typeof addressObj === 'string' 
            ? addressObj 
            : (addressObj.street || addressObj.Address || JSON.stringify(addressObj));
        
        // Get first food item ID if items array exists
        const firstFoodId = req.body.items && req.body.items.length > 0 
            ? req.body.items[0]._id || req.body.items[0].id 
            : null;

        const newOrder = await Order.create({
            User_id: req.body.userId,
            items: req.body.items,
            address: req.body.address,
            Phone_No: phoneNo,
            Food_id: firstFoodId,
            Status: 'Pending',
            Amount: req.body.amount,
        });

        await User.update({ Cart_data: {} }, { where: { user_id: req.body.userId } });

        const line_items = req.body.items.map((item) => ({
            price_data: {
                currency: 'inr',
                product_data: { name: item.name },
                unit_amount: Math.round(Number(item.price) * 100),
            },
            quantity: item.quantity,
        }));

        line_items.push({
            price_data: {
                currency: 'inr',
                product_data: { name: 'Delivery Charges' },
                unit_amount: Math.round(2 * 100),
            },
            quantity: 1,
        });

        const session = await stripe.checkout.sessions.create({
            line_items: line_items,
            mode: 'payment',
            success_url: `${furl}/verify?success=true&orderId=${newOrder.Order_id}`,
            cancel_url: `${furl}/verify?success=false&orderId=${newOrder.Order_id}`,
        });

        res.json({ success: true, session_url: session.url });
    } catch (error) {
        console.log(error);
        res.json({ success: false, Error: error.message });
    }
};

const verifyOrders = async (req, res) => {
    const { orderid, success } = req.body;
    try {
        if (success == 'true') {
            await Order.update({ payment: true }, { where: { Order_id: orderid } });
            res.json({ success: true, message: 'Paid' });
        } else {
            await Order.destroy({ where: { Order_id: orderid } });
            res.json({ success: false, message: 'Notpaid' });
        }
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

//user order for frontend
const userOrder = async (req, res) => {
    try {
        const orders = await Order.findAll({ where: { User_id: req.body.userId } });
        // Transform to match frontend expectations
        const transformedOrders = orders.map(order => {
            const json = order.toJSON();
            // Parse address if it's a string, otherwise use as is
            let address = json.address;
            if (typeof address === 'string') {
                try {
                    address = JSON.parse(address);
                } catch (e) {
                    address = { Address: address };
                }
            }
            if (!address) {
                address = {};
            }
            // Parse items if stored as string
            let items = json.items;
            if (typeof items === 'string') {
                try {
                    items = JSON.parse(items);
                } catch (e) {
                    items = [];
                }
            }
            if (!Array.isArray(items)) {
                items = [];
            }
            
            return {
                ...json,
                _id: json.Order_id,
                id: json.Order_id,
                userId: json.User_id,
                status: json.Status || json.status, // Normalize status field
                amount: parseFloat(json.Amount || json.amount || 0),
                address, // Ensure address is an object
                items,
            };
        });
        res.json({ success: true, data: transformedOrders });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

const allOrder = async (req, res) => {
    try {
        const orders = await Order.findAll();
        // Transform to match frontend expectations
        const transformedOrders = orders.map(order => {
            const json = order.toJSON();
            // Parse address if it's a string, otherwise use as is
            let address = json.address;
            if (typeof address === 'string') {
                try {
                    address = JSON.parse(address);
                } catch (e) {
                    // If parsing fails, create a basic address object
                    address = { Address: address };
                }
            }
            // If address is null/undefined, create empty object
            if (!address) {
                address = {};
            }
            // Parse items if stored as string
            let items = json.items;
            if (typeof items === 'string') {
                try {
                    items = JSON.parse(items);
                } catch (e) {
                    items = [];
                }
            }
            if (!Array.isArray(items)) {
                items = [];
            }
            
            return {
                ...json,
                _id: json.Order_id,
                id: json.Order_id,
                userId: json.User_id,
                status: json.Status || json.status, // Normalize status field
                amount: parseFloat(json.Amount || json.amount || 0),
                address, // Ensure address is an object
                items,
            };
        });
        res.json({ success: true, data: transformedOrders });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

//Upadting status
const updateStatus = async (req, res) => {
    try {
        const orderid = req.body.orderid;
        const status = req.body.status;
        
        console.log('Update status request:', { orderid, status });
        
        if (!orderid) {
            return res.json({ success: false, message: 'Order ID is required' });
        }
        
        if (!status) {
            return res.json({ success: false, message: 'Status is required' });
        }
        
        // Try to find the order first to validate it exists
        const order = await Order.findByPk(orderid);
        if (!order) {
            return res.json({ success: false, message: 'Order not found' });
        }
        
        await Order.update({ Status: status }, { where: { Order_id: orderid } });
        res.json({ success: true, message: 'Status updated' });
    } catch (error) {
        console.log('Error updating status:', error);
        res.json({ success: false, message: error.message || 'Error updating status' });
    }
};

export { placeOrder, verifyOrders, userOrder, allOrder, updateStatus };
