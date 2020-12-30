var url = 'http://bargers.ml';
var login = localStorage.getItem('login');
var cart = {};



$(document).ready(function () {
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
			localStorage.setItem("Goods", JSON.stringify(data))
		}).catch(console.error);

	if (localStorage.getItem('currentArticul') != null) {
		showCurrentProduct()
		checkCart();
	}
	else { localStorage.setItem('currentArticul', 0); showCurrentProduct(); checkCart(); }


	$('.add-to-cart').on('click', function () {

		let articul = $(this).attr('data-id') - 1;
		var effect = document.getElementById('qty');
		console.log(effect.value);
		cart[articul] = effect.value;
		localStorage.setItem('localCart', JSON.stringify(cart));

		checkCart();

	})



	// :: 10.0 PreventDefault a Click
	$("body").on('click', 'a[href=\'#\']', function ($) {
		$.preventDefault();
	});

})

function minus_qty() {
	var effect = document.getElementById('qty');
	var qty = effect.value;
	let articul = JSON.parse(localStorage.getItem('currentArticul'));
	if (!isNaN(qty) && qty > 0) {
		effect.value--;
		$(".qty-text").attr('value', effect.value)

	}
	else {
		delete cart[articul]
		localStorage.setItem('localCart', JSON.stringify(cart));
	}

	return false;
}

function plus_qty() {
	var effect = document.getElementById('qty');
	var qty = effect.value;
	let articul = JSON.parse(localStorage.getItem('currentArticul'));
	if (!isNaN(qty) && qty < 100) {
		effect.value++;
		$(".qty-text").attr('value', effect.value)

	}

	return false;
}


