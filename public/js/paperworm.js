'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
	/*$('.friend-name').click(function(e) {
		e.preventDefault()
		var header = $(this).children()[0]
		var anagram = anagrammedName($(header).text());
		$(header).text(anagram)
	});*/

	rangy.init();
    
    //equalHeight($(".thumbnail")); 
    //equalHeight($(".caption").children("h3"));

    showPageNumber();

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

	var highlighter = rangy.createHighlighter();
	var serializedHighlights = highlighter.serialize();
	var currentPNumber = 1; //current paragraph number
	var currentPage = 1; //current page number

	$('#addNoteButton').click(function(e) {
		e.preventDefault();
		$('#pageNum').val(currentPage);
		$('#pNum').val(currentPNumber);
	});

	$('#addHighlightButton').click(function(e) {
		e.preventDefault();
		addHighlight(highlighter, serializedHighlights, currentPNumber, currentPage);
	});

	$('#deleteHighlightButton').click(function(e) {
		e.preventDefault();
		//var sel = rangy.getSelection();
		highlighter.unhighlightSelection();
		serializedHighlights = highlighter.serialize();
		console.log(serializedHighlights);
		//data['serializedHistory'] = serializedHighlights;
	});

	//Determine id of the current selected text
	$('.text-para').mousedown(function(e) {
		var currentHilightID = e.target.id;
		var pageNumIndex = 'pageNum'.length;
		var xIndex = currentHilightID.indexOf('x');
		currentPage = currentHilightID.substring(7, xIndex);
		currentPNumber = currentHilightID.substring(xIndex+1);
		console.log(currentHilightID);
		console.log("Page: "+currentPage);
		console.log("Para: "+currentPNumber);
	});

})

/*function equalHeight(group) {   
	console.log("caf") ;
    var tallest = 0;    
    group.each(function() {       
        var thisHeight = $(this).height();       
        if(thisHeight > tallest) {          
            tallest = thisHeight;       
        }    
    });    
    group.each(function() { $(this).height(tallest); });
} */


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

//Show definition on the definition modal on read mode
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

function addHighlight(highlighter, serializedHighlights, currentPNumber, currentPage){
	var sel = rangy.getSelection();
	console.log(sel);
	var range = sel.getRangeAt(0);
	console.log(range);
	var selectedText = range.text();
	console.log(selectedText);
	var cssApplier = rangy.createCssClassApplier("highlightText");
	highlighter.addClassApplier(cssApplier);
	highlighter.highlightSelection("highlightText");
	serializedHighlights = highlighter.serialize();
	//console.log(serializedHighlights);
	//data['serializedHistory'] = serializedHighlights;
	$("#htext").val('"' + selectedText + '"');
	$("#pNumHi").val(currentPNumber);
	$("#page").val(currentPage);
}



function showPageNumber(){
	var curPage = 1;
	var curPara = 1;
	var totalPages = $("#totalPages").text();
	var totalParagraphs = $("#totalParagraphs").text();
	totalPages = totalPages[totalPages.length - 1];
	console.log(totalPages);
	while (curPara <= totalParagraphs) {
		$("#pageNum"+curPage+"x"+curPara).html("<h5><center>Page: " + curPage+"</center></h5>");
		while($("#pageNum"+curPage+"x"+curPara).length){
			curPara++;
		}
		curPage++;
		//console.log(curPage);
	};
}