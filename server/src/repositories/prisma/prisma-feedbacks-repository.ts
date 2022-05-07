import { prisma } from './../../prisma';
import { FeedbackRepository, FeedbackCreateData, FeedbackReturnData } from "../feedbacks-repository";

export class PrismaFeedbacksRepository implements FeedbackRepository {

    public async create ({ type, comment, screenshot }: FeedbackCreateData): Promise<FeedbackReturnData> {
        const feedback = await prisma.feedback.create({
            data: {
                type,
                comment,
                screenshot
            },
            select: {
                id: true,
                type: true,
                comment: true,
                createdAt: true,
            }
        });

        return feedback;

    };
};