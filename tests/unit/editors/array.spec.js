import { JSONEditor } from '../../../src/core'

const fixture = [
  {
    title: 'Array Editor Test',
    schema: {
      type: 'array',
      items: {
        type: ['boolean', 'string', 'null', 'number']
       }
    },
    value: [false]
  },
  {
    title: 'Array Editor Test',
    schema: {
      type: 'array',
      items: {
        type: ['boolean', 'string', 'null', 'number']
       }
    },
    value: ['']
  },
  {
    title: 'Array Editor Test',
    schema: {
      type: 'array',
      items: {
        type: ['boolean', 'string', 'null', 'number']
       }
    },
    value: [0]
  }
]

describe('Array Editor', () => {
  let element
  let editor

  beforeEach(() => {
    document.body.insertAdjacentHTML(
      'afterbegin',
      '<div id="fixture"></div>')
    element = document.getElementById('fixture')
  })

  afterEach(() => {
    editor.destroy()
  })

  fixture.forEach(spec => {
    it(spec.title, () => {
      editor = new JSONEditor(element, {
        schema: spec.schema
      })
      editor.setValue(spec.value);
      expect(editor.getValue()).toEqual(spec.value)
    })
  })
})
