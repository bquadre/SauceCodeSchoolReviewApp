import mongoose from 'mongoose';
import bcrypt from 'bcrypt-nodejs';

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
    },
    passwordConf: {
        type: String,
        required: true,
    }
});

//authenticate input against database
UserSchema.statics.authenticate = (email, password, callback) => {
    User.findOne({ email: email })
        .exec((err, user) => {
        if (err) {
            return callback(err)
        } else if (!user) {
            let err = new Error('User not found.');
            return callback(err);
        }
        else if (user.password !== password){
            console.log('wrongness')
        }
        });
    }

const User = mongoose.model('User', UserSchema);

export default User;