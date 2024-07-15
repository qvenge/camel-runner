import { Container, Texture, Sprite, Text, TextStyle, Color, FillGradient  } from 'pixi.js';
import EventEmitter from 'eventemitter2';

export class ScoreBar {
    constructor(app, state) {
        this.state = state;

        const view = new Container({
            anchor: {x: 0.5, y: 0.5},
            x: app.screen.width / 2,
            y: 50
        });

        const icon = new Sprite({
            texture: Texture.from('coin'),
            anchor: {x: 0.5, y: 1},
            scale: 0.13
        });

        const value = new Text({
            text: `${this.state.score}`,
            style:{
                fill: '#ffffff',
                fontFamily:'LilitaOne'
            },
            anchor: {x: 0.5, y: 0},
            y: 10
        });

        this.view = view;
        this.value = value;
        this.icon = icon;

        view.addChild(icon, value);
    }

    start(app) {
        app.ticker.add((time) => {
            this.updateScore();
        });
    }

    updateScore() {
        this.value.text = `${this.state.score}`;
    }

    drawText(text) {


        

        // const fill = new FillGradient(0, 0, 0, 36 * 1.7 * 7);

        // const colors = [0xffffff, 0x00ff99].map((color) => Color.shared.setValue(color).toNumber());

        // colors.forEach((number, index) =>
        // {
        //     const ratio = index / colors.length;

        //     fill.addColorStop(ratio, number);
        // });

        // const style = new TextStyle({
        //     fontFamily: 'Arial',
        //     fontSize: 36,
        //     fontStyle: 'italic',
        //     fontWeight: 'bold',
        //     fill: { fill },
        //     stroke: { color: '#4a1850', width: 5, join: 'round' },
        //     dropShadow: {
        //         color: '#000000',
        //         blur: 4,
        //         angle: Math.PI / 6,
        //         distance: 6,
        //     },
        //     wordWrap: true,
        //     wordWrapWidth: 440,
        // });

        // const richText = new Text({
        //     text: 'Rich text with a lot of options and across multiple lines',
        //     style,
        // });

        // richText.x = 50;
        // richText.y = 220;

        // app.stage.addChild(richText);

        // const skewStyle = new TextStyle({
        //     fontFamily: 'Arial',
        //     dropShadow: {
        //         alpha: 0.8,
        //         angle: 2.1,
        //         blur: 4,
        //         color: '0x111111',
        //         distance: 10,
        //     },
        //     fill: '#ffffff',
        //     stroke: { color: '#004620', width: 12, join: 'round' },
        //     fontSize: 60,
        //     fontWeight: 'lighter',
        // });

        // const skewText = new Text({
        //     text: 'SKEW IS COOL',
        //     style: skewStyle,
        // });

        // skewText.skew.set(0.65, -0.3);
        // skewText.anchor.set(0.5, 0.5);
        // skewText.x = 300;
        // skewText.y = 480;

        // app.stage.addChild(skewText);
    }
}