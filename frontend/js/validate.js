/**
 * @license Apache-2.0
 * Copyright (c) 2021 Eric Chow (eric@cmchow.com)
 * License at http://www.apache.org/licenses/LICENSE-2.0
 */
window.fileuploading = false;

window.RegExTester = {
	age: function(s) {return /^([1-9]{1}[0-9]{0,1}|[1][0-3][0-9])$/.test(s);},
	numeric: function(s) {return /^[0-9]+$/i.test(s);},
	alpha: function(s) {return /^[a-zA-Z]+$/i.test(s);},
	alphanumeric: function(s) {return /^[a-zA-Z0-9]+$/i.test(s);},
	username: function(s) {return /^[a-zA-Z0-9]{4,}$/.test(s);},
	email: function(s) {return /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(s);},
	phoneIntl: function(s) {return /([0-9\s\-]{7,})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$/.test(s);},
	phoneHK: function(s) {return /^[23456789][0-9]{7}$/.test(s);},
	phoneHK_allowHyphenSpace: function(s) {return /^(^[2|3|4|5|6|7|8|9])+([0-9]{7}|([0-9]{3}[\s\-][0-9]{4}))$/.test(s);},
	phoneHKmobile: function(s) {return /^[456789][0-9]{7}$/.test(s);},
	phoneHKmobile_allowHyphenSpace: function(s) {return /^(^[4|5|6|7|8|9])+([0-9]{7}|([0-9]{3}[\s\-][0-9]{4}))$/.test(s);},
	pw_letter_digit: function(s) {return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(s);}, // min 8 char, at least 1 letter, 1 num
	pw_letter_digit_special: function(s) {return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(s);}, // min 8 char, at least 1 letter, 1 num, 1 special
	pw_upperlower_digit_special: function(s) {return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(s);}, // min 8 char, at least 1 uppercase, 1 lowercase, 1 num, 1 special
	hkidFull: function(s) {return /^([A-Za-z]{1,2})([0-9]{6})([Aa0-9])$/.test(s);}, // HKID
	hkidPartial: function(s) {return /^([A-Za-z]{1,2})([0-9]{4})$/.test(s);}, // 1 letter, 4 num HKID
	url: function(s) {return /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#()?&//=]*)$/.test(s);},
	urlNoProtocol: function(s) {return /^([-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*))$/.test(s);},
	urlFull: function(s) {return /^(https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*))$/.test(s);}, // Full URL
	urlYoutube: function(s) {return /^(https?\:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/.test(s);},
	urlLinkedin: function(s) {return /^(https?\:\/\/)?([\w]+\.)?(linkedin\.com)\/.+$/.test(s);},
	urlFacebook: function(s) {return /^(https?\:\/\/)?([\w]+\.)?(facebook\.com)\/.+$/.test(s);},
	urlIgUsername: function(s) {return /^([A-Za-z0-9_](?:(?:[A-Za-z0-9_]|(?:\.(?!\.))){0,28}(?:[A-Za-z0-9_]))?)$/.test(s);},
	urlIgHashteg: function(s) {return /^(?:#)([A-Za-z0-9_](?:(?:[A-Za-z0-9_]|(?:\.(?!\.))){0,28}(?:[A-Za-z0-9_]))?)$/.test(s);},
}

// Input Validation Functions 

// input formatter
window.numbersOnlyString = function(string) {
	// var newstr = "";
	// for (var i = 0; i < string.length; i++) {
	// 	var currentChar = string.charAt(i);
	// 	var isValid = !isNaN(parseInt(currentChar));
	// 	if (isValid) { newstr += currentChar; }
	// }
	// return newstr;
	return string.replace(/[^0-9]/gi,'');
};
window.alphaString = function(string) {
	return string.replace(/[^a-z]/gi,'');
};
window.alphanumericString = function(string) {
	return string.replace(/[^a-z0-9]/gi,'');
};
window.noWhiteSpaceString = function(str) {
	return str.replace(/\s/g, '');
}; 
window.escapeHtml = function(s) {
    return s
         .replace(/&/g, "&amp;")
         .replace(/</g, "&lt;")
         .replace(/>/g, "&gt;")
         .replace(/"/g, "&quot;")
         .replace(/'/g, "&#039;");
}

window.getYoutubeVideoID = function(url) {
	var regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
	var match = url.match(regExp);
	if (match && match[2].length == 11) {
		devlog('YT: '+match[2]);
		return match[2];
	} else {
		devlog('YT: '+url.split('/').pop());
		return url.split('/').pop();
	}
}

function maskFormat(target, val, mask, separator) {
	
	const limit = mask.reduce(function(a, b) {return a + b;}, 0);
	var str = '';
	var count = 0;

	eachNode(val, function(e,i){
		var id = mask[count];
		var prev = 0;
		for (var j = 0; j < count; j++) {
			prev += mask[j];
		}		
		var pos = id + prev;

		if (i + 1 < pos) {
			str += e;
		} else if (count < mask.length - 1) {
			str += e + separator;
			count++;
		} else if (i < limit) {
			str += e;
		}
	});

	if (target !== undefined) {
		const currentCaret = target.selectionStart;

		devlog(currentCaret);

		if (currentCaret >= target.value.length) {
			target.value = str;
			target.focus();
		} else {
			target.value = str;
			target.focus();

			var tempSum = 0;
			var tempCaret = currentCaret;

			for (var i = 0; i < mask.length; i++) {
				var maskEnd = tempSum + mask[i] + i;
				if (currentCaret == maskEnd) {
					tempCaret += 1;
					break;
				} else {
					tempSum += mask[i];
				}
			}
			target.setSelectionRange(tempCaret, tempCaret);
		}
		
	}
	return str;
}

function cleanSeparator(str, separator) {
	if (separator == ' ') {
		return str.replace(/\s/g, '');
	} else if (separator == '/') {
		return str.replace(/\//g, '');
	} else {
		return str;
	}
}

function backSpaceOverride(e, caretPos, caretEnd, separator) {

	var str = e.value;
	var caretSet = caretPos;

	if (caretPos == caretEnd) {
		if (caretPos > 0) {
			var char = str.charAt(caretPos-1);
			// devlog(char);
	
			if (char != separator) {
				e.value = str.slice(0, caretPos-1) + str.slice(caretPos);
			} else {
				e.value = str.slice(0, caretPos-2) + str.slice(caretPos);
			}
	
			caretSet = caretPos-1;
		} 
	} else {
		e.value = str.slice(0, caretPos) + str.slice(caretEnd);
	}

	

	if ('createEvent' in document) {
		var event = document.createEvent('Event');
		event.initEvent('input', true, true);
		e.dispatchEvent(event);
	} else {
		e.fireEvent('oninput');
	}

	e.focus();
  	e.setSelectionRange(caretSet,caretSet);
	
}

function deleteOverride(e, caretPos, caretEnd, separator) {

	var str = e.value;
	var char = str.charAt(caretPos);
	// devlog(char);

	if (caretPos == caretEnd) {

		if (char != separator) {
			e.value = str.slice(0, caretPos) + str.slice(caretPos+1);
		} else {
			e.value = str.slice(0, caretPos) + str.slice(caretPos+2);
		}

		e.focus();
		e.setSelectionRange(caretPos,caretPos);
	} else {
		e.value = str.slice(0, caretPos) + str.slice(caretEnd);
	}

	
	if ('createEvent' in document) {
		var event = document.createEvent('Event');
		event.initEvent('input', true, true);
		e.dispatchEvent(event);
	} else {
		e.fireEvent('oninput');
	}

	e.focus();
  	e.setSelectionRange(caretPos,caretPos);
	
}

// age validation and formatting
function validateAge(parent, e) {
	const checkVal = e.value.toString();
	const cleaned = numbersOnlyString(checkVal);

	e.value = cleaned;

	return RegExTester.age(cleaned);
}

// email validation and formatting
function validateEmail(parent, e) {
	const checkVal = e.value.toString();

	var formatted = noWhiteSpaceString(checkVal);
	e.value = formatted;

	return RegExTester.email(formatted);
}

// HK phone number validation and formatting
function validateHKphone(parent, e, isMobile) {
	const checkVal = e.value.toString();
	const cleaned = numbersOnlyString(checkVal);

	var formatted = maskFormat(e, cleaned, [4,4], ' ');
	e.value = formatted;

	if (isMobile) {
		return RegExTester.phoneHKmobile(numbersOnlyString(formatted));
	} else {
		return RegExTester.phoneHK(numbersOnlyString(formatted));
	}
}

function validateIntlPhone(parent, e) {
	const checkVal = e.value.toString();
	const cleaned = numbersOnlyString(checkVal);

	e.value = cleaned;

	return RegExTester.phoneIntl(cleaned);
}

function genericNumeric(parent, e) {
	const checkVal = e.value.toString();
	let cleaned = numbersOnlyString(checkVal);

	if (e.hasAttribute('data-digit')) {
		const limit = parseInt(e.getAttribute('data-digit'));
		if (limit > 0 && cleaned.length > limit) {
			cleaned = cleaned.substring(0,limit);
		}
	}
	e.value = cleaned;

	return true;
}

function trimCleaner(parent, e) {
	const checkVal = e.value.toString();
	const cleaned = checkVal.trim();

	e.value = cleaned;

	return cleaned;
}


// credit card validation and formatting
const default_cc_mask = [4, 4, 4, 4];
const default_cc_csc = 3;

var CreditCardCheck = [
	{
		// starts with 34/37; 15 digits
		name: 'AmEx',
		mask: [4, 6, 5],
		detector: /^3[47]\d{0,13}/,
		csc: 4,
	},
	{
		// starts with 4; 16 digits
		name: 'Visa',
		mask: [4, 4, 4, 4],
		detector: /^4\d{0,15}/,
		csc: 3,
	},
	{
		// starts with 51-55/2221–2720; 16 digits
		name: 'Mastercard',
		mask: [4, 4, 4, 4],
		detector: /^(5[1-5]\d{0,2}|22[2-9]\d{0,1}|2[3-7]\d{0,2})\d{0,12}/,
		csc: 3,
	},
	{
		// starts with 50/56-58/6304/67; 16 digits
		name: 'Maestro',
		mask: [4, 4, 4, 4],
		detector: /^(?:5[0678]\d{0,2}|6304|67\d{0,2})\d{0,12}/,
		csc: 3,
	},
	{
		// starts with 2131/1800/35; 16 digits
		name: 'JCB',
		mask: [4, 4, 4, 4],
		detector: /^(?:35\d{0,2})\d{0,12}/,
		csc: 3,
	},
	{
		// starts with 2131/1800; 15 digits
		name: 'JCB15',
		mask: [4, 6, 5],
		detector: /^(?:2131|1800)\d{0,11}/,
		csc: 3,
	},
	{
		// starts with 62/81; 16 digits
		name: 'UnionPay',
		mask: [4, 4, 4, 4],
		detector: /^(62|81)\d{0,14}/,
		csc: 3,
	},
	{
		// starts with 6011/65/644-649; 16 digits
		name: 'Discover',
		mask: [4, 4, 4, 4],
		detector: /^(?:6011|65\d{0,2}|64[4-9]\d?)\d{0,12}/,
		csc: 4,
	},
	{
		// starts with 300-305/309 or 36/38/39; 14 digits
		name: 'Diners',
		mask: [4, 6, 4],
		detector: /^3(?:0([0-5]|9)|[689]\d?)\d{0,11}/,
		csc: 3,
	},
];

// Luhn algorithm
function ccCheckSum(str) {
	var len = str.length;
	var nSum = 0;

	var isSecond = false;

	for (var i = len - 1; i >= 0; i--) {
 
        var d = str.charAt(i) - '0';
 
		if (isSecond) d = d * 2;
		
        // We add two digits to handle
        // cases that make two digits
        // after doubling
        nSum += parseInt(d / 10);
        nSum += parseInt(d % 10);
 
        isSecond = !isSecond;
	}
	// devlog(nSum);
    return (nSum % 10 == 0);
}

function ccTypeCheckByNumber(val) {
	var cardFound = CreditCardCheck.find( function(obj) {
		return obj.detector.test(val);
	})

	if (cardFound !== undefined) {
		return {
			name: cardFound.name,
			mask: cardFound.mask,
			csc: cardFound.csc
		}
	} else {
		return {
			name: 'DEFAULT',
			mask: default_cc_mask,
			csc: default_cc_csc
		}
	}
}

function ccNumCheck(str, mask) {
	const limit = mask.reduce(function(a, b) {return a + b;}, 0);

	// devlog(limit);

	if (str.length != limit) {
		if (ccCheckSum(str)) {
			// devlog('checksum TRUE');
		} else {
			// devlog('checksum FALSE');
		}
		return false;
	} else {
		if (ccCheckSum(str)) {
			// devlog('checksum TRUE');
			return true;
		} else {
			// devlog('checksum FALSE');
			return false;
		}
	}

}

function ccExpDateCheck(str) {
	if (str.length == 4) {
		var month = str.slice(0, 2);
		var year = str.slice(2, 4);

		var date = new Date();
		var currentYear = parseInt(date.getFullYear().toString().substr(-2));
		var currentMonth = parseInt(date.getMonth() + 1);

		if (parseInt(year) == currentYear) {

			if (parseInt(month) >= currentMonth && parseInt(month) <= 12) {
				return true;
			} else {
				return false;
			}

		} else if (parseInt(year) > currentYear && parseInt(year) <= 99) {

			if (parseInt(month) > 0 && parseInt(month) <= 12) {
				return true;
			} else {
				return false;
			}

		} else {
			return false;
		}
		
		
	} else {
		return false;
	}

}

function ccCodeCheck(str, limit) {

	if (str.length != limit) {
		return false;
	} else {
		return true;
	}

}

function ccNumValidate(parent, e) {
	const checkVal = e.value.toString();
	const cleaned = numbersOnlyString(checkVal);

	if (qsa(parent, 'input[name="cc-csc"]').length) {
		var cardCSC = qs(parent, 'input[name="cc-csc"]');

		if (cardCSC.value != '') {
			if ('createEvent' in document) {
				var event = document.createEvent('Event');
				event.initEvent('input', true, true);
				cardCSC.dispatchEvent(event);
			} else {
				cardCSC.fireEvent('oninput');
			}
		}
		
	}
	
	var cardType = ccTypeCheckByNumber(cleaned);
	// devlog(cardType);

	if (cardType.name != 'DEFAULT') {
		qs(parent, '.input-icon.card').setAttribute('data-type', cardType.name);
	} else {
		qs(parent, '.input-icon.card').setAttribute('data-type', '') 
	}

	var formatted = numbersOnlyString(maskFormat(e, cleaned, cardType.mask, ' '));

	return ccNumCheck(formatted, cardType.mask);
}

function ccExpValidate(parent, e) {
	const checkVal = e.value.toString();
	const cleaned = numbersOnlyString(checkVal);

	var formatted = numbersOnlyString(maskFormat(e, cleaned, [2,2], '/'));

	return ccExpDateCheck(formatted);
}

function ccCodeValidate(parent, e) {
	const checkVal = e.value.toString();
	const cleaned = numbersOnlyString(checkVal);

	var cardNo = qs(parent, 'input[name="cc-number"]').value;
	var cleanedNo = numbersOnlyString(cardNo);

	var cardType = ccTypeCheckByNumber(cleanedNo);

	var formatted = numbersOnlyString(maskFormat(e, cleaned, [cardType.csc], ''));

	return ccCodeCheck(formatted, cardType.csc);
}






// form object validation
var form = dqa('form');
var input_files = dqa('input[type="file"]');

var formObj = [];
var formUploadFiles = [];

window.initForms = function() {
	formObj = [];
	formUploadFiles = [];
	form = dqa('form');
	input_files = dqa('input[type="file"]');
	
	if (form.length) {
		eachNode(form, function(e,i){
			var inputEl = qsa(e, 'input[required], textarea[required]');
			var selectEl = qsa(e, 'select[required]');
			var checkEl = qsa(e, 'div[data-checklist="multi"], div[data-checklist="single"]');

			var inputObj = [], selectObj = [], checkObj = [];

			eachNode(inputEl, function(item){
				var initValid = 0;
				var parent = item.closest('.input-container');
				if (item.hasAttribute('data-optional')) {
					if (item.getAttribute('data-optional') == 'true') {
						initValid = 1;
					}
				}
				if (item.value != '' && item.value != 'default' && item.value != 'none') {
					initValid = 1;
					var placeholder = qsa(parent, '.input-placeholder');
					if (placeholder.length) {
						addClass(placeholder[0], ['hide']);
					}
				}
				inputObj.push({id: item.id, name: item.name, valid: initValid});

				if (item.hasAttribute('data-autoarea')) {
					if (item.getAttribute('data-autoarea') == 'true') {
						addSizeMutateListener(item);
						item.addEventListener("sizeMutate", function(ev){
							updateInputArea(this);
						});
						item.addEventListener("input", function(ev){
							updateInputArea(this);
						});
						function updateInputArea(t) {
							t.style.height = 42 + 'px';
							t.style.height = t.scrollHeight + 'px';
						}
					}
				}

				parent.addEventListener('click', function(ev) {
					if (!item.disabled) {
						item.focus();
					}
				});
			});
			eachNode(selectEl, function(item){
				if (item.value !== null && item.value != '' && item.value !== 'none') {
					selectObj.push({id: item.id, val: item.value, valid: 1});
					var placeholder = qsa(item.closest('.input-container'), '.input-placeholder');
					if (placeholder.length) {
						addClass(placeholder[0], ['hide']);
					}
				} else {
					selectObj.push({id: item.id, val: null, valid: 0});
				}
				
			});
			eachNode(checkEl, function(item){
				var boxArray = [], multi = false, optional = false, checklimit = -1;

				if (item.getAttribute('data-checklist') == 'multi') {
					multi = true;
				}
				if (item.hasAttribute('data-optional')) {
					if (item.getAttribute('data-optional') == 'true') {
						optional = true;
					}
				}
				if (item.hasAttribute('data-limit')) {
					checklimit = parseInt(item.getAttribute('data-limit')) || -1;
				}

				var parentObj = {id: item.id, box: boxArray, val: [], valid: 0, limit: checklimit, isMulti: multi, isOptional: optional};
				if (optional) parentObj.valid = 1;

				eachNode(qsa(item, 'input[name="'+item.getAttribute('data-checkname')+'"]'), function(el){

					var boxObj = {id: el.id, name: el.name, value: el.value, checked: el.checked || false};

					if (el.checked) {
						parentObj.valid = 1;
						parentObj.val.push(el.value);
					} 

					el.addEventListener('change', function(ev) {

						if (parentObj.limit > 0) {
							if ((parentObj.val).length >= parentObj.limit) {
								if (el.checked) {
									var event = new CustomEvent('checkExceedLimit', {bubbles: true});
									item.dispatchEvent(event);
								}
								el.checked = false;
							}
						}

						boxObj.checked = el.checked;

						if (boxObj.checked) {
							if (!hasClass(el, 'check-other')) {
								if (multi) {
									if ((parentObj.val).indexOf(boxObj.value) < 0) {
										(parentObj.val).push(boxObj.value);
										parentObj.valid = 1; 
									} else if ((parentObj.val).length > 0) {
										parentObj.valid = 1; 
									}
								} else {
									eachNode(parentObj.box, function(b){ if (b.id != boxObj.id) dq('#' + b.id).checked = false });
									parentObj.val[0] = boxObj.value;
									parentObj.valid = 1;
								}
							} else {
								if (!optional && !multi) {
									var remarksVal = dq('input[name="'+el.name+'-remarks"]').value;
									if (remarksVal != '') {
										parentObj.valid = 1;
									} else {
										parentObj.valid = 0;
									}
								}
							}
						} else {
							if (!hasClass(el, 'check-other')) {
								if (multi) {
									var exist = (parentObj.val).indexOf(boxObj.value);
									if (exist >= 0) {
										(parentObj.val).splice(exist, 1);
									}
									if ((parentObj.val).length > 0) {
										parentObj.valid = 1; 
									} else {
										parentObj.valid = optional ? 1 : 0;
									}
								} else {
									if (optional) {
										if (parentObj.val[0] == boxObj.value) {
											parentObj.val = [];
											parentObj.valid = optional ? 1 : 0;
										}
									} else {
										if (parentObj.val.length > 0 && parentObj.val[0] != boxObj.value) {
											parentObj.valid = 1;
										} else {
											el.checked = true;
										}
									}
								}
							} else {
								if (!optional && !multi) {
									if ((parentObj.val).length <= 0) {
										parentObj.valid = 0;
									}
								}
							}
						}

						if (parentObj.valid > 0) {
							cutClass(qs(e, '.' + el.name + '-empty'), ['show']);
						}
						
					});

					boxArray.push(boxObj);
				});

				checkObj.push(parentObj);
			});
			
			formObj.push({
				name: e.id, 
				pass: inputObj, 
				select: selectObj,
				checklist: checkObj,
			});

			function logSubmit(ev) {
				ev.preventDefault();
				devlog('form default submit blocked');
				return false;
			}
			e.addEventListener('submit', logSubmit);

		});
	}

	if (input_files.length) { 
		eachNode(input_files, function(e,i){
			var container = e.parentElement;
			var uploadBtn = qsa(container, '.btn-upload');

			// 0 - unknown, 1 - Button only, 2 - Drag and Drop only, 3 - Both
			var uploadMode = 0;

			if (container.hasAttribute('data-dragndrop')) {
				if (container.getAttribute('data-dragndrop') == 'true') {
					uploadMode = 2;
					if (uploadBtn.length) {
						uploadMode = 3;
					}
				}
			} else if (uploadBtn.length) {
				uploadMode = 1;
			}

			var isMultiple = false;
			if (e.multiple) isMultiple = true;
			
			if (uploadMode > 0) {
				
				// enable drop box in desktop touch device
				if (!(/android/i.test(ua)) && !(/iPad|iPhone|iPod/.test(ua) && !window.MSStream)) {
					addClass(container, ['notmobile']);
				}

				var size_limit = 0;

				if (e.hasAttribute('data-limit')) {
					var sizeStr = e.getAttribute('data-limit');

					var sizeUnit = alphaString(sizeStr.slice(-2));
					var size = parseInt(numbersOnlyString(sizeStr));

					const slist = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
					if (slist.indexOf(sizeUnit) >= 0) {
						size_limit = size * Math.pow(1024, slist.indexOf(sizeUnit));
					} 
				}

				var accepted_format = [];

				if (e.hasAttribute('accept')) {
					var list = e.getAttribute('accept').split(',');
					var result = list.filter(function(val){
						return (val.indexOf('/') < 0);
					});
					eachNode(result, function(el,ind){
						result[ind] = alphanumericString(el);
					});

					if (result.length > 0) {
						accepted_format = result;
					}
					// devlog(result);
				}

				function formatCheck(files) {
					if (accepted_format.length > 0) {

						if (isMultiple) {
							eachNode(files,function(file){
								const fileFormat = (file.name.split('.').pop()).toLowerCase();
								if (accepted_format.indexOf(fileFormat) >= 0) {
									getBase64(file, file.name, fileFormat);
								} else {
									// Unsupported File Format
									var event = new CustomEvent('unsupportedFormat', {
										bubbles: false,
										detail: {
											fileName: file.name,
											allowedFormat: accepted_format
										}
									});
									e.dispatchEvent(event);
								}
							});
						} else {
							const fileFormat = (files[0].name.split('.').pop()).toLowerCase();
							if (accepted_format.indexOf(fileFormat) >= 0) {
								getBase64(files[0], files[0].name, fileFormat);
							} else {
								// Unsupported File Format
								var event = new CustomEvent('unsupportedFormat', {
									bubbles: false,
									detail: {
										fileName: files[0].name,
										allowedFormat: accepted_format
									}
								});
								e.dispatchEvent(event);
							}
						}

					} else {
						if (isMultiple) {
							eachNode(files,function(file){
								const fileFormat = (file.name.split('.').pop()).toLowerCase();
								getBase64(file, file.name, fileFormat);
							});
						} else {
							const fileFormat = (files[0].name.split('.').pop()).toLowerCase();
							getBase64(files[0], files[0].name, fileFormat);
						}
					}
				}

				function getBase64(file, name, format) {
					var event = new CustomEvent('loadingFile', {
						bubbles: false,
						detail: {
							fileName: name,
							fileType: format,
							fileSize: file.size
						}
					});
					e.dispatchEvent(event);

					var reader = new FileReader();

					var fileForm = formUploadFiles.find(function(obj) {
						return obj.id === e.id;
					});

					if (fileForm !== undefined) {
						
						if (file.size > size_limit) {
							// file size limit exceeded
							var event = new CustomEvent('fileTooLarge', {
								bubbles: false,
								detail: {
									fileName: name,
									fileType: format,
									fileSize: file.size,
									limit: size_limit,
								}
							});
							e.dispatchEvent(event);
						} else {
							var fileObj = {
								name: name,
								type: format,
								size: file.size,
								base64: null,
								progress: 0,
								loaded: false,
								failed: false
							}
	
							if (!isMultiple) fileForm.files = [];
							fileForm.files.unshift(fileObj);
	
							reader.onload = function () {
								// file loaded sucessfully
								fileObj.loaded = true;
								fileObj.base64 = reader.result;
								
								var event = new CustomEvent('fileLoaded', {
									bubbles: false,
									detail: {
										fileName: name,
										fileType: format,
										fileSize: file.size,
										fileBase64: reader.result
									}
								});
								e.dispatchEvent(event);
							}
							reader.onerror = function (error) {
								devlog('Upload Error: ', error);
								fileObj.failed = true;
								var event = new CustomEvent('fileLoadingFailed', {
									bubbles: false,
									detail: {
										fileName: name,
										fileType: format,
										fileSize: file.size,
										error: error
									}
								});
								e.dispatchEvent(event);
								// file failed to load
							};
							reader.readAsDataURL(file);
						}
					} else {
						devlog('File Obj does not exist');
						fileObj.failed = true;
						var event = new CustomEvent('fileLoadingFailed', {
							bubbles: false,
							detail: {
								fileName: name,
								fileType: format,
								fileSize: file.size,
								error: 'object not found'
							}
						});
						e.dispatchEvent(event);
					}
					
				}

				if (uploadMode >= 2) {

					// drag and drop box
					function dodrop(event) {
						var dt = event.dataTransfer;
						var files = dt.files;
						formatCheck(files);
					}
					
					var dragarea = qs(container, '.upload-dragarea');
					dragarea.addEventListener('dragenter', function(ev) {
						ev.stopPropagation(); 
						ev.preventDefault();
						if (!hasClass(container, 'disable-pointer')) {
							addClass(container, ['dragging']);
							var event = new CustomEvent('dropboxEntered', {bubbles: false});
							e.dispatchEvent(event);
						}
					});
					dragarea.addEventListener('dragleave', function(ev) {
						ev.stopPropagation(); 
						ev.preventDefault();
						if (!hasClass(container, 'disable-pointer')) {
							cutClass(container, ['dragging']);
							var event = new CustomEvent('dropboxLeft', {bubbles: false});
							e.dispatchEvent(event);
						}
					});
					dragarea.addEventListener('dragover', function(ev) {
						ev.stopPropagation(); 
						ev.preventDefault();
						if (!hasClass(container, 'disable-pointer')) {
							addClass(container, ['dragging']);
							var event = new CustomEvent('dropboxOver', {bubbles: false});
							e.dispatchEvent(event);
						}
					});
					dragarea.addEventListener('drop', function(ev) {
						ev.stopPropagation(); 
						ev.preventDefault();
						if (!hasClass(container, 'disable-pointer')) {
							cutClass(container, ['dragging']);
							var event = new CustomEvent('dropboxDropped', {bubbles: false});
							e.dispatchEvent(event);
							dodrop(ev);
						}
					});
				}

				if (uploadMode == 1 || uploadMode == 3) { 

					var isInit = false;

					function changeListener(event) {
						isInit = true;
						var fileName = event.target.value.split('\\')[event.target.value.split('\\').length - 1];
						if (fileName == '') {
							// empty files
							var event = new CustomEvent('emptyFile', {bubbles: true});
							e.dispatchEvent(event);
						} else {
							// loading files
							formatCheck(e.files);
						}	
					}

					// file upload button
					function clickUpload(){

						e.click();
						if (isInit) {
							devlog('remove previous listener');
							e.removeEventListener('change', changeListener, true);
						}
						e.addEventListener('change', changeListener, true);
					}

					uploadBtn[0].addEventListener('click', function() {
						clickUpload();
					});
				}

				formUploadFiles.push({
					id: e.id, 
					mode: uploadMode,
					multiple: isMultiple,
					limit: size_limit,
					format: accepted_format,
					files: [],
				});
			} else {
				devlog('file input mode not specified');
			}
			
		});
	}
	devlog('formObj init');
}

window.uploadBoxListeners = function(target, link, uploadingCallback, successCallback, failCallback, cancelCallback) {

	const showBtn = qs(target.parentElement, '.btn-upload');
	const showMsg = qs(target.parentElement, '.upload-remarks');
	const remarksOri = showMsg.innerHTML;
	const uploadList = qs(target.parentElement, '.upload-list > ul');
	const uploadTemp = qs(target.parentElement, '.upload-list-template > li');

	target.addEventListener("fileLoaded", function(ev) {
		devlog('file loaded sucessfully');
		const name = ev.detail.fileName;
		const type = ev.detail.fileType;
		const size = ev.detail.fileSize;
		devlog('FILE: ' + name);

		var fileObj = null;
		var fileForm = formUploadFiles.find(function(obj) {
			return obj.id === target.id;
		});
		if (fileForm !== undefined) { 
			fileObj = (fileForm.files).find(function(obj) {
				return obj.name === name;
			});
		}

		if (uploadingCallback !== undefined) uploadingCallback();

		if ((target.multiple && !hasClass(target.parentElement, 'uploading')) || !target.multiple) {
			if (isChin) {
				showMsg.textContent = '檔案上載中';
				if (target.multiple) showBtn.textContent = '選擇更多檔案';
				else showBtn.textContent = '選擇另一個檔案';
			} else {
				if (target.multiple) {
					showMsg.textContent = 'Uploading Files';
					showBtn.textContent = 'Select more files';
				} else {
					showMsg.textContent = 'Uploading File';
					showBtn.textContent = 'Select another file';
				}
			}
		}
		cutClass(target.parentElement, ['missing']);
		cutClass(dq('.upload-resume-empty'), ['show']);

		cutClass(target.parentElement, ['upload-fail']);
		cutClass(target.parentElement, ['upload-success']);
		addClass(target.parentElement, ['disable-pointer']);
		addClass(target.parentElement, ['uploading']);

		function displayUploadFail() {

			if (fileObj !== undefined && fileObj !== null) {
				fileObj.failed = true;
				fileObj.progress = 0;
			}
			addClass(qs(uploadList, 'li[data-name="'+name+'"]'), ['failed']);

			if (window.processing !== undefined) processing = false;
			if (window.fileuploading !== undefined) fileuploading = false;
			addClass(target.parentElement, ['upload-fail']);
			cutClass(target.parentElement, ['disable-pointer']);

			if (target.multiple) {
				if (fileObj !== undefined && fileObj !== null) {
					var sum = 0, totalfile = 0;
					eachNode(fileForm.files, function(f){ if (!f.failed) { sum += f.progress; totalfile++}});
					var overall = sum / (totalfile*100) * 100;
					if (overall >= 100) {
						devlog(fileForm.files);
						if (isChin) showMsg.textContent = '已上載全部檔案'; 
						else showMsg.textContent = 'All Files Uploaded';
						cutClass(target.parentElement, ['uploading']);
					}
				}
			} else {
				if (isChin) showMsg.textContent = '上載檔案失敗'; 
				else showMsg.textContent = 'Failed to upload selected file';
				cutClass(target.parentElement, ['uploading']);
			}

			if (failCallback !== undefined) failCallback();
		}
		function displayUploadSuccess(data) {

			if (fileObj !== undefined && fileObj !== null) {
				fileObj.progress = 100;
			}
			addClass(qs(uploadList, 'li[data-name="'+name+'"]'), ['success']);

			var linkObj = {
				name: name,
				type: type,
				path: data,
				size: getFileSizeStr(size),
				uploaded: true
			};
			link.push(linkObj);

			if (window.fileuploading !== undefined) fileuploading = false;
			addClass(target.parentElement, ['upload-success']);
			cutClass(target.parentElement, ['disable-pointer']);

			if (target.multiple) {
				if (fileObj !== undefined && fileObj !== null) {
					var sum = 0, totalfile = 0;
					eachNode(fileForm.files, function(f){ if (!f.failed) { sum += f.progress; totalfile++}});
					var overall = sum / (totalfile*100) * 100;
					if (overall >= 100) {
						devlog(fileForm.files);
						if (isChin) showMsg.textContent = '已上載全部檔案'; 
						else showMsg.textContent = 'All Files Uploaded';
						cutClass(target.parentElement, ['uploading']);
					}
				}
			} else {
				if (isChin) showMsg.textContent = '已上載檔案'; 
				else showMsg.textContent = 'File Uploaded';
				cutClass(target.parentElement, ['uploading']);
			}

			if (successCallback !== undefined) successCallback(linkObj);
		}
		var bar = qs(target.parentElement, '.upload-bar > span');
		var percentText = qs(target.parentElement, '.upload-bar > p');
		bar.style.width = '0%';
		percentText.textContent = '0%';

		function displayUploadProgress(percent) {
			if (fileObj !== undefined && fileObj !== null) {
				fileObj.progress = percent;
				if (target.multiple) {
					var sum = 0, totalfile = 0;
					eachNode(fileForm.files, function(f){ if (!f.failed) { sum += f.progress; totalfile++}});
					var overall = sum / (totalfile*100) * 100;

					bar.style.width = parseInt(overall) + '%';
					percentText.textContent = parseInt(overall) + '%';
				} else {
					bar.style.width = parseInt(percent) + '%';
					percentText.textContent = parseInt(percent) + '%';
				}
			} else {
				bar.style.width = parseInt(percent) + '%';
				percentText.textContent = parseInt(percent) + '%';
			}
		}



		postXHR(
			'upload_file', 
			JSON.stringify({
				upload_data: ev.detail.fileBase64,
				upload_file_type: name.split('.').pop()
			}),
			null, // token append
			function(result, data){ // success request
				displayUploadSuccess(data);
			},
			function(result, data){ // failed request
				displayUploadFail();
			},
			function(){ // connection error
				displayUploadFail();
			},
			function(status){ // request status error
				displayUploadFail();
			},
			function(progress, actual){ // upload progress
				// devlog('XHR: file upload ' + progress.toFixed(2) + '%');
				displayUploadProgress(progress);
			},
			false // frontend API
		);
	});

	target.addEventListener("loadingFile", function(ev) {
		devlog('file is loading');
		const name = ev.detail.fileName;
		const type = ev.detail.fileType;
		const size = ev.detail.fileSize;

		if (window.fileuploading !== undefined) fileuploading = true;
		
		if (isChin) {
			showMsg.textContent = '檔案處理中...';
		} else {
			showMsg.textContent = 'Loading File...';
		}

		if (!target.multiple) clearNode(uploadList);
		var clone = uploadTemp.cloneNode(true);
		clone.setAttribute('data-name', name);
		clone.setAttribute('data-type', type);
		clone.setAttribute('data-size', size);
		qs(clone, 'div > p').textContent = name;
		qs(clone, 'div > span').textContent = getFileSizeStr(size);

		qs(clone, 'button').addEventListener('click', function(ev) {
			
			var fileForm = formUploadFiles.find(function(obj) {
				return obj.id === target.id;
			});
			if (fileForm !== undefined) { 
				removeObjByAttr(fileForm.files, 'name', name);
			}
			removeObjByAttr(link, 'name', name);
            cutNode(clone);

			if (target.multiple) {

			} else {
				showMsg.innerHTML = remarksOri;
			}
			if (cancelCallback !== undefined) cancelCallback({name: name});
        });

		uploadList.append(clone);
	});

	target.addEventListener("fileTooLarge", function(ev) {
		devlog('file is too large');
		const name = ev.detail.fileName;
		const type = ev.detail.fileType;
		const size = ev.detail.fileSize;
		const limit = ev.detail.limit;

		addClass(qs(uploadList, 'li[data-name="'+name+'"]'), ['failed']);

		addClass(target.parentElement, ['upload-fail']);

		if (window.fileuploading !== undefined) fileuploading = false;

		if (isChin) {
			showMsg.textContent = '檔案過大! (上限' + getFileSizeStr(limit) + ')';
		} else {
			showMsg.textContent = 'Selected file is too large! (Max. ' + getFileSizeStr(limit) + ')';
		}

		if (failCallback !== undefined) failCallback();
	});
	
	target.addEventListener("fileLoadingFailed", function(ev) {
		devlog('file loading failed');
		const name = ev.detail.fileName;
		const type = ev.detail.fileType;
		const size = ev.detail.fileSize;
		const error = ev.detail.error;

		addClass(qs(uploadList, 'li[data-name="'+name+'"]'), ['failed']);

		addClass(target.parentElement, ['upload-fail']);

		addClass(target.parentElement, ['upload-fail']);

		if (window.fileuploading !== undefined) fileuploading = false;

		if (isChin) {
			showMsg.textContent = '無法處理檔案';
		} else {
			showMsg.textContent = 'Fail to load selected file';
		}

		if (failCallback !== undefined) failCallback();
	});

	target.addEventListener("emptyFile", function(ev) {
		devlog('file selection is empty');
		if (window.fileuploading !== undefined) fileuploading = false;
	});

	target.addEventListener("unsupportedFormat", function(ev) {
		devlog('file format not supported');
		var name = ev.detail.fileName;
		var allowedFormatList = ev.detail.allowedFormat;

		addClass(target.parentElement, ['upload-fail']);

		if (window.fileuploading !== undefined) fileuploading = false;

		if (isChin) {
			showMsg.textContent = '不支援檔案格式 (接受格式：' + allowedFormatList.join(", ") + ')';
		} else {
			showMsg.textContent = 'File format is not supported (Accepted format: ' + allowedFormatList.join(", ") + ')';
		}

		if (failCallback !== undefined) failCallback();
	});

	target.addEventListener("dropboxEntered", function(ev) {
		devlog('file dropbox entered');
	});
	
	target.addEventListener("dropboxLeft", function(ev) {
		devlog('file dropbox left');
	});

	target.addEventListener("dropboxOver", function(ev) {
		// devlog('file dropbox over');
	});

	target.addEventListener("dropboxDropped", function(ev) {
		devlog('file dropbox dropped');
	});
}

const KEYS_CODE = {
	delete : 46,
	backspace : 8,
	insert: 45,
	arrow_left: 37,
	arrow_up: 38,
	arrow_right: 39,
	arrow_down: 40,
	space: 32,
	enter: 13,
	tab: 9,
	shift: 16,
	ctrl: 17,
	alt: 18
}
const KEYS_CODE_NUM_START = 48, KEYS_CODE_NUM_END = 57;
const KEYS_CODE_NUMPAD_START = 96, KEYS_CODE_NUMPAD_END = 105;

function isNumberInput(key) {
	if ((key >= KEYS_CODE_NUM_START && key <= KEYS_CODE_NUM_END) || (key >= KEYS_CODE_NUMPAD_START && key <= KEYS_CODE_NUMPAD_END)) {
		return true;
	} else {
		return false;
	}
}

var firstListenerInit = true;

function format_listener(ev, separator) {
	const item = ev.target;
	
	if (ev.keyCode === KEYS_CODE.delete) {
		ev.preventDefault();
		deleteOverride(item, ev.target.selectionStart, ev.target.selectionEnd, separator);
	} else if (ev.keyCode === KEYS_CODE.backspace) {
		ev.preventDefault();
		backSpaceOverride(item, ev.target.selectionStart, ev.target.selectionEnd, separator);
	}
} 
function cc_exp_listener(ev) {format_listener(ev, '/')}
function cc_num_listener(ev) {format_listener(ev, ' ')}
function hkphone_listener(ev) {format_listener(ev, ' ')}
function numeric_listener(ev) {format_listener(ev, ' ')}


window.initAutoFormatListeners = function() {

	devlog('Format Listners Init');

	var input_cc_num = dqa('input[name="cc-number"]');
	var input_cc_exp = dqa('input[name="cc-exp"]');
	var input_cc_csc = dqa('input[name="cc-csc"]');
	var input_phone_hk = dqa('input[data-mode="phone-hk"], input[data-mode="phone-hk-mobile"]');

	// credit card expiry date formatting
	eachNode(input_cc_exp, function(item){
		if (!firstListenerInit) item.removeEventListener('keydown', cc_exp_listener, true);
		item.addEventListener('keydown', cc_exp_listener, true);
	});

	// credit card number formatting
	eachNode(input_cc_num, function(item){
		if (!firstListenerInit) item.removeEventListener('keydown', cc_num_listener, true);
		item.addEventListener('keydown', cc_num_listener, true);
	});

	// HK phone number formatting
	eachNode(input_phone_hk, function(item){
		if (!firstListenerInit) item.removeEventListener('keydown', hkphone_listener, true);
		item.addEventListener('keydown', hkphone_listener, true);
	});

	firstListenerInit = false;
}


function passEmpty(parent, e, name, passObj) {
	// var container = e.parentElement;
	var container = e.closest('.input-container');
	var placeholder = qsa(container, '.input-placeholder');

	
	if (e.hasAttribute('data-wcount')) {
		qs(parent, '#'+e.getAttribute('data-wcount') + ' > span').textContent = e.value.length;
	}

	if (e.value == '') {
		if (placeholder.length) {
			cutClass(placeholder[0], ['hide']);
		}
		if (passObj.valid >= 0) {
			addClass(container, ['error']);
			addClass(qs(parent, '.' + name + '-empty'), ['show']);
			passObj.valid = 0;
		}
		cutClass(qs(parent, '.' + name + '-inv'), ['show']);
		cutClass(qs(parent, '.' + name + '-ok'), ['show']);
		return false;
	} else {
		if (placeholder.length) {
			addClass(placeholder[0], ['hide']);
		}
		if (passObj.valid >= 0) {
			cutClass(container, ['error']);
			cutClass(qs(parent, '.' + name + '-empty'), ['show']);
			
			if (e.hasAttribute('data-wlimit')) {
				if (e.value.length > parseInt(e.getAttribute('data-wlimit'))) {
					addClass(qs(parent, '.' + name + '-inv'), ['show']);
					passObj.valid = 0;
				} else {
					cutClass(qs(parent, '.' + name + '-inv'), ['show']);
					passObj.valid = 1;
				} 
			} else {
				passObj.valid = 1;
			}			
		}
		
		addClass(qs(parent, '.' + name + '-ok'), ['show']);
		return true;
	}
}
function passFormat(parent, e, name, passObj, isFormat) {
	// var container = e.parentElement;
	var container = e.closest('.input-container');
	var placeholder = qsa(container, '.input-placeholder');

	var isOptional = false;
	if (e.hasAttribute('data-optional')) {
		if (e.getAttribute('data-optional') == 'true') {
			isOptional = true;
		}
	}
	if (passObj.valid < 0) {
		isOptional = true;
	}

	if (e.hasAttribute('data-wcount')) {
		qs(parent, '#'+e.getAttribute('data-wcount') + ' > span').textContent = e.value.length;
	}

	if (e.value == '') {
		if (placeholder.length) {
			cutClass(placeholder[0], ['hide']);
		}
		
		cutClass(qs(parent, '.' + name + '-inv'), ['show']);
		cutClass(qs(parent, '.' + name + '-ok'), ['show']);
		if (isOptional) {
			cutClass(container, ['error']);
			cutClass(qs(parent, '.' + name + '-empty'), ['show']);
			passObj.valid = 1;
		} else {
			addClass(container, ['error']);
			addClass(qs(parent, '.' + name + '-empty'), ['show']);
			passObj.valid = 0;
		}
		return false;
	} else if (!isFormat) {
		if (placeholder.length) {
			addClass(placeholder[0], ['hide']);
		}
		addClass(container, ['error']);
		addClass(qs(parent, '.' + name + '-inv'), ['show']);
		cutClass(qs(parent, '.' + name + '-empty'), ['show']);
		cutClass(qs(parent, '.' + name + '-ok'), ['show']);
		passObj.valid = 0;
		return false;
	} else {
		if (placeholder.length) {
			addClass(placeholder[0], ['hide']);
		}
		cutClass(container, ['error']);
		cutClass(qs(parent, '.' + name + '-empty'), ['show']);
		cutClass(qs(parent, '.' + name + '-inv'), ['show']);
		addClass(qs(parent, '.' + name + '-ok'), ['show']);
		passObj.valid = 1;
		return true;
	}	
}

function updateSelect(e) {
	var parent = e.closest('form.form');
	var container = e.closest('.input-container');
	var formName = parent.id;

	var formFound = formObj.find( function(obj) {
		return obj.name === formName;
	})

	if (formFound !== undefined) {
		var passVal = (formFound.select).find( function(obj) {
			return obj.id === e.id;
		})

		if (e.value != '' && e.value != 'none') {
			passVal.val = e.value
			passVal.valid = 1;
		} else {
			passVal.val = null
			passVal.valid = 0;
		}
		
	}
	cutClass(qs(parent, '.' + e.name + '-empty'), ['show']);
	cutClass(container, ['error']);
}
window.selectEmpty = function(e) {
	var parent = e.closest('form.form');
	var container = e.closest('.input-container');
	addClass(qs(parent, '.' + e.name + '-empty'), ['show']);
	addClass(container, ['error']);
}
window.checklistEmpty = function(e) {
	var parent = e.closest('form.form');
	addClass(qs(parent, '.' + e.getAttribute('data-checkname') + '-empty'), ['show']);
}

function validate(e) {
	// var parent = e.parentElement.parentElement;
	var parent = e.closest('form.form');
	var formName = parent.id;

	var formFound = formObj.find( function(obj) {
		return obj.name === formName;
	})

	if (formFound !== undefined) {
		var passVal = (formFound.pass).find( function(obj) {
			return obj.name === e.name;
		})

		if (passVal === undefined) {
			passVal = { valid: -1 };
		}


		if (e.name == 'email') {
			return passFormat(parent, e, e.name, passVal, validateEmail(parent, e));
			
		} else if (e.name == 'phone') {
			if (e.getAttribute('data-mode') == 'phone-hk') {
				return passFormat(parent, e, e.name, passVal, validateHKphone(parent, e, false));
			} else if (e.getAttribute('data-mode') == 'phone-hk-mobile') {
				return passFormat(parent, e, e.name, passVal, validateHKphone(parent, e, true));
			} else {
				return passFormat(parent, e, e.name, passVal, validateIntlPhone(parent, e));
			}
		} else if (e.name == 'details' || e.name == 'servname') {
			return passEmpty(parent, e, e.name, passVal);
			
		} else if (e.name == 'age') {
			return passFormat(parent, e, e.name, passVal, validateAge(parent, e));
	
		} else if (e.name == 'username' || e.name == 'name' || e.name == 'first-name' || e.name == 'last-name') {
			// passFormat(parent, e, e.name, passVal, RegExTester.username(e.value));
			return passEmpty(parent, e, e.name, passVal);
	
		} else if (e.name == 'password' || e.name == 'newpassword') {
			
			if (e.name == 'newpassword' && dqa('input[name="confirmpassword"]')) {
				if (dq('input[name="confirmpassword"]').value != '') validate(dq('input[name="confirmpassword"]'));
			}
			return passFormat(parent, e, e.name, passVal, RegExTester.pw_letter_digit(e.value));

		} else if (e.name == 'confirmpassword') {
			return passFormat(parent, e, e.name, passVal, e.value == dq('input[name="newpassword"]').value);
			
		} else if (e.name == 'cc-number') {
			return passFormat(parent, e, e.name, passVal, ccNumValidate(parent, e));
			
		} else if (e.name == 'cc-exp') {
			return passFormat(parent, e, e.name, passVal, ccExpValidate(parent, e));
			
		} else if (e.name == 'cc-csc') {
			return passFormat(parent, e, e.name, passVal, ccCodeValidate(parent, e));
			
		} else if (e.name == 'hkid') {
			if (e.getAttribute('data-mode') == 'input-hkid-5') { 
				return passFormat(parent, e, e.name, passVal, RegExTester.hkidPartial(e.value));
			} else {
				return passFormat(parent, e, e.name, passVal, RegExTester.hkidFull(e.value));
			}
	
		} else if (e.name == 'video-yt' || e.name == 'social-yt') {
			return passFormat(parent, e, e.name, passVal, RegExTester.urlYoutube(trimCleaner(parent, e)));
			
		} else if (e.name == 'social-in') {
			return passFormat(parent, e, e.name, passVal, RegExTester.urlLinkedin(trimCleaner(parent, e)));
			
		} else if (e.name == 'social-fb') {
			return passFormat(parent, e, e.name, passVal, RegExTester.urlFacebook(trimCleaner(parent, e)));
			
		} else if (e.name == 'social-ig') {
			return passFormat(parent, e, e.name, passVal, RegExTester.urlIgUsername(trimCleaner(parent, e)));
			
		} else if (e.name == 'website') {
			return passFormat(parent, e, e.name, passVal, RegExTester.url(trimCleaner(parent, e)));
			
		} else if (e.hasAttribute('inputmode') && e.getAttribute('inputmode') == 'numeric') {
			return passFormat(parent, e, e.name, passVal, genericNumeric(parent, e));

		} else {
			return passEmpty(parent, e, e.name, passVal);
		}

    }
	
}

window.validateAllFormObj = function() {
	eachNode(formObj, function(f){
		(f.pass).forEach(function(item){
			validate(dq('#' + item.id));
		});
		(f.select).forEach(function(item){
			if (item.valid < 1) {
				selectEmpty(dq('#' + item.id));
			}
		});
		(f.checklist).forEach(function(item){
			if (item.valid < 1) {
				checklistEmpty(dq('#' + item.id));
			}
		});
	});
}
window.validateFormObj = function(f, scr) {

	var error_list = [];

	(f.pass).forEach(function(item){
		if (!validate(dq('#' + item.id))) {
			error_list.push({
				id: item.id,
				pos: dq('#' + item.id).getBoundingClientRect().top + scroller.endY
			});
		}
	});
	(f.select).forEach(function(item){
		if (item.valid < 1) {
			selectEmpty(dq('#' + item.id));
			error_list.push({
				id: item.id,
				pos: dq('#' + item.id).closest('.input-container').getBoundingClientRect().top + scroller.endY
			});
		}
	});
	(f.checklist).forEach(function(item){
		if (item.valid < 1) {
			checklistEmpty(dq('#' + item.id));
			error_list.push({
				id: item.id,
				pos: dq('#' + item.id).getBoundingClientRect().top + scroller.endY
			});
		}
	});

	if (scr) {
		var scrY = Math.max( body.scrollHeight, body.offsetHeight, 
			html.clientHeight, html.scrollHeight, html.offsetHeight );
		eachNode(error_list, function(e){scrY = Math.min(scrY, e.pos)});
		gsap.to(html, .5, {scrollTo:{y:scrY - 112}, ease: Power1.easeOut});
	}
}


function remarksChecked(box) {
	const remarksInput = dq('#remarksbox-' + box.name);
	if (box.checked) {
		addClass(remarksInput, ['show']);
	} else {
		cutClass(remarksInput, ['show']);
	}
	
}

function emptyCheck(e) {
	var passVal = { valid: -1 };
	if (e.required) {
		passVal = { valid: 0 };
	}
	passEmpty(e.parentElement.parentElement, e, e.name, passVal);
}


// --- DOM Ready Event ---
document.addEventListener("DOMContentLoaded", function() {
	
});

// --- Window Ready Event ---
window.addEventListener("load", function() {
	if (typeof haltform !== 'undefined') {
		devlog('formObj aborted');
	} else {
		initForms();
		initAutoFormatListeners();
	}
});