//	Поиск необходимых форм и элементов
const formInsData = document.querySelector(".insert");
const answEl = document.querySelector(".answ");

//	отслеживание подтверждения  отправки данных в базу
formInsData.addEventListener("submit", (event) => {
	event.preventDefault();
	const data = new FormData(formInsData);

	axios.post('/insert', data)
	.then(r => {
        formInsData.reset();

		if(r.data.errors) {
			let strErrors = '<br>Error in entered data!<br><br>';

			for(key in r.data.errors) strErrors+= `<li>${r.data.errors[key].message}</li>`;

			answEl.innerHTML = strErrors;
		} else {
			answEl.innerHTML = r.data;
		}
	})
	.catch(err => answEl.innerHTML = `ERROR: ${err}`);
});
