let cachedScrollbarWidth
export function scrollbarWidth() {
	if (cachedScrollbarWidth !== undefined) {
        return cachedScrollbarWidth;
	}
	var oP = document.createElement('p'), styles = {
	    width: '100px',
	    height: '100px',
	    overflowY: 'scroll',
	}, i, scrollbarWidth;

	for (i in styles){
	    oP.style[i] = styles[i];
	}
	document.body.appendChild(oP);
	scrollbarWidth = oP.offsetWidth - oP.clientWidth;
	oP.remove();

	return cachedScrollbarWidth = scrollbarWidth;
}

let _isSafari
let _isChrome
export function isSafari() {
	if (_isSafari !== undefined) {
		return _isSafari;
	}
	checkBrowerType();
	return _isSafari;
}

export function isChrome() {
	if (_isChrome !== undefined) {
		return _isChrome;
	}
	checkBrowerType();
	return _isChrome;
}

function checkBrowerType() {
	const userAgent = navigator.userAgent;
	const safari = userAgent.indexOf('Safari') > -1;
	const chrome = userAgent.indexOf('Chrome') > -1;
	_isChrome = safari && chrome;
	_isSafari = safari && !chrome;
}
