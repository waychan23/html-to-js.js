***** html-to-js.js *****
Description:

This is merely a very basic string processing util used for converting HTML into Javascript code.
I developed this at the time i was learning how to build a single-page-application. One of the most straightforward functions of the tool is to convert HTML template code into Javascript code of concatenating strings across multiple lines.
There must be some bugs in this small script or more advanced implementation for this purpose. Please let me know if you get one :)

*************************
Example:
...
<body>
...
<textarea id="htmlArea"></textarea>
<textarea id="jsArea"></textarea>
<button onclick="convert()">Convert HTML into JS</button>
...
<script type="text/javascript" src="html-to-js.js"></script>
<script type="text/javascript">
 
 Html2Js.initModule({indentScale:2,lineSeparator:"\n"});
 
 function convert(){
  var htmlCode = document.getElementById("htmlArea").value;
  var jsCode = Html2Js.fromHtmlToJs(htmlCode);
  document.getElementById("jsArea").value = jsCode;
 }

</script>
...
</body>
...
*************************
API:

1. Html2Js : Global Module Object
 * methods:
  1) initModule
    - @param props:Object the map of settings for initialization, here are the available settings:
	props = {
	  indentScale:<Integer>, //the scale factor for indent(whitespace), optional, default 1
	  lineSeparator:<String>, //the line separator for processing the input string, optional, default "\n"
	}
    - @return if the initialization is successful
  2) fromHtmlToJs
    - @param html:String the original string (Maybe HTML) you want to convert into Javascript String
    - @return the resulting String of code for Javascript
