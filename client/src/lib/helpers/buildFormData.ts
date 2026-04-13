export function buildFormData(data: Record<string, any>): FormData {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
        if (value === null || value === undefined) {
            return;
        }

        if (Array.isArray(value)) {
            if (value.length > 0) {
                value.forEach((item) => {
                    formData.append(`${key}[]`, item);
                });
            } else {
                formData.append(key, '[]');
            }
            return;
        }

        if (value instanceof File) {
            formData.append(key, value);
            return;
        }

        formData.append(key, value.toString());
    });

    return formData;
}
