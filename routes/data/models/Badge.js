/**
 * Created by andreashammer on 23/12/2016.
 */
var mongoose = require('mongoose');

module.exports = new mongoose.Schema({
    title: String,
    description: String,
    requirements: Array,
    image: String,
    width: Number,
    height: Number,
    completedBy: Array
}, {collection: 'Badges'});