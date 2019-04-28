// ==UserScript==
// @name          Hornet
// @namespace     https://github.com/njmacmurchy96/hornet
// @version       2.1
// @author        Noah MacMurchy
// @description   Adds a button that allows you to get the answer(s) of the question currently selected.
// @include       https://monarch.aop.com/*
// @run-at        document-end
// ==/UserScript==

// Create our window to our URL/source w/ '_blank' to avoid popup blocking or other JS issues
// TODO: Update width and height based on iframe size
function createWindow(url) {
    let win = window.open(url,
                          '_blank',
                          'status=no,location=no,toolbar=no,menubar=no,width=845,height=430');
    win.focus();
}

// Function to shorten some code and increase readability
function getFrameBody(id) {
    return document.getElementById(id).contentDocument.body;
}

function createAnswerButton(curriculum) {
    // Create a button using a div but use an event listener on `click`.
    let button = document.createElement("div");
    button.id = "getAnswer";
    button.innerText = 'Get Answer';
    // Copy the css/style of the buttons in the same navbar.
    button.setAttribute('class', 'ms ms-right');
    button.addEventListener('click', function() {
        let questionFrame = getFrameBody('questionFrame');
        // Get the selected question # to get the answer for from the questionFrame. (e.g. 1, 2, 3...)
        let problem = questionFrame.getElementsByClassName('mon-question-current')[0].innerHTML;
        // Concatenate the oobtained question # w/ the hard-coded answer link
        let url = curriculum + '/' + problem + '?correct_answer_button=View+Correct+Answer&ajax=true';
        // Create a new window which now will have the answer to the question (even if it hasnt been answered/solved)
        createWindow(url);
    });

    return button;
}

addEventListener('DOMContentLoaded', function() {
    // Get every available iframe.
    let frames = document.getElementsByTagName('iframe');

    for (let i = 0; i < frames.length; i++) {
        // Check if the id is the questionFrame to get the current question and
        //  insert our button.
        if (frames[i].id === 'questionFrame') {
            // Wait for the questionFrame to finish loading for trying to grab or create anything.
            frames[i].addEventListener('load', function() {
                // Check if "Get Answer" button already created.
                if (document.getElementById('getAnswer') != undefined) return;
                // Get the current curiculum/lesson URL for the questions (returns full URL: https://monarch.aop.com)
                let curriculum = frames[i].src;
                // Create instance of the answer button
                // Pass the curriculum URL since in this loop is the most convienent to grab it.
                let button = createAnswerButton(curriculum);
                // Get the navbar we're going to insert the button into.
                let navbar = document.getElementById('learn-submenu');
                // Append the button to the navbar located right by the "Read" and "Questions" buttons.
                navbar.appendChild(button);
            });
        }
    }
});
