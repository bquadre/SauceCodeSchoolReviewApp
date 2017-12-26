import express from 'express';
const appRouter = express.Router();
import * as SchoolController from '../controllers/schoolController';
import * as AdminController from '../controllers/adminController';
import * as UserController from '../controllers/userController';
const userRoute = new UserController.default();
const schoolroute = new SchoolController.default();
const adminCont = new AdminController.default();

appRouter.get('/', schoolroute.getAllSchools);
appRouter.get('/schools', schoolroute.getAllSchools);
appRouter.post('/schools', schoolroute.addNewSchool);
appRouter.delete('/schools/:SchoolId', schoolroute.deleteSchool);
appRouter.post('/schools/:SchoolId', schoolroute.addComment);
appRouter.get('/schools/:SchoolId', schoolroute.getOneSchoolById);
appRouter.post('/registerAdmin', adminCont.addAdmin);
appRouter.post('/login', adminCont.login);
appRouter.post('/admin/schools/:SchoolId', schoolroute.acceptSchool);
appRouter.post('/search', schoolroute.searchSchool);
appRouter.post('/addUser', userRoute.addUser);
appRouter.post('/loginUser', userRoute.loginUser);
appRouter.get('/profile', userRoute.enterProfile)
appRouter.get('/logout', userRoute.logoutUser);

export default appRouter;
