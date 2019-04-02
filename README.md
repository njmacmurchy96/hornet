# Hornet

#### What is it?
Hornet is a client-side JavaScript userscript created for homeschooling (online school) [Monarch](https://monarch.aop.com) that utilizes Greasemonkey (Firefox only) or Tampermonkey. Once all DOM elements have loaded, a "Get Answer" button is created that opens a window with the answer to the currently selected question. It cannot get the essay question answers as those are graded server side.

#### How do I install it?

- Ensure you've installed [Greasemonkey](https://addons.mozilla.org/en-US/firefox/addon/greasemonkey) for Firefox or [Tampermonkey](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo) for Chrome.
- [Tampermonkey](https://addons.mozilla.org/en-US/firefox/addon/tampermonkey) is also available for Firefox.
- Navigate to the `hornet.js` file (or click [here](https://github.com/njmacmurchy96/hornet/blob/master/hornet.js)) and copy its contents.
- Open the Tampermonkey/Greasemonkey dashboard.
- Click `New User Script` and place the script contents within the newly created script.
- You're all set!

#### How does it work?
On the *Lessons* page there exists an iframe named `questionFrame` which contains the direct URL to get the answer for the current curriculum and lesson. The first half is found in the `questionFrame` at the `src` property (`/curriculum/question/{9 digits}/`) and then a constant link with parameters is left open to the public eye (`?correct_answer_button=View+Correct+Answer&ajax=true`). Search for the iframe, create the button, add the event handler (to keep up to date when question selection changes), and you end up with this end result (screenshot below): `https://monarch.aop.com/curriculum/question/{9 digit curriculum id}/{current problem id}?correct_answer_button=View+Correct+Answer&ajax=true`

![Screenshot of Hornet in Action](https://i.imgur.com/BVuZc79.png)

#### TODO
- Find better method of structuring code.
- Implement jQuery.
- Heavily optimize to reduce initial load time.
- Organize hard-coded strings.
- Implement proper error checking—especially with `iframes`.  

#### Disclaimer
This was created for educational purposes; it was not made to abuse vulnerabilities, exploits, or otherwise mistakes left by the developers of [Monarch](https://monarch.aop.com).
