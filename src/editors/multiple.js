/* Multiple Editor (for when `type` is an array, also when `oneOf` is present) */
import {AbstractEditor} from '../editor.js';
import {Validator} from '../validator.js';
import {extend, getProp} from '../utilities.js';

export class MultipleEditor extends AbstractEditor {
    register() {
        if (this.editors) {
            for (let i = 0; i < this.editors.length; i++) {
                if (!this.editors[i]) continue;
                this.editors[i].unregister();
            }
            if (this.editors[this.type]) this.editors[this.type].register();
        }
        super.register();
    }

    unregister() {
        super.unregister();
        if (this.editors) {
            for (let i = 0; i < this.editors.length; i++) {
                if (!this.editors[i]) continue;
                this.editors[i].unregister();
            }
        }
    }

    getNumColumns() {
        if (!this.editors[this.type]) return 4;
        return Math.max(this.editors[this.type].getNumColumns(), 4);
    }

    enable() {
        if (!this.always_disabled) {
            if (this.editors) {
                for (let i = 0; i < this.editors.length; i++) {
                    if (!this.editors[i]) continue;
                    this.editors[i].enable();
                }
            }
            this.switcher.disabled = false;
            super.enable();
        }
    }

    disable(alwaysDisabled) {
        if (alwaysDisabled) this.always_disabled = true;
        if (this.editors) {
            for (let i = 0; i < this.editors.length; i++) {
                if (!this.editors[i]) continue;
                this.editors[i].disable(alwaysDisabled);
            }
        }
        this.switcher.disabled = true;
        super.disable();
    }

    switchEditor(i) {
        if (!this.editors[i]) {
            this.buildChildEditor(i);
        }

        const currentValue = this.getValue();

        this.type = i;

        this.register();

        this.editors.forEach((editor, type) => {
            if (!editor) return;
            if (this.type === type) {
                if (this.keep_values) editor.setValue(currentValue, true);
                editor.container.style.display = '';
            } else {
                editor.container.style.display = 'none';
            }
        });
        this.refreshValue();
        this.refreshHeaderText();
    }

    buildChildEditor(i) {
        const type = this.types[i];
        const holder = this.theme.getChildEditorHolder();
        this.editor_holder.appendChild(holder);

        let schema;

        if (typeof type === 'string') {
            schema = extend({}, this.schema);
            schema.type = type;
        } else {
            schema = extend({}, this.schema, type);
            schema = this.jsoneditor.expandRefs(schema);

            /* If we need to merge `required` arrays */
            if (
                type &&
                type.required &&
                Array.isArray(type.required) &&
                this.schema.required &&
                Array.isArray(this.schema.required)
            ) {
                schema.required = this.schema.required.concat(type.required);
            }
        }

        const editor = this.jsoneditor.getEditorClass(schema);

        this.editors[i] = this.jsoneditor.createEditor(editor, {
            jsoneditor: this.jsoneditor,
            schema,
            container: holder,
            path: this.path,
            parent: this,
            realParent: this.parent,
            order: i,
            required: true
        });
        this.editors[i].preBuild();
        this.editors[i].build();
        this.editors[i].postBuild();

        // 移除 anyOf 下子元素的 title 区(包含折叠按钮)，除了 array 类型以外，因为该类型的添加按钮也在此处
        if (this.editors[i].schema.type !== 'array') {
            if (this.editors[i].title) {
                this.editors[i].title.style.display = 'none';
            } else if (this.editors[i].header) {
                this.editors[i].header.style.display = 'none';
            }
        }

        this.editors[i].option = this.switcher_options[i];

        holder.addEventListener('change_header_text', () => {
            this.refreshHeaderText();
        });

        if (i !== this.type) holder.style.display = 'none';
    }

