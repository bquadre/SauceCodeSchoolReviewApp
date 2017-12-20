import School from '../models/school.model';

export default class SchoolController {
    getAllSchools(req, res){
        // Retrieve and return all schools from the database.
        School.find((err, schools) => {
            if(err) {
                res.status(500).send({message: "Some error occurred while retrieving schools."});
            } else {
                res.render('index', {title: 'GoodSchools', schools});
                console.log(schools)
            }
        });
    }
    getOneSchoolById(req, res) {
        // Find a single School with a SchoolId
        School.findById(req.params.SchoolId, (err, schools) => {  
            if (err) {
                res.status(500).send(err)
            }
            if (schools) {
                res.status(200)
                .render('single-school', {title: schools.name, schools });
            } else {
                res
                .status(404)
                .send("No School found with that ID");
            }
        });
    };
    addNewSchool(req, res){
        // pose a new school
        // Create and Save a new School
        // if(!req.body.name || !req.body.fees || !req.body.description || req.body.location) {
        //     res
        //         .status(400)
        //         .send({message: "Please fill in all required fields"});
        // }
        const school = new School({
                                    name: req.body.name, 
                                    fees: req.body.fees, 
                                    location: req.body.location,
                                    description: req.body.description,
                                    email: req.body.email,
                                    website: req.body.website,
                                    phone: req.body.phone,
                                    type: req.body.type,
                                    twitter: req.body.twitter,
                                    facebook: req.body.facebook
                                });
        school.save((err, data) => {
            console.log(data);
        if(err) {
                console.log(err);
                res
                    .status(500)
                    .send({message: "Some error occurred while creating the School."});
            } else {
                res.redirect(`/schools/${data._id}`);
            }
    });
    }

    addComment(req, res){
        School.findById(req.params.SchoolId, (err, school) => {  
            if (err) {
                res.status(500).send(err)
            }
            if (school) {
                let total = 0;
                school.comments.forEach((comment) => {
                    total+= comment.star/school.comments.length;
                })
                let comments = {
                        comment: req.body.comment,
                        star: req.body.star
                    }
                    school.title = school.name;
                    school.description = school.description;
                    school.fees = school.fees;
                    school.comments.push(comments);
                    school.stars = Math.round(total);
                    school.reviews = school.comments.length
                    school.type = school.type;
                    // Save the updated document back to the database
                    school.save((err, school) => {
                        if (err) {
                            res.status(500)
                            console.log(err)
                        }
                    console.log(school)
                    res.redirect(`/schools/${school._id}`)
                    });
            } else {
                res
                .status(404)
                .send("No School found with that ID");
            }
        });
        
    }

    deleteSchool(req, res) {
        // Delete a School with the specified SchoolId in the request
        School.remove({_id: req.params.SchoolId}, (err, data) => {
            if(err) {
                res
                    .status(500)
                    .send({message: "Could not delete School with id " + req.params.SchoolId});
            } else {
                res.send({message: "School deleted successfully!"})
            }
        });
    };
    newSchool(req, res){
        res.render('new', {title: 'New'})
    }

    acceptSchool(req, res){
        School.findById(req.params.SchoolId, (err, school) => {  
            if (err) {
                res.status(500).send(err)
            }
            if (school) {
                    school.name = school.name;
                    school.description = school.description;
                    school.fees = school.fees;
                    school.comments = school.comments;
                    school.stars = school.stars;
                    school.reviews = school.reviews;
                    school.accepted = req.body.accepted;
                    school.email = school.email;
                    school.website = school.website;
                    school.facebook = school.facebook;
                    school.twitter = school.twitter;
                    school.type = school.type;
                    // Save the updated document back to the database
                    school.save((err, school) => {
                        if (err) {
                            res.status(500)
                            console.log(err);
                        }
                    console.log(school)
                    res.redirect(`/schools/${school._id}`);
                    });
            } else {
                res
                .status(404)
                .send("No School found with that ID");
            }
        });
    }
    likeSchool(req, res) {
        School.findById(req.params.SchoolId, (err, school) => {  
            if (err) {
                res.status(500).send(err)
            }
            if (school) {
                    school.name = school.name;
                    school.description = school.description;
                    school.fees = school.fees;
                    school.comments = school.comments;
                    school.stars = school.stars;
                    school.reviews = school.reviews;
                    school.accepted = req.body.accepted;
                    school.email = school.email;
                    school.website = school.website;
                    school.facebook = school.facebook;
                    school.twitter = school.twitter;
                    school.type = school.type;
                    // Save the updated document back to the database
                    school.save((err, school) => {
                        if (err) {
                            res.status(500)
                            console.log(err);
                        }
                    console.log(school)
                    //res.redirect(`/schools/${school._id}`);
                    });
            } else {
                res
                .status(404)
                .send("No School found with that ID");
            }
        });
    }
}