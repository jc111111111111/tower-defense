"use strict";
var context = document.getElementById("a").getContext("2d");
context.canvas.width = window.innerWidth;
context.canvas.height = window.innerHeight;
document.addEventListener("click", click);

var spawnQ = [];
var spawnRate = 400;
var spawnCounter = 0; 
var enemies = [];
var towers = [];

setInterval(run, 1);
setInterval(draw, 1);

for(var i = 0; i < 10; i++) {
	spawnQ.push({x: -10, y: context.canvas.height/2, velX: .25, velY: 0, size: 10, color: "black"});
}

function run()
{
	if(spawnQ.length > 0 && spawnCounter-- === 0) {
		enemies.push(spawnQ.pop());
		spawnCounter = spawnRate;
	}	
	
	for(var i = 0; i < enemies.length; i++) {
		enemies[i].x += enemies[i].velX;
		enemies[i].y += enemies[i].velY;
	}

	for(var i = 0; i < towers.length; i++) {
		for(var j = 0; j < enemies.length; j++) {
			if(dist(towers[i].x, towers[i].y, enemies[j].x, enemies[j].y) < 10) {
				projectiles.push({source: towers[i], dest: enemies[j], size: 2, vel: 1});
			}
		}
	}
}

function click(event)
{
	var mouseX = event.clientX, mouseY = event.clientY;
	towers.push({x: mouseX, y: mouseY, type: "arrow", attackRate: 100, color: "green"});
	
}

function draw()
{
	context.clearRect(0, 0, window.innerWidth, window.innerHeight);

	for(var i = 0; i < enemies.length; i++) {
		var enemy = enemies[i];
		context.fillStyle = enemy.color;
		context.fillRect(enemy.x-enemy.size/2, enemy.y-enemy.size/2, enemy.size, enemy.size);
	}

	for(var i = 0; i < towers.length; i++) {
		var tower = towers[i];
		context.fillStyle = tower.color;
		context.fillRect(tower.x-5, tower.y-5, 10, 10);
	}
}

function dist(x1, y1, x2, y2) { return Math.sqrt((x1-x2)*(x1-x2) + (y1-y2)*(y1-y2)); }
