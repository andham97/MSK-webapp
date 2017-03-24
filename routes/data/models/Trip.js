/**
 * Created by andreashammer on 23/12/2016.
 */
var mongoose = require('mongoose');

module.exports = new mongoose.Schema({
    heading: String,
    restrictionGroup: Array,
    dateOfEvent: Date,
    accountNumber: String,
    arrangerGroup: String,
    description: String,
    participants: Array,
    creator: mongoose.Schema.Types.ObjectId
}, {collection: 'Trips'});