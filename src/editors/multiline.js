import { StringEditor } from './string.js'
import { extend } from '../utilities.js'

export class MultiLineEditor extends StringEditor {
  setValue (value, initial, fromTemplate) {
    const res = super.setValue(value, initial, fromTemplate)
    if (res !== undefined && res.changed && this.sceditor_instance) this.sceditor_instance.val(res.value)
  }

  build () {
    this.options.format = 'textarea' /* Force format into "textarea" */
    super.build()
    this.input_type = this.schema.format /* Restore original format */
    this.input.setAttribute('data-schemaformat', this.input_type)
  }

  afterInputReady () {
    if (window.sceditor) {
      this.theme.afterInputReady(this.input)
    } else super.afterInputReady() /* Library not loaded, so just treat this as a string */
  }

  enable () {
    if (!this.always_disabled && this.sceditor_instance) this.sceditor_instance.readOnly(false)
    super.enable()
  }

  disable (alwaysDisabled) {
    if (this.sceditor_instance) this.sceditor_instance.readOnly(true)
    super.disable(alwaysDisabled)
  }

  destroy () {
    if (this.sceditor_instance) {
      this.sceditor_instance.destroy()
      this.sceditor_instance = null
    }
    super.destroy()
  }
}
