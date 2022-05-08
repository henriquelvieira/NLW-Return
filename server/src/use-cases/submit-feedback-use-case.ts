import { MailAdapter } from "../adapters/mail-adapter";
import { FeedbackRepository, FeedbackReturnData } from "../repositories/feedbacks-repository";

interface SubmitFeedbackUseCaseRequest {
    type: string;
    comment: string;
    screenshot?: string;
};

export class SubmitFeedbackUseCase {

    constructor(
        private repository: FeedbackRepository,
        private mailAdapter: MailAdapter
    ) {}

    public async execute(req: SubmitFeedbackUseCaseRequest): Promise<FeedbackReturnData | undefined> {
        const { type, comment, screenshot } = req; //Get data from request

        if (!type) {
            throw new Error('Type is required.');
        };

        if (!comment) {
            throw new Error('Comment is required.');
        };

        if (screenshot && !screenshot.startsWith('data:image/png;base64')) {
            throw new Error('Invalid screenshot format');
        };

        const feedbackReturn = this.repository.create({
            type, 
            comment, 
            screenshot
        }); //Save registry in database

        await this.mailAdapter.sendMail({
            subject: 'Novo feedback',
            body: [
                '<div style="font-family: sans-serif; font-size:16px; color: #111;">',
                `<p><b>Tipo do feedback</b>: ${type}</p>`,
                `<p><b>Comentário</b>: ${comment}</p>`,
                screenshot ? `<br /><img src="${screenshot}" >` : '',
                '</div>'
            ].join('\n')
        }); //Send email

        return feedbackReturn;               

    };
};