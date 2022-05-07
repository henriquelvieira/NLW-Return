export interface FeedbackCreateData {
    type: string;
    comment: string;
    screenshot?: string;
};

export interface FeedbackReturnData {
    id: string;
    type: string;
    comment?: string;
    createdAt: Date;
};

export interface FeedbackRepository {
    create: (data: FeedbackCreateData) => Promise<FeedbackReturnData>;
};