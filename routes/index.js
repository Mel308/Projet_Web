var express = require('express');
var router = express.Router();

/*Declaration de notre tableau d'ordinateurs*/
const listOrdi =[
	{
		nom: 'Surface Pro',
		id: '0', 
		src: 'https://images-na.ssl-images-amazon.com/images/I/71GEbBTd%2BOL._SX355_.jpg', 
		stockage: '128 Go', 
		ram: '4 Go', 
		carte: 'Intel HD Graphics 615', 
		processeur: 'Intel Core m3', 
		prix: '806,65 €',
		tag : 'Bureautique'
	},
	{
		nom: 'HP 15-BW050NF',
		id: '1',
		src: 'https://images-na.ssl-images-amazon.com/images/I/41gNvlCZUdL._SY355_.jpg',
		stockage: '1 To', 
		ram: '8 Go', 
		carte: 'AMD Radeon 520 2Go', 
		processeur: 'AMD A9-9420 3GHz', 
		prix: '480 €',
		tag :'Stockage'
	},
	{
		nom: 'Acer Predator',
		id: '2', 
		src: 'https://images-na.ssl-images-amazon.com/images/I/81g7AiqWrtL._SX425_.jpg', 
		stockage: '1 To', 
		ram: '64 Go', 
		carte: 'nVidia Geforce GTX1080 SLI', 
		processeur: 'Intel Core i7 7820HK', 
		prix: '11 000 €',
		tag : 'Gamer'
	},
	{
		nom:'Asus n76VZ',
		id: '3', 
		src: 'https://media.ldlc.com/ld/products/00/01/06/54/LD0001065474_2_0001092068_0001166217_0001408948.jpg', 
		stockage: '1 To', 
		ram: '8 Go', 
		carte: 'nVidia Geforce 650M', 
		processeur: 'Intel Core i7 2.4 GHz', 
		prix: '750 €',
		tag :'Programmation'
	}
	
]
/*Methode get*/
router.get('/listOrdi', (req, res) => {
	res.json(listOrdi)
})

/*Methode post*/
router.post('/listOrdi', (req, res) => {
  listOrdi.push({
		nom : req.body.nom,
		id : req.body.id,
		src : req.body.src,
		stockage : req.body.stockage,
		ram : req.body.ram,
		carte : req.body.carte,
		processeur : req.body.processeur,		
		prix : req.body.prix,
		tag : req.body.tag
	})
    res.send("OK")
})

/*methode delete*/
router.delete('/listOrdi/:id', (req, res) => { 
	var index = -1
	for(var i in listOrdi){
		console.log(i)
		if (i===req.params.id) {
		  index = i
		  console.log(i,index)
		}
	}
	if (index!== -1)  {
		listOrdi.splice(index, 1)
	}
	res.send('OK')
})

/*methode put (remplacement d'une cellule)*/
router.put('/listOrdi/:id/:type/:typenumber/:changement', (req, res) => {
	var index = -1
	for(var i in listOrdi){
		if (i===req.params.id) {
			index = i
		  	for(var key in Object.keys(listOrdi[i])){
				if(key===req.params.typenumber){
					if(key==0){
						listOrdi[i].nom = req.params.changement
					}else if(key==1){
						listOrdi[i].id = req.params.changement
					}else if(key==2){
						listOrdi[i].src = req.params.changement
					}else if(key==3){
						listOrdi[i].stockage = req.params.changement
					}else if(key==4){
						listOrdi[i].ram = req.params.changement
					}else if(key==5){
						listOrdi[i].carte = req.params.changement
					}else if(key==6){
						listOrdi[i].processeur = req.params.changement
					}else if(key==7){
						listOrdi[i].prix = req.params.changement
					}else if(key==8){
						listOrdi[i].tag = req.params.changement
					}
				}
			}
		}	
	}
	res.send('OK')
})

/*A garder !! */
module.exports = router;
