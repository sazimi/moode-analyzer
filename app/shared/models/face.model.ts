export interface Face {
    faceAttributes: FaceAttributes;
}

export interface FaceAttributes {
    emotion: FaceEmotion;
}

export interface FaceEmotion {
    anger,
    contempt,
    disgust,
    fear,
    happiness,
    neutral,
    sadness,
    surprise
}

export interface FaceData { emoji: string, count: number }