var url = 'https://amadoshop.tk';
var login = localStorage.getItem('login');

var cart = {};

var currentFilter = "Date";
var currentCatagory = "";
var currentBrands = ["IKEA", "Amado", "The Factory", "Furniture Inc", "Artdeco"];
var ussual = 0;
var rangePrice = [0, 1000]


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
			localStorage.setItem("Goods", JSON.stringify(data));
		}).catch(console.error);

	showGoods();
	checkCart()



	// Отображение элементов, списком или сеткой
	$('.view a').on('click', function (err) {
		$('.view a.active').removeClass('active');
		$(this).addClass('active');
		$('.click-row').toggleClass("list");
	})

	// Отображение элементов
	showGoods();
	checkCart()

	// Отображение фильтрация
	$('#sortBydate').change(function () {
		currentFilter = ($(this).val());
		select_filter();
	})

	$('.cat-choose').on('click', function () {
		if ($(this).hasClass('active')) {

			$(this).removeClass('active');
			$('.cat-choose').removeClass('active');
			currentCatagory = "";
			select_catagory();
		}
		else {

			$('.cat-choose').removeClass('active');
			$(this).addClass('active');
			currentCatagory = $(this).text();
			select_catagory();
		}
	})

	$('.brn-choose').on('click', function () {

		ussual = 0;


		$('.brn-choose').each(function (i, elem) {
			if ($(elem).is(':checked')) {
				currentBrands[i] = $(elem).attr('id')
				console.log(currentBrands)

			}
			else {
				$(elem).prop('checked', false);
				currentBrands[i] = "";
				console.log(currentBrands)
				ussual++;
			}
		})

		if (ussual == 5) {
			currentBrands = ["IKEA", "Amado", "The Factory", "Furniture Inc", "Artdeco"];
			select_brands();

		} else {
			select_brands();
		}
	})

	// Отображение фильтрация
	$('body').on('click	', '.fa-star', function () {

		let parent = $(this).closest(".ratings");
		//if (login == 1) {

			let children = [];
			for (let i = 0; i < 5; i++) {
				children[i] = $(parent).children()[i];
				if (+$(this).attr('class').split(' ')[2] >= +$(children[i]).attr('class').split(' ')[2]) {
					$(children[i]).attr('style', 'color: #fbb710;')
				}
				else ($(children[i]).attr('style', 'color: rgba(0, 0, 0, 0.3);'))
			}

		//}
	//	else {
	//		let rate = $(parent).closest('.ratings-cart');

	//		var oldHtml = $(rate).html();

	//		$(rate).html(oldHtml + "<p class=\"er\">Only for our users</p>");

//			setTimeout(function () {
//				$(".er").remove();
//			}, 1000)

//		}
	})

	$('.items').on('click', function () {
		let articul = $(this).attr('data-id') - 1;
		localStorage.setItem('currentArticul', articul)
	})

	$('.add-to-cart').on('click', function () {
		let articul = $(this).attr('data-id') - 1;

		if (cart[articul] != undefined) {
			cart[articul]++;
		}
		else {
			cart[articul] = 1;
		}


		localStorage.setItem('localCart', JSON.stringify(cart));
		checkCart();

	})



	// :: 10.0 PreventDefault a Click
	$("body").on('click', 'a[href=\'#\']', function ($) {
		$.preventDefault();
	});


})

