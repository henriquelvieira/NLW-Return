import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { NodemailerMailAdapter } from '../adapters/nodemailer/nodemailer-mail-adapter';
import { PrismaFeedbacksRepository } from '../repositories/prisma/prisma-feedbacks-repository';
import { SubmitFeedbackUseCase } from '../use-cases/submit-feedback-use-case';


export class FeedbackController {

    async create (req: Request, res: Response, next: NextFunction) {
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

    }
};


