$(document).ready(function(){
	$('.background').trigger('play');
	$(".background").prop("volume",0.3);
	$('#mute').click(function(){
		$('.background').prop("muted",!$(".background").prop("muted"));
	});

	 function Character (hpId, hp, attack, counterAttack, name, heroImage){
	 	this.hpId = hpId;
	 	this.hp = hp;
	 	this.attackCons = attack;
	 	this.attackPower = attack;
	 	this.counterAttack = counterAttack;
	 	this.name = name;
	 	this.heroImage = heroImage;
	 	this.player = false;
	 	this.enemi = false;
	 	this.live = true;

	 	this.attack = function  (defender){
	 		var info = $('#info');
	 		defender.hp -= this.attackPower;
	 		this.attackPower +=this.attackCons;
	 		if (defender.hp <= 0) {
	 			$('#defender').empty();
	 			enemiesCounter --;
	 			defender.live = false;
	 			defenderAssigned = false;
	 			console.log("****DEFENDER LiVE", defender.live )
	 		}else{
		 		this.hp -=defender.counterAttack;
		 		if (this.hp <= 0) {
		 			this.live = false;
		 			console.log("****PLAYER LiVE", this.live )
		 		}
		 	}
			$('#player').find('#'+this.hpId).empty();
			$('#player').find('#'+this.hpId).append(this.hp);
			$('#defender').find('#'+defender.hpId).empty();
			$('#defender').find('#'+defender.hpId).append(defender.hp);
	 		info.empty();
	 		info.append("<br>You attack ", defender.name, " for "+this.attackPower, " damage.");
	 		info.append('<br>',defender.name, " attacked you back for ", defender.counterAttack, " damage.");
		 	
	 	}
	 }




	var skorpion = new Character("sk_hp",100, 10, 15, 'Skorpion', '<div class="inline"><div id="skorpion">'+
		'<div>Skorpion</div>'+
			'<img src="assets/images/skorpion.jpg">'+
			'<div id="sk_hp"></div>'+
		'</div></div>');
	var subzero = new Character('sub_hp', 130, 5,20, 'Sub-Zero','<div class="inline"><div id="subzero">'+
		'<div>Sub-Zero</div>'+
			'<img src="assets/images/subzero.jpg">'+
			'<div id="sub_hp"></div>'+
		'</div></div>');
	var liukang= new Character('liu_hp',180, 15,15, 'Liu Kang', '<div class="inline"><div id="liukang">'+
		'<div>Liu Kang</div>'+
			'<img src="assets/images/liukang.jpg">'+
			'<div id="liu_hp"></div>'+
		'</div></div>');
	var raiden = new Character('rai_hp',90, 10,30, 'Raiden', '<div class="inline"><div id="raiden">'+
		'<div>Raiden</div>'+
			'<img src="assets/images/raiden.jpg">'+
			'<div id="rai_hp"></div>'+
		'</div></div>');
	var characters =[skorpion, subzero,liukang,raiden];
	var player;
	var defender;
	var defenderAssigned = false;
	var enemiesCounter = characters.length-1; 

/******************Assign Player***********************/
  	assignPlayer();
	function assignPlayer(){
		for (var i = 0; i < characters.length; i++) {
			$('#characters').append(characters[i].heroImage);
			$('#characters').find('#'+characters[i].hpId).append(characters[i].hp);
		}
		fadeInHehoes();
		$('#skorpion').click(function(){
			player = skorpion;
			playName(".skorpion_name");
			addPlayer();
		});
		$('#subzero').click(function(){
			player = subzero;
			playName(".subzero_name");
			addPlayer();
		});
		$('#liukang').click(function(){
			player = liukang;
			playName(".liukang_name");
			addPlayer();
		});
		$('#raiden').click(function(){
			player = raiden;
			playName(".raiden_name");
			addPlayer();
		});
	}

	function playName(name){
		$(name).trigger('play');
	}

	function addPlayer(){
		$('#player').empty();
		$('#player').append(player.heroImage);
		$('#player').find('#'+player.hpId).append(player.hp);
		assignDefender()
	}

	function fadeInHehoes(){
		$('#skorpion').fadeIn("slow");
		$('#subzero').fadeIn("slow");
		$('#raiden').fadeIn("slow");
		$('#liukang').fadeIn("slow");
	}

	function fadeInOpponents(removed){
		if (removed != 'skorpion') {
			$('#opponents').find('#skorpion').hide();
			$('#opponents').find('#skorpion').fadeIn("slow");
		}
		if (removed != 'subzero') {
			$('#opponents').find('#subzero').hide();
			$('#opponents').find('#subzero').fadeIn("slow");
		}
		if (removed != 'liukang') {
			$('#opponents').find('#liukang').hide();
			$('#opponents').find('#liukang').fadeIn("slow");
		}
		if (removed != 'raiden'){
			$('#opponents').find('#raiden').hide();
			$('#opponents').find('#raiden').fadeIn("slow");
		}
	}



	function assignDefender(){
		$('#characters').empty();
		var oponentsField = $('#opponents');
		for (var i = 0; i < characters.length; i++) {
			if (characters[i].name !== player.name) {
				oponentsField.append(characters[i].heroImage);
				$('#opponents').find('#'+characters[i].hpId).append(characters[i].hp);
			}
		}
		fadeInHehoes();

		$('#opponents').on('click','#skorpion',function(){
			if (defenderAssigned == false) {
				defender = skorpion;
				playName('.skorpion_name');
				$("#opponents").find("#skorpion").closest('.inline').empty();
				fadeInOpponents('skorpion');
				addDefender();
				$('#defender').find('#skorpion').fadeIn("slow");
			}
		});
		$('#opponents').on('click','#liukang',function(){
			if (defenderAssigned == false) {
				playName('.liukang_name');
				defender = liukang;
				$("#opponents").find("#liukang").closest('.inline').empty();
				fadeInOpponents('liukang');
				addDefender();
				$('#defender').find('#liukang').fadeIn("slow");
			}
		});
		$('#opponents').on('click','#raiden',function(){
			if (defenderAssigned == false) {
				playName('.raiden_name');
				defender = raiden;
				$("#opponents").find("#raiden").closest('.inline').empty();
				fadeInOpponents('raiden');
				addDefender();
				$('#defender').find('#raiden').fadeIn("slow");
			}
		});
		$('#opponents').on('click','#subzero',function(){
			if (defenderAssigned == false) {
				playName('.subzero_name');
				defender = subzero;
				$("#opponents").find("#subzero").closest('.inline').empty();
				fadeInOpponents('subzero');
				addDefender();
				$('#defender').find('#subzero').fadeIn("slow");

			}
		});
		function addDefender(){
			defenderAssigned = true;
			$('#defender').empty();
			$('#defender').append(defender.heroImage);
			$('#defender').find('#'+defender.hpId).append(defender.hp);
		}
	}

	$('#attack').click(function(){
		attacking();
	});

	function attacking(){
		if (player == undefined) {
			$('#player').empty();
			$('#player').append('<h3 style="color:red">Choose player first</h3>');
		}else if(defender == undefined){
			$('#defender').empty();
			$('#defender').append('<h3 style="color:red">Choose defender first</h3>');
		}else{
			if (player.live == false) {
				$('#defender').empty();
				$('#player').empty();
				$(".defeated").trigger('play');
				$('#player').append('<div><br><h2 style="color:red">You are defeated!!!</h2><br></div>');
				$('#restart').addClass('show');
			}
			if (defender.live == false && enemiesCounter <= 0) {
				$('#restart').addClass('show');
			}
			if (player.hp >0 && defender.hp > 0) {
				$(".kick").trigger('play');
				player.attack(defender);
			}
		}
		if (enemiesCounter == 0 && player.live == true) {
			if (player.name === "Liu Kang") {
				playName('.liukang_win');
			}else if (player.name === "Skorpion") {
				playName('.skorpion_win');
			}else if (player.name === "Raiden") {
				playName('.raiden_win');
			}else{
				playName('.subzero_win');
			}
			$('#opponents').append('<div><br><h2 style="color:red">You Are Won!!!</h2><br></div>');
			$('#info').empty();
			$('#restart').addClass('show');
		}
	}

	$('#restart').click(function(){
		console.log(subzero);
		$('#characters').empty();
		$('#player').empty();
		$('#opponents').empty();
		$('#defender').empty();
		$('#info').empty();
		$('#restart').removeClass('show');
		skorpion.hp =100;
		skorpion.attackPower = 10;
		skorpion.counterAttack =15;
		skorpion.live = true;
		subzero.hp =130;
		subzero.attackPower = 5;
		subzero.counterAttack =20;
		subzero.live = true;
		liukang.hp =180;
		liukang.attackPower = 15;
		liukang.counterAttaliukang = 15;
		liukang.live = true;
		raiden.hp =90;
		raiden.attackPower = 10;
		raiden.counterAttaliukang = 30;
		raiden.live = true;
		characters =[];
		characters.push(skorpion, subzero,liukang,raiden);
		player = undefined;
		defender = undefined;
		defenderAssigned = false;
		enemiesCounter = characters.length-1;
		assignPlayer();
	});




});




function printPlayer(player){
	console.log('************************')
	console.log("PLAYER name ", player.name);
	console.log("PLAYER health ", player.hp);
	console.log("PLAYER attack ", player.attackPower);
	console.log("PLAYER live ", player.live);
}

function printDefender(defender){
	console.log('************************')
	console.log("DEFENDER name ", defender.name);
	console.log("DEFENDER health ", defender.hp);
	console.log("DEFENDER counter attack ", defender.counterAttack);
	console.log("DEFENDER live ", defender.live);
}

