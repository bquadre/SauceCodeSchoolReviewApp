import mongoose from 'mongoose';


const SchoolSchema = mongoose.Schema({
    name: {type: String, required: true},
    fees: {type: String, required: true},
    location: {type: String, required: true},
    motto: {type: String, required: true},
    reviews: {type: Number, required: false, default: 0},
    stars: {type: Number, required: false, default: 0},
    accepted: {type: Boolean, default: false},
    email: {type: String, required: true },
    phone: {type: Number, required: true },
    website: {type: String, required: true },
    comments: [
        {
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

export default mongoose.model('School', SchoolSchema);