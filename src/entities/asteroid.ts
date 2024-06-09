import { PlanetGameObj, ScoreBoardGameObj } from "./types";
import { GameObj, KaboomCtx } from "kaplay";

export function makeAsteroid(k: KaboomCtx, planet: PlanetGameObj, sprite: string, anim: string, scale: number, posX: number, posY: number) {
	const direction = k.vec2(planet.pos.x - posX, planet.pos.y - posY).unit();

	const astroid = k.make([
		k.sprite(sprite, { anim: anim }),
		k.area(),
		k.body(),
		k.pos(posX, posY),
		k.scale(scale),
		k.move(direction, 120),
		k.anchor("center"),
		"astroid"
	]);

	return astroid;
}
export function spawnAsteroid(k: KaboomCtx, planet: PlanetGameObj, sprite: string, anim: string, getScore: () => number) {
	let spawnInterval = 2;

	const spawn = () => {
		const scale = k.rand(0.3, 1.5);

		const offscreenPositions = [
			{ x: k.rand(0, k.width()), y: -50 }, // Top
			{ x: k.rand(0, k.width()), y: k.height() + 50 }, // Bottom
			{ x: -50, y: k.rand(0, k.height()) }, // Left
			{ x: k.width() + 50, y: k.rand(0, k.height()) }, // Right
		];

		const randomPos = offscreenPositions[Math.floor(k.rand(0, offscreenPositions.length))];

		const ast = makeAsteroid(k, planet, sprite, anim, scale, randomPos.x, randomPos.y);
		k.add(ast);

		// Update the spawn interval based on the score
		const score = getScore();
		spawnInterval = Math.max(0.5, 2 - score / 100); // Decrease interval, minimum 0.5 seconds

		// Schedule the next asteroid spawn
		k.wait(spawnInterval, spawn);
	};

	// Start the first spawn
	k.wait(spawnInterval, spawn);
}

export function destroyAsteroid(k: KaboomCtx, asteroid: GameObj, score: ScoreBoardGameObj) {
	const point = Math.floor(10 / asteroid.scale.x);
	score.value = score.value + point;
	score.text = "Score: " + score.value;
	k.destroy(asteroid);
}

export function hit(k: KaboomCtx, asteroid: GameObj, planet: GameObj) {
	const damage = asteroid.scale.x * 20;
	planet.hurt(damage);
	k.destroy(asteroid);
}
