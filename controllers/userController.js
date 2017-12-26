import User from '../models/user.model';

export default class userController {
    addUser(req, res){
        if (req.body.email &&
            req.body.username &&
            req.body.password &&
            req.body.passwordConf) {

            let userData = {
                email: req.body.email,
                username: req.body.username,
                password: req.body.password,
                passwordConf: req.body.passwordConf,
            }
            //use schema.create to insert data into the db
            User.create(userData, (err, user) => {
            if (err) {
                // let err = new Error('User Already Exists!');
                console.log(err)
            } else {
                console.log(user)
                req.session.userId = user._id;
                return res.render('/dashboard');
            }
            });
        }
    }
    loginUser(req, res, next){
        console.log(req.body)
        if (req.body.email && req.body.password) {
            User.authenticate(req.body.email, req.body.password, (error, user) =>{
            if (error || !user) {
                let err = new Error('Wrong email or password.');
                console.log(error)

            console.log('reached here')
                return next(error);
            } else {
                console.log(user)
                req.session.userId = user._id;
                return res.redirect('/profile');
            }
            });
        } else {
            let err = new Error('All fields required.');
            err.status = 400;
            console.log(err)
        return next(err);
        }
    }
    enterProfile(req, res){
        User.findById(req.session.userId)
            .exec( (error, user) => {
                if (error) {
                    console.log(error)
                    return next(error);
                } else {
                if (user === null) {
                    let err = new Error('Not authorized! Go back!');
                    err.status = 400;
                    return next(err);
                } else {
                    return res.render('/profile');
                }
                }
            });
    }
    logoutUser(req, res){
        if (req.session) {
            // delete session object
            req.session.destroy((err) => {
                if (err) {
                    return next(err);
                } else {
                    return res.redirect('/');
                }
            });
        }
    }
}