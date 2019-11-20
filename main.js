// DESCRIZIONE:
// stampare gennaio 2018 (E SOLO QUELLO) con caratterizzazione delle relative festività,
//recuperate interrogando l’API
// STEP:
// Controllare quanti giorni ha il mese  formando così una lista;
// Chiedere all’api quali sono le festività per il mese ;
// Evidenziare le festività nella lista


$(document).ready(function () {

	$.ajax({
		url: "https://flynn.boolean.careers/exercises/api/holidays?year=2018&month=0",
		method: "GET",
		success: function (data) {
			// console.log("success", data.response);

		},
		error: function (stato) {
			console.log("c'è stato un errore: " + stato);
		}


	});

});