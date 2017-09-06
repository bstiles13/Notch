let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let notchSchema = new Schema({
    "type": {
        type: String,
        default: "Feature"
    },
    "geometry": {
        "type": {
            type: String,
            default: "Point"
        },
        "coordinates": [Number]
    },
    "properties": {
        "user": String,
        "category_parent": String,
        "category_child": String,
        "place": String,
        "headline": String,
        "summary": String,
        "created": {
            type: Date,
            default: Date.now
        }
    }
})

notchSchema.index({"geometry": '2dsphere'});

let Notch = mongoose.model("Notch", notchSchema);

module.exports = Notch;