function showGoods() {
	let goods = JSON.parse(localStorage.getItem("Goods"));

	// Вывод категории
	let massive = []
	let html = '';

	let count = 0;
	for (let i = 0; i < goods.Catagory.length; i++) {
		for (let j = 0; j < 2; j++) {
			massive[count] = goods.Catagory[i][j];
			count++;
		}
	}

	let unique = []
	$.each(massive, function (i, el) {
		if ($.inArray(el, unique) === -1) unique.push(el);
	});

	for (let i = 0; i < unique.length; i++) {
		html += "<li class=\"cat-choose\"><a href=\"#\">" + unique[i] + "</a></li>"
	}

	$(".catagory-script").html(html);

	// Вывод производителей
	massive = [];
	for (let i = 0; i < goods.Producer.length; i++) {
		massive[i] = goods.Producer[i];
	}

	unique = []

	$.each(massive, function (i, el) {
		if ($.inArray(el, unique) === -1) unique.push(el);
	});

	html = '';

	for (let i = 0; i < unique.length; i++) {
		html += "<div class=\"form-check\">\n" +
			"	<input class=\"form-check-input brn-choose\" type=\"checkbox\" value=\"" + unique[i] + "\" id=\"" + unique[i] + "\">\n" +
			"	<label class=\"form-check-label\" for=\"" + unique[i] + "\">" + unique[i] + "</label>\n" +
			"</div>\n";
	}

	$(".brands-script").html(html);

	// Вывод цены
	massive = [];

	for (let i = 0; i < goods.Price.length; i++) {
		massive[i] = goods.Price[i];
	}

	let maxV = 0, minV = 1000;
	for (let i = 0; i < massive.length; i++) {
		if (massive[i] > maxV) { maxV = massive[i] }
		if (massive[i] < minV) { minV = massive[i] }
	}




	$(".price-slider").attr('data-min', minV);
	$(".price-slider").attr('data-value-min', minV);
	$(".price-slider").attr('data-max', maxV);
	$(".price-slider").attr('data-value-max', maxV);
	$(".price-number").html("$" + minV + " - $" + maxV + "")

	$('.slider-range-price').each(function () {
		var min = minV;
		var max = maxV;
		var unit = jQuery(this).data('unit');
		var value_min = minV;
		var value_max = maxV;
		var label_result = jQuery(this).data('label-result');
		var t = $(this);
		$(this).slider({
			range: true,
			min: min,
			max: max,
			values: [value_min, value_max],
			slide: function (event, ui) {
				var result = label_result + " " + unit + ui.values[0] + ' - ' + unit + ui.values[1];

				t.closest('.slider-range').find('.range-price').html(result);
			},
			change: function (event, ui) {
				var currPrice = []
				currPrice[0] = ui.values[0];
				currPrice[1] = ui.values[1];

				set_range(currPrice[0], currPrice[1]);
				select_price(currPrice[0], currPrice[1])
			}
		});
	});



	// Вывод Товара
	html = '';
	for (let i = 0; i < goods.ID.length; i++) {
		html += "<div class=\"col-12 col-sm-6 col-md-12 col-xl-6 \" data-id=\"" + goods.ID[i] + "\" data-ct1=\"" + goods.Catagory[i][0] + "\" data-ct2=\"" + goods.Catagory[i][1] + "\" data-pr=\"" + goods.Price[i] + "\" data-prd=\"" + goods.Producer[i] + "\" data-rt=\"" + goods.Rating[i] + "\" 	data-pr=\"" + goods.Price[i] + "\"  data-dt=\"" + goods.Date[i].split("T")[0] + "\">\n" +
			"	<div class=\"single-product-wrapper\">\n" +
			"	<!-- Product Image -->\n" +
			"		<div class=\"product-img\">\n" +
			"			<img src=\"" + goods.Picture[i][1] + "\" alt=\"\">\n" +
			"			<!-- Hover Thumb -->\n" +
			"			<img class=\"hover-img\" src=\"" + goods.Picture[i][2] + "\" alt=\"\">\n" +
			"		</div>\n" +
			"		<!-- Product Description -->\n" +
			"		<div class=\"product-description d-flex align-items-center justify-content-between\">\n" +
			"			<!-- Product Meta Data -->\n" +
			"			<div class=\"product-meta-data\">\n" +
			"				<div class=\"line\"></div>\n" +
			"				<p class=\"product-price\">$" + goods.Price[i] + "</p>\n" +
			"				<a class=\"items\" data-id=\"" + goods.ID[i] + "\" href=\"product-details.html\">\n" +
			"					<h6>" + goods.Name[i] + "</h6>\n" +
			"				</a>\n" +
			"			</div>\n" +
			"			<!-- Ratings & Cart -->\n" +
			"			<div class=\"ratings-cart text-right\">\n" +
			"				<div class=\"ratings\">\n"

		for (let j = 0; j < 5; j++) {
			if (j < Math.round(goods.Rating[i])) {
				html += "					<i class=\"fa fa-star " + (j + 1) + "\" aria-hidden=\"true\"></i>\n"
			}
			else {
				html += "					<i style=\"color:rgba(0, 0, 0, 0.3);\" class=\"fa fa-star " + (j + 1) + "\" aria-hidden=\"true\"></i>\n"
			}
		}

		html += "				</div>\n" +
			"				<div class=\"cart\">\n" +
			"					<a data-id=\"" + goods.ID[i] + "\" class=\"add-to-cart\" href=\"#\" data-toggle=\"tooltip\" data-placement=\"left\" title=\"Add to Cart\"><img " +
			"					src=\"img/core-img/cart.png\" alt=\"\"></a>\n" +
			"				</div>\n" +
			"			</div>\n" +
			"		</div >\n" +
			"	</div >\n" +
			"</div >\n";
	}

	$(".click-row").html(html);

	// :: 9.0 Подсказка при наведении
	if ($.fn.tooltip) {
		$('[data-toggle="tooltip"]').tooltip();
	}




}


