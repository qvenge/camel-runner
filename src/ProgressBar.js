import { Container, Texture, Sprite, Text, TextStyle, Color, Graphics  } from 'pixi.js';
import EventEmitter from 'eventemitter2';

export class ProgressBar {
    constructor(app, state) {
        this.state = state;

        const view = new Container({
            anchor: {x: 0.5, y: 0.5},
            x: 30,
            y: app.screen.height / 2,
            scale: 0.7
        });

        const progressBar = new Sprite({
            texture: Texture.from('progressBar'),
            anchor: 0.5,
        });

        const camelIcon = new Sprite({
            texture: Texture.from('camelIcon'),
            anchor: {x: 0.5, y: 1},
            y: progressBar.height / 2
        });

        const text = new Text({
            text: this.state.progress.toFixed(2),
            style:{
                fill: '#ffffff',
                fontFamily:'LilitaOne',
                fontSize: 18,
                // backgroundColor: '#000'
            },
            anchor: {x: 0.5, y: 0},
            y: progressBar.height / 2
        });

        const rect = new Graphics({
            anchor: {x: 0, y: 0},
            y: progressBar.height / 2
        });

        rect.rect(- (10 + text.width / 2), 0, text.width + 20, text.height + 2);
        rect.fill({color: '#000', alpha: 0.3});

        view.addChild(progressBar, camelIcon, rect, text);

        this.view = view;
        this.progressBar = progressBar;
        this.camelIcon = camelIcon;
        this.text = text;
        this.textRect = rect;
    }

    start(app) {
        app.ticker.add((time) => {
            this.update();
        });
    }

    update() {
        const shift = this.progressBar.height / 2 - this.progressBar.height * this.state.progress / 100;
        this.camelIcon.y = shift;
        this.text.y = shift;
        this.textRect.y = shift;

        this.text.text = this.state.progress.toFixed(2);
        // const ratio = this.state.water / this.state.maxWater;

        // this.fillBar.width = ratio * this.emptyBar.width;
        // this.text.text = `${this.state.water} / ${this.state.maxWater}`;
    }
}