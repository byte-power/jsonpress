import {dateStr2timestamp} from '../utilities.js';

/* 实现 date 输入框联动校验的功能 */
const validateRelation = (schema, value, path, editor) => {
    if (schema.relativeTo) {
        let relObj = schema.relativeTo;
        let relEditor = editor.getEditor(`${relObj.path}`);
        let target = relEditor.getValue();
        let timestamp = value;
        if (schema.type === 'string') {
            if (schema.format.includes('date') || schema.format.includes('time')) {
                timestamp = dateStr2timestamp(value);
                target = dateStr2timestamp(target);
            }
        }
        if (target) {
            if (relObj.limit === 'less' && target <= timestamp) {
                return {
                    message: 'error_maximum_excl',
                    param: [relEditor.key]
                };
            } else if (relObj.limit === 'greater' && target >= timestamp) {
                return {
                    message: 'error_minimum_excl',
                    param: [relEditor.key]
                };
            }
        }
    }
};

export function dateValidator(schema, value, path, editor, translate) {
    let result = validateRelation(schema, value, path, editor);
    if (result) {
        return [
            {
                path,
                property: 'format',
                message: translate(result.message, result.param)
            }
        ];
    } else {
        return [];
    }
}
