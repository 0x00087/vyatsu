var url = 'https://amadoshop.tk';
var login = localStorage.getItem('login');

var currentSum = 0;
var cart = {};

$(document).ready(function () {

	let body = {
		type: 4,
		id: JSON.parse(localStorage.getItem('localCart')),
	}
	fetch(url, {
		method: 'POST',
		body: JSON.stringify(body),
		headers: {
			'Content-Type': 'application/json'
		}
	}).then(response => response.json())
		.then(data => {
			localStorage.setItem('sum', JSON.parse(data));
			currentSum = JSON.parse(data)
		}).catch(console.error)


	showPrice();
	checkCart();
})


function showPrice() {
	currentSum = localStorage.getItem('sum');
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



function validateFName(fname) {
	var reg = /^[a-zA-Z]+$/;
	var address = fname.value;
	if (reg.test(address) == false) {
		alert("First Name: Name or name")
		return false;

	}
	return true;
}

function validateAdress(adr) {
	var reg = /^[a-zA-Z0-9\s-]+$/;
	var address = adr.value;
	if (reg.test(address) == false) {
		alert("Adress: Adress 5-15")
		return false;
	}
	return true;
}

function validateTown(adr) {
	var reg = /^[a-zA-Z0-9]+$/;
	var address = adr.value;
	if (reg.test(address) == false) {
		alert("Town: Town or Town-Town")
		return false;
	}
	return true;
}

function validatePhone(phone) {
	var reg = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/;
	var address = phone.value;
	if (reg.test(address) == false) {
		alert("Phone: XXXXXXXXXXX")
		return false;
	}
	return true;
}

function validateSName(sname) {
	var reg = /^[a-zA-Z]+$/;
	var address = sname.value;
	if (reg.test(address) == false) {
		alert("Second Name: Name or name")
		return false;
	}
	return true;
}

