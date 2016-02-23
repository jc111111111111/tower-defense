function drawEnemies(instance)
{
	for(var i = 0; i < instance.enemies.length; i++) {
		var enemy = instance.enemies[i];

		instance.context.fillStyle = "black";
		instance.context.fillRect(enemy.x-enemy.size/2, enemy.y-enemy.size/2 - 10, enemy.size, 5);

		instance.context.fillStyle = "green";
		instance.context.fillRect(enemy.x-enemy.size/2 + 1, enemy.y-enemy.size/2 - 9, (enemy.health/enemy.maxHealth) * enemy.size-1, 3);

		instance.context.fillStyle = "red";
		instance.context.fillRect(enemy.x-enemy.size/2 + (enemy.health/enemy.maxHealth) * enemy.size, enemy.y-enemy.size/2 - 9, (1-(enemy.health/enemy.maxHealth)) * (enemy.size-1), 3);

		instance.context.fillStyle = enemy.color;
		instance.context.fillRect(enemy.x-enemy.size/2, enemy.y-enemy.size/2, enemy.size, enemy.size);
	}
}

function drawTowers(instance)
{
  for(var i = 0; i < instance.towers.length; i++) {
		var tower = instance.towers[i];
		instance.context.fillStyle = tower.color;
		instance.context.fillRect(tower.x-5, tower.y-5, 10, 10);
	}
}

function drawProjectiles(instance)
{
	for(var i = 0; i < instance.projectiles.length; i++) {
		var projectile = instance.projectiles[i];
		instance.context.fillStyle = projectile.color;
		instance.context.fillRect(projectile.x-1, projectile.y-1, 2, 2);
	}
}
