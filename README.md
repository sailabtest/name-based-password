A simple app that will generate password based on the customers name
----
The password structure is as follows:

__Section 1__
The first name length added to the last name length.
  i.e. `'David Lindley' = 5 + 7 = 12`
  
__Section 2__
  The captialised last letter of the first name
  i.e. `'David Lindley' = 'D'`
  
__Section 3__
  The lowercasefirst character of the last name
  i.e. `'David Lindley' = 'l'`
  
__Section 4__
  The total number of vowels (a, e, i, o, u) in the full name
  i.e. `'David Lindley' = 4`
  
__Section 5__
  A hash of the name based on the following:
  1. Any duplicate characters removed
  i.e. `'David Lindley' = 'Davi Lney'`
  2. Remove any blank spaces from step 1
  i.e. `'Davi Lney' = 'DaviLney'`
  3. Replace every character from step 2 with its lowercase UTF-8/16 character code
  i.e. `'DaviLney' = [100, 97, 118, 105, 108, 110, 101, 121]`
  4. The output from step 3 added together:
  i.e. `100 + 97 + 118 + 105 + 108 + 110 + 101 + 121 = 860`
  The output from step 4 is the code for Section 5
  
__Example password__
  `'David Lindley' = '12-D-l-4-860'`
  ------
  
__Handling edge cases__
  If for any reason a full name cannot satifisy the conditions to create the output, then the entire section should be skipped. 
  -----
__Using the password__
  Once you have generated a password, to get the items from the safe you should use the predefined function:
  `getItemFromSafe(password)` 
 This function returns a promise (as opening the safe could take time), it will resolve with the item or rejcect with a error message. 
  The item or the error message should then be returned from your function in order to check the safe is working correctly.

  -----
__Testing your work__
Suite of Jest tests used to assist you with testing your input. Feel free to add to these if it adds value.

To run these tests, first install the dependencies with 

`npm install`

Then trigger the suite with:

`npm test`
  