    preBuild() {
        this.types = [];
        this.type = 0;
        this.editors = [];
        this.validators = [];

        this.keep_values = true;
        if (typeof this.jsoneditor.options.keep_oneof_values !== 'undefined')
            this.keep_values = this.jsoneditor.options.keep_oneof_values;
        if (typeof this.options.keep_oneof_values !== 'undefined') this.keep_values = this.options.keep_oneof_values;

        if (this.schema.oneOf) {
            this.oneOf = true;
            this.types = this.schema.oneOf;
            delete this.schema.oneOf;
        } else if (this.schema.anyOf) {
            this.anyOf = true;
            this.types = this.schema.anyOf;
            delete this.schema.anyOf;
        } else {
            if (!this.schema.type || this.schema.type === 'any') {
                this.types = ['string', 'number', 'integer', 'boolean', 'object', 'array', 'null'];

                /* If any of these primitive types are disallowed */
                if (this.schema.disallow) {
                    let {disallow} = this.schema;
                    if (typeof disallow !== 'object' || !Array.isArray(disallow)) {
                        disallow = [disallow];
                    }
                    const allowedTypes = [];
                    this.types.forEach(type => {
                        if (!disallow.includes(type)) allowedTypes.push(type);
                    });
                    this.types = allowedTypes;
                }
            } else if (Array.isArray(this.schema.type)) {
                this.types = this.schema.type;
            } else {
                this.types = [this.schema.type];
            }
            delete this.schema.type;
        }

        this.display_text = this.getDisplayText(this.types);
    }

    build() {
        const {container} = this;

        this.header = this.label = this.theme.getFormInputLabel(this.getTitle(), this.isRequired());
        this.header.classList.add('hi-plain-padding', 'hi-multiple-title');
        this.container.appendChild(this.header);

        this.switcher = this.theme.getSwitcher(this.display_text);
        container.appendChild(this.switcher);
        /* change select arrow */
        this.wrap = this.theme.getInputWrap(this.switcher);
        this.wrap.classList.add('hi-select-wrap', 'hi-switch-wrap');

        this.switcher.addEventListener('change', e => {
            e.preventDefault();
            e.stopPropagation();

            this.switchEditor(this.display_text.indexOf(e.currentTarget.value));
            this.onChange(true);
        });

        this.editor_holder = document.createElement('div');
        container.appendChild(this.editor_holder);

        const validatorOptions = {};
        if (this.jsoneditor.options.custom_validators) {
            validatorOptions.custom_validators = this.jsoneditor.options.custom_validators;
        }

        this.switcher_options = this.theme.getSwitcherOptions(this.switcher);
        this.types.forEach((type, i) => {
            this.editors[i] = false;

            let schema;

            if (typeof type === 'string') {
                schema = extend({}, this.schema);
                schema.type = type;
            } else {
                schema = extend({}, this.schema, type);

                /* If we need to merge `required` arrays */
                if (
                    type.required &&
                    Array.isArray(type.required) &&
                    this.schema.required &&
                    Array.isArray(this.schema.required)
                ) {
                    schema.required = this.schema.required.concat(type.required);
                }
            }
            this.validators[i] = new Validator(this.jsoneditor, schema, validatorOptions, this.defaults);
        });

        // 统一初始化 anyOf 的项，然后隐藏非当前项，避免切换时无初始项无法渲染
        this.types.forEach((type, i) => {
            if (!this.editors[i]) {
                this.buildChildEditor(i);
            }
        });
        this.switchEditor(0);

        // 针对 anyOf 的元素，判断是否全部都有依赖项，是就隐藏切换控件，通过依赖项切换
        if (this.hasDependency()) {
            this.wrap.style.display = 'none';
            this.switcher.style.display = 'none';
        }
        // 假如外部为 table，则还隐藏其 label
        if (this.header.parentNode.nodeName === 'TD') {
            this.header.style.display = 'none';
        }
    }

    hasDependency() {
        let hasDependencies = false;
        if (this.editors) {
            hasDependencies = this.editors.every(editor => {
                let depend = getProp(editor, 'schema.options.dependencies');
                return !!depend;
            });
        }
        return hasDependencies;
    }

