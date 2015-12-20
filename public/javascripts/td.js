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
var projectiles = [];

setInterval(run, 1);
setInterval(draw, 1);

for(var i = 0; i < 10; i++) {
	spawnQ.push({x: -10, y: context.canvas.height/2, velX: .25, velY: 0, health: 10, maxHealth: 10, size: 20, color: "black"});
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
			if(dist(towers[i].x, towers[i].y, enemies[j].x, enemies[j].y) < 500) {
				if(towers[i].fireDelay-- === 0) {
					towers[i].fireDelay = towers[i].attackRate;
					projectiles.push({damage: 1, source: towers[i], dest: enemies[j], x: towers[i].x, y: towers[i].y, color: "black", size: 2, vel: 1});
				}
			}
		}
	}

	for(var i = 0; i < projectiles.length; i++) {
		if(projectiles[i].dest.health > 0) {
			var source = projectiles[i].source, dest = projectiles[i].dest;
			var distance = dist(projectiles[i].x, projectiles[i].y, dest.x, dest.y);
			projectiles[i].x += (dest.x-projectiles[i].x) * projectiles[i].vel / distance;
			projectiles[i].y += (dest.y-projectiles[i].y) * projectiles[i].vel / distance;
			if(dist(projectiles[i].x, projectiles[i].y, dest.x, dest.y) < 2) {
				dest.health--;
				projectiles.splice(i--, 1);
			}
		}
		else
			projectiles.splice(i--, 1);
	}
}

function click(event)
{
	var mouseX = event.clientX, mouseY = event.clientY;
	towers.push({x: mouseX, y: mouseY, type: "arrow", attackRate: 400, fireDelay: 0, color: "green"});
	
}

function draw()
{
	context.clearRect(0, 0, window.innerWidth, window.innerHeight);

	for(var i = 0; i < enemies.length; i++) {
		var enemy = enemies[i];

		context.fillStyle = "black";
		context.fillRect(enemy.x-enemy.size/2, enemy.y-enemy.size/2 - 10, enemy.size, 5);

		context.fillStyle = "green";
		context.fillRect(enemy.x-enemy.size/2 + 1, enemy.y-enemy.size/2 - 9, (enemy.health/enemy.maxHealth) * enemy.size-1, 3);

		context.fillStyle = "red";
		context.fillRect(enemy.x-enemy.size/2 + (enemy.health/enemy.maxHealth) * enemy.size, enemy.y-enemy.size/2 - 9, (1-(enemy.health/enemy.maxHealth)) * (enemy.size-1), 3);

		context.fillStyle = enemy.color;
		context.fillRect(enemy.x-enemy.size/2, enemy.y-enemy.size/2, enemy.size, enemy.size);

		if(enemy.health <= 0)
			enemies.splice(i--, 1);
	}

	for(var i = 0; i < towers.length; i++) {
		var tower = towers[i];
		context.fillStyle = tower.color;
		context.fillRect(tower.x-5, tower.y-5, 10, 10);
	}

	for(var i = 0; i < projectiles.length; i++) {
		var projectile = projectiles[i];
		context.fillStyle = projectile.color;
		context.fillRect(projectile.x-1, projectile.y-1, 2, 2);
	}
}

function dist(x1, y1, x2, y2) { return Math.sqrt((x1-x2)*(x1-x2) + (y1-y2)*(y1-y2)); }
