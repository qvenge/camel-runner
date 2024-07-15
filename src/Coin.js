import { Container, Texture, Sprite, AnimatedSprite } from 'pixi.js';
import EventEmitter from 'eventemitter2';


export class Coin extends EventEmitter {
    view;
    emitter;

    constructor(app) {
        super();

        // const { width, height } = app.screen;

        const textureArray = [];

        for (let i = 0; i < 50; i++) {
            const texture = Texture.from(`rotatingCoin${i}`);
            textureArray.push(texture);
        }
        
        const view = new AnimatedSprite(textureArray);

        view.anchor.set(0.5);

        view.scale.set(0.3);

        // Opt-in to interactivity
        view.eventMode = 'static';

        // Shows hand cursor
        view.cursor = 'pointer';

        this.view = view;
    }

    animate() {
        this.view.play();
        // const delta = time.deltaTime;

        // // Animate the overlay.
        // this.view.tilePosition.y += delta;
    }

    destroy() {
        this.emit('beforeDestroy');
        this.view.destroy();
        this.emit('destroyed');
    }
}
