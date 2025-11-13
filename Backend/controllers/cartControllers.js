import User from '../models/userModel.js'

const addToCart = async (req, res) => {
    try {
        const user = await User.findByPk(req.body.userId);
        if (!user) return res.json({ success: false, message: 'User not found' });

        const cartData = user.Cart_data || {};
        const itemId = req.body.itemId;
        if (!cartData[itemId]) cartData[itemId] = 1;
        else cartData[itemId] += 1;

        await user.update({ Cart_data: cartData });
        res.json({ success: true, message: 'Added to cart' });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

const removeFromCart = async (req, res) => {
    try {
        const user = await User.findByPk(req.body.userId);
        if (!user) return res.json({ success: false });

        const cartData = user.Cart_data || {};
        const itemId = req.body.itemId;
        if (cartData[itemId] > 0) cartData[itemId] -= 1;
        if (cartData[itemId] === 0) delete cartData[itemId];

        await user.update({ Cart_data: cartData });
        return res.json({ success: true, message: 'Removed from the database' });
    } catch (error) {
        console.log(error);
        return res.json({ success: false });
    }
};

const getCart = async (req, res) => {
    try {
        const user = await User.findByPk(req.body.userId);
        if (!user) return res.json({ success: false, cart: {} });
        const cartData = user.Cart_data || {};
        res.json({ cart: cartData, success: true });
    } catch (error) {
        console.log(error);
        res.json({ success: false });
    }
};

export { addToCart, removeFromCart, getCart };

