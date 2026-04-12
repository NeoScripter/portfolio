import type { WebformState } from "@/components/shared/Webform";

type FieldType = 'name' | 'email' | 'telegram' | 'whatsapp' | 'message';

interface ValidationMessages {
    en: {
        nameRequired: string;
        nameTooLong: string;
        emailRequired: string;
        emailInvalid: string;
        emailTooLong: string;
        messageRequired: string;
        messageTooLong: string;
        telegramTooLong: string;
        whatsappTooLong: string;
    };
    ru: {
        nameRequired: string;
        nameTooLong: string;
        emailRequired: string;
        emailInvalid: string;
        emailTooLong: string;
        messageRequired: string;
        messageTooLong: string;
        telegramTooLong: string;
        whatsappTooLong: string;
    };
}

const messages: ValidationMessages = {
    en: {
        nameRequired: 'Name is required',
        nameTooLong: 'Name must not exceed 100 characters',
        emailRequired: 'Email is required',
        emailInvalid: 'Please enter a valid email address',
        emailTooLong: 'Email must not exceed 254 characters',
        messageRequired: 'Message is required',
        messageTooLong: 'Message must not exceed 2000 characters',
        telegramTooLong: 'Telegram username must not exceed 300 characters',
        whatsappTooLong: 'WhatsApp number must not exceed 300 characters',
    },
    ru: {
        nameRequired: 'Пожалуйста введите свое имя',
        nameTooLong: 'Имя не должно превышать 100 символов',
        emailRequired: 'Пожалуйста введите свой email',
        emailInvalid: 'Неправильный формат email',
        emailTooLong: 'Email не должен превышать 254 символа',
        messageRequired: 'Пожалуйста введите сообщение',
        messageTooLong: 'Сообщение не должно превышать 2000 символов',
        telegramTooLong:
            'Имя пользователя Telegram не должно превышать 300 символов',
        whatsappTooLong: 'Номер WhatsApp не должен превышать 300 символов',
    },
};

export const validateField = (
    fieldType: FieldType,
    value: string,
    lang: 'en' | 'ru' = 'en',
): string => {
    const msg = messages[lang];
    const trimmedValue = value.trim();

    switch (fieldType) {
        case 'name':
            if (!trimmedValue) {
                return msg.nameRequired;
            }
            if (trimmedValue.length > 100) {
                return msg.nameTooLong;
            }
            return '';

        case 'email':
            if (!trimmedValue) {
                return msg.emailRequired;
            }
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedValue)) {
                return msg.emailInvalid;
            }
            if (trimmedValue.length > 254) {
                return msg.emailTooLong;
            }
            return '';

        case 'message':
            if (!trimmedValue) {
                return msg.messageRequired;
            }
            if (trimmedValue.length > 2000) {
                return msg.messageTooLong;
            }
            return '';

        case 'telegram':
            if (trimmedValue.length > 300) {
                return msg.telegramTooLong;
            }
            return '';

        case 'whatsapp':
            if (trimmedValue.length > 300) {
                return msg.whatsappTooLong;
            }
            return '';

        default:
            return '';
    }
};

export const validateAllFields = (
    state: WebformState,
    lang: 'en' | 'ru' = 'en',
): Record<FieldType, string> => {
    return {
        name: validateField('name', state.name, lang),
        email: validateField('email', state.email, lang),
        telegram: validateField('telegram', state.telegram, lang),
        whatsapp: validateField('whatsapp', state.whatsapp, lang),
        message: validateField('message', state.message, lang),
    };
};

export const isFormValid = (
    state: WebformState,
    lang: 'en' | 'ru' = 'en',
): boolean => {
    const errors = validateAllFields(state, lang);
    return Object.values(errors).every((error) => error === '');
};
