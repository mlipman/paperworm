'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
	
	//$("#welcomeModal").modal('show');
	//$("#tutorialModal").modal('show');

	rangy.init();
    
    //equalHeight($(".thumbnail")); 
    //equalHeight($(".caption").children("h3"));

    showPageNumber();
    var flagg = $('#flagForJS').text();
    if (flagg=="true") {
    	$('#searchDict').click(askForLookUp);	
    } else {
    	$('#searchDict').click(lookUpSelected);
    }

	var highlighter = rangy.createHighlighter();

	var callbackProxy = function(dataFromServer) {
	  callbackFunc(dataFromServer, highlighter);
	};
	var pathArray = document.location.pathname.split("/");
	if (pathArray.length > 2) {
		var paperName = pathArray[2];
		$.getJSON("/serializedString/"+paperName, callbackProxy);
	}
	

	var serializedHighlights = highlighter.serialize();
	var currentPNumber = 1; //current paragraph number
	var currentPage = 1; //current page number

	$('#submitBtn-note').click(ajaxAddNote);
	$('#submitBtn-hi').click(ajaxAddHighlight);

	$('#addNoteButton').click(function(e) {
		e.preventDefault();
		$('#pageNum').val(currentPage);
		$('#pNum').val(currentPNumber);
		$('#bod').val("");
	});

	$('#addHighlightButton').click(function(e) {
		e.preventDefault();
		addHighlight(highlighter, serializedHighlights, currentPNumber, currentPage);
		console.log("me");
	});

    $('.edit-obj-note').click(function(e){
        e.preventDefault();
        console.log("in click edit-obj-note");
        var str = "";
        var text = "";
        var curr = e.target.parentNode.parentNode.parentNode.parentNode.parentNode;
        console.log(curr.className);
        for (var i=0; i<curr.childNodes.length; ++i){
            if(curr.childNodes[i].className == "collapse" || curr.childNodes[i].className == "in"){
                str = curr.childNodes[i].id.substring(8);
                text = curr.childNodes[i].childNodes[1].childNodes[1].innerHTML;
            }else if (curr.childNodes[i].className == "panel-body"){
                str = curr.childNodes[i].id.substring(8);
                text = curr.childNodes[i].childNodes[1].innerHTML;
            }
        }
        editNote(Number(str.split("x")[0]), Number(str.split("x")[1]), text);
    });
    $('.edit-obj-hi').click(function(e){
        e.preventDefault();
        var str = "";
        var text = "";
        var high = "";
        var curr = e.target.parentNode.parentNode.parentNode.parentNode.parentNode;
        for (var i=0; i<curr.childNodes.length; ++i){
            if(curr.childNodes[i].className == "collapse" || curr.childNodes[i].className == "in"){
                str = curr.childNodes[i].id.substring(13);
                high = curr.childNodes[i].childNodes[1].childNodes[1].childNodes[0].innerHTML;
                text = curr.childNodes[i].childNodes[3].childNodes[1].innerHTML;
            }else if (curr.childNodes[i].className == "panel-body"){
                str = curr.childNodes[i].id.substring(13);
                high = curr.childNodes[i].childNodes[1].childNodes[3].innerHTML;
                text = curr.childNodes[i].childNodes[5].childNodes[1].innerHTML;
                console.log(curr.childNodes[i].childNodes.length)
            }
        }
        editHighlight(Number(str.split("x")[0]), Number(str.split("x")[1]), text, high);
    });
	$('.edit-obj-def').click(function(e){
		e.preventDefault();
        var str = "";
        var word = "";
        var def = "";
        var curr = e.target.parentNode.parentNode.parentNode.parentNode.parentNode;
        for (var i=0; i<curr.childNodes.length; ++i){
            if (curr.childNodes[i].className == "panel-body"){
                str = curr.childNodes[i].id;
                console.log(str);
                word = curr.childNodes[i].childNodes[1].innerHTML;
                def = curr.childNodes[i].childNodes[3].innerHTML;
            }
        }
        editDefinition(str, word, def);
	});
	$('#deleteHighlightButton').click(function(e) {
		e.preventDefault();
		//var sel = rangy.getSelection();
		highlighter.unhighlightSelection();
		serializedHighlights = highlighter.serialize();
		console.log(serializedHighlights);
		//data['serializedHistory'] = serializedHighlights;
		//TODO: update mongodb with /editSS/paper?sstring="serializedHighlights".............................................................................
		//models.Papers.update({"details.name" : paper}, {$set: {"serializedString": serializedHighlights}});
	});

	//Determine id of the current selected text
	$('.text-para').on('touchstart mousedown', function(e) {
		var currentHilightID = e.target.id;
		var pageNumIndex = 'pageNum'.length;
		var xIndex = currentHilightID.indexOf('x');
		currentPage = currentHilightID.substring(7, xIndex);
		currentPNumber = currentHilightID.substring(xIndex+1);
		console.log(currentHilightID);
		console.log("Page "+currentPage);
		console.log("Para "+currentPNumber);
	});

	/*
	$('.text-para').mousedown(function(e) {
		var currentHilightID = e.target.id;
		var pageNumIndex = 'pageNum'.length;
		var xIndex = currentHilightID.indexOf('x');
		currentPage = currentHilightID.substring(7, xIndex);
		currentPNumber = currentHilightID.substring(xIndex+1);
		console.log(currentHilightID);
		console.log("Page "+currentPage);
		console.log("Para "+currentPNumber);
	});
	*/
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

	//GOOGLE ANALYTICS HERE
	//add notes/highlight
	/*
	$("#submitBtn-note").click(function(){
		ga("send", "event", "addNote", "click");
		//TODO: get paragraph number
	});
	$("#submitBtn-hi").click(function(){
		ga("send", "event", "addAnno", "click");
		//TODO: get paragraph number
	});

	//click tool bar
	$("#addNoteButton").click(function(){
		ga("send", "event", "note", "click");
	});
	$("#searchDict").click(function(){
		//ga("send", "event", "lookupDef", "click"); //Taken care of below
	});
	$("#addHighlightButton").click(function(){
		ga("send", "event", "highlight", "click");
	});
	$("#deleteHighlightButton").click(function(){
		ga("send", "event", "unhighlight", "click");
	});
	
	//summary-page traversal
	$("#sum-to-read").click(function(){
		ga("send", "event", "sum-to-read", "click");
	});
	$("#read-to-sum").click(function(){
		ga("send", "event", "read-to-sum", "click");
	});
	//TODO: record time on page, taken care of by Google?
	*/
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
		$('#defModalBody').append(defHTML + "<p>No definition</p>");
	} else {
		var meanings = result['tuc'][0]['meanings'];
		for (var i = 0; i < meanings.length; i++) {
			defHTML += '<h5> Definition No. ' + (i + 1) + '</h5>' + 
				'<p>' + meanings[i]['text'] + '</p>';
		};
		console.log(defHTML);
		$('#defModalBody').append(defHTML);	
	}
}