// ::n.0 Filter
function select_filter() {
	let parent = document.querySelector(".click-row");

	if (currentFilter == "Date") {
		let replacedNode;
		for (let i = 0; i < parent.children.length; i++) {
			for (let j = i; j < parent.children.length; j++) {
				if (parent.children[i].getAttribute('data-dt') > parent.children[j].getAttribute('data-dt')) {
					replacedNode = parent.replaceChild(parent.children[j], parent.children[i]);
					insertAfter(replacedNode, parent.children[i]);
				}
			}
		}
	}
	if (currentFilter == "Price") {
		let replacedNode
		for (let i = 0; i < parent.children.length; i++) {
			for (let j = i; j < parent.children.length; j++) {
				if (+parent.children[i].getAttribute('data-pr') < +parent.children[j].getAttribute('data-pr')) {
					replacedNode = parent.replaceChild(parent.children[j], parent.children[i]);
					insertAfter(replacedNode, parent.children[i]);
				}
			}
		}

	}
	if (currentFilter == "Popular") {

		let replacedNode
		for (let i = 0; i < parent.children.length; i++) {
			for (let j = i; j < parent.children.length; j++) {
				if (+parent.children[i].getAttribute('data-rt') < +parent.children[j].getAttribute('data-rt')) {
					replacedNode = parent.replaceChild(parent.children[j], parent.children[i]);
					insertAfter(replacedNode, parent.children[i]);
				}
			}
		}
	}
}

function select_catagory() {
	let goods = JSON.parse(localStorage.getItem("Goods"));

	let html = '';


	// Вывод Товара
	html = '';
	for (let i = 0; i < goods.ID.length; i++) {
		if ((rangePrice[0] <= goods.Price[i] && rangePrice[1] >= goods.Price[i]) && (currentCatagory == '' || goods.Catagory[i][0] == currentCatagory || goods.Catagory[i][1] == currentCatagory) && (goods.Producer[i] == currentBrands[0] || goods.Producer[i] == currentBrands[1] || goods.Producer[i] == currentBrands[2] || goods.Producer[i] == currentBrands[3] || goods.Producer[i] == currentBrands[4] || goods.Producer[i] == currentBrands[5])) {
			html += "<div class=\"col-12 col-sm-6 col-md-12 col-xl-6 \" data-id=\"" + goods.ID[i] + "\" data-ct1=\"" + goods.Catagory[i][0] + "\" data-ct2=\"" + goods.Catagory[i][1] + "\" data-pr=\"" + goods.Price[i] + "\" data-prd=\"" + goods.Producer[i] + "\" data-rt=\"" + goods.Rating[i] + "\" 	data-pr=\"" + goods.Price[i] + "\"  data-dt=\"" + goods.Date[i].split("T")[0] + "\">\n" +
				"	<div class=\"single-product-wrapper\">\n" +
				"	<!-- Product Image -->\n" +
				"		<div class=\"product-img\">\n" +
				"			<img src=\"" + goods.Picture[i][1] + "\" alt=\"\">\n" +
				"			<!-- Hover Thumb -->\n" +
				"			<img class=\"hover-img\" src=\"" + goods.Picture[i][2] + "\" alt=\"\">\n" +
				"		</div>\n" +
				"		<!-- Product Description -->\n" +
				"		<div class=\"product-description d-flex align-items-center justify-content-between\">\n" +
				"			<!-- Product Meta Data -->\n" +
				"			<div class=\"product-meta-data\">\n" +
				"				<div class=\"line\"></div>\n" +
				"				<p class=\"product-price\">$" + goods.Price[i] + "</p>\n" +
				"				<a class=\"items\" data-id=\"" + goods.ID[i] + "\" href=\"product-details.html\">\n" +
				"					<h6>" + goods.Name[i] + "</h6>\n" +
				"				</a>\n" +
				"			</div>\n" +
				"			<!-- Ratings & Cart -->\n" +
				"			<div class=\"ratings-cart text-right\">\n" +
				"				<div class=\"ratings\">\n"

			for (let j = 0; j < 5; j++) {
				if (j < Math.round(goods.Rating[i])) {
					html += "					<i class=\"fa fa-star " + (j + 1) + "\" aria-hidden=\"true\"></i>\n"
				}
				else {
					html += "					<i style=\"color:rgba(0, 0, 0, 0.3);\" class=\"fa fa-star " + (j + 1) + "\" aria-hidden=\"true\"></i>\n"
				}
			}

			html += "				</div>\n" +
				"				<div class=\"cart\">\n" +
				"					<a data-id=\"" + goods.ID[i] + "\" class=\"add-to-cart\" href=\"cart.html\" data-toggle=\"tooltip\" data-placement=\"left\" title=\"Add to Cart\"><img " +
				"					src=\"img/core-img/cart.png\" alt=\"\"></a>\n" +
				"				</div>\n" +
				"			</div>\n" +
				"		</div >\n" +
				"	</div >\n" +
				"</div >\n";
		}
	}

	$(".click-row").html(html);
}

