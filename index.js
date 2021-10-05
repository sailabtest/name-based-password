/**
* DO NOT MODIFY, I REPEAT, DO NOT MODIFY
**/

/**
* Gets an item from a safe
* @param {string} password - the password for the safe
* @returns {Promise} promise that resolves or rejects depending on whether the password is correct
*
*/
function getItemFromSafe(password) {
    const itemsMap = {
      '10-A-w-4-878': 'Magic Wand',
      '16-R-a-9-1497': 'The one ring to rule them all',
      '5-N-3-441': 'Corgi',
      '9-Y-d-2-643': 'Apples and Pears',
      '7-H-673': 'Oscar nomination',
      '12-D-l-4-860': 'Chocolate Brownie'
    }
    return new Promise((resolve, reject) => {
      if (itemsMap[password]) {
        resolve(itemsMap[password])
      } else {
        reject('Unauthorised access to safe')    
      }
    })
  }
/** 
 * END DO NOT MODIFY 
 **/

async function unlockSafe(customerName) {
  let password = generatePassword(customerName);
  return getItemFromSafe(password);
};

/**
 * remove duplicate and empty space from name
 * @param {*} fullname 
 * @returns {string} duplicate chars removed from name
 */
function removeDuplicateNameChars(fullname){
  //let duplicateRemoved = [...new Set(Array.from(fullname.toLowerCase()))].join('');
  let chars = Array.from(fullname);
  duplicateRemoved = chars.reduce((result, value) => {
     if(result.every(other => other.toLowerCase() !== value.toLowerCase())){
       result.push(value);
     }
     return result;
  }, []);

  duplicateRemoved = duplicateRemoved.join('');//back to text from array


  //blank space to remove
  duplicateRemoved = duplicateRemoved.replace(/ /g, '');
  return duplicateRemoved;
}

/**
 * Get UTF-8/16 character codes of text for example character codes of 'Sailab Rahimi' will be [115, 97, 105, 108, 97, 98, 32, 114, 97, 104, 105, 109, 105].
 * @param {string} fullname 
 * @returns {Array} list of char codes for each char in text
 */
function getTextCharCodes(fullname){
  //Replace every character from step 2 with its lowercase UTF-8/16 character code
  let charCodes = [];
  for (let index = 0; index < fullname.length; index++) {
    let charCode = fullname.toLowerCase().charCodeAt(index);
    charCodes.push(charCode);   
  }
  return charCodes;
}

/**
 * Generate password from fullname. We assume fullname should always have two sections, first and last name.
 * @param {*} customerName 
 * @returns {any} false on invalid fullname otherwise text representing password.
 */
function generatePassword(customerName) {
  let validate = (n) => {
    let word = n.trim(); 
    word = word.split(" ");
    if (word.length !== 2) return false;
    return word;
  }
  let nameArray = validate(customerName);
  if(!nameArray) return false;

  let firstName = nameArray[0];
  let lastName = nameArray[1];
  let fullname = firstName + ' ' + lastName;

  //lenth of first name & last name
  let section1 = firstName.length + lastName.length;
  //captialised last letter of the first name
  let section2 = firstName.substr(firstName.length - 1, 1).toUpperCase(); 
  //The lowercasefirst character of the last name
  let section3 = lastName.substr(0, 1).toLowerCase();
  //The total number of vowels (a, e, i, o, u) in the fullname
  let section4 = fullname.match(/[a,e,i,o,u]/g).length;

  //remove duplicate from name
  let duplicateRemoved = removeDuplicateNameChars(fullname);

  //Replace every character from step 2 with its lowercase UTF-8/16 character code
  let charCodes = getTextCharCodes(duplicateRemoved);
  //The output from step 3 added together 
  let section5 = charCodes.reduce((a,b) => a+b, 0);

  let password = section1+'-'+section2+'-'+section3+'-'+section4+'-'+section5;
  return password;
}

module.exports = {unlockSafe, removeDuplicateNameChars, generatePassword, getTextCharCodes}