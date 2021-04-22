//	Поиск необходимых форм и элементов
const formInsData = document.querySelector(".insert");
const answEl = document.querySelector(".answ");

//	Функция создания строки на фронт
const createStrToFront = (data) => {
	let strSelect = data.reduce((str, day) => {
		return `${str}<li>
						<ul>
							<li>Date: ${day.date}</li>
							<li>Temperature: ${day.temperature} F</li>
							<li>Pressure: ${day.pressure} МPА</li>
							<li>Humidity: ${day.humidity} </li>
							<li>Wind: ${day.wind} км/h</li>
						</ul>
					</li><br>`;
	}, '<ol>');

	answEl.innerHTML = `${strSelect}</ol>`;
};

//	Загрузка списка всех дней для при создании главной страницы
axios.post('/')
	.then(r => createStrToFront(r.data))
	.catch(err => answEl.innerHTML = `ERROR download all users on start page: ${err}`);

//	отслеживание внесения данных в базу
formInsData.addEventListener("submit", (event) => {
	event.preventDefault();
	const data = new FormData(formInsData);

	axios.post('/insertDay', data)
	.then(r => {
        formInsData.reset();

		if(r.data.errors) {
			let strErrors = '<br>Error in entered data!<br><br>';

			for(key in r.data.errors) strErrors+= `<li>${r.data.errors[key].message}</li>`;

			answEl.innerHTML = strErrors;
		} else {
			createStrToFront(r.data);
		}
	})
	.catch(err => answEl.innerHTML = `ERROR: ${err}`);
});
