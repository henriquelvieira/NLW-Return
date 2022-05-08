import express, { NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { SubmitFeedbackUseCase } from './use-cases/submit-feedback-use-case';
import { PrismaFeedbacksRepository } from './repositories/prisma/prisma-feedbacks-repository';
import { NodemailerMailAdapter } from './adapters/nodemailer/nodemailer-mail-adapter';


export const routes = express.Router();

routes.get('/', (req, res) => {
    return res.status(200).json('hello World');
});

routes.post('/feedbacks', async (req, res, next: NextFunction) => {
    const { type, comment, screenshot } = req.body; //Get data from request

    try {
        const repository = new PrismaFeedbacksRepository();
        const nodemailerMailAdapter = new NodemailerMailAdapter();
    
        const submitFeedbackUseCase = new SubmitFeedbackUseCase(
            repository,
            nodemailerMailAdapter
        );
    
        const feedbackReturn = await submitFeedbackUseCase.execute({
            type, 
            comment, 
            screenshot 
        });
        
        return res.status(StatusCodes.CREATED).json(feedbackReturn);
    } catch (error) {
        next(error);
    };

     
});
