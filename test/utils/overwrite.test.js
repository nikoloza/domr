import { overwriteDeep } from '../../src/utils/object'

test('should overwrite object with new properties', () => {
  const element = {
    tag: 'button',
    style: {
      backgroundColor: 'white',
      color: 'black',
      outline: 0
    },
    icon: {
      style: {
        fill: 'black'
      }
    },
    text: 'Button'
  }

  const update = {
    style: {
      backgroundColor: 'green',
      color: 'white'
    },
    text: 'Submit'
  }

  overwriteDeep(element, update)

  expect(element).toStrictEqual({
    tag: 'button',
    style: {
      backgroundColor: 'green',
      color: 'white',
      outline: 0
    },
    icon: {
      style: {
        fill: 'black'
      }
    },
    text: 'Submit'
  })
})
