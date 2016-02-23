"use strict";
document.addEventListener("click", click);

var instance = {
	context: document.getElementById("a").getContext("2d"),
	spawnQueue: [],
	spawnRate: 400,
	spawnCounter: 0,
	enemies: [],
	towers: [],
	projectiles: []
};

function start(instance)
{
	instance.context.canvas.width = window.innerWidth;
	instance.context.canvas.height = window.innerHeight;

	setInterval(run, 1, instance);
	setInterval(drawInstance, 1, instance);

	for(var i = 0; i < 10; i++) {
		instance.spawnQueue.push({
			x: -10,
			y: instance.context.canvas.height/2,
			velX: .25,
			velY: 0,
			health: 10,
			maxHealth: 10,
			size: 20,
			color: "black"
		});
	}
}

function run(instance)
{
	if(instance.spawnQueue.length > 0 && instance.spawnCounter-- === 0) {
		instance.enemies.push(instance.spawnQueue.pop());
		instance.spawnCounter = instance.spawnRate;
	}

	for(var i = 0; i < instance.enemies.length; i++) {
		instance.enemies[i].x += instance.enemies[i].velX;
		instance.enemies[i].y += instance.enemies[i].velY;

		if(enemy.health <= 0)
			instance.enemies.splice(i--, 1);
	}

	for(var i = 0; i < instance.towers.length; i++) {
		var tower = instance.towers[i];
		for(var j = 0; j < instance.enemies.length; j++) {
			var enemy = instance.enemies[j];
			if(dist(tower.x, tower.y, enemy.x, enemy.y) < tower.range) {
				if(tower.fireDelay-- === 0) {
					tower.fireDelay = tower.attackRate;
					instance.projectiles.push({
						damage: 1,
						source: tower,
						dest: enemy,
						x: tower.x,
						y: tower.y,
						color: "black",
						size: 2,
						vel: 1
					});
				}
			}
		}
	}

	for(var i = 0; i < instance.projectiles.length; i++) {
		if(instance.projectiles[i].dest.health > 0) {
			var source = instance.projectiles[i].source, dest = instance.projectiles[i].dest;
			var distance = dist(instance.projectiles[i].x, instance.projectiles[i].y, dest.x, dest.y);
			instance.projectiles[i].x += (dest.x-instance.projectiles[i].x) * instance.projectiles[i].vel / distance;
			instance.projectiles[i].y += (dest.y-instance.projectiles[i].y) * instance.projectiles[i].vel / distance;
			if(dist(instance.projectiles[i].x, instance.projectiles[i].y, dest.x, dest.y) < 2) {
				dest.health--;
				instance.projectiles.splice(i--, 1);
			}
		}
		else
			instance.projectiles.splice(i--, 1);
	}
}

function click(event)
{
	instance.towers.push({
		x: event.clientX,
		y: event.clientY,
		type: "arrow",
		range: 500,
		attackRate: 400,
		fireDelay: 0,
		color: "green"
	});
}

function drawInstance(instance)
{
	instance.context.clearRect(0, 0, window.innerWidth, window.innerHeight);

	drawEnemies(instance);
	drawTowers(instance);
	drawProjectiles(instance);
}
