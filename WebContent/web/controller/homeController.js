var responseEpisode;
var responseCharacter;

// Api Location
function getCountLocation() {
	var start = Date.now();
	var url = getUrlMaxRegisters("108", "https://rickandmortyapi.com/api/location/");
	$.ajax({
		async : true,
		url : url,
		data : {},
		dataType : 'json',
		type : 'GET',
		success : function(response) {

			if (response) {
				$("#locationCountId").val(countLetters("l", response));
			} else {
				$("#locationCountId").val("Error en el servicio");
			}

		}
	});
	var end = Date.now();
	$("#timeLocationId").val(transformMsToSeconds(end-start));
};

// Api Episode: guarda su respuesta para ocuparla mas adelante
function getCountEpisodes() {
	var start = Date.now();
	var url = getUrlMaxRegisters("41", "https://rickandmortyapi.com/api/episode/");
	$.ajax({
		async : false,
		url : url,
		data : {},
		dataType : 'json',
		type : 'GET',
		success : function(response) {

			if (response) {
				responseEpisode = response;
				$("#episodeCountId").val(countLetters("e", response));
			} else {
				$("#episodeCountId").val("Error en el servicio");
			}

		}
	});
	var end = Date.now();
	$("#timeEpisodeId").val(transformMsToSeconds(end-start));
};

// Api Character: guarda su respuesta para ocuparla mas adelante
function getCountCharacters() {
	var start = Date.now();
	var url = getUrlMaxRegisters("671", "https://rickandmortyapi.com/api/character/");
	$.ajax({
		async : false,
		url : url,
		data : {},
		dataType : 'json',
		type : 'GET',
		success : function(response) {

			if (response) {
				responseCharacter = response;
				$("#characternCountId").val(countLetters("c", response));
			} else {
				$("#characternCountId").val("Error en el servicio");
			}

		}
	});
	var end = Date.now();
	$("#timeCharacterId").val(transformMsToSeconds(end-start));
};

// Valida que las otras Apis hayan sido llamadas antes si no las
// ejecuta antes de seguir
function getValidateApiCall() {
	var start = Date.now();
	if (responseCharacter && responseEpisode) {
		getEpisodesLocation();
	} else if(!responseCharacter && responseEpisode){
		getCountCharacters();
		getEpisodesLocation();
	} else if(responseCharacter && !responseEpisode){
		getCountEpisodes();
		getEpisodesLocation();
	} else if(!responseCharacter && !responseEpisode){
		getCountCharacters();
		getCountEpisodes();
		getEpisodesLocation();
	}
	var end = Date.now();
	$("#timeOriginId").val(transformMsToSeconds(end-start));
};

// Obtiene listado de episodios con sus respectivos personajes.
function getEpisodesLocation(){
	
	var episodesList = [];
	var characters = [];
	for (index = 0; responseEpisode.length > index; index++) {
		characters = [];
		var currentEpisode = {};
		
		for (indexEpChar = 0; responseEpisode[index].characters.length > indexEpChar; indexEpChar++) {

			var aux = responseEpisode[index].characters[indexEpChar]
					.lastIndexOf("/");
			var aux2 = responseEpisode[index].characters[indexEpChar]
					.substring(aux);
			characters.push(aux2.substring(1));
		}

		currentEpisode.episodeNumber = responseEpisode[index].episode;
		currentEpisode.episodeName = responseEpisode[index].name;
		currentEpisode.charactersId = characters;
		episodesList.push(currentEpisode);

	}
	
	for (indexEp = 0; episodesList.length > indexEp; indexEp++) {
		var locationList = [];
		for (index = 0; responseCharacter.length > index; index++) {
			if(episodesList[indexEp].charactersId.find(element => element == responseCharacter[index].id)){
				var location = {};
				location.origin = responseCharacter[index].origin.name;
				location.location = responseCharacter[index].location.name;
				location.characterName = responseCharacter[index].name;
				locationList.push(location);
				
			}
		}
		episodesList[indexEp].locationList = locationList;
	}
	$("#episodeLocationId").val(episodesList);
	infoOrder(episodesList);
	console.log(episodesList);
};

// Ordena la lista para mostrarla por pantalla
function infoOrder(episodesList){
	var tdTable = "";
	for(i=0;episodesList.length >i ; i++){
		tdTable = tdTable + "\nEpisodio numero: "+episodesList[i].episodeNumber;
		tdTable = tdTable + "\nNombre del episodio: "+episodesList[i].episodeName;
		for(indexLocation=0;episodesList[i].locationList.length >indexLocation ; indexLocation++){
			tdTable = tdTable + "\nNombre del pesonaje: "+episodesList[i].locationList[indexLocation].characterName;
			tdTable = tdTable + "\nLocalizacion: "+episodesList[i].locationList[indexLocation].location;
			tdTable = tdTable + "\nOrigen: "+episodesList[i].locationList[indexLocation].origin;
		}
	}
	$("#episodeLocationId").val(tdTable);
};