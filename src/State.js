export class State {
    _water;
    _score;
    _progress;
    _maxWater;

    constructor(opts) {
        this._score = 0;
        this._progress = 0;
        this._maxWater = 1000;
        this._water = 1000;

        this.speed = 2;
        this.tapWaterPrice = 1;
        this.tapProgressIncrease = 0.01;
        this.coinClickScoreAward = 2;

        this.waterIncreasePer = 6000;

        this.targetAchivementScoreAward = 1000;
    }

    get maxWater() {
        return this._maxWater;
    }

    get water() {
        return this._water;
    }

    set water(value) {
        const { maxWater } = this;
        this._water = value < maxWater ? value : maxWater;
    }

    get score() {
        return this._score;
    }

    set score(value) {
        this._score = value;
    }

    get progress() {
        return this._progress;
    }

    set progress(value) {
        if (value >= 100) {
            this._water = this._maxWater;
            this._progress = 0;
            this._score += this.targetAchivementScoreAward;
        } else {
            this._progress = value;
        }
    }

    start(app) {
        let prev = Date.now();

        app.ticker.add((time) => {
            const curr = Date.now();

            if ((curr - prev) > this.waterIncreasePer && 1 < (this.maxWater - this.water)) {
                this.water += 1;
                prev = curr;
            }
        });
    }

    restartProgress() {
        this.progress = 0;
    }

    restartWater() {
        this.water = this.maxWater;
    }
}