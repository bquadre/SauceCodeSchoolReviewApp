import mongoose from 'mongoose';

const AdminSchema = mongoose.Schema({
    username: String,
    fullname: String,
    password: String,
    email: String
});

export default mongoose.model('AdminAccount', AdminSchema);
