import { prisma } from './../../prisma';
import { FeedbackRepository, FeedbackCreateData } from "../feedbacks-repository";

export class PrismaFeedbacksRepository implements FeedbackRepository {

    public async create ({ type, comment, screenshot }: FeedbackCreateData) {
        const feedback = await prisma.feedback.create({
            data: {
                type,
                comment,
                screenshot
            }
        });

    };
};