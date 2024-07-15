import { Container, Texture, Sprite, Text, TextStyle, Color, FillGradient  } from 'pixi.js';
import EventEmitter from 'eventemitter2';

export class WaterBar {
    constructor(app, state) {
        this.state = state;

        const view = new Container({
            anchor: {x: 0.5, y: 1},
            x: app.screen.width / 2,
            y: app.screen.height - 30,
            scale: 1.2
        });

        const emptyBar = new Sprite({
            texture: Texture.from('waterBarEmpty'),
            anchor: 0.5
        });

        const fillBar = new Sprite({
            texture: Texture.from('waterBarFill'),
            anchor: {x: 0, y: 0.5},
        });

        fillBar.x = - 0.5 * fillBar.width 

        const text = new Text({
            text: `${this.state.water} / ${this.state.maxWater}`,
            style:{
                fill: '#ffffff',
                fontFamily:'LilitaOne',
                fontSize: 15
            },
            anchor: {x: 0.5, y: 0.5},
        });

        view.addChild(emptyBar, fillBar, text);

        this.view = view;
        this.fillBar = fillBar;
        this.emptyBar = emptyBar;
        this.text = text;
    }

    start(app) {
        app.ticker.add((time) => {
            this.update();
        });
    }

    update() {
        const ratio = this.state.water / this.state.maxWater;

        this.fillBar.width = ratio * this.emptyBar.width;
        this.text.text = `${this.state.water} / ${this.state.maxWater}`;
    }
}