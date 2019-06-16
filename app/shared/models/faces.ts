import { MOJIS } from "./mojis";

export class Face {
    emotivePoint;
    moji;
    mojiIcon;
    gender;

    constructor(emotivePoint, gender) {
        this.emotivePoint = emotivePoint;
        this.moji = this.chooseMoji(this.emotivePoint);
        this.mojiIcon = this.moji.emojiIcon;
        this.gender = gender;
    }

    chooseMoji(point) {
        let closestMoji = null;
        let closestDistance = Number.MAX_VALUE;
        for (let moji of MOJIS) {
            let emoPoint = moji.emotiveValues;
            let distance = emoPoint.distance(point);
            if (distance < closestDistance) {
                closestMoji = moji;
                closestDistance = distance;
            }
        }
        return closestMoji;
    }
}