function showCurrentProduct() {
	let goods = JSON.parse(localStorage.getItem("Goods"));

	let html = ''

	html += '<div class=\"row\">\n' +
		"	<div class=\"col-12\">\n" +
		"		<nav aria-label=\"breadcrumb\">\n" +
		"			<ol class=\"breadcrumb mt-50\">\n" +
		"				<li class=\"breadcrumb-item\"><a href=\"shop.html\">Shop</a></li>\n" +
		"				<li class=\"breadcrumb-item\"><a href=\"shop.html\">" + goods.Catagory[localStorage.getItem('currentArticul')][0] + "</a></li>\n" +
		"				<li class=\"breadcrumb-item\"><a href=\"shop.html\">" + goods.Catagory[localStorage.getItem('currentArticul')][1] + "</a></li>\n" +
		"				<li class=\"breadcrumb-item\"><a href=\"shop.html\">" + goods.Name[localStorage.getItem('currentArticul')] + "</a></li>\n" +
		"			</ol>\n" +
		"		</nav>\n" +
		"	</div >\n" +
		"</div>\n" +
		"<div class=\"row\">\n" +
		"	<div class=\"col-12 col-lg-7\">\n" +
		"		<div class=\"single_product_thumb\">\n" +
		"			<div id=\"product_details_slider\" class=\"carousel slide\" data-ride=\"carousel\">\n" +
		"				<ol class=\"carousel-indicators\">\n" +
		"					<li class=\"active\" data-target=\"#product_details_slider\" data-slide-to=\"0\"	style=\"background-image: url(" + goods.Picture[localStorage.getItem('currentArticul')][3] + ");\"></li>\n" +
		"					<li class=\"\" data-target=\"#product_details_slider\" data-slide-to=\"1\"	style=\"background-image: url(" + goods.Picture[localStorage.getItem('currentArticul')][4] + ");\"></li>\n" +
		"					<li class=\"\" data-target=\"#product_details_slider\" data-slide-to=\"2\"	style=\"background-image: url(" + goods.Picture[localStorage.getItem('currentArticul')][5] + ");\"></li>\n" +
		"					<li class=\"\" data-target=\"#product_details_slider\" data-slide-to=\"3\"	style=\"background-image: url(" + goods.Picture[localStorage.getItem('currentArticul')][6] + ");\"></li>\n" +
		"				</ol>\n" +
		"				<div class=\"carousel-inner\">\n" +
		"					<div class=\"carousel-item active\">\n" +
		"						<a class=\"gallery_img\" href=\"" + goods.Picture[localStorage.getItem('currentArticul')][3] + "\">\n" +
		"							<img class=\"d-block w-100\" src=\"" + goods.Picture[localStorage.getItem('currentArticul')][3] + "\" alt=\"First slide\">\n" +
		"						</a>\n" +
		"					</div>\n" +
		"					<div class=\"carousel-item\">\n" +
		"						<a class=\"gallery_img\" href=\"" + goods.Picture[localStorage.getItem('currentArticul')][4] + "\">\n" +
		"							<img class=\"d-block w-100\" src=\"" + goods.Picture[localStorage.getItem('currentArticul')][4] + "\" alt=\"Second slide\">\n" +
		"						</a>\n" +
		"					</div>\n" +
		"					<div class=\"carousel-item\">\n" +
		"						<a class=\"gallery_img\" href=\"" + goods.Picture[localStorage.getItem('currentArticul')][5] + "\">\n" +
		"							<img class=\"d-block w-100\" src=\"" + goods.Picture[localStorage.getItem('currentArticul')][5] + "\" alt=\"Third slide\">\n" +
		"						</a>\n" +
		"					</div>\n" +
		"					<div class=\"carousel-item\">\n" +
		"						<a class=\"gallery_img\" href=\"" + goods.Picture[localStorage.getItem('currentArticul')][6] + "\">\n" +
		"							<img class=\"d-block w-100\" src=\"" + goods.Picture[localStorage.getItem('currentArticul')][6] + "\" alt=\"Fourth slide\">\n" +
		"						</a>\n" +
		"					</div>\n" +
		"				</div>\n" +
		"			</div>\n" +
		"		</div>\n" +
		"	</div>\n" +
		"	<div class=\"col-12 col-lg-5\">\n" +
		"		<div class=\"single_product_desc\">\n" +
		"		<!-- Product Meta Data -->\n" +
		"			<div class=\"product-meta-data\">\n" +
		"				<div class=\"line\"></div>\n" +
		"				<p class=\"product-price\">$" + goods.Price[localStorage.getItem('currentArticul')] + "</p>\n" +
		"				<a href=\"#\">\n" +
		"					<h6>" + goods.Name[localStorage.getItem('currentArticul')] + "</h6>\n" +
		"				</a>\n" +

		"				<div class=\"ratings-review mb-15 d-flex align-items-center justify-content-between\">\n" +
		"					<div class=\"ratings\">\n";
	for (let j = 0; j < 5; j++) {
		if (j < Math.round(goods.Rating[localStorage.getItem('currentArticul')])) {
			html += "						<i class=\"fa fa-star " + (j + 1) + "\" aria-hidden=\"true\"></i>\n"
		}
		else {
			html += "						<i style=\"color:rgba(0, 0, 0, 0.3);\" class=\"fa fa-star " + (j + 1) + "\" aria-hidden=\"true\"></i>\n"
		}
	}

	html += '					</div>\n' +
		"					<div class=\"review\">\n" +
		"						<a href=\"#\">" + goods.Date[localStorage.getItem('currentArticul')].split("T")[0] + "</a>\n" +
		"					</div>\n" +
		"				</div>\n" +

		"				<p class=\"avaibility\"><i class=\"fa fa-circle\"></i> In Stock</p>\n" +
		"			</div >\n" +
		"			<div class=\"short_overview my-5\">\n" +
		"				<p>" + goods.Description[localStorage.getItem('currentArticul')] + "</p>\n" +
		"			</div>\n" +

		"			<form class=\"cart clearfix\" >\n" +
		"				<div class=\"cart-btn d-flex mb-50\">\n" +
		"					<p>Qty</p>\n" +
		"					<div class=\"quantity\">\n" +
		"						<span class=\"qty-minus\" onclick=\"minus_qty()\"><i class=\"fa fa-caret-down\" aria-hidden=\"true\" ></i></span>\n" +
		"						<input type=\"number\" class=\"qty-text\" id=\"qty\" step=\"1\" min=\"1\" max=\"100\" name=\"quantity\"	value=\"1\">\n" +
		"						<span class=\"qty-plus\" onclick=\"plus_qty()\"><i class=\"fa fa-caret-up\" aria-hidden=\"true\" ></i></span>\n" +
		"					</div>\n" +
		"				</div>\n" +
		"				<a href=\"#\" data-id=\"" + goods.ID[localStorage.getItem('currentArticul')] + "\" class=\"btn amado-btn add-to-cart\">Add to cart</a>\n" +
		"			</form >\n" +
		"		</div >\n" +
		"	</div >\n" +
		"</div >\n";

	$(".container-fluid").html(html);

	// :: 5.0 Nice Select Active Code
	if ($.fn.niceSelect) {
		$('select').niceSelect();
	}

	// :: 6.0 Magnific Active Code
	if ($.fn.magnificPopup) {
		$('.gallery_img').magnificPopup({
			type: 'image'
		});
	}
}

function checkCart() {

	var effect = document.getElementById('qty');


	if (localStorage.getItem('localCart') != null) {
		cart = JSON.parse(localStorage.getItem('localCart'));
		let sum = 0;
		for (var pr in cart)
			sum += Number.parseInt(cart[pr]);

		$('.num-prod').html("(" + sum + ")")

	}


	$(".qty-text").attr('value', effect.value)
}

