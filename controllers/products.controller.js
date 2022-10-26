const Product = require('../models/Products.model');

exports.getAll = async (req, res) => {

    try {
        res.json(await Product.find());
    }
    catch(err) {
        res.status(500).json({ message: err });
    }
};

exports.getRandom= async (req, res) => {

    try {
        const count = await Product.countDocuments();
        const rand = Math.floor(Math.random() * count);
        const dep = await Product.findOne().skip(rand);
        if(!dep) res.status(404).json({ message: 'Not found' });
        else res.json(dep);
    }
    catch(err) {
        res.status(500).json({ message: err });
    }  
};

exports.getById = async (req, res) => {

    try {
        const dep = await Product.findById(req.params.id);
        if(!dep) res.status(404).json({ message: 'Not found' });
        else res.json(dep);
    }
    catch(err) {
        res.status(500).json({ message: err });
    }
};

exports.newPost =  async (req, res) => {

    try {
        const { name } = req.body;
        const newProduct = new Product({ name: name });
        await newProduct.save();
        res.json({ Product: newProduct });
    } catch(err) {
        res.status(500).json({ message: err });
    }
};

exports.editPost = async (req, res) => {
    const { name } = req.body;
    try {
        const dep = await Product.findById(req.params.id);
        if(dep) {
            await Product.updateOne({ _id: req.params.id }, { $set: { name: name }});
            res.json({ message: 'OK' });
        }
        else res.status(404).json({ message: 'Not found...' });
    }
    catch(err) {
        res.status(500).json({ message: err });
    }
}

exports.deletePost = async (req, res) => {

    try {
        const dep = await Product.findById(req.params.id);
        if(dep) {
            await Product.deleteOne({ _id: req.params.id });
            res.json({ Product: await Product.find() });
        }
        else res.status(404).json({ message: 'Not found...' });
    }
    catch(err) {
        res.status(500).json({ message: err });
    }
}
