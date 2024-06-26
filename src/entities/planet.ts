import { KaboomCtx } from "kaplay";
import { regularPolygon } from "./utils";

export function makePlanet(k: KaboomCtx, sprite: string, posX: number, posY: number, opacity: number) {
	let scale = 2;

	if (k.width() < 640) {
		scale = 1.3;
	}

	const octagonPoints = regularPolygon(k, 50, 20)

	const planet = k.make([
		k.sprite(sprite, { anim: "turn" }),
		k.area({
			shape: new k.Polygon(octagonPoints)
		}),
		k.body({ isStatic: true }),
		k.pos(posX, posY),
		k.health(150),
		k.scale(scale),
		k.opacity(opacity),
		k.anchor("center"),
		{ maxHp: 100, previousHp: 100 },
		"planet"
	]);

	return planet;
}