function select_brands() {
	let goods = JSON.parse(localStorage.getItem("Goods"));

	let html = '';


	// Вывод Товара
	html = '';
	for (let i = 0; i < goods.ID.length; i++) {
		if ((rangePrice[0] <= goods.Price[i] && rangePrice[1] >= goods.Price[i]) && (goods.Producer[i] == currentBrands[0] || goods.Producer[i] == currentBrands[1] || goods.Producer[i] == currentBrands[2] || goods.Producer[i] == currentBrands[3] || goods.Producer[i] == currentBrands[4] || goods.Producer[i] == currentBrands[5]) && (goods.Catagory[i][0] == currentCatagory || goods.Catagory[i][1] == currentCatagory || currentCatagory == '')) {
			html += "<div class=\"col-12 col-sm-6 col-md-12 col-xl-6 \" data-id=\"" + goods.ID[i] + "\" data-ct1=\"" + goods.Catagory[i][0] + "\" data-ct2=\"" + goods.Catagory[i][1] + "\" data-pr=\"" + goods.Price[i] + "\" data-prd=\"" + goods.Producer[i] + "\" data-rt=\"" + goods.Rating[i] + "\" 	data-pr=\"" + goods.Price[i] + "\"  data-dt=\"" + goods.Date[i].split("T")[0] + "\">\n" +
				"	<div class=\"single-product-wrapper\">\n" +
				"	<!-- Product Image -->\n" +
				"		<div class=\"product-img\">\n" +
				"			<img src=\"" + goods.Picture[i][1] + "\" alt=\"\">\n" +
				"			<!-- Hover Thumb -->\n" +
				"			<img class=\"hover-img\" src=\"" + goods.Picture[i][2] + "\" alt=\"\">\n" +
				"		</div>\n" +
				"		<!-- Product Description -->\n" +
				"		<div class=\"product-description d-flex align-items-center justify-content-between\">\n" +
				"			<!-- Product Meta Data -->\n" +
				"			<div class=\"product-meta-data\">\n" +
				"				<div class=\"line\"></div>\n" +
				"				<p class=\"product-price\">$" + goods.Price[i] + "</p>\n" +
				"				<a class=\"items\" data-id=\"" + goods.ID[i] + "\" href=\"product-details.html\">\n" +
				"					<h6>" + goods.Name[i] + "</h6>\n" +
				"				</a>\n" +
				"			</div>\n" +
				"			<!-- Ratings & Cart -->\n" +
				"			<div class=\"ratings-cart text-right\">\n" +
				"				<div class=\"ratings\">\n"

			for (let j = 0; j < 5; j++) {
				if (j < Math.round(goods.Rating[i])) {
					html += "					<i class=\"fa fa-star " + (j + 1) + "\" aria-hidden=\"true\"></i>\n"
				}
				else {
					html += "					<i style=\"color:rgba(0, 0, 0, 0.3);\" class=\"fa fa-star " + (j + 1) + "\" aria-hidden=\"true\"></i>\n"
				}
			}

			html += "				</div>\n" +
				"				<div class=\"cart\">\n" +
				"					<a data-id=\"" + goods.ID[i] + "\" class=\"add-to-cart\" href=\"cart.html\" data-toggle=\"tooltip\" data-placement=\"left\" title=\"Add to Cart\"><img " +
				"					src=\"img/core-img/cart.png\" alt=\"\"></a>\n" +
				"				</div>\n" +
				"			</div>\n" +
				"		</div >\n" +
				"	</div >\n" +
				"</div >\n";
		}
	}

	$(".click-row").html(html);
}

