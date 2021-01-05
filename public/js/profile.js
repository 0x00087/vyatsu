var url = 'https://amadoshop.tk';
var login = localStorage.getItem('login');


$(document).ready(function () {
	// Запрос на выгрузку информации из БД

	let body = {
		type: 5,
		username: localStorage.getItem("username")
	}

	fetch(url, {
		method: 'POST',
		body: JSON.stringify(body),
		headers: {
			'Content-Type': 'application/text'
		}
	}).then(response => response.json())
		.then(data => {
			localStorage.setItem("order", JSON.stringify(data));
		}).catch(console.error);

	body = {
		type: 6,
		username: localStorage.getItem('username'),
	}

	fetch(url, {
		method: 'POST',
		body: JSON.stringify(body),
		headers: {
			'Content-Type': 'application/text'
		}
	}).then(response => response.json())
		.then(data => {
			localStorage.setItem("user-info", JSON.stringify(data))

		}).catch(console.error);


	showOrder()
	checkCart();

	showInformation()







})

function showOrder() {


	let html = '';
	let order = JSON.parse(localStorage.getItem("order"));
	//console.log(order)


	for (let i = 0; i < order.ID.length; i++) {


		html += "<tr>\n" +
			"	<td class=\"cart_product_img\">\n" +
			"	</td>\n" +
			"	<td class=\"cart_product_desc\">\n" +
			"		<h5>Order:#" + order.ID[i] + "</h5>\n" +
			"	</td>\n" +
			"	<td class=\"price\">\n" +
			"		<span>$" + (order.Price[i]) + "</span>\n" +
			"	</td>\n" +
			"	<td class=\"qty \">\n" +
			"		<div class=\"qty-btn d-flex\">\n" +
			"		<span>" + ((order.Date[i].split("T")[0])) + "</span>\n" +
			"		</div>\n" +
			"	</td>\n" +
			"</tr >\n";
	}

	$('.college-boy').html(html)
}

function showInformation() {


	let user = JSON.parse(localStorage.getItem('user-info'));
	$('.summary-table').html("<li><span>Name:</span> <span>" + user.FName[0] + " " + user.SName[0] + "</span></li>\n" +
		"<li><span>Email:</span> <span style =\"text-transform:none\">" + user.Email[0] + "</span></li>\n"
	)


}


function checkCart() {

	if (localStorage.getItem('localCart') != null) {
		let cart = JSON.parse(localStorage.getItem('localCart'));

		let sum = 0;
		for (var pr in cart) {
			if (pr >= 0 && pr <= 9) {
				sum += Number.parseInt(cart[pr]);
			} else {
				location.href(error.html);
			}

		}
		$('.num-prod').html("(" + sum + ")")

	}
}

function logout() {
	localStorage.removeItem('login');
	localStorage.removeItem('username');
	localStorage.removeItem('localCart');
	document.location.href = ('/')
}
