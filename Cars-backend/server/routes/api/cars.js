const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

// routes
// read all cars
router.get('/', async function(req, res) {
    const cars = await loadCarsConnection();
    res.send(await cars.find({}).toArray());

    // res.json({
    //     message: "Cars Express veikia"
    // });
});

// get cars by id
router.get('/:carId', async function(req, res) {
    const cars = await loadCarsConnection();
    res.send(await cars.findOne({ _id: mongodb.ObjectId(req.params.carId) }));
});

// create new cars
router.post('/', async function(req, res) {
    const cars = await loadCarsConnection();
    let newCar = {
        brand: req.body.brand,
        model: req.body.model,
        price: req.body.price,
        engine: req.body.engine,
        updatedAt: new Date(),
        createdAt: new Date()
    }

    await cars.insertOne(newCar, function(err, result) {
        if (err) {
            res.status(200).json({
                status: "error",
                error: err
            });
        } else {
            res.status(201).json({
                status: "success",
                message: `Car ${newCar.brand} ${newCar.model} created successfully`
            });
        }
    })

});

// delete cars

router.delete('/:carId', async function(req, res) {
    const cars = await loadCarsConnection();
    cars.remove({ _id: mongodb.ObjectId(req.params.carId) }, function(err, result) {
        if (err) {
            res.status(200).json({
                status: "error",
                error: err
            });
        } else {
            res.status(201).json({
                status: "success",
                message: `Car ${req.params.carId} deleted successfully`
            });
        }
    });
});

// update cars

router.patch('/:carId', async function(req, res) {
    const cars = await loadCarsConnection();
    let updatedCar = {
        brand: req.body.brand,
        model: req.body.model,
        price: req.body.price,
        engine: req.body.engine,
        updatedAt: new Date()
    }

    await cars.updateOne({ _id: mongodb.ObjectId(req.params.carId) }, { $set: updatedCar }, function(err, result) {
        if (err) {
            res.status(200).json({
                status: "error",
                error: err
            });
        } else {
            res.status(201).json({
                status: "success",
                message: `Car ${updatedCar.brand} ${updatedCar.model} updated successfully`
            });
        }
    })
})

// connect to db
async function loadCarsConnection() {
    const client = await mongodb.MongoClient.connect(
        'mongodb://vue_cars:carsvue1@ds253243.mlab.com:53243/vue_cars', {
            useNewUrlParser: true
        }
    );
    return client.db('vue_cars').collection('cars');
}

// export cars
module.exports = router;