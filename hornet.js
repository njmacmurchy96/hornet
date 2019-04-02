// ==UserScript==
// @name     		Hornet
// @namespace 	https://github.com/njmacmurchy96
// @version  		1.3
// @author      Noah MacMurchy
// @description Adds a button that allows you to get the answer(s) of the question currently selected.
// @include  	  https://monarch.aop.com/*
// @run-at 			document-end
// ==/UserScript==

// Create our window to our URL/source w/ '_blank' to avoid popup blocking or other JS issues
// TODO: Update width and height based on iframe size
function createWindow(source) {
    let win = window.open(source,
        '_blank',
        'status=no,location=no,toolbar=no,menubar=no,width=800,height=500');
    win.focus();
}

// Function to shorten some code and increase readability
function getFrameBody(id) {
    return document.getElementById(id).contentDocument.body;
}

function createAnswerButton(source) {
  	// Create a button using a div but use an event listener on `click`.
    let button = document.createElement("div");
    button.id = "getAnswer";
    button.innerText = 'Get Answer';
    // Copy the css/style of the buttons in the same navbar.
    button.setAttribute('class', 'ms ms-right');
    button.addEventListener('click', function() {
        // Get the selected question # to get the answer for from the questionFrame. (e.g. 1, 2, 3...)
        let current_problem = getFrameBody('questionFrame').getElementsByClassName('mon-question-current')[0].innerHTML;
        let url = '/curriculum/question/168862126/' + current_problem;
        let data = '?correct_answer_button=View+Correct+Answer&ajax=true';
      
        // Concatenate the oobtained question # w/ the hard-coded answer link
				let answerUrl = 'https://monarch.aop.com' + url + data
        
        // Create a new window which now will have the answer to the question (even if it hasnt been answered/solved)
        createWindow(answerUrl);
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
            frames[i].addEventListener('load', function() {
                // Check if "Get Answer" button already created.
                if (document.getElementById('getAnswer') != undefined)
                    return;
								
              	// Create instance of the answer button.
                let button = createAnswerButton();
                // Get the navbar we're going to insert the button into.
                let navbar = document.getElementById('learn-submenu');
								// Append the button to the navbar located right by the "Read" and "Questions" buttons.
                navbar.appendChild(button);
            });
        }
    }
});
