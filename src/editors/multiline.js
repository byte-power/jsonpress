import { StringEditor } from './string.js'
import { typeMap } from '../utilities.js'

export class MultiLineEditor extends StringEditor {
    preBuild() {
        super.preBuild()
        this.options.input_width = this.options.input_width || '98%'
        this.options.format = 'textarea'
        this.options.multiType = this.options.multiType || 'string'
        this.key =
            this.realParent !== undefined
                ? this.path.split('.').slice(this.realParent.path.split('.').length).join('.')
                : this.key
    }

    build() {
        super.build()
    }

    setValue(value) {
        if (value && Array.isArray(value)) {
            this.value = value.join('\n')
            this.input.value = this.value
        }

        const changed = this.getValue() !== value
        this.onChange(changed)
    }

    getValue() {
        if (!this.dependenciesFulfilled) {
            return undefined
        }
        if (!this.value) {
            if (this.isRequired()) {
                return []
            }
            return undefined
        }

        let realValue = this.value
        if (this.options.multiType) {
            let arr = this.cleanArr(realValue.split('\n'))
            realValue = arr.map(child => {
                return typeMap[this.options.multiType].handle(child)
            })
        }
        return realValue
    }

    cleanArr(arr) {
        if (!arr || arr.length < 1) {
            return
        }
        return arr
            .map(item => {
                let value = item.trim()
                if (value[0] === ',') {
                    value = value.substring(1)
                }
                if (value[value.length - 1] === ',') {
                    value = value.substring(0, value.length - 1)
                }
                return value
            })
            .filter(item => {
                return item
            })
    }
}
