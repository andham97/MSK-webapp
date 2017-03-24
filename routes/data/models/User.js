/**
 * Created by andreashammer on 25/01/2016.
 */
var mongoose = require('mongoose');

module.exports = new mongoose.Schema({
    username: String,
    password: String,
    name: String,
    privileges: String,
    address: String,
    allergier: String,
    birthDay: Date,
    email: String,
    phoneNumber: String,
    photoPermission: Boolean,
    regularPills: String,
    scoutGroup: String,
    tripAdmin: Boolean,
    blocked: Boolean,
    admin: Boolean
}, {collection: 'Users'});