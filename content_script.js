var name = "";
var color = "";
var custom_css = "";
var color_set = false;
var css_set = false;

for (i = 0; i < 20; i++) { 
    window.setTimeout(bodywalk, 1000 * i);
}

function bodywalk() {
	getData();
	walk(document.body);
}

function walk(node)
{
	// I stole this function from here:
	// http://is.gd/mwZp7E

	var child, next;

	if (node.tagName == 'input' || node.tagName == 'textarea') {
		return;
	}

	switch ( node.nodeType )
	{
		case 9:  // Document
		case 1: // Document fragment
			child = node.firstChild;
			while ( child )
			{
				next = child.nextSibling;
				if( child.childElementCount == 0) {
					handleText(child);
				}else{
					walk(child);
				}
				child = next;
			}
			break;
	}
}

function handleText(elementNode)
{
    if ( name != "" ) {
		var v = elementNode.innerHTML;
		v = v.replace(new RegExp(name, 'gi'), '<span class="redacted">'+name+'</span>');
		var words = name.split(" ");
		while (words.length) {
			var word = words.pop();
			v = v.replace(new RegExp(word, 'gi'), '<span class="redacted">'+word+'</span>');		
		}
		elementNode.innerHTML = v;
	}
}

function getData() {
	chrome.storage.local.get('name', function (data) {
        name = data.name;
    });

	chrome.storage.local.get('color', function (data) {
        color = data.color;
        if( color != data.color || ! color_set ) {
			var css = document.createElement("style");
			css.type = "text/css";
			css.innerHTML = " .redacted { background-color: "+color+" !important; color: "+color+" !important; }";
			document.body.appendChild(css);
        }
    });

	chrome.storage.local.get('custom_css', function (data) {
        custom_css = data.custom_css;
        if( custom_css != data.custom_css || ! css_set ) {
			var css = document.createElement("style");
			css.type = "text/css";
			css.innerHTML = custom_css;
			document.body.appendChild(css);
        }
    });
}