//Show definition on the definition modal on read mode
function showDefinition2(result) {
	$('#defModalResults2').html("");
	console.log(result);
	console.log(result['tuc']);
	var defHTML = '<h4>' + result['phrase'] + '</h4>';
	if (result['tuc'] == undefined || result['tuc'].length == 0) {
		$('#defModalResults2').append(defHTML + "<p>No definition</p>");
	} else {
		var meanings = result['tuc'][0]['meanings'];
		for (var i = 0; i < meanings.length; i++) {
			defHTML += '<h5> Definition No. ' + (i + 1) + '</h5>' + 
				'<p>' + meanings[i]['text'] + '</p>';
		};
		console.log(defHTML);
		$('#defModalResults2').append(defHTML);	
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

	$('#sstring').val(serializedHighlights);
	$("#htext").val('"' + selectedText + '"');
	$("#pNumHi").val(currentPNumber);
	$("#page").val(currentPage);
	$("#ntext").val("");
	//TODO: update mongodb with /editSS/paper?sstring="serializedHighlights".............................................................................
	//models.Papers.update({"details.name" : paper}, {$set: {"serializedString": serializedHighlights}});
}

function editNote(pNum, iden, text){
    $(".iden-e").val(iden);
    $(".pNum-e").val(pNum);
    $(".oldpNum-e").val(pNum);
    $(".bod-e").val(text);
    console.log("end");
}

function editHighlight(pNum, iden, text, high){
    $(".iden-e").val(iden);
    $(".pNumHi-e").val(pNum);
    $(".oldpNum-e").val(pNum);
    $(".ntext-e").val(text);
    $(".htext-e").val(high);
    console.log("end");
}

function editDefinition(iden, word, def){
	$(".iden-e").val(iden);
	$(".word-e").val(word);
	$(".def-e").val(def);
	console.log(iden);
}
function showPageNumber(){
	var curPage = 1;
	var curPara = 1;
	var totalPages = $("#totalPages").text();
	var totalParagraphs = $("#totalParagraphs").text();
	totalPages = totalPages[totalPages.length - 1];
	console.log(totalPages);
	while (curPara <= totalParagraphs) {
		$("#pageNum"+curPage+"x"+curPara).html("<h5><center>Page " + curPage+"</center></h5>");
		while($("#pageNum"+curPage+"x"+curPara).length){
			curPara++;
		}
		curPage++;
		//console.log(curPage);
	};
}



function callbackFunc(data, highlighter) {
	var cssApplier = rangy.createCssClassApplier("highlightText");
	highlighter.addClassApplier(cssApplier);

	var serialString = data.val;
	
	if (serialString.length>0) {
		console.log("about to deserialize: " + serialString);
		highlighter.deserialize(serialString);
	} else {
		console.log("not deserializing bc ss is " + serialString);
	}

}


function trimString (str) {
    return str.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
}


function lookUpSelected(e) {
	e.preventDefault();
	var sel = rangy.getSelection();
	ga("send", "event", "lookupDef", "click");
	if (sel.rangeCount==0) {
		console.log("looking up blank word");
		ga("send", "event", "lookupDef", "blank"); //Google analytics
		var instructionHTML = "<p>Select a word before hitting the <span class=\"glyphicon glyphicon-search\"></span> button in order to get the definition</p>";
		$('#defModalBody').html(instructionHTML);
	} else {
		ga("send", "event", "lookupDef", "words");
		var range = sel.getRangeAt(0);
		var selectedText = range.text();
		selectedText = trimString(selectedText);
		console.log(selectedText);
		var lowercaseText = selectedText.toLowerCase();
		console.log(lowercaseText);
		if (selectedText.length > 0) {
			$('#defModalBody').html("");
			$.get("http://glosbe.com/gapi/translate?from=eng&dest=eng&format=json&pretty=true&phrase=" + 
			selectedText + "&callback=showDefinition", showDefinition, 'jsonp');
			if (selectedText != lowercaseText) {$.get("http://glosbe.com/gapi/translate?from=eng&dest=eng&format=json&pretty=true&phrase=" + 
			lowercaseText + "&callback=showDefinition", showDefinition, 'jsonp');}
		}
	}
}

function askForLookUp(e) {
	e.preventDefault();
	$('#defModalResults2').html("");
	var sel = rangy.getSelection();
	//ga("send", "event", "lookupDef", "click");
	if (sel.rangeCount==0) {
		//ga("send", "event", "lookupDef", "blank"); //Google analytics
		$('#lookUpButton').click(lookUp);
		// google event: clicked search button with no selection in readAlt
	} else {
		var selectedText = sel.getRangeAt(0).text();
		$('#lookUpWord').val(selectedText);
		$('#lookUpButton').click(lookUp);
		// google event: clicked search button after selection in readAlt

	}
	

}

function lookUp(e) {
	var selectedText = $('#lookUpWord').val();
	selectedText = trimString(selectedText);
	//console.log(selectedText);
	var lowercaseText = selectedText.toLowerCase();
	//ga("send", "event", "lookupDef", "words");
	//console.log(lowercaseText);
	if (selectedText.length > 0) {
		$('#defModalBody').html("");
		$.get("http://glosbe.com/gapi/translate?from=eng&dest=eng&format=json&pretty=true&phrase=" + 
		selectedText + "&callback=showDefinition2", showDefinition2, 'jsonp');
		if (selectedText != lowercaseText) {$.get("http://glosbe.com/gapi/translate?from=eng&dest=eng&format=json&pretty=true&phrase=" + 
		lowercaseText + "&callback=showDefinition2", showDefinition2, 'jsonp');}
	} 
};


function ajaxAddNote(e) {
	var destination = $('#addNoteAction').val();
	var paraNum = $('#pNum').val();
	var body = $('#bod').val();

	var dataString = 'pNum=' + paraNum + '&bod=' + body;
	$.post(destination, dataString, successAddNote);

	// destination is a url, app.js needs to register the route as a post (like app.js line 60)
	// dataString is in query format
	// pNum=54&bod=textetexttext&nextParam=examplee
	// in server code access 54 with query.body.pNum 
	// successAddNote is the callback function that is called in the browser after the server is done

	return false;

}

function successAddNote(data, textStatus, jqXHR) {
	$('.modal').modal('hide');
	location.reload();
}

function ajaxAddHighlight(e) {
	var destination = $('#addHighlightAction').val();
	var dataString = 'pNumHi=' + $('#pNumHi').val();
	dataString += '&htext=' + $('#htext').val();
	dataString += '&ntext=' + $('#ntext').val();
	dataString += '&sstring=' + $('#sstring').val();
	$.post(destination, dataString, successAddHighlight);
	return false;
}

function successAddHighlight(e) {
	$('.modal').modal('hide');
	location.reload();
}






