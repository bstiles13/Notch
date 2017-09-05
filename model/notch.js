let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let notchSchema = new Schema({
    "type": "Feature",
    "geometry": {
        "type": "Point",
        "coordinates": [String]
    },
    "properties": {
        "user": String,
        "category": String,
        "place": String,
        "headline": String,
        "summary": String,
        "created": {
            type: Date,
            default: Date.now
        }
    }
})

wreckSchema.index({"geometry": '2dsphere'});

let Notch = mongoose.model("Notch", notchSchema);

module.exports = Notch;
