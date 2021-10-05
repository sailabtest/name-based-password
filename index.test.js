const safe = require('./index')
//import safe from './index';

describe('Suite of tests for functions helping to generate password.', () => {

  test('Test removeDuplicateNameChars', () => {
    expect(safe.removeDuplicateNameChars("David Lindley")).toBe("DaviLney")
  })

  test('Test getTextCharCodes', () => {
    expect(safe.getTextCharCodes("DaviLney")).toEqual([100, 97, 118, 105, 108, 110, 101, 121])
  })

})

test('Test generatePassword', () => {
    expect(safe.generatePassword('David Lindley')).toBe("12-D-l-4-860")
    //expect(safe.getTextCharCodes("DaviLney")).toStrictEqual(100)
})


describe('Suite of tests on unlockSafe', () => {
    it.each`
      user              | password
      ${'Donald Trump'} | ${'Unauthorised access to safe'}
      ${'Emma Watson'}  | ${'Magic Wand'}
      ${'Gwynyth'}      | ${'Oscar nomination'}
      ${'Queen'}        | ${'Corgi'}
      ${'David Lindley'}        | ${'Chocolate Brownie'}
    `('should return password of "$password" for user "$user"', async ({ user, password }) => {
      expect(await safe.unlockSafe(user)).toBe(password)
    })
})