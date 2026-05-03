export type FaqResource = {
    data: FaqType[];
}

export type FaqType = {
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
