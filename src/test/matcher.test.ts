import {describe, expect, test} from '@jest/globals';
import { sum } from './sum';

describe('sum module', () => {
  test('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3);
  });
});

/**
 * toBe 是使用Object.is进行匹配
 */
test('对象测试', () => {
  const data: Record<string, any> = { one: 1 }
  data['two'] = 2;

  expect(data).toEqual({ one: 1, two: 2})
  // expect(data).toBe({ one: 1, two: 2})
})


// not是相反的
test('adding positive numbers is not zero', () => {
  for (let a = 1; a < 10; a++) {
    for (let b = 1; b < 10; b++) {
      expect(a + b).not.toBe(0)
    }
  }
})

/**
 * 真值
 * toBeNull 只匹配 null
 * toBeUndefined 只匹配 undefined
 * toBeDefined 与 toBeUndefined 相反
 * toBeTruthy 匹配任何 if 语句为真
 * toBeFalsy 匹配任何 if 语句为假
 */
test('null', () => {
  const n = null;

  expect(n).toBeNull()
  expect(n).toBeDefined()
  expect(n).not.toBeUndefined()
  expect(n).not.toBeTruthy()
  expect(n).toBeFalsy()
})

test('zero is Truthy', () => {
  const n = 0;
  
  expect(n).not.toBeTruthy()
  expect(n).toBeFalsy()
  expect(n).not.toBeUndefined()
  expect(n).toBeDefined()
  expect(n).not.toBeNull()
})

/**
 * Number: 比较数字有相应的匹配器
 */
test('two plus two', () => {
  const value = 2 + 2;

  expect(value).toBeGreaterThan(3)
  expect(value).toBeGreaterThanOrEqual(3.5)
  expect(value).toBeLessThan(5)
  expect(value).toBeLessThanOrEqual(4.5)

  // toBe and toEqual are equivalent for numbers
  expect(value).toBe(4)
  expect(value).toEqual(4)
})

// use toBeCloseTo insteadof toEqual, because Floating-point numbers have errors
test('两个浮点数字相加', () => {
  const value = 0.1 + 0.2;

  // expect(value).toBe(0.3) // NOTE Error
  expect(value).toBeCloseTo(0.3)
})

/**
 * String: 使用toMatch进行正则匹配
 */
test('there is no I in team', () => {
  expect('team').not.toMatch(/I/)
  // expect('team').toMatch(/I/) // NOTE Error
})

test('but there is a "stop" in Christoph', () => {
  expect('Christopn').toMatch(/stop/)
})

/**
 * Array and iterables：use `toContain` if it contains a particular item
 */
test('shoppingList数组中包含milk', () => {
  const shoppingList = [
    'diapers',
    'kleenex',
    'trash bags',
    'paper towels',
    'milk'
  ]

  expect(shoppingList).toContain('milk')
  expect(new Set(shoppingList)).toContain('milk')
})


/**
 * Exceptions: If you wang test wheather particular function throw an error when it's called, use `toThrow`
 */

function compileAndroidCode() {
  throw new Error('you are using the wrong JDK!')
}

test('compiling android goes as expected', () => {
  expect(() => compileAndroidCode()).toThrow()
  expect(() => compileAndroidCode()).toThrow(Error)

  expect(() => compileAndroidCode()).toThrow('you are using the wrong JDK')
  expect(() => compileAndroidCode()).toThrow(/JDK/)

  // expect(() => compileAndroidCode()).toThrow(/^you are using the wrong JDk$/) // NOTE There's a "!" missing from the end
  expect(() => compileAndroidCode()).toThrow(/^you are using the wrong JDK!$/)

})
