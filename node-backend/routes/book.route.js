const { query } = require('express');
const express = require('express');
const book = require('../model/book');
const app = express();

const bookRoute = express.Router();
let Book = require('../model/book');

bookRoute.route('/add-book').post((req, res, next) => {
    Book.create(req.body, (error, data) => {
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
    console.log(req.params.query || '');
    Book.find({ name: { $regex: `.*${req.params.query || ''}.*` } }, (error, data) => {
        if (error) {
            return next(error);
        }
        else {
            res.json(data);
            console.log("Book Searched Succesfully");
        }
    })

})

module.exports = bookRoute;