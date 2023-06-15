/**
 * Taken from jQuery 2.1.3
 *
 * #### NOTE
 * Not plain objects is,
 * - Any object or value whose internal [[Class]] property is not "[object Object]"
 * - DOM nodes
 * - window
 *
 * @param {Object} obj - Variable name
 * @returns {Boolean}
 */
export function isPlainObject(obj) {
    if (obj === null) return false

    if (typeof obj !== 'object' || obj.nodeType || obj === obj.window) return false

    if (obj.constructor && !hasOwnProperty(obj.constructor.prototype, 'isPrototypeOf')) return false

    /* Most likely |obj| is a plain object, created by {} or constructed with new Object */
    return true
}

export function deepCopy(target) {
    return isPlainObject(target) ? extend({}, target) : Array.isArray(target) ? target.map(deepCopy) : target
}

export function extend(destination, ...args) {
    args.forEach(source => {
        if (source) {
            Object.keys(source).forEach(property => {
                if (source[property] && isPlainObject(source[property])) {
                    if (!hasOwnProperty(destination, property)) destination[property] = {}
                    extend(destination[property], source[property])
                } else if (Array.isArray(source[property])) {
                    destination[property] = deepCopy(source[property])
                } else {
                    destination[property] = source[property]
                }
            })
        }
    })

    return destination
}

export function trigger(el, event) {
    const e = document.createEvent('HTMLEvents')
    e.initEvent(event, true, true)
    el.dispatchEvent(e)
}

/**
 * Helper function to locate a shadowRoot parent if at all
 *
 * @param {Element} node - Node
 */
export function getShadowParent(node) {
    return node && (node.toString() === '[object ShadowRoot]' ? node : getShadowParent(node.parentNode))
}

/**
 * Helper function to check own property key
 *
 * @see https://eslint.org/docs/rules/no-prototype-builtins
 */
export function hasOwnProperty(obj, key) {
    return obj && Object.prototype.hasOwnProperty.call(obj, key)
}

// From https://github.com/angular/angular.js/blob/master/src/ng/directive/input.js
const NUMBER_REGEXP = /^\s*(-|\+)?(\d+|(\d*(\.\d*)))([eE][+-]?\d+)?\s*$/

export function isNumber(value) {
    if (typeof value === 'undefined' || value === null) return false
    const match = value.match(NUMBER_REGEXP)
    const v = parseFloat(value)
    return match !== null && !isNaN(v) && isFinite(v)
}

const INTEGER_REGEXP = /^\s*(-|\+)?(\d+)\s*$/

export function isInteger(value) {
    if (typeof value === 'undefined' || value === null) return false
    const match = value.match(INTEGER_REGEXP)
    const v = parseInt(value)
    return match !== null && !isNaN(v) && isFinite(v)
}

// 将日期格式的字符串转为时间戳
export function dateStr2timestamp(value) {
    if (typeof value !== 'string') {
        return
    }
    let str = value
    // 将 safari 不支持的日期格式转换（使用 T 检测来避免过度处理）
    // safari 支持 '1970-01-01T00:00:00' 和 '1970/01/01 00:00:00'，不支持 '1970.01.01 00:00:00'
    if (!value.includes('T')) {
        str = value.replace(/-/g, '/')
    }
    let timestamp = new Date(str).getTime()
    return timestamp
}

// 安全读取对象深度嵌套的属性，遇到不存在的属性会返回 undefined，避免报错
export function getProp(target, path) {
    return path.split('.').reduce((obj, key) => {
        return obj && obj[key]
    }, target)
}

// 通过相对 path 获取当前对应的路径（用于 dependencies 字段）
export function getRelativePath(relativePath, currentPath, editor) {
    let pathParts = relativePath.split('.')
    let first = pathParts.shift()
    let self = editor.getEditor(currentPath)
    if (!self) {
        return ''
    }
    let selfRoot = self.theme.closest(self.container, `[data-schemaid="${first}"]`)
    let adjustedPath = `${selfRoot.getAttribute('data-schemapath')}.${pathParts.join('.')}`
    return adjustedPath
}

// 通过相对 path 获取当前对应的元素（用于 relativeTo 字段）
export function getRelativeEditor(relativeObj, path, editor) {
    let adjustedPath = getRelativePath(relativeObj.path, path, editor)
    return editor.getEditor(adjustedPath)
}

// 通过 path 获取对象嵌套属性中的数组并将其扁平化（用于 uniqueItems 字段）
export function flatArrByPath(data, path) {
    let paths = path.split('.')

    return paths.reduce((result, prop) => {
        if (Array.isArray(result)) {
            return result.reduce((arr, item) => {
                let realItem = item ? item[prop] : []
                return arr.concat(realItem)
            }, [])
        } else {
            return result[prop] || []
        }
    }, data)
}

// multiline 支持的三种数据类型检测和处理方法
export const typeMap = {
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
            return !isNaN(v - parseFloat(v))
        },
        handle: v => {
            return parseFloat(v)
        }
    },
    boolean: {
        test: v => {
            return v === true || v === false
        },
        handle: v => {
            if (v === 'true') {
                return true
            } else if (v === 'false') {
                return false
            }
            return v
        }
    }
}
