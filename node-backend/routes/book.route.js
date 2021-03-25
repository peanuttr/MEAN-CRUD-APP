const { query } = require('express');
const express = require('express');
const book = require('../model/book');
const app = express();

const bookRoute = express.Router();
let Book = require('../model/book');

bookRoute.route('/add-book').post((req, res, next) => {
    let { name, price, description } = req.body
    Book.create({ name: name, price: price, description: description }, (error, data) => {
        if (error) {
            return next(error);
        }
        else {
            res.json(data);
        }
    })
})

bookRoute.route('/').get((req, res) => {
    Book.find((error, data) => {
        if (error) {
            return next(error);
        }
        else {
            res.json(data);
        }
    })
})

bookRoute.route('/read-book/:id').get((req, res) => {
    Book.findById(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        }
        else {
            res.json(data);
        }
    })
})

bookRoute.route('/update-book/:id').put((req, res, next) => {
    Book.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, (error, data) => {
        if (error) {
            return next(error);
            console.log(error);
        }
        else {
            res.json(data);
            console.log("Book Updated Succesfully");
        }
    })
})

bookRoute.route('/delete-book/:id').delete((req, res, next) => {
    Book.findByIdAndRemove(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        }
        else {
            res.status(200).json({
                msg: data
            });
        }
    })
})

bookRoute.route('/search/:query?').get((req, res, next) => {
    const queryname = new RegExp(req.params.query || '', 'i')
    Book.find({ name: queryname }, (error, data) => {
        if (error) {
            return next(error);
        }
        else {
            console.log(data);
            res.json(data);
            console.log("Book Searched Succesfully");
        }
    })

})

module.exports = bookRoute;