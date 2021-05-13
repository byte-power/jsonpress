/* 实现 date 输入框联动校验的功能 */
const validateRelation = (schema, value, path, editor) => {
    if (schema.relativeTo) {
        let relObj = schema.relativeTo;
        let relative = editor.getEditor(`${relObj.path}`);
        let target = relative.getValue();
        if (target) {
            if (relObj.limit === 'less' && target <= value) {
                console.log('9', target, value);
                return {
                    message: 'error_maximum_excl',
                    param: [relObj.path]
                };
            }
            if (relObj.limit === 'greater' && target >= value) {
                console.log('15', target, value);
                return {
                    message: 'error_minimum_excl',
                    param: [relObj.path]
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
