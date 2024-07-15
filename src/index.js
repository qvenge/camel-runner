import { Application, Assets } from 'pixi.js';
import { Track } from './Track';
import { Camel } from './Camel';
import { CoinRain } from './CoinRain';
import { State } from './State';
import { ScoreBar } from './ScoreBar';
import { WaterBar } from './WaterBar';
import { ProgressBar } from './ProgressBar';

import trackSrc from './textures/track.png';
import coinSrc from './textures/coin.png';
import waterBarEmptySrc from './textures/tap-bar.png';
import waterBarFillSrc from './textures/tap-fill.png';
import progressBarSrc from './textures/progress-bar.png';
import camelIconSrc from './textures/camel-icon.png';

import './style.css';

const app = new Application();

async function setup()
{
    await app.init({ background: '#1099bb', resizeTo: window });

    document.body.appendChild(app.canvas);
}

async function preload() {
    const assets = [
        { alias: 'track', src: trackSrc },
        { alias: 'coin', src: coinSrc },
        { alias: 'waterBarEmpty', src: waterBarEmptySrc },
        { alias: 'waterBarFill', src: waterBarFillSrc },
        { alias: 'camelIcon', src: camelIconSrc },
        { alias: 'progressBar', src: progressBarSrc },
    ];

    for (let i = 0; i < 36; ++i) {
        assets.push({
            alias: `runningCamel${i}`,
            src: (await import(`./textures/camel/camel_run_${i + 1}.png`)).default,
        });
    }

    for (let i = 0; i < 50; ++i) {
        let coinIndex = String(i + 1);

        coinIndex = Array(4 - coinIndex.length).fill('0').join('') + coinIndex;

        assets.push({
            alias: `rotatingCoin${i}`,
            src: (await import(`./textures/coin/coin_${coinIndex}.png`)).default,
        });
    }

    // Load the assets defined above.
    await Assets.load(assets);
}

// Asynchronous IIFE
(async () =>
{
    await setup();
    await preload();

    const state = new State();

    const track = new Track(app, state);
    const camel = new Camel(app, state);
    const coinRain = new CoinRain(app, state);
    const scoreBar = new ScoreBar(app, state);
    const waterBar = new WaterBar(app, state);
    const progressBar = new ProgressBar(app, state);

    app.stage.addChild(
        track.view,
        coinRain.view,
        camel.view,
        scoreBar.view,
        waterBar.view,
        progressBar.view,
    );

    scoreBar.start(app);
    camel.start(app);
    coinRain.start(app);
    waterBar.start(app);
    state.start(app);
    progressBar.start(app);


    // Add the animation callbacks to the application's ticker.
    app.ticker.add((time) =>
    {
        track.animate(time);
    });
})();