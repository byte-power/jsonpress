import { StringEditor } from './string.js'
import { isNumber } from '../utilities.js'

const typeMap = {
  string: {
    test: v => {
      return v
    },
    handle: v => {
      return v
    }
  },
  number: {
    test: v => {
      return isNumber(v)
    },
    handle: v => {
      return parseFloat(v)
    }
  },
  boolean: {
    test: v => {
      return v === 'true' || v === 'false'
    },
    handle: v => {
      return v === 'true'
    }
  }
}

export class MultiLineEditor extends StringEditor {
  preBuild() {
    super.preBuild()
    this.options.input_width = '98%'
    this.options.format = 'textarea' /* Force format into "textarea" */
  }

  build() {
    super.build()
  }

  postBuild() {
    super.postBuild()
  }

  setValue(value, initial) {
    if (value) {
      console.log(25, value)
      this.value = value.join('\n')
      this.input.value = this.value
      // const changed = this.getValue() !== value
      // this.refreshValue()
      // this.onChange(changed)
      // super.setValue(value, initial)
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
    console.log(36, this.value)
    console.log(37, this.options.multiType)

    if (this.options.multiType) {
      let arr = this.cleanArr(realValue.split('\n'))
      let valid = arr.every(child => {
        return typeMap[this.options.multiType].test(child)
      })
      if (!valid) {
        console.error('value contains invalid data')
        return undefined
      }
      realValue = arr.map(child => {
        return typeMap[this.options.multiType].handle(child)
      })
    }
    return realValue
  }

  enable() {
    super.enable()
  }

  disable(alwaysDisabled) {
    super.disable(alwaysDisabled)
  }

  destroy() {
    super.destroy()
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
