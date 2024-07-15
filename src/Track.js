import { Texture, TilingSprite } from 'pixi.js';


export class Track {
    view;

    constructor(app, state) {
        this.state = state;

        const texture = Texture.from('track');
        const { width, height } = app.screen;

        this.view = new TilingSprite({
            texture,
            width: width,
            height: height,
            tileScale: width / texture.width
        });
    }

    animate(time) {
        const delta = time.deltaTime;

        // Animate the overlay.
        this.view.tilePosition.y += this.state.speed * delta;
    }
}
