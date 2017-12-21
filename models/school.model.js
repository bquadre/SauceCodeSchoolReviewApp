import mongoose from 'mongoose';
import searchPlugin from 'mongoose-search-plugin';

const SchoolSchema = mongoose.Schema({
    name: {type: String, required: true},
    fees: {type: String, required: true},
    location: {type: String, required: true},
    address: {type: String, required: true},
    description: {type: String, required: true},
    reviews: {type: Number, required: false, default: 0},
    stars: {type: Number, required: false, default: 0},
    accepted: {type: Boolean, default: false},
    email: {type: String, required: true },
    phone: {type: Number, required: true },
    website: {type: String, require: false},
    likes: {type: Number,  required: false},
    facebook: {type: String, requied: false},
    twitter: {type: String, requied: false},
    type: {type: String, required: true},
    comments: [
        {   
            name: String,
            comment: String,
            star: Number
        }
    ],
    facilities: [],
    issues: [
        {
            title: String,
            issue: String
        }
    ],
},
{
    timestamps: true 
});

SchoolSchema.plugin(searchPlugin, {
    fields: ['type', 'location']
});

export default mongoose.model('School', SchoolSchema);