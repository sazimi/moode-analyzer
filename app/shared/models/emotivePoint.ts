export class EmotivePoint {
    anger: number;
    contempt: number;
    disgust: number;
    fear: number;
    happiness: number;
    neutral: number;
    sadness: number;
    surprise: number;

    constructor({
        anger,
        contempt,
        disgust,
        fear,
        happiness,
        neutral,
        sadness,
        surprise
    }) {
        this.anger = anger;
        this.contempt = contempt;
        this.disgust = disgust;
        this.fear = fear;
        this.happiness = happiness;
        this.neutral = neutral;
        this.sadness = sadness;
        this.surprise = surprise;
    }
    euclideanDistance(a, b) {
        return Math.sqrt(this.squared(a, b));
    }
    squared(a, b): number {
        var sum = 0
        var n
        for (n = 0; n < a.length; n++) {
            sum += Math.pow(a[n] - b[n], 2)
        }
        return sum
    }

    toArray() {
        return [
            this.anger,
            this.contempt,
            this.disgust,
            this.fear,
            this.happiness,
            this.neutral,
            this.sadness,
            this.surprise
        ];
    }

    distance(other) {
        let myPoint = this.toArray();
        let otherPoint = other.toArray();
        return this.euclideanDistance(myPoint, otherPoint);
    }
}
