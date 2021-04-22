//	Поиск необходимых форм и элементов
const formSignIn = document.querySelector(".sign-in");
const answEl = document.querySelector(".answ");

//	отправка данных на проверку в базу
formSignIn.addEventListener("submit", (event) => {
	event.preventDefault();
	const data = new FormData(formSignIn);

	axios.post('/signin', data)
	.then(r => {
		formSignIn.reset();

		if (r.data.result) {
			window.location.replace(`http://127.0.0.1:3000/welcome/${r.data.name}`);
		} else {
			answEl.innerHTML = `<br>You have entered wrong data!`;
		}
	});
});
