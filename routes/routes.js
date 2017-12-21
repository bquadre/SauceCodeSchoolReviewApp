import express from 'express';
const appRouter = express.Router();
import * as SchoolController from '../controllers/schoolController';
import * as AdminController from '../controllers/adminController';
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
appRouter.post('/search', schoolroute.searchSchool)
export default appRouter;
