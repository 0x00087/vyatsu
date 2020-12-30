var url = 'http://bargers.ml';
var login = localStorage.getItem('login');
var currentSum = 0;


$(document).ready(function () {

	if (login === 0 || login == undefined || login == null) {
		document.location.href = ('/login')
	}

	// Запрос на выгрузку информации из БД
	let body = {
		type: 1
	}

	fetch(url, {
		method: 'POST',
		body: JSON.stringify(body),
		headers: {
			'Content-Type': 'application/text'
		}
	}).then(response => response.json())
		.then(data => {
			localStorage.setItem("Goods", JSON.stringify(data));
		}).catch(console.error);

	showGoods()
	checkCart();


})




function showGoods() {
	let goods = JSON.parse(localStorage.getItem("Goods"));
	let cart = JSON.parse(localStorage.getItem("localCart"));

	let html = "";
	let currentSum = 0;


	for (var key in cart) {

		html += "<tr>\n" +
			"	<td class=\"cart_product_img\">\n" +
			"		<a href=\"#\"><img style=\"width:167px; height:167px\" src=\"" + goods.Picture[key][0] + "\" alt=\"Product\"></a>\n" +
			"	</td>\n" +
			"	<td class=\"cart_product_desc\">\n" +
			"		<h5>" + goods.Name[key] + "</h5>\n" +
			"	</td>\n" +
			"	<td class=\"price\">\n" +
			"		<span>$" + (cart[key] * goods.Price[key]) + "</span>\n" +
			"	</td>\n" +
			"	<td class=\"qty qty" + key + "\">\n" +
			"		<div class=\"qty-btn d-flex\">\n" +
			"			<p>Qty</p>\n" +
			"			<div class=\"quantity\">\n" +
			"				<span class=\"qty-minus\" data-art=\"" + key + "\" onclick=\"minus_qty(this)\"><i class=\"fa fa-minus\" aria-hidden=\"true\" ></i ></span >\n" +
			"				<input type=\"number\" data-art=\"" + key + "\" class=\"qty-text\" id=\"qty" + key + "\" step=\"1\" min=\"1\" max=\"300\" value=\"" + cart[key] + "\">\n" +
			"				<span class=\"qty-plus\" data-art=\"" + key + "\" onclick=\"plus_qty(this)\"><i class=\"fa fa-plus\"	aria-hidden=\"true\"></i></span>\n" +
			"			</div>\n" +
			"		</div>\n" +
			"	</td>\n" +
			"</tr >\n";

		currentSum += goods.Price[key] * cart[key];
		localStorage.setItem('sum', JSON.stringify(currentSum))
	}

	if (currentSum <= 200) {
		$('.summary-table').html("<li><span>subtotal:</span> <span>$" + currentSum + ".00</span></li>\n" +
			"<li><span>delivery:</span> <span>$100.00</span></li>\n" +
			"<li><span>total:</span> <span>$" + (currentSum + 100) + ".00</span></li>\n")
	}
	else {
		$('.summary-table').html("<li><span>subtotal:</span> <span>$" + currentSum + ".00</span></li>\n" +
			"<li><span>delivery:</span> <span>Free</span></li>\n" +
			"<li><span>total:</span> <span>$" + (currentSum) + ".00</span></li>\n")
	}


	$('.college-boy').html(html);
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

function plus_qty(el) {
	let articul = el.dataset.art;
	let element = document.getElementById('qty' + articul);
	let cart = JSON.parse(localStorage.getItem('localCart'))

	if (!isNaN(element.value) && element.value < 100) {
		element.value++;
		$("element").attr('value', element.value)

	}



	cart[articul]++;
	localStorage.setItem('localCart', JSON.stringify(cart));

	showGoods();
	checkCart();


}

function minus_qty(el) {
	let articul = el.dataset.art;
	let element = document.getElementById('qty' + articul);
	let cart = JSON.parse(localStorage.getItem('localCart'))

	if (!isNaN(element.value) && element.value > 1) {
		element.value--;
		$("element").attr('value', element.value)
		cart[articul]--;
		localStorage.setItem('localCart', JSON.stringify(cart));
	} else {
		element.value--;
		$("element").attr('value', element.value)
		delete cart[articul];
		localStorage.setItem('localCart', JSON.stringify(cart));
	}

	showGoods();
	checkCart();
}

function checkout() {

	let cart = JSON.parse(localStorage.getItem('localCart'));

	for (var key in cart) {
		if (cart[key] < 1) {

			localStorage.removeItem('sum');
			localStorage.removeItem('localCart');
			document.location.href = ('/error')

		}

	}
	console.log("tut")
	let body = {
		type: 7,
		id: JSON.parse(localStorage.getItem('localCart')),
		customer: (localStorage.getItem('username'))
	}
	fetch(url, {
		method: 'POST',
		body: JSON.stringify(body),
		headers: {
			'Content-Type': 'application/json'
		}
	}).then(response => response.json())
		.then(data => {
			if (data === true) {
				localStorage.removeItem('localCart');
				localStorage.removeItem('sum');
				document.location.href = ('/')
			}
			else {
				alert("Oops...")
			}
		}).catch(console.error)

	currentSum = 0;
}
