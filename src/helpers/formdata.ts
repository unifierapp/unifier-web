type FormElements = HTMLInputElement | HTMLTextAreaElement

export function formToPojo<T = any>(formElement: HTMLFormElement, options?: {
    throw?: boolean
}): T {
    options = {...options} ?? {};
    options.throw ??= false;

    const result: Record<string, any> = {};
    for (let element of Array.from(formElement.querySelectorAll<FormElements>("input,textarea,select"))) {
        if (element instanceof HTMLSelectElement) {
            if (element.multiple) {
                const values = [];
                for (let option of Array.from(element.querySelectorAll("option"))) {
                    if (option.selected) {
                        values.push(option.value);
                    }
                }
                if (values.length === 0 && element.required && options.throw) {
                    throw new Error(`The ${element.name} field is required.`);
                }
                result[element.name] = values;
            } else {
                let value = undefined;
                for (let option of Array.from(element.querySelectorAll("option"))) {
                    if (option.selected) {
                        value = option.value;
                    }
                }
                if (!value && element.required && options.throw) {
                    throw new Error(`The ${element.name} field is required.`);
                }
                result[element.name] = value;
            }
        } else {
            if (!element.value && element.required && options.throw) {
                throw new Error(`The ${element.name} field is required.`);
            }
            if (element.type === "number") {
                result[element.name] = +element.value;
            } else {
                result[element.name] = element.value;
            }
        }
    }
    return result as T;
}
