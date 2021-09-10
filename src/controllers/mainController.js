const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	index: (req, res) => {
		let productsInSale =products.filter(product => product.category === "in-sale")
		let productsVisited = products.filter(product => product.category === "visited")
		
		res.render('index',{
			productsInSale,
			productsVisited,
			toThousand
		})
	},
	search: (req, res) => {
		let result = []
		products.forEach(product => {
			if(product.name.toLowerCase().includes(req.query.keywords.toLowerCase())){
				result.push(product)
			}
		});
		res.render('results', {
			result,
			toThousand,
			search: req.query.keywords
		})
	},
};

module.exports = controller;
