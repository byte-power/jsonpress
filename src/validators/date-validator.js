import {dateStr2timestamp} from '../utilities.js';

/* 实现 date 输入框联动校验的功能 */
function isDate(schema) {
    return schema.format && (schema.format.includes('date') || schema.format.includes('time'));
}
const validateRelation = (schema, value, path, editor) => {
    if (schema.relativeTo && isDate(schema)) {
        let relObj = schema.relativeTo;
        let pathParts = relObj.path.split('.');
        let first = pathParts.shift();
        let self = editor.getEditor(path);
        let selfRoot = self.theme.closest(self.container, `[data-schemaid="${first}"]`);
        let adjustedPath = `${selfRoot.getAttribute('data-schemapath')}.${pathParts.join('.')}`;
        let relEditor = editor.getEditor(adjustedPath);
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
