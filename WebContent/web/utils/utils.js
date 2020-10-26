//Encuentra la letra que se desea contar
function countLetters(letter, response) {

	var count = 0;
	for (index = 0; response.length > index; index++) {
		if (response[index].name.includes(letter)) {
			var search = response[index].name.toLowerCase().split(
					letter);
			count += search.length - 1;
		}
	}
	return count;

};

//Obtiene la URL con el maximo de registros que tiene cada Api
function getUrlMaxRegisters(maxRegisters, url){
	
	var maxCount = "1";
	
	for(i=2;maxRegisters>= i; i++){
		maxCount = maxCount +","+i.toString();
	}
	url = url+maxCount;
	return url;
}

function transformMsToSeconds(miliseconds){
	return miliseconds * 0.001 + " Segundos";
}