function select_price(min, max) {
	let goods = JSON.parse(localStorage.getItem("Goods"));

	let html = '';


	// Вывод Товара
	html = '';
	for (let i = 0; i < goods.ID.length; i++) {
		if ((rangePrice[0] <= goods.Price[i] && rangePrice[1] >= goods.Price[i]) && (goods.Producer[i] == currentBrands[0] || goods.Producer[i] == currentBrands[1] || goods.Producer[i] == currentBrands[2] || goods.Producer[i] == currentBrands[3] || goods.Producer[i] == currentBrands[4] || goods.Producer[i] == currentBrands[5]) && (currentCatagory == '' || goods.Catagory[i][0] == currentCatagory || goods.Catagory[i][1] == currentCatagory)) {
			html += "<div class=\"col-12 col-sm-6 col-md-12 col-xl-6 \" data-id=\"" + goods.ID[i] + "\" data-ct1=\"" + goods.Catagory[i][0] + "\" data-ct2=\"" + goods.Catagory[i][1] + "\" data-pr=\"" + goods.Price[i] + "\" data-prd=\"" + goods.Producer[i] + "\" data-rt=\"" + goods.Rating[i] + "\" 	data-pr=\"" + goods.Price[i] + "\"  data-dt=\"" + goods.Date[i].split("T")[0] + "\">\n" +
				"	<div class=\"single-product-wrapper\">\n" +
				"	<!-- Product Image -->\n" +
				"		<div class=\"product-img\">\n" +
				"			<img src=\"" + goods.Picture[i][1] + "\" alt=\"\">\n" +
				"			<!-- Hover Thumb -->\n" +
				"			<img class=\"hover-img\" src=\"" + goods.Picture[i][2] + "\" alt=\"\">\n" +
				"		</div>\n" +
				"		<!-- Product Description -->\n" +
				"		<div class=\"product-description d-flex align-items-center justify-content-between\">\n" +
				"			<!-- Product Meta Data -->\n" +
				"			<div class=\"product-meta-data\">\n" +
				"				<div class=\"line\"></div>\n" +
				"				<p class=\"product-price\">$" + goods.Price[i] + "</p>\n" +
				"				<a class=\"items\" data-id=\"" + goods.ID[i] + "\" href=\"product-details.html\">\n" +
				"					<h6>" + goods.Name[i] + "</h6>\n" +
				"				</a>\n" +
				"			</div>\n" +
				"			<!-- Ratings & Cart -->\n" +
				"			<div class=\"ratings-cart text-right\">\n" +
				"				<div class=\"ratings\">\n"

			for (let j = 0; j < 5; j++) {
				if (j < Math.round(goods.Rating[i])) {
					html += "					<i class=\"fa fa-star " + (j + 1) + "\" aria-hidden=\"true\"></i>\n"
				}
				else {
					html += "					<i style=\"color:rgba(0, 0, 0, 0.3);\" class=\"fa fa-star " + (j + 1) + "\" aria-hidden=\"true\"></i>\n"
				}
			}

			html += "				</div>\n" +
				"				<div class=\"cart\">\n" +
				"					<a data-id=\"" + goods.ID[i] + "\" class=\"add-to-cart\" href=\"cart.html\" data-toggle=\"tooltip\" data-placement=\"left\" title=\"Add to Cart\"><img " +
				"					src=\"img/core-img/cart.png\" alt=\"\"></a>\n" +
				"				</div>\n" +
				"			</div>\n" +
				"		</div >\n" +
				"	</div >\n" +
				"</div >\n";
		}
	}

	$(".click-row").html(html);
}

function insertAfter(elem, refElem) {
	return refElem.parentNode.insertBefore(elem, refElem.nextSibling);
}

function set_range(min, max) {
	rangePrice[0] = min;
	rangePrice[1] = max;

}
// ::n.0 Filter::

//Проверка корзины
function checkCart() {

	if (localStorage.getItem('localCart') != null) {
		cart = JSON.parse(localStorage.getItem('localCart'));

		let sum = 0;
		for (var pr in cart) {
			sum += Number.parseInt(cart[pr]);
		}
		$('.num-prod').html("(" + sum + ")")

	}



}
//Получение ID товара





