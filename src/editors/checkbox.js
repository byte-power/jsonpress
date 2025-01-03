import {AbstractEditor} from '../editor.js';

export class CheckboxEditor extends AbstractEditor {
    setValue(value, initial) {
        value = !!value;
        const changed = this.getValue() !== value;
        this.value = value;
        this.input.checked = this.value;
        this.onChange(changed);
    }

    register() {
        super.register();
        if (!this.input) return;
        this.input.setAttribute('name', this.formname);
    }

    unregister() {
        super.unregister();
        if (!this.input) return;
        this.input.removeAttribute('name');
    }

    getNumColumns() {
        return Math.min(12, Math.max(this.getTitle().length / 7, 2));
    }

    build() {
        if (!this.parent.options.table_row || (this.schema.format && this.schema.format === 'toggle')) {
            this.label = this.header = this.theme.getCheckboxLabel(this.getTitle(), this.isRequired());
            this.label.htmlFor = this.formname;
        }

        if (this.schema.description)
            this.description = this.theme.getFormInputDescription(this.schema.description, this.options);
        if (this.options.infoText && !this.options.compact)
            this.infoButton = this.theme.getInfoButton(this.options.infoText);
        if (this.options.compact) this.container.classList.add('compact');

        this.input = this.theme.getCheckbox();
        this.input.id = this.formname;
        this.control = this.theme.getFormControl(this.label, this.input, this.description, this.infoButton);

        // add 'toggle' format support
        if (this.schema.format && this.schema.format === 'toggle') {
            const toggleLabel = this.theme.getToggleLabel(this.getTitle(), this.isRequired());
            this.control = this.theme.getFormControl(this.label, this.input, this.description, toggleLabel, 'toggle');
            this.control.classList.add('hi-toggle-wrap');
        }
        this.control.classList.add('hi-plain-padding');

        if (this.schema.readOnly || this.schema.readonly) {
            this.disable(true);
        }

        this.input.addEventListener('change', e => {
            e.preventDefault();
            e.stopPropagation();
            this.value = e.currentTarget.checked;
            const currentChanged =
                this.key === '_collapsed'
                    ? {
                          schema: this.schema,
                          value: e.currentTarget.value,
                          path: this.path
                      }
                    : null;
            this.onChange(true, currentChanged);
        });

        this.container.appendChild(this.control);
    }

    enable() {
        if (!this.always_disabled) {
            this.input.disabled = false;
            super.enable();
        }
    }

    disable(alwaysDisabled) {
        if (alwaysDisabled) this.always_disabled = true;
        this.input.disabled = true;
        super.disable();
    }

    destroy() {
        if (this.label && this.label.parentNode) this.label.parentNode.removeChild(this.label);
        if (this.description && this.description.parentNode) this.description.parentNode.removeChild(this.description);
        if (this.input && this.input.parentNode) this.input.parentNode.removeChild(this.input);
        super.destroy();
    }

    showValidationErrors(errors) {
        this.previous_error_setting = this.jsoneditor.options.show_errors;

        const addMessage = (messages, error) => {
            if (error.path === this.path) {
                messages.push(error.message);
            }
            return messages;
        };
        const messages = errors.reduce(addMessage, []);
        this.input.controlgroup = this.control;

        if (messages.length) {
            this.theme.addInputError(this.input, `${messages.join('. ')}.`);
        } else {
            this.theme.removeInputError(this.input);
        }
    }
}
