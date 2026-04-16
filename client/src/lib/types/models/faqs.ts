export interface FaqResource {
    data: FaqType[];
}

export interface FaqType {
    id: number;
    attr: {
        title: {
            ru: string;
            en: string;
        };
        content: {
            ru: string;
            en: string;
        };
    };
};
