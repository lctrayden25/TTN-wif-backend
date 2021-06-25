var isLoading= false;

// POST XMLHttpRequest
window.postXHR=function(dataName, dataJson, fnSuccess, fnFail, fnRequestError, fnStatusError) {
    var request = new XMLHttpRequest();
    request.open("POST", "https://thistownneeds.online/Backend/voting_request.php");
    var data = new FormData();
    data.append(dataName, dataJson);
    request.onload = function() {
        if (request.readyState === 4) {
            if (request.status === 200) {
                var error;
                function temp() {
                    try {
                        return JSON.parse(request.responseText);
                    } catch (e) {
                        error = e;
                        return false;
                    }
                };
                result = temp();
                if (!result) {
                    console.warn('XHR: Request Failed (JSON Parse Exception) - [Request Key:' + dataName + ']');
                    console.warn(request.responseText);
                    if (fnFail !== undefined) fnFail('JSON Parse Exception', error);
                } else {
                    console.log(result);
                    if (result.result == 'success') {
                        console.log('XHR: Request Success - [Request Key:' + dataName + ']');
                        if (fnSuccess !== undefined) fnSuccess(result.result, result.data);
                    } else {
                        console.warn('XHR: Request Failed (Unsuccessful Result) - [Request Key:' + dataName + ']');
                        if (fnFail !== undefined) fnFail(result.result, result.data);
                    }
                }
            } else {
                console.warn('XHR: Request status error (' + request.status + ') - [Request Key:' + dataName + ']');
                if (fnStatusError !== undefined) fnStatusError(request.status);
            }
        } else {
            console.warn('XHR: Request ReadyState error (' + request.readyState + ') - [Request Key:' + dataName + ']');
            if (fnStatusError !== undefined) fnStatusError(request.readyState);
        }
    }
    request.onabort = function () {
        console.warn('XHR: internet connection failed - [Request Key:' + dataName + ']');
		if (fnRequestError !== undefined) fnRequestError();
	};
	request.onerror = function () {
        console.warn('XHR: internet connection failed - [Request Key:' + dataName + ']');
		if (fnRequestError !== undefined) fnRequestError();
	};
    request.send(data);
}