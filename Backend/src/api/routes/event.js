const eventRouter = require('express').Router();
const controller = require('../controllers/event');
const { isAuth } = require('../../middlewares/auth');

eventRouter.get('/', controller.getAllEvents);
eventRouter.get('/:id', controller.getEventById);
eventRouter.post('/create', isAuth, controller.createEvent);
eventRouter.post('/attend/:id', isAuth, controller.attendEvent);
eventRouter.put('/edit/:id', isAuth, controller.editEvent);
eventRouter.delete('/delete/:id', isAuth, controller.deleteEvent);

module.exports = eventRouter;