    onChildEditorChange(editor) {
        if (this.editors[this.type]) {
            this.refreshValue();
            this.refreshHeaderText();
        }

        super.onChildEditorChange();
    }

    refreshHeaderText() {
        const displayText = this.getDisplayText(this.types);
        Array.from(this.switcher_options).forEach((option, i) => {
            option.textContent = displayText[i];
        });
    }

    refreshValue() {
        this.value = this.editors[this.type].getValue();
    }

    setValue(val, initial) {
        /* Determine type by getting the first one that validates */

        const prevType = this.type;
        /* find the best match one */
        let fitTestVal = {
            match: 0,
            extra: 0,
            i: this.type
        };
        const validVal = {
            match: 0,
            i: null
        };
        this.validators.forEach((validator, i) => {
            let fitTestResult = null;
            if (typeof this.anyOf !== 'undefined' && this.anyOf) {
                fitTestResult = validator.fitTest(val);
                if (fitTestVal.match < fitTestResult.match) {
                    fitTestVal = fitTestResult;
                    fitTestVal.i = i;
                } else if (fitTestVal.match === fitTestResult.match) {
                    if (fitTestVal.extra > fitTestResult.extra) {
                        fitTestVal = fitTestResult;
                        fitTestVal.i = i;
                    }
                }
            }
            if (!validator.validate(val).length && validVal.i === null) {
                validVal.i = i;
                if (fitTestResult !== null) {
                    validVal.match = fitTestResult.match;
                }
            } else {
                fitTestVal = validVal;
            }
        });
        let finalI = validVal.i;
        /* if the best fit schema has more match properties, then use the best fit schema. */
        /* usually the value could be */
        if (typeof this.anyOf !== 'undefined' && this.anyOf) {
            if (validVal.match < fitTestVal.match) {
                finalI = fitTestVal.i;
            }
        }
        if (finalI === null) {
            finalI = this.type;
        }
        // 全部有依赖项时，初始化时不修改 type 为 the best match schema，避免联动的输入控件不能正确渲染为对应的项和值
        if (!this.hasDependency()) {
            this.type = finalI;
        }
        this.switcher.value = this.display_text[this.type];

        const typeChanged = this.type !== prevType;
        if (typeChanged) {
            this.switchEditor(this.type);
        }

        this.editors[this.type].setValue(val, initial);

        this.refreshValue();
        this.onChange(typeChanged);
    }

    destroy() {
        this.editors.forEach(editor => {
            if (editor) editor.destroy();
        });
        if (this.editor_holder && this.editor_holder.parentNode)
            this.editor_holder.parentNode.removeChild(this.editor_holder);
        if (this.switcher && this.switcher.parentNode) this.switcher.parentNode.removeChild(this.switcher);
        super.destroy();
    }

    showValidationErrors(errors) {
        /* oneOf and anyOf error paths need to remove the oneOf[i] part before passing to child editors */
        if (this.oneOf || this.anyOf) {
            const checkPart = this.oneOf ? 'oneOf' : 'anyOf';
            this.editors.forEach((editor, i) => {
                if (!editor) return;
                const check = `${this.path}.${checkPart}[${i}]`;
                const filterError = (newErrors, error) => {
                    let road = error.path.substr(0, error.path.lastIndexOf('.'));
                    let target = check.substr(0, check.lastIndexOf('.'));
                    if (road.startsWith(target)) {
                        const newError = extend({}, error);
                        newErrors.push(newError);
                    }
                    if (error.path.startsWith(check) || error.path === check.substr(0, error.path.length)) {
                        const newError = extend({}, error);
                        if (error.path.startsWith(check)) {
                            newError.path = this.path + newError.path.substr(check.length);
                        }
                        newErrors.push(newError);
                    }
                    return newErrors;
                };
                editor.showValidationErrors(errors.reduce(filterError, []));
            });
        } else {
            this.editors.forEach(editor => {
                if (!editor) return;
                editor.showValidationErrors(errors);
            });
        }
    }

    addLinks() {
        // multiple editor itself don't create links
    }
}
