const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const donarSchema = new Schema({
    bloodGroup:{
        type: String,
        required: true
    },
    contactNo:{
        type: Number,
        required: true
    },
    city:{
        type: String,
        required: true
    },
    userid:{
        type: Schema.Types.ObjectId,
        ref:'User'
    }
});


module.exports =  mongoose.model('Donar',donarSchema);