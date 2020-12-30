var url = 'http://amadoshop.tk';
var login = localStorage.getItem('login');



$(document).ready(function () {
	checkCart();

})

function requestLogin() {
	if ((validateMail(document.getElementById("emailA")) == true) && (validatePassword(document.getElementById("passwordA")) === true)) {
		body = {
			login: document.getElementById("emailA").value,
			password: document.getElementById("passwordA").value,
			type: 2
		}

		fetch(url, {
			method: 'POST',
			body: JSON.stringify(body),
			headers: {
				'Content-Type': 'application/json'
			}
		}).then(response => response.json())
			.then(data => {
				localStorage.setItem('Username', JSON.stringify(data))
				let username = JSON.parse(localStorage.getItem('Username'));
				if (username.login === true) {
					localStorage.setItem("login", "1");
					localStorage.setItem('username', data.username)
					document.location.href = ('/');
				} else {
					alert("Wrong Email or Password")
				}
			}).catch(console.error)
	}
	else {

	}

}

function requestReg() {
	if ((validateMail(document.getElementById("emailR")) == true) && (validateSName(document.getElementById("last_nameR")) === true) && (validateFName(document.getElementById("first_nameR")) === true) && (validatePassword(document.getElementById("passwordR")) === true) && (validateUsername(document.getElementById("usernameR")) === true)) {

		body = {
			username: document.getElementById("usernameR").value,
			email: document.getElementById("emailR").value,
			password: document.getElementById('passwordR').value,
			firstN: document.getElementById('first_nameR').value,
			secondN: document.getElementById('last_nameR').value,
			type: 3
		}

		fetch(url, {
			method: 'POST',
			body: JSON.stringify(body),
			headers: {
				'Content-Type': 'application/json'
			}
		}).then(response => response.json())
			.then(data => {
				if (data.login === true) {
					localStorage.setItem("login", '1');
					localStorage.setItem('username', data.username);
					document.location.href = ('/login.html');
				} else {
					alert('Email already used')
				}
			}).catch(console.error);
	}
	else {

	}
}

function validateMail(mail) {
	var reg = /^([A-Za-zа-яА-я0-9_\-\.])+\@([A-Za-zа-яА-я0-9_\-\.])+\.([A-Za-zа-яА-я]{2,4})$/;
	var address = mail.value;
	if (reg.test(address) == false) {
		mail.value = "";
		mail.placeholder = "Email must consist [A-Z,a-z,а-я,А-Я, 0-9, _]@[A-Z,a-z,а-я,А-Я, 0-9].[A-Z,a-z,а-я,А-Я]";
		return false;
	}
	return true;
}

function validateUsername(username) {
	var reg = /^[a-zA-Z][a-zA-Z0-9-_\.]{5,16}$/;
	var address = username.value;
	if (reg.test(address) == false) {
		username.value = "";
		username.placeholder = "username must consinst [A-Z,a-z,а-я,А-Я, 0-9] length 6, max length 16";
		return false;
	}
	return true;
}

function validatePassword(password) {
	var reg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$/;
	var address = password.value;
	if (reg.test(address) == false) {
		password.value = "";
		password.placeholder = "Password  must consist min one [A-Z] min one [0-9] and min length 8, max length 16";
		return false;
	}
	return true;
}

function validateFName(fname) {
	var reg = /^[a-zA-Zа-яА-я]+$/;
	var address = fname.value;
	if (reg.test(address) == false) {
		fname.value = "";
		fname.placeholder = "First Name  must consist [A-Z,a-z,а-я,А-Я]";
		return false;
	}
	return true;
}

function validateSName(sname) {
	var reg = /^[a-zA-Zа-яА-я]+$/;
	var address = sname.value;
	if (reg.test(address) == false) {
		sname.value = "";
		sname.placeholder = "Second Name  must consist [A-Z,a-z,а-я,А-Я]";
		return false;
	}
	return true;
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