window.setInterval(bodywalk, 1000)

function bodywalk() {
	walk(document.body);
}

function walk(node)
{
	if(node == document.body) {
		console.log('running replacer');
	}
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
	var v = elementNode.innerHTML;
	v = v.replace(/\btim schwartz\b/g, '<span class="redacted">tim schwartz</span>');
	v = v.replace(/\bTim Schwartz\b/g, '<span class="redacted">Tim Schwartz</span>');
	v = v.replace(/\btim\b/g, '<span class="redacted">tim</span>');
	v = v.replace(/\bTim\b/g, '<span class="redacted">Tim</span>');
	v = v.replace(/\bschwartz\b/g, '<span class="redacted">schwartz</span>');
	v = v.replace(/\bSchwartz\b/g, '<span class="redacted">Schwartz</span>');

	if( v != elementNode.innerHTML ) {
		console.log(elementNode);
	}
	elementNode.innerHTML = v;
}


