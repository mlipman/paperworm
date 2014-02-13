'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
	$('.friend-name').click(function(e) {
		e.preventDefault()
		var header = $(this).children()[0]
		var anagram = anagrammedName($(header).text());
		$(header).text(anagram)
	});

	$("#makeNoteButton").click(showNoteBox);
	$("#makeDefnButton").click(showDefnBox);
	$("#makeHighlightButton").click(showHighlightBox);

	$("#addNoteForm").hide();
	$("#addDefinitionForm").hide();
	$("#addHighlightForm").hide();




    equalHeight($(".thumbnail")); 
    equalHeight($(".caption").children("h3"));

	//$('#paperToRead').load('SchragerSieglerText.html');
})

function equalHeight(group) {   
	console.log("caf") ;
    var tallest = 0;    
    group.each(function() {       
        var thisHeight = $(this).height();       
        if(thisHeight > tallest) {          
            tallest = thisHeight;       
        }    
    });    
    group.each(function() { $(this).height(tallest); });
} 


/*
 * Function that is called when the document is ready.
 */
function initializePage() {
	console.log("Javascript connected!");
}

function showNoteBox(e) {
	$("#addNoteForm").toggle();
	$("#addDefinitionForm").hide();
	$("#addHighlightForm").hide();

}

function showDefnBox(e) {
	$("#addNoteForm").hide();
	$("#addDefinitionForm").toggle();
	$("#addHighlightForm").hide();

}

function showHighlightBox(e) {
	$("#addNoteForm").hide();
	$("#addDefinitionForm").hide();
	$("#addHighlightForm").toggle();
	
}
