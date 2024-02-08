const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
    from_user: { type: String},
    room: { type: String},
    message: { type: String},
    date_sent: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Message', messageSchema);
