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

	/*$("#makeNoteButton").click(showNoteBox);
	$("#makeDefnButton").click(showDefnBox);
	$("#makeHighlightButton").click(showHighlightBox);

	$("#addNoteForm").hide();
	$("#addDefinitionForm").hide();
	$("#addHighlightForm").hide();*/

    equalHeight($(".thumbnail")); 
    equalHeight($(".caption").children("h3"));

    $('#searchDict').click(function(e) {
    	e.preventDefault();
    	var sel = rangy.getSelection();
		var range = sel.getRangeAt(0);
		var selectedText = range.text();
		console.log(selectedText);
		if (selectedText.length > 0) {
			$.get("http://glosbe.com/gapi/translate?from=eng&dest=eng&format=json&pretty=true&phrase=" + 
			selectedText + "&callback=showDefinition", showDefinition, 'jsonp');
		};
    });
	//$('#paperToRead').load('SchragerSieglerText.html');

	$('#addHighlightButton').click(function(e) {
		e.preventDefault();
		var sel = rangy.getSelection();
		var range = sel.getRangeAt(0);
		var selectedText = range.text();
		console.log(selectedText);
		var cssApplier = rangy.createCssClassApplier("highlightText");
		var highlighter = rangy.createHighlighter();
		highlighter.addClassApplier(cssApplier);
		highlighter.highlightSelection("highlightText", sel);
		var serializedHighlights = highlighter.serialize();
		console.log(serializedHighlights);
		//data['serializedHistory'] = serializedHighlights;
	});
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
	
	if (name == "Doug Engelbart") {
		return "Notable Grudge";
	} 
	else if (name == "Ivan Sutherland") {
		return "Vandal Heist Run";
	}
	else if (name == "JCR Licklider") {
		return "Crick Rid Jell";
	}
	else if (name == "Vannevar Bush") {
		return "Ravens Van Hub";
	}
	else if (name == "Alan C. Kay") {
		return "Canal Yak";
	}
	else if (name == "Allen Newell") {
		return "Ellen All New";
	}
	else if (name == "Lucy Suchman") {
		return "Lunacy Chums";
	}
	else if (name == "Grace Hopper") {
		return "Gear Chopper";
	}
	else {
		console.log(name + " not known for anagramming.");
		return name;
	}
}

//Show defnition on the definition modal on read mode
function showDefinition(result) {
	console.log(result);
	console.log(result['tuc']);
	var defHTML = '<h4>' + result['phrase'] + '</h4>';
	if (result['tuc'] == undefined || result['tuc'].length == 0) {
		$('#defModalBody').html(defHTML + "<p>No definition</p>");
	} else {
		var meanings = result['tuc'][0]['meanings'];
		for (var i = 0; i < meanings.length; i++) {
		defHTML += '<h5> Definition No. ' + (i + 1) + '</h5>' + 
		'<p>' + meanings[i]['text'] + '</p>';
		};
		console.log(defHTML);
		$('#defModalBody').html(defHTML);	
	}
}