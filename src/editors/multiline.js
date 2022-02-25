import { StringEditor } from './string.js'
import { typeMap } from '../utilities.js'

export class MultiLineEditor extends StringEditor {
  preBuild() {
    super.preBuild()
    this.options.input_width = '98%'
    this.options.format = 'textarea'
    this.options.multiType = this.options.multiType || 'string'
  }

  build() {
    super.build()
  }

  setValue(value) {
    if (value) {
      this.value = value.join('\n')
      this.input.value = this.value
    }
  }

  getValue() {
    if (!this.dependenciesFulfilled) {
      return undefined
    }
    if (!this.value) {
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
