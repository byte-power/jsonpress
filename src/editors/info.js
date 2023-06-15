/* Non-Active editor for displaying text blocks in form */
import { ButtonEditor } from './button.js'

export class InfoEditor extends ButtonEditor {
    build() {
        this.options.compact = false
        this.header = this.label = this.theme.getFormInputLabel(this.getTitle())
        this.input = this.theme.getDescription(this.schema.description || '')
        this.label.classList.add('info-label')
        this.input.classList.add('info-container')
        this.control = this.theme.getFormControl(this.label, this.input, null)
        this.container.appendChild(this.control)
    }

    getTitle() {
        return this.schema.title
    }

    getNumColumns() {
        return 12
    }
}
