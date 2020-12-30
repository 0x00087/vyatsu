const http = require('http')
const https = require('https')
const fs = require('fs')
const path = require('path')
const mysql = require("mysql2");

const connection = mysql.createConnection({
	host: "localhost",
	user: "mihoil",
	database: "webstore",
	password: "1234dghaF!fs25"
});

connection.connect(function (err) {
	if (err) {
		return console.error("Error with MySQL connection: " + err.message);
	}
	else {
		console.log("Connection with MySQL successfully");
	}
});

const server = http.createServer((req, res) => {
	var json;

	if (req.method == 'POST') {
		let body = '';
		req.on('data', chunk => {
			body += chunk.toString();
		})

		req.on('end', () => {
			console.log("Require: " + body);
			let params
			try {
				params = JSON.parse(body);
			} catch (err) {
			}

			if (params !== undefined) {
				if (params.type === 1) {
					const request =
						"SELECT webstore.goods.ID,webstore.goods.Name, webstore.goods.Description, webstore.goods.Price, webstore.goods.Producer, webstore.goods.Date, " +
						"AVG(webstore.ratings.Rating) AS Rating " +
						"FROM webstore.goods " +
						"INNER JOIN webstore.ratings on webstore.ratings.ID_Goods = webstore.goods.ID " +
						"GROUP BY webstore.goods.ID";


					var goods = {
						'ID': [],
						'Name': [],
						'Description': [],
						'Price': [],
						'Producer': [],
						'Date': [],
						'Rating': [],
						'Picture': [],
						'Catagory': [],
					}
					connection.query(request, '', function (err, results) {
						if (err) console.log(err);
						else { };

						for (let i = 0; i < 9; i++) {
							goods.ID.push(results[i].ID);
							goods.Name.push(results[i].Name);
							goods.Description.push(results[i].Description);
							goods.Price.push(results[i].Price);
							goods.Producer.push(results[i].Producer);
							goods.Date.push(results[i].Date);
							goods.Rating.push(results[i].Rating);
						}

						const get_picture = "SELECT webstore.picture.ID_Goods, webstore.picture.Path FROM webstore.picture;"
						connection.query(get_picture, '', function (err, results) {
							if (err) console.log(err);
							else { };

							let count = 0;
							for (let i = 0; i < 9; i++) {
								let massiv = []
								for (let j = 0; j < 7; j++) {

									if (count < results.length)
										massiv.push(results[count].Path);
									count++;
								}
								goods.Picture.push(massiv);
							}

							const get_catagory = "SELECT webstore.catagory.catagory FROM webstore.catagory";
							connection.query(get_catagory, '', function (err, results) {
								if (err) console.log(err);
								else { };

								let count = 0;
								for (let i = 0; i < 9; i++) {
									let massiv = []
									for (let j = 0; j < 2; j++) {

										if (count < results.length)
											massiv.push(results[count].catagory);
										count++;
									}
									goods.Catagory.push(massiv);
								}

								res.end(JSON.stringify(goods));
							})


						})
					})
				}
				if (params.type === 2) {
					const user = [params.login, params.password];
					console.log(user);
					const queue = "SELECT * FROM webstore.customers WHERE Email like ? and Password like ?"
					connection.query(queue, user, function (err, results) {
						if (err) console.log(err);
						else { };

						if (results[0] === undefined) {

							console.log("Пользователь не найден");

							json = {
								login: false,
							}

						} else {
							json = {
								login: true,
								username: results[0].Username,
							}
							console.log("Пользователь существует")
						}
						res.end(JSON.stringify(json));
					})
				}
				if (params.type === 3) {
					const user = [params.email, params.username];
					const queue = "SELECT * FROM webstore.customers WHERE Email like ? and Username like ?"

					connection.query(queue, user, function (err, results) {
						if (err) console.log(err);
						else { };

						if (results[0] === undefined) {
							console.log("Пользователь не найден");
							const write = [params.username, params.email, params.password, params.firstN, params.secondN]

							if (params.username !== "" && params.email !== "" && params.password !== "" && params.firstN !== "" && params.secondN !== "") {
								const sql_write = "insert into webstore.customers (Username,Email,Password,First_Name,Second_Name) values (?,?,?,?,?)"

								connection.query(sql_write, write, function (err, results) {
									if (err) console.log(err);
									else { };
								})

								json = {
									username: params.username,
									login: true,

								}
							} else {
								json = {
									login: false,
								}
							}

						} else {
							console.log("Пользователь существует")
							json = {
								login: false,
							}
						}
						res.end(JSON.stringify(json));
					})
				}
				if (params.type === 4) {
					const queue = "SELECT webstore.goods.ID, webstore.goods.Price FROM webstore.goods"
					connection.query(queue, '', function (err, results) {
						if (err) console.log(err);
						else { };
						var price = 0;
						for (var key in params.id) {

							if ((Number.parseInt(key) + Number.parseInt(1)) == results[key].ID) {
								price += results[key].Price * params.id[key]

							}
						}
						res.end(JSON.stringify(price));
					})
				}
				if (params.type === 5) {

					const user = [params.username];

					const queue1 = "SELECT * FROM webstore.customers where webstore.customers.Username like ?";

					connection.query(queue1, user, function (err, results) {
						if (err) { }
						else {
							var userID = {
								"ID": []
							}
							for (let i = 0; i < results.length; i++) {
								userID.ID.push(results[i].ID);
							}
						};

						console.log((userID.ID[0]));

						const queue = "SELECT * FROM webstore.order where webstore.order.ID_Customer like ?"
						connection.query(queue, userID.ID[0], function (err, results) {
							if (err) { }
							else {
								var order = {
									'ID': [],
									'Price': [],
									'Date': [],
								}

								for (let i = 0; i < results.length; i++) {
									order.ID.push(results[i].ID);
									order.Price.push(results[i].Price);
									order.Date.push(results[i].Date);
								}

								console.log(order)

								res.end(JSON.stringify(order));
							};



						})
					})


				}
				if (params.type === 6) {

					const user = [params.username];

					const queue1 = "SELECT * FROM webstore.customers where webstore.customers.Username like ?";

					connection.query(queue1, user, function (err, results) {
						if (err) { }
						else {
							console.log(results)
							var userID = {
								"ID": [],
								"FName": [],
								"SName": [],
								"Email": []
							}
							for (let i = 0; i < results.length; i++) {
								userID.ID.push(results[i].ID);
								userID.FName.push(results[i].First_Name);
								userID.SName.push(results[i].Second_Name);
								userID.Email.push(results[i].Email);
							}
							res.end(JSON.stringify(userID));
						};


					})


				}
				if (params.type === 7) {
					const queue = "SELECT webstore.goods.ID, webstore.goods.Price FROM webstore.goods"
					connection.query(queue, '', function (err, results) {
						if (err) console.log(err);
						else { };
						var price = 0;
						for (var key in params.id) {

							if ((Number.parseInt(key) + Number.parseInt(1)) == results[key].ID) {
								price += results[key].Price * params.id[key]
								console.log(price);
							}
						}

						if (price === 0) {
							res.end(JSON.stringify(false));
						}
						else {
							const user = [params.customer];
							const queue1 = "SELECT webstore.customers.ID FROM webstore.customers where Username like ?"
							connection.query(queue1, user, function (err, results) {
								if (err) { }
								else { }
								console.log('tut')
								if (results[0] === undefined) {
									res.end(JSON.stringify(false));
								}
								else {


									const id = [results[0].ID, price, new Date()]

									const sql_write = "insert into webstore.order (ID_Customer,Price,Date) values (?,?,?)"
									console.log(results[0].ID)
									connection.query(sql_write, id, function (err, results) {
										if (err) console.log(err);
										else { };

									})
									res.end(JSON.stringify(true));
								}
							})
						}


					})
				}
				else {

				}
			}
		})
	}
	else {
		let filePath = path.join(__dirname, '/public', req.url === '/' ? 'index.html' : req.url)
		const extention = path.extname(filePath)

		let contentType = 'text/html'

		switch (extention) {
			case '.css':
				contentType = 'text/css'
				break
			case '.js':
				contentType = 'text/javascript'
				break
			default:
				contentType = 'text/html'
		}

		if (!extention) {
			filePath += '.html'
		}


		fs.readFile(filePath, (err, content) => {
			if (err) {
				fs.readFile(path.join(__dirname, '/public', 'error.html'), (err, data) => {
					if (err) {
						res.writeHead(500)
						res.end('Error')
					} else {
						res.writeHead(200, {
							'Content-Type': 'text/html'
						})
						res.end(data)
					}
				})
			} else {
				res.writeHead(200, {
					'Content-Type': contentType
				})
				res.end(content)
			}
		})
	}
})

const PORT = process.env.PORT || 8000

server.listen(PORT, () => {
	console.log('Server starting...')
})
