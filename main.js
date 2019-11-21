// DESCRIZIONE:
// stampare gennaio 2018 (E SOLO QUELLO) con caratterizzazione delle relative festività,
//recuperate interrogando l’API
// STEP:
// Controllare quanti giorni ha il mese formando così una lista;
// Chiedere all’api quali sono le festività per il mese;
// Evidenziare le festività nella lista.


$(document).ready(function () {


	$.ajax({
		url: "https://flynn.boolean.careers/exercises/api/holidays?year=2018&month=0",
		method: "GET",
		success: function (data) {
			// console.log("success", data.response);

			//salvo in variabile numero di giorni nel mese di gennaio 2018
			var giorniInUnMese = moment('01/01/2018', 'DD/MM/YYYY').daysInMonth();
			console.log(giorniInUnMese);

			//estraggo tutti i giorni del mese di gennaio 2018 per poterli inserire in una lista
			for (var i = 1; i <= giorniInUnMese; i++) {

				//Strutturo la data simile alla chiamata ajax
				var currentDate = moment('2018-01-' + i, 'YYYY-MM-D').format('YYYY-MM-DD');
				console.log(currentDate);

				//Uso quella data per prendere le informazioni di quel giorno: numero e nome del mese
				var currentDay = moment(currentDate).format('DD MMMM');
				console.log(currentDay);

				//Inserisco nell'html il mio div con attributo per eventuali selettori e la relativa data formattata
				$('.content').append('<div data-date = "' + currentDate + '">' + currentDay + '</div>')

			}

			//ciclo sull'array di oggetti (response) che mi fornisce l'API per ottenere i singoli oggetti
			for (var i = 0; i < data.response.length; i++) {

				//salvo il valore della proprietà date
				console.log(data.response[i].date);
				var dataFestivita = data.response[i].date;

				//salvo il valore della proprietà name
				console.log(data.response[i].name);
				var nomeFestivita = data.response[i].name;

				//seleziono tutti i div che abbiano come data-attribute "data-date" uguale alla stringa con dentro il valore dataFestivita
				var selected = $("div[data-date = '" + dataFestivita + "']");
				console.log(selected);
				selected.css("color", "red").append(" " + nomeFestivita);

			}
		},
		error: function (stato) {
			console.log("c'è stato un errore: " + stato);
		}


	});

});