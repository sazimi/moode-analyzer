import { Face } from "./faces";
import { EmotivePoint } from "./emotivePoint";
import { FaceData } from "./face.model"

enum Emotion {
    anger,
    contempt,
    disgust,
    fear,
    happiness,
    neutral,
    sadness,
    surprise,
    none
}

export const getEmotionData = (faces: Face[]) => {
    return moodDetect(faces);
}

export const calculateEmotion = (faces) => {
    return faces.map((face) => {
        const scores = new EmotivePoint(face.faceAttributes.emotion);
        const newFace = new Face(scores, face.faceAttributes.gender);
        return newFace
    })

}

export const moodDetect = (faces): FaceData[] => {
    let emotion = calculateEmotion(faces);
    const emojis = emotion.map(emotion => emotion.mojiIcon);
    const uniqueEmojis = [...new Set(emojis)];
    console.log("uniqueEmojis", uniqueEmojis);

    return uniqueEmojis.map(emoji => {
        const faceData: FaceData = {
            emoji: emoji,
            count: emojis.filter(e => emoji === e).length
        };
        return faceData;
    })
}
