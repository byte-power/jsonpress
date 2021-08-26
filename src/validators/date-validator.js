import {dateStr2timestamp, getEditor} from '../utilities.js';

/* 实现 date 输入框联动校验的功能 */
function isDate(schema) {
    return schema.format && (schema.format.includes('date') || schema.format.includes('time'));
}
const validateRelation = (schema, value, path, editor) => {
    if (schema.relativeTo && isDate(schema)) {
        let relObj = schema.relativeTo;
        let relEditor = getEditor(schema.relativeTo, path, editor);
        let target = relEditor && relEditor.getValue();
        let timestamp = value;
        if (schema.type === 'string') {
            timestamp = dateStr2timestamp(value);
            target = target && dateStr2timestamp(target);
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
