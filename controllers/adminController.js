import AdminAccount  from '../models/admin.model';

export default class AdminController {
    addAdmin(req, res){
        const adminData = new AdminAccount({
            username : req.body.username,
            fullname: req.body.fullname,
            email: req.body.email,
            password: req.body.password
        });

        adminData.save((err, data) => {
            if(err){
                console.log(err)
            }else{
                console.log(data)
            }
        })
    }
    login(req, res){
        //authenticate input against database
        AdminAccount.findOne({ email: req.body.email })
            .exec( (err, admin) => {
            if (err) {
                return callback(err)
            } else if (!admin) {
                let err = new Error('User not found.');
                err.status = 401;
                return callback(err);
            }
                if(admin.password !== req.body.password){
                    res.status(400).send('wrong password');
                    console.log(err)
                }else{
                    console.log('logged in!')
                    res.render('dashboard');
                }
            });
        }
    }