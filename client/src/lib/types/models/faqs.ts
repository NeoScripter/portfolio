export interface FaqResource {
    data: FaqType[];
}

export interface FaqType {
    id: number;
    attributes: {
        title: {
            ru: string;
            en: string;
        };
        description: {
            ru: string;
            en: string;
        };
    };
};
