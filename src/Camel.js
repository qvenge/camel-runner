import { Container, Texture, Sprite, AnimatedSprite } from 'pixi.js';
import EventEmitter from 'eventemitter2';


export class Camel extends EventEmitter {
    view;

    constructor(app) {
        super();
        
        const textureArray = [];

        for (let i = 0; i < 36; i++) {
            const texture = Texture.from(`runningCamel${i}`);
            textureArray.push(texture);
        }
        
        this.view = new AnimatedSprite(textureArray);

        this.view.anchor.set(0.5, 1);

        this.view.scale.set(1.5);
        this.view.x = app.screen.width / 2;
        this.view.y = app.screen.height - 30;
    }

    start(app) {
        this.animate();

        // app.ticker.add((time) => {
        //     this.view.animationSpeed = this.state.speed;
        // });
    }

    animate() {
        this.view.play();
        // const delta = time.deltaTime;

        // // Animate the overlay.
        // this.view.tilePosition.y += delta;
    }
}
