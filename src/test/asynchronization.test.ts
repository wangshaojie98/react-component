import {expect, test} from '@jest/globals';


const fetchData = () => new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('peanut butter')
  }, 200)
})

const fetchDataWithError = () => new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('error')
  }, 200)
})

const fetchDataWithCb = (cb: (error: any, data: any) => void) => {
  setTimeout(() => {
    cb('error cb', 'peanut butter')
  })
}
/**
 * Promise
 */
test('the data is peanut butter', () => {
  return fetchData().then(data => {
    expect(data).toBe('peanut butter');
  });
})


/**
 * Async / Await
 */
test('the data is peanut butter for async', async () => {
  expect.assertions(1) // 必须经过一次expect，否则不通过

  try {
    const data = await fetchDataWithError();
    expect(data).toMatch('error')
  } catch (error) {
    // eslint-disable-next-line jest/no-conditional-expect
    expect(error).toMatch('error')
  }
})

test('the data is peanut butter for async resolve', async () => {
  await expect(fetchData()).resolves.toBe('peanut butter')
})

// test('the fetch fails with an error', async () => {
//   await expect(fetchData()).rejects.toMatch('error')
// })


/**
 * 回调
 */
test('the data is peanut butter with callback', () => {
  function callback(error: any, data: any) {
    // console.log('callback: ', data); // 不会执行
    if (error) {
      throw error;
    }

    expect(data).toBe('peanut butter')
  }

  fetchDataWithCb(callback)
})

test('the data is peanut butter with callback1', (done) => {
  function callback(error: any, data: any) {
    if (error) {
      done(error)
      return
    }

    try {
      expect(data).toBe('peanut butter')
      done()
    } catch (error: any) {
      done(error)
    }
  }

  fetchDataWithCb(callback)
})
