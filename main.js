// DESCRIZIONE:
// stampare gennaio 2018 (E SOLO QUELLO) con caratterizzazione delle relative festività,
//recuperate interrogando l’API
// STEP:
// Controllare quanti giorni ha il mese formando così una lista;
// Chiedere all’api quali sono le festività per il mese;
// Evidenziare le festività nella lista.

// - possibilità di cambiare mese;
// - gestire sia il cambio in pagina del mese stampato,
//sia la questione festività e di conseguenza se ci sono o no su quel mese feste;
// - Il calendario partirà da gennaio 2018 e si concluderà a dicembre 2018 (unici dati disponibili sull’API);
// - 

$(document).ready(function () {
	mese = 1;
	stampaGiorniMese();

	//al clic sulla classe next
	$("#next").click(MeseSucc);

	//al clic sulla classe prev 
	$("#prev").click(MesePrec);

});

function MesePrec() {
	if (mese == 1) {
		mese = 12
		$(".content").html("")
		stampaGiorniMese();
	} else {
		mese--;
		$(".content").html("")
		stampaGiorniMese();
	}
}

function MeseSucc() {
	if (mese == 12) {
		mese = 1
		$(".content").html("")
		stampaGiorniMese();
	} else {
		mese++;
		$(".content").html("")
		stampaGiorniMese();
	}
}

// function stampaMese() {

	
// 	for (var i = 0; i < 12; i++) {
// 		moment().month(i).format('MMMM');
// 		var meseCorrente = (m.month(i).format('MMMM'));
// 		console.log(meseCorrente);
		
// 	}

// }


// funzione che estrapola i giorni di un mese e li stampa in pagina
function stampaGiorniMese() {

	//salvo in variabile numero di giorni di un mese del 2018
	var giorniInUnMese = moment('2018-' + mese, 'YYYY-MM').daysInMonth();
	console.log(giorniInUnMese, mese);

	//estraggo tutti i giorni del mese per poterli inserire in una lista
	for (var i = 1; i <= giorniInUnMese; i++) {

		//Strutturo la data simile alla chiamata ajax
		var currentDate = moment('2018-' + mese + "-" + i, 'YYYY-MM-D').format('YYYY-MM-DD');
		//console.log(currentDate);

		//Uso quella data per prendere le informazioni di quel giorno: numero e nome del mese
		var currentDay = moment(currentDate).format('DD');
		//console.log(currentDay);

		//Inserisco nell'html il mio div con attributo per eventuali selettori e la relativa data formattata
		$('.content').append('<div data-date = "' + currentDate + '">' + currentDay + '</div>')
		$(".mese-dinamico").text(moment(mese,"M").format("MMM"));
	}
	holidays();
}

// funzione cha fa la chiamata ajax
function holidays() {

	$.ajax({
		url: "https://flynn.boolean.careers/exercises/api/holidays?year=2018&month=" + (mese - 1),
		method: "GET",

		success: function (data) {
			console.log("success", data.response);

			//ciclo sull'array di oggetti (response) che mi fornisce l'API per ottenere i singoli oggetti
			for (var i = 0; i < data.response.length; i++) {

				//salvo il valore della proprietà date
				//console.log(data.response[i].date);
				var dataFestivita = data.response[i].date;

				//salvo il valore della proprietà name
				//console.log(data.response[i].name);
				var nomeFestivita = data.response[i].name;

				//seleziono tutti i div che abbiano come data-attribute "data-date" uguale alla stringa con dentro ogni volta il valore dataFestivita
				var selected = $("div[data-date = '" + dataFestivita + "']");
				//console.log(selected);

				//coloro di rosso e appendo le festività
				selected.css("color", "red").append(" " + nomeFestivita);

			}
		},
		error: function (stato) {
			console.log("c'è stato un errore: " + stato);
		}

	})

}