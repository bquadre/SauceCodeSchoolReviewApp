import School from '../models/school.model';

export default class SchoolController {
    getAllSchools(req, res){
        // Retrieve and return all schools from the database.
        School.find((err, schools) => {
            if(err) {
                res.status(500).send({message: "Some error occurred while retrieving schools."});
            } else {
                res.render('index', {title: 'GoodSchools', schools});
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
                if(schools.accepted === false){
                    console.log('please chill till this school has been accepted by the admin')
                }
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
                                    motto: req.body.motto,
                                    email: req.body.email,
                                    website: req.body.website,
                                    phone: req.body.phone,
                                });
        school.facilities.push(req.body.facilities)
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

    updateSchool(req, res){
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
                let issues = {
                    title: req.body.title,
                    issue: req.body.issue
                }
                    school.title = school.name;
                    school.motto = school.motto;
                    school.fees = school.fees;
                    school.comments.push(comments);
                    school.stars = Math.round(total);
                    school.reviews = school.comments.length
                    school.issues.push(issues)
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
                    school.motto = school.motto;
                    school.fees = school.fees;
                    school.comments = school.comments;
                    school.stars = school.stars;
                    school.reviews = school.reviews;
                    school.accepted = req.body.accepted;
                    school.facilities = school.facilities;
                    school.email = school.email;
                    school.issues = school.issues;
                    school.website = school.website;
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
}