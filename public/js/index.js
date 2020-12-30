var url = 'http://amadoshop.tk';
let login = localStorage.getItem('login');
var cart = {};


localStorage.setItem('currentArticul', 3);

//	::1.0 Загрузка информации о товарах
$(document).ready(function () {
	// Запрос на выгрузку информации из БД
	try {
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
				localStorage.setItem("Goods", JSON.stringify(data))
			}).catch(console.error);

		// Отрисовка информации о товарах
		if (login == 0 || login == null || login == undefined) {
			$(".fav-nav").removeClass("login");
		}
		else {
			$(".fav-nav").addClass("login");
		}

		$('.items').on('click', function () {
			let articul = $(this).attr('data-id') - 1;
			localStorage.setItem('currentArticul', articul)
		})

		checkCart()

		// :: 10.0 PreventDefault a Click
		$("a[href='#']").on('click', function ($) {
			$.preventDefault();
		});
	}
	catch (err) {
		location.reload();
	}

});

function checkCart() {
	if (localStorage.getItem('localCart') != null) {
		cart = JSON.parse(localStorage.getItem('localCart'));

		let sum = 0;
		for (var pr in cart)
			sum += Number.parseInt(cart[pr]);

		$('.num-prod').html("(" + sum + ")")


	}
}

// ::2.0 Отрисовка товаров на главной странице
function showBigProduct() {
	let goods = JSON.parse(localStorage.getItem("Goods"));

	let script = document.querySelector('#scripting');
	script.remove();

	let html = '';

	for (let i = 0; i < 9; i++) {
		html += "<div class=\"single-products-catagory clearfix\">\n" +
			"	<a class=\"items\" data-id=\"" + goods.ID[i] + "\" href=\"product-details.html\">\n" +
			"		<img src=\"" + goods.Picture[i][0] + "\" alt=\"\">\n" +
			"		<!-- Hover Content -->\n" +
			"		<div class=\"hover-content\">\n" +
			"			<div class=\"line\"></div>\n" +
			"			<p>From $" + goods.Price[i] + "</p>\n" +
			"			<h4>" + goods.Name[i] + "</h4>\n" +
			"		</div>\n" +
			"	</a>\n" +
			"</div>\n";

	}

	document.write(html);
}

// ::3.0 Отрисовка товаров на главной странице




