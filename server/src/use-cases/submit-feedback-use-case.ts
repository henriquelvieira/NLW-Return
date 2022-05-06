import { MailAdapter } from "../adapters/mail-adapter";
import { FeedbackRepository } from "../repositories/feedbacks-repository";

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

    public async execute(request: SubmitFeedbackUseCaseRequest) {
        const { type, comment, screenshot } = request;

        if (!type) {
            throw new Error('Type is required.');
        };

        if (!comment) {
            throw new Error('Comment is required.');
        };

        if (screenshot && !screenshot.startsWith('data:image/png;base64')) {
            throw new Error('Invalid screenshot format');
        };

        this.repository.create({
            type, 
            comment, 
            screenshot
        });

        await this.mailAdapter.sendMail({
            subject: 'Novo feedback',
            body: [
                '<div style="font-family: sans-serif; font-size:16px; color: #111;">',
                `<p><b>Tipo do feedback</b>: ${type}</p>`,
                `<p><b>Comentário</b>: ${comment}</p>`,
                screenshot ? `<img src="${screenshot}" >` : '',
                '</div>'
            ].join('\n')
        });

    };
};