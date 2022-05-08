import express from 'express';
import { StatusCodes } from 'http-status-codes';
import { FeedbackController } from './controllers/FeedbacksControllers';


export const routes = express.Router();

const feedbackController = new FeedbackController();

routes.get('/', (req, res) => {
    return res.status(StatusCodes.OK).json('Hello World');
});

routes.post('/feedbacks', feedbackController.create);