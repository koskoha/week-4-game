 function Character (hp, attac, counterAttac){
 	this.hp = hp;
 	this.attackPower = attac;
 	this.counterAttack = counterAttac;
 	this.player = false;
 	this.enemi = false;
 	this.live = true;

 	function attack( enemie){
 		this.attackPower *=2;
 		enemie.hp -= this.attackPower;
 		this.hp -=enemie.counterAttac;
 		if (this.hp <=0) {
 			live = false;
 		}
 	}
 }


var obeWan = new Character(100, 20, 15);
var luke = new Character(150, 30,20);
var darth= new Character(150, 45,15);
var maul = new Character(180, 30,30);

var defenders =[obeWan,luke,darth,maul];
var player = [];
var enemies = [];







$(document).ready(function(){
	$('#luke').click(function(){
		player.push(luke);
		moveToEnemies(dart,maul,obiwan);
	})
	$('#dart').click(function(){
		player.push(dart);
		moveToEnemies(luke,maul,obiwan);

	})
	$('#maul').click(function(){
		player.push(maul);
		moveToEnemies(dart,luke,obiwan);

	})
	$('#obiwan').click(function(){
		player.push(obiwan);
		moveToEnemies(dart,maul,luke);

	})

	function moveToEnemies(enemi1, enemi2, enemi3){
		enemies.push(enemi1);
		enemies.push(enemi2);
		enemies.push(enemi3);
	}

});


