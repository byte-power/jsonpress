/* Non-Active editor for displaying text blocks in form */
import {ButtonEditor} from './button.js';

export class InfoEditor extends ButtonEditor {
    build() {
        this.options.compact = false;
        this.header = this.label = this.theme.getFormInputLabel(this.getTitle());
        if (this.schema.description) {
            this.input = this.theme.getDescription(this.schema.description || '');
        } else {
            this.input = document.createElement('div');
        }
        this.label.classList.add('info-label');
        this.input.classList.add('info-container');
        this.control = this.theme.getFormControl(this.label, this.input, null);
        this.container.appendChild(this.control);
    }

    getTitle() {
        return this.schema.title;
    }

    getNumColumns() {
        return 12;
    }
}
