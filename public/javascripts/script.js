Vue.prototype.$http = axios

const app = new Vue ({
	el: '#Ordi-Array-Example',
	data: {
		newImage: '',
		newType: '',
		newStockage: '',
		newRam: '',
		newCarte: '', 
		newProcesseur: '', 
		newPrix: '',
		newName:'',
		celulle:'',
		changement:'',
		seen: false,
		NuC:'',
		DaE:'',
		Cr:'',
		comenu:false,
		identifiant:null,
		pwd:null,
		picked:null,
		currentPage:'authzone',
		currentContent:'standard',
		retour:false,
		invite:false,
		admin:false,
		comenu:false,
		connect:false,
		Ordis: [{}],
		nom: '',
		id: '',
		src: '',
		stockage: '', 
		ram: '', 
		carte: '', 
		processeur: '', 
		prix: '',
		tag :'',
		nextTodoId: 5,
		imageAfficher:''
	},
		methods:{
		/*Connexion*/
		connexionCompte:function(){
			this.currentPage='authzone';
			this.comenu=false;
		},
		/*Deconnexion*/
		deconnexionCompte:function(){
			this.currentContent='standard';
			this.comenu=false;
			this.admin=false;
			this.invite=false;
			this.connect=false;
		},
		/*Verification de l'authentification*/
		checkForm:function(e){
			if((this.identifiant & this.pwd) !== null ){
				if(this.identifiant !== "Admin"){
					this.invite=true;
					this.retour=true;
					this.connect=true;
					this.currentPage='activityzone';
					this.currentContent='choix';
				}else{
					this.admin=true;
					this.connect=true;
					this.chargementMainPage();
					this.currentContent='maintenance';
				}
			}
			else if((this.identifiant | this.pwd) === null) {
				e.stopPropagation();
				alert("Attention ! Remplissez tous les champs.");
			}
		},
		/*Verifie la saisie d'un choix utilisateur*/
		checkActivity:function(e){
			if(this.picked !== null){
				console.log(this.picked);
				this.retour=false;
				this.chargementMainPage();
			}
			else {
				e.stopPropagation();
				alert("Attention ! Selectionnez votre activité principale.");
			}
		},
		/*Filtre les données en fonction du choix de l'utilisateur*/
		Filtrer: function() {
			return this.Ordis.filter(Ordi =>{ /*function(Ordi) + this=vue*/
				console.log("Filtre entrée : "+ this.picked);
				if(this.picked==='gaming') {
					return Ordi.tag==='Gamer'
				}
				else if(this.picked==='stock') {
					return Ordi.tag=== 'Stockage'
				}
				else if(this.picked==='prog') {
					return Ordi.tag === 'Programmation'
				}
				else if(this.picked==='bureau') {
					return Ordi.tag === 'Bureautique'
				}
				
			})
		},
		/*Verifie si l'utilisateur est connecté*/
		checkCo:function(){
			if(this.identifiant === null){
				this.currentPage='authzone';
			}else{
				this.chargementMainPage();
				this.currentContent='choix';
			}
		},
		/*Permet à l'utilisateur de revenir en arriere*/
		retourArriere:function(e){
			if(this.currentPage==='activityzone'){
				this.currentPage='authzone';
				this.invite=false;
			} 
		},
		/*Affichage du menu de connexion/deconnexion*/
		switchMenu:function(){
			if(this.comenu===false){
				this.comenu=true;
			}else{
				this.comenu=false;
			}
		},
		/*Affichage du formulaire d'achat*/
		afficher: function() {
			console.log("avant");
			this.seen = !this.seen;
			console.log("après");
		},
		/*Verification de la saisie pour l'achat*/
		Verifie: function() {
			if(this.NuC === "") {
				alert("Entrer un champ dans le Numéro de Carte");
			}
			if(this.DaE ==="") {
				alert("Entrer un champ dans la Date d'Expiration");
			}
			if(this.Cr ==="") {
				alert("Entrer un champ dans le Cryptogramme");
			}
		},
		/*Affichage de la page principale et récupération des données sur le serveur*/
		chargementMainPage:function(){ 
			this.currentPage='mainpage';
			
			this.$http.get('/listOrdi')
			  .then(listOrdi => {
				console.log('affichage de ma liste', listOrdi)
				this.Ordis = listOrdi.data
			  })
			  .catch(err => {
				console.log('error', err)
			  })
		},
		/*Pour ajouter un element dans la liste*/
		newOrdi:function(){ 
			console.log(this.newName);
			this.$http.post('/listOrdi', {
				nom : this.newName,
				id: this.nextTodoId,
				src: this.newImage,
				stockage: this.newStockage, 
				ram: this.newRam,
				carte: this.newCarte, 
				processeur: this.newProcesseur,
				prix: this.newPrix,
				tag : this.newType
			})
			.then(listOrdi => {
				console.log("nouvelle list", listOrdi);
				this.Ordis.push({
					nom : this.newName,
					id: this.nextTodoId,
					src: this.newImage,
					stockage: this.newStockage, 
					ram: this.newRam,
					carte: this.newCarte, 
					processeur: this.newProcesseur,
					prix: this.newPrix,
					tag : this.newType
				})
			})
			  .then(() => {
			  this.newImage= '',
			  this.newType= '',
			  this.newStockage= '',
			  this.newRam= '',
			  this.newCarte= '', 
			  this.newProcesseur= '', 
			  this.newPrix= '',
			  this.newName=''
			  this.nextTodoId=this.nextTodoId++
			  })
			},
		/*Pour supprimer un ordi*/
		supprimerElem:function(index){
			this.$http.delete('/listOrdi/' + index,{})
			.then(() => {
				this.Ordis.splice(index, 1);
				console.log("Ordi Supprimé");
			})
		},
		/*Pour modifier un element de la liste*/
		modifierElem:function(Ordi,index){
			var newValeur;
			var typenumber;
			var type;
			newValeur=this.changement;
			if(this.celulle === 'nom'){
				typenumber=0;
			}else if(this.celulle === 'id'){
				typenumber=1;
			}else if(this.celulle === 'src'){
				typenumber=2;
			}else if(this.celulle === 'stockage'){
				typenumber=3;
			}else if(this.celulle === 'ram'){
				typenumber=4;
			}else if(this.celulle === 'carte'){
				typenumber=5;
			}else if(this.celulle === 'processeur'){
				typenumber=6;
			}else if(this.celulle === 'prix'){
				typenumber=7;
			}else if(this.celulle === 'tag'){
				typenumber=8;
			}
			type=this.celulle;
			console.log(type, typenumber);
			this.$http.put('/listOrdi/'+ index+'/'+ type +'/'+typenumber+'/'+newValeur,{})
			.then(() => {
				Ordi[this.celulle] = this.changement;
				this.celulle = '';
				this.changement = '';	
			})
		},

	}
})