// html-to-js.js by Way Chan
var Html2Js = (function(){
	var longIndent = "                                                                                ",
		indentScale = 1,lineSeparator = "\n",
		initModule,fromHtmlToJs,processLine,indexOfFirstCharNot;
	
	initModule = function(props){
		if(props.indentScale !== void(0) && props.indentScale !== null){
			indentScale = props.indentScale;
		}
		if(props.lineSeparator == "\n" || props.lineSeparator == "\r\n"){
			lineSeparator = props.lineSeparator;
		}
		return true;
	};
	
	indexOfFirstCharNot = function(str,ch){
		var index = -1,i;
		for(i=0;i<str.length;i++){
			if(str[i] != ch){
				index = i;
				break;
			}
		}
		return index;
	};
	
	processLine = function(line){
		var quote = "\\\"";
		return line.replace(/[\\]*\"/g,quote).replace(/$ +/,"").replace(/> +/g,">").replace(/ +</g,"<").replace(/ +/g," ");
	};

	fromHtmlToJs = function(html){
		var oriLines = html.split(/\n|\r\n/g);
		var indents = [];
		var newLines = [];
		var i,k=0,start=false,curOriLine,curNewLine,indent,indentLen,lastIndent,js;
		for(i=0;i<oriLines.length;i++){
			curOriLine = oriLines[i].replace(/\t/g," ");
			if(curOriLine.replace(/ +/g,"").length == 0){//skip empty line
				continue;
			}
			if(!start){//push first non-empty line into the array of new lines, with no other conditions
				indents[k] = 0;
				newLines[k] = processLine(curOriLine);
				lastIndent = 0;
				k++;
				start = true;
				continue;
			}
			// begin to get the indent length of the cur line
			indentLen = indexOfFirstCharNot(curOriLine," ");
			if(indentLen == -1){
				continue;
			}
			// a line can be considered a independent line when it starts with '<'(leave alone the indent space),
			// otherwise we treat it as a appended part of the previous line.  
			if(curOriLine[indentLen] !== void(0) && curOriLine[indentLen] != "<"){
				newLines[k-1] = processLine(newLines[k-1]+" "+curOriLine);
			}else{
				newLines[k] = processLine(curOriLine);
				// here we compute the current line's mulriple of indents
				if(indentLen == lastIndent){
					indents[k] = indents[k-1];
				}else{
					indents[k] = indentLen > lastIndent?indents[k-1]+1:indents[k-1]-1;
				}
				k++;
			}
			lastIndent = indentLen;
		}
		// start to build the resulted JS code line by line. 
		js = "";
		for(i=0;i<newLines.length;i++){
			js += longIndent.substring(0,indents[i]*indentScale)+"+\""+newLines[i]+"\""+lineSeparator;
		}
		if(js.length > 0){
			js = js.substring(js.indexOf("+")+1,js.lastIndexOf(lineSeparator))+";";
		}else{
			js = "\"\";";
		}
		js = "var foo = "+js;
		return js;
	};
	
	return {
		initModule:initModule,
		fromHtmlToJs:fromHtmlToJs
	}
	
}());
