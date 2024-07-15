import { Container, Texture, Sprite, AnimatedSprite } from 'pixi.js';
import EventEmitter from 'eventemitter2';

import { Coin } from './Coin';

export class CoinRain extends EventEmitter {
    view;
    coins;

    lastCoinAdditionTimestamp;

    constructor(app, state) {
        super();

        this.state = state;
        this.view = new Container();
        this.coins = new Set();
        this.lastCoinAdditionTimestamp = 0;

        const board = new Sprite({width: app.screen.width, height: app.screen.height});

        this.view.addChild(board);

        board.eventMode = 'static';

        board.on('pointerdown', (event) => {
            if (this.state.water < this.state.tapWaterPrice) {
                return;
            }

            this.state.score += 1;
            this.state.water -= this.state.tapWaterPrice;
            this.state.progress += this.state.tapProgressIncrease;
        });
    }

    start(app) {
        const lowLimit = 0;
        const topLimit = 1000; 
        const limitDiff = topLimit - lowLimit;

        let nextAdditionTime = 0;

        app.ticker.add((time) => {
            const delta = time.deltaTime;
            const speed = this.state.speed;

            if (nextAdditionTime < time.lastTime) {
                this.addCoin(app);
                nextAdditionTime = time.lastTime + (lowLimit + (limitDiff * Math.random()));
            }

            const coinsToDestroy = [];

            this.coins.forEach((coin) => {
                if (coin.view.destroyed) {
                    return;
                }

                coin.view.y += speed * delta;

                if ((app.screen.height + coin.view.height) < coin.view.y) {
                    coinsToDestroy.push(coin);
                }
            });

            coinsToDestroy.forEach((coin) => coin.view.destroy() )
        });
    }

    addCoin(app) {
        const coin = new Coin(app);

        coin.view.y = -1 * (coin.view.height / 2);

        coin.view.x = Math.random() * app.screen.width;

        const onCoinClick = (event) => {
            if (this.state.water < this.state.tapWaterPrice) {
                return;
            }

            this.state.score += this.state.coinClickScoreAward;;
            this.state.water -= this.state.tapWaterPrice;
            this.state.progress += this.state.tapProgressIncrease;
            coin.destroy();
        }

        const onBeforeDestroy = () => {
            this.coins.delete(coin);
            coin.view.off('pointerdown', onCoinClick);
            coin.off('beforeDestroy', onBeforeDestroy);
        }

        coin.on('beforeDestroy', onBeforeDestroy);
        coin.view.on('pointerdown', onCoinClick);

        this.view.addChild(coin.view);
        this.coins.add(coin);

        coin.animate();
    }

    // animate(time) {
    //     const delta = time.deltaTime;

    //     this.coins.forEach((coin) => {
    //         coin.view.y += delta;
    //     });
    // }
}
