const mongoose = require('mongoose');
const { Schema } = mongoose;
const RecipientSchema = require ('./Recipient');

const surveySchema = new Schema ({
    title: String,
    body: String,
    subject: String,
    recipients: [RecipientSchema],
    yes: { type: Number, default:0 },
    no: { type: Number, default:0 },
    _user: { type: Schema.Types.ObjectId, ref: 'User' }, // used _ to indicate that its a relationship field, which is used to set up relationship between this and any other model
    dateSent: Date,
    lastResponded: Date
});

mongoose.model('surveys',surveySchema);