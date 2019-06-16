import { Component } from '@angular/core';

import { takePicture, requestCameraPermissions } from 'nativescript-camera';
import { ImageAsset } from 'tns-core-modules/image-asset/image-asset';
import { ImageSource } from 'tns-core-modules/image-source';
import { File, knownFolders, path } from 'tns-core-modules/file-system';
import { isAndroid } from "tns-core-modules/platform";

import { session } from '../nativescript-background-http';

import { Face } from '../shared/models/face.model';
import { getEmotionData } from '../shared/models/emojiCalculator';


@Component({
    selector: 'Home',
    moduleId: module.id,
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent {
    private faceUrl = 'https://westeurope.api.cognitive.microsoft.com/face/v1.0/detect?returnFaceLandmarks=false&returnFaceAttributes=age,gender,smile,glasses,emotion,facialHair';
    public result = [];
    public dataSource;


    pictureFromCamera: any;

    constructor() {
        //requestCameraPermissions();
    }

    async runFaceDetect() {
        this.dataSource = [];

        const imageAsset = await takePicture({ width: 300, height: 500, keepAspectRatio: true, saveToGallery: false });

        const filePath = await this.getFilePath(imageAsset);
        const imageFile = File.fromPath(filePath);
        this.pictureFromCamera = imageAsset;

        this.result = await this.sendRequest(imageFile);

        this.dataSource = getEmotionData(this.result);
    }



    async getFilePath(asset: ImageAsset) {
        if (isAndroid) {
            return asset.android;
        }

        const source = await (new ImageSource()).fromAsset(asset);

        const folder = knownFolders.documents().path;
        const fileName = `face - ${new Date().toLocaleDateString()}.png`;
        const filePath = path.join(folder, fileName);
        const saved = source.saveToFile(filePath, 'png');
        if (saved) {
            console.log('Image ready for upload!');
        }

        return filePath;
    }


    sendRequest(file: File): Promise<any> {
        return new Promise((resolve, reject) => {
            const ses = session('image-upload');

            const request = {
                url: this.faceUrl,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/octet-stream',
                    'Ocp-Apim-Subscription-Key': '7d30f6357121430e91b3f8439b8205c6',
                },
                description: 'Uploading ' + file.name
            };

            console.log(file.path);
            const task = ses.uploadFile(file.path, request);

            task.on('error',
                e => reject('error ' + e.responseCode + ' code.')
            )

            task.on('responded',
                e => {
                    const data = JSON.parse(e.data);
                    resolve(data);
                }
            );

            resolve(backupData());
        });


    }
}
















const backupData = () => {
    return [
        {
            "faceId": "95d9bb7d-89fd-4a29-a70c-ce2dc1ab90bb",
            "faceRectangle": {
                "top": 318,
                "left": 574,
                "width": 154,
                "height": 154
            },
            "faceAttributes": {
                "smile": 0.975,
                "gender": "male",
                "age": 31,
                "facialHair": {
                    "moustache": 0.6,
                    "beard": 0.6,
                    "sideburns": 0.1
                },
                "glasses": "NoGlasses",
                "emotion": {
                    "anger": 0,
                    "contempt": 0.001,
                    "disgust": 0,
                    "fear": 0,
                    "happiness": 0.975,
                    "neutral": 0.023,
                    "sadness": 0,
                    "surprise": 0
                }
            }
        },
        {
            "faceId": "cc6d22f3-3ac6-42c1-b94c-8229fb03b5ae",
            "faceRectangle": {
                "top": 579,
                "left": 585,
                "width": 139,
                "height": 139
            },
            "faceAttributes": {
                "smile": 0.005,
                "gender": "male",
                "age": 45,
                "facialHair": {
                    "moustache": 0.4,
                    "beard": 0.4,
                    "sideburns": 0.1
                },
                "glasses": "NoGlasses",
                "emotion": {
                    "anger": 0.015,
                    "contempt": 0.001,
                    "disgust": 0.372,
                    "fear": 0,
                    "happiness": 0.005,
                    "neutral": 0.012,
                    "sadness": 0.594,
                    "surprise": 0
                }
            }
        },
        {
            "faceId": "d3e17e6c-3dbf-4e9d-bb7c-d9b90c9f4b5b",
            "faceRectangle": {
                "top": 52,
                "left": 328,
                "width": 133,
                "height": 133
            },
            "faceAttributes": {
                "smile": 0,
                "gender": "male",
                "age": 25,
                "facialHair": {
                    "moustache": 0.6,
                    "beard": 0.1,
                    "sideburns": 0.1
                },
                "glasses": "NoGlasses",
                "emotion": {
                    "anger": 0,
                    "contempt": 0,
                    "disgust": 0,
                    "fear": 0,
                    "happiness": 0,
                    "neutral": 0,
                    "sadness": 0,
                    "surprise": 1
                }
            }
        },
        {
            "faceId": "e49d6ac9-f8e9-4364-9cfa-8e39227978aa",
            "faceRectangle": {
                "top": 552,
                "left": 64,
                "width": 133,
                "height": 133
            },
            "faceAttributes": {
                "smile": 1,
                "gender": "male",
                "age": 33,
                "facialHair": {
                    "moustache": 0.1,
                    "beard": 0.1,
                    "sideburns": 0.1
                },
                "glasses": "NoGlasses",
                "emotion": {
                    "anger": 0,
                    "contempt": 0,
                    "disgust": 0,
                    "fear": 0,
                    "happiness": 1,
                    "neutral": 0,
                    "sadness": 0,
                    "surprise": 0
                }
            }
        },
        {
            "faceId": "9c92672e-8735-4861-93f8-50d0fdc49833",
            "faceRectangle": {
                "top": 62,
                "left": 1101,
                "width": 131,
                "height": 131
            },
            "faceAttributes": {
                "smile": 0.001,
                "gender": "male",
                "age": 36,
                "facialHair": {
                    "moustache": 0.6,
                    "beard": 0.6,
                    "sideburns": 0.4
                },
                "glasses": "NoGlasses",
                "emotion": {
                    "anger": 0,
                    "contempt": 0,
                    "disgust": 0,
                    "fear": 0,
                    "happiness": 0.001,
                    "neutral": 0,
                    "sadness": 0,
                    "surprise": 0.998
                }
            }
        },
        {
            "faceId": "2955d4e0-e313-423d-a4e9-a62d09cf495c",
            "faceRectangle": {
                "top": 1087,
                "left": 73,
                "width": 129,
                "height": 129
            },
            "faceAttributes": {
                "smile": 1,
                "gender": "female",
                "age": 31,
                "facialHair": {
                    "moustache": 0,
                    "beard": 0,
                    "sideburns": 0
                },
                "glasses": "NoGlasses",
                "emotion": {
                    "anger": 0,
                    "contempt": 0,
                    "disgust": 0,
                    "fear": 0,
                    "happiness": 1,
                    "neutral": 0,
                    "sadness": 0,
                    "surprise": 0
                }
            }
        },
        {
            "faceId": "6677eb2a-454a-423d-86ba-aa1950468aeb",
            "faceRectangle": {
                "top": 325,
                "left": 70,
                "width": 129,
                "height": 129
            },
            "faceAttributes": {
                "smile": 0.001,
                "gender": "male",
                "age": 33,
                "facialHair": {
                    "moustache": 0.4,
                    "beard": 0.4,
                    "sideburns": 0.4
                },
                "glasses": "NoGlasses",
                "emotion": {
                    "anger": 0.997,
                    "contempt": 0,
                    "disgust": 0.002,
                    "fear": 0,
                    "happiness": 0.001,
                    "neutral": 0,
                    "sadness": 0,
                    "surprise": 0
                }
            }
        },
        {
            "faceId": "84e9b344-954e-46ec-b171-9de06bcf7f0a",
            "faceRectangle": {
                "top": 833,
                "left": 1110,
                "width": 122,
                "height": 122
            },
            "faceAttributes": {
                "smile": 0.523,
                "gender": "female",
                "age": 30,
                "facialHair": {
                    "moustache": 0,
                    "beard": 0,
                    "sideburns": 0
                },
                "glasses": "NoGlasses",
                "emotion": {
                    "anger": 0,
                    "contempt": 0,
                    "disgust": 0,
                    "fear": 0,
                    "happiness": 0.523,
                    "neutral": 0,
                    "sadness": 0,
                    "surprise": 0.477
                }
            }
        },
        {
            "faceId": "d91b929b-9d6a-426b-8f89-50a4bda751c9",
            "faceRectangle": {
                "top": 305,
                "left": 849,
                "width": 121,
                "height": 121
            },
            "faceAttributes": {
                "smile": 0.925,
                "gender": "male",
                "age": 71,
                "facialHair": {
                    "moustache": 0.1,
                    "beard": 0.1,
                    "sideburns": 0.1
                },
                "glasses": "NoGlasses",
                "emotion": {
                    "anger": 0,
                    "contempt": 0,
                    "disgust": 0,
                    "fear": 0,
                    "happiness": 0.925,
                    "neutral": 0,
                    "sadness": 0,
                    "surprise": 0.075
                }
            }
        },
        {
            "faceId": "25df9126-16da-403a-a511-42e2fa93a24b",
            "faceRectangle": {
                "top": 572,
                "left": 333,
                "width": 120,
                "height": 120
            },
            "faceAttributes": {
                "smile": 0,
                "gender": "female",
                "age": 27,
                "facialHair": {
                    "moustache": 0,
                    "beard": 0,
                    "sideburns": 0
                },
                "glasses": "NoGlasses",
                "emotion": {
                    "anger": 0,
                    "contempt": 0,
                    "disgust": 0,
                    "fear": 0,
                    "happiness": 0,
                    "neutral": 0,
                    "sadness": 0,
                    "surprise": 1
                }
            }
        },
        {
            "faceId": "f5a67041-380e-40be-9527-03f3f80647b5",
            "faceRectangle": {
                "top": 832,
                "left": 587,
                "width": 120,
                "height": 120
            },
            "faceAttributes": {
                "smile": 0.24,
                "gender": "male",
                "age": 31,
                "facialHair": {
                    "moustache": 0.6,
                    "beard": 0.6,
                    "sideburns": 0.1
                },
                "glasses": "NoGlasses",
                "emotion": {
                    "anger": 0.001,
                    "contempt": 0,
                    "disgust": 0,
                    "fear": 0.022,
                    "happiness": 0.24,
                    "neutral": 0,
                    "sadness": 0,
                    "surprise": 0.737
                }
            }
        },
        {
            "faceId": "9cc57ebd-ea09-4798-9dc2-edee31aaa5ac",
            "faceRectangle": {
                "top": 293,
                "left": 340,
                "width": 120,
                "height": 120
            },
            "faceAttributes": {
                "smile": 0.173,
                "gender": "male",
                "age": 27,
                "facialHair": {
                    "moustache": 0.6,
                    "beard": 0.4,
                    "sideburns": 0.1
                },
                "glasses": "NoGlasses",
                "emotion": {
                    "anger": 0.807,
                    "contempt": 0,
                    "disgust": 0,
                    "fear": 0.009,
                    "happiness": 0.173,
                    "neutral": 0,
                    "sadness": 0.005,
                    "surprise": 0.005
                }
            }
        },
        {
            "faceId": "08001bdc-1ed6-4901-bc00-802acca30c7f",
            "faceRectangle": {
                "top": 566,
                "left": 1108,
                "width": 117,
                "height": 117
            },
            "faceAttributes": {
                "smile": 0.823,
                "gender": "female",
                "age": 21,
                "facialHair": {
                    "moustache": 0,
                    "beard": 0,
                    "sideburns": 0
                },
                "glasses": "NoGlasses",
                "emotion": {
                    "anger": 0,
                    "contempt": 0.001,
                    "disgust": 0,
                    "fear": 0,
                    "happiness": 0.823,
                    "neutral": 0.173,
                    "sadness": 0.002,
                    "surprise": 0
                }
            }
        },
        {
            "faceId": "4af4dff6-d81f-41d9-aa90-e19608825c29",
            "faceRectangle": {
                "top": 1104,
                "left": 849,
                "width": 116,
                "height": 116
            },
            "faceAttributes": {
                "smile": 0.001,
                "gender": "female",
                "age": 31,
                "facialHair": {
                    "moustache": 0,
                    "beard": 0,
                    "sideburns": 0
                },
                "glasses": "NoGlasses",
                "emotion": {
                    "anger": 0.516,
                    "contempt": 0,
                    "disgust": 0.001,
                    "fear": 0.085,
                    "happiness": 0.001,
                    "neutral": 0,
                    "sadness": 0.397,
                    "surprise": 0
                }
            }
        },
        {
            "faceId": "386e7230-f036-4eda-a5e3-a86e0b6e363c",
            "faceRectangle": {
                "top": 60,
                "left": 857,
                "width": 115,
                "height": 115
            },
            "faceAttributes": {
                "smile": 0.981,
                "gender": "male",
                "age": 27,
                "facialHair": {
                    "moustache": 0.1,
                    "beard": 0.1,
                    "sideburns": 0.1
                },
                "glasses": "NoGlasses",
                "emotion": {
                    "anger": 0.001,
                    "contempt": 0,
                    "disgust": 0,
                    "fear": 0,
                    "happiness": 0.981,
                    "neutral": 0,
                    "sadness": 0,
                    "surprise": 0.017
                }
            }
        },
        {
            "faceId": "a5ced951-a05f-4d94-83b5-50ba1559d6b2",
            "faceRectangle": {
                "top": 54,
                "left": 72,
                "width": 112,
                "height": 112
            },
            "faceAttributes": {
                "smile": 0.807,
                "gender": "female",
                "age": 33,
                "facialHair": {
                    "moustache": 0,
                    "beard": 0,
                    "sideburns": 0
                },
                "glasses": "NoGlasses",
                "emotion": {
                    "anger": 0,
                    "contempt": 0.002,
                    "disgust": 0,
                    "fear": 0,
                    "happiness": 0.807,
                    "neutral": 0.19,
                    "sadness": 0.001,
                    "surprise": 0
                }
            }
        },
        {
            "faceId": "e921fcc1-b95e-4d3b-9a79-50ec77a0cd88",
            "faceRectangle": {
                "top": 1103,
                "left": 1114,
                "width": 112,
                "height": 112
            },
            "faceAttributes": {
                "smile": 0,
                "gender": "male",
                "age": 28,
                "facialHair": {
                    "moustache": 0.6,
                    "beard": 0.6,
                    "sideburns": 0.4
                },
                "glasses": "NoGlasses",
                "emotion": {
                    "anger": 0,
                    "contempt": 0,
                    "disgust": 0,
                    "fear": 0.001,
                    "happiness": 0,
                    "neutral": 0.993,
                    "sadness": 0.003,
                    "surprise": 0.003
                }
            }
        },
        {
            "faceId": "f680d848-a75f-4ee6-b1b3-2fb0b40e1c17",
            "faceRectangle": {
                "top": 1073,
                "left": 596,
                "width": 112,
                "height": 112
            },
            "faceAttributes": {
                "smile": 0.321,
                "gender": "female",
                "age": 5,
                "facialHair": {
                    "moustache": 0,
                    "beard": 0,
                    "sideburns": 0
                },
                "glasses": "NoGlasses",
                "emotion": {
                    "anger": 0,
                    "contempt": 0,
                    "disgust": 0,
                    "fear": 0,
                    "happiness": 0.321,
                    "neutral": 0,
                    "sadness": 0,
                    "surprise": 0.679
                }
            }
        },
        {
            "faceId": "88d9face-b67d-4f12-825f-9a00378a8025",
            "faceRectangle": {
                "top": 1083,
                "left": 339,
                "width": 111,
                "height": 111
            },
            "faceAttributes": {
                "smile": 0,
                "gender": "male",
                "age": 31,
                "facialHair": {
                    "moustache": 0.4,
                    "beard": 0.4,
                    "sideburns": 0.4
                },
                "glasses": "NoGlasses",
                "emotion": {
                    "anger": 0,
                    "contempt": 0,
                    "disgust": 0,
                    "fear": 0,
                    "happiness": 0,
                    "neutral": 0,
                    "sadness": 0,
                    "surprise": 1
                }
            }
        },
        {
            "faceId": "bde88f5d-3b8c-401d-ae8f-ebed5d9ee356",
            "faceRectangle": {
                "top": 312,
                "left": 1111,
                "width": 108,
                "height": 108
            },
            "faceAttributes": {
                "smile": 0,
                "gender": "female",
                "age": 17,
                "facialHair": {
                    "moustache": 0,
                    "beard": 0,
                    "sideburns": 0
                },
                "glasses": "ReadingGlasses",
                "emotion": {
                    "anger": 0,
                    "contempt": 0,
                    "disgust": 0,
                    "fear": 0,
                    "happiness": 0,
                    "neutral": 0,
                    "sadness": 0,
                    "surprise": 1
                }
            }
        },
        {
            "faceId": "6d639364-8532-4a72-a418-00d219d7f25d",
            "faceRectangle": {
                "top": 849,
                "left": 865,
                "width": 104,
                "height": 104
            },
            "faceAttributes": {
                "smile": 0.801,
                "gender": "male",
                "age": 25,
                "facialHair": {
                    "moustache": 0.1,
                    "beard": 0.1,
                    "sideburns": 0.1
                },
                "glasses": "NoGlasses",
                "emotion": {
                    "anger": 0,
                    "contempt": 0,
                    "disgust": 0,
                    "fear": 0,
                    "happiness": 0.801,
                    "neutral": 0,
                    "sadness": 0,
                    "surprise": 0.199
                }
            }
        },
        {
            "faceId": "f184cd99-fc2b-490a-94ec-0e41871379d8",
            "faceRectangle": {
                "top": 831,
                "left": 340,
                "width": 104,
                "height": 104
            },
            "faceAttributes": {
                "smile": 0.616,
                "gender": "female",
                "age": 28,
                "facialHair": {
                    "moustache": 0,
                    "beard": 0,
                    "sideburns": 0
                },
                "glasses": "NoGlasses",
                "emotion": {
                    "anger": 0,
                    "contempt": 0,
                    "disgust": 0,
                    "fear": 0,
                    "happiness": 0.616,
                    "neutral": 0,
                    "sadness": 0,
                    "surprise": 0.384
                }
            }
        },
        {
            "faceId": "9d87e10f-f5e0-4f0b-8ef0-ed671ea279a3",
            "faceRectangle": {
                "top": 831,
                "left": 86,
                "width": 103,
                "height": 103
            },
            "faceAttributes": {
                "smile": 0.5,
                "gender": "female",
                "age": 22,
                "facialHair": {
                    "moustache": 0,
                    "beard": 0,
                    "sideburns": 0
                },
                "glasses": "ReadingGlasses",
                "emotion": {
                    "anger": 0,
                    "contempt": 0,
                    "disgust": 0,
                    "fear": 0,
                    "happiness": 0.5,
                    "neutral": 0,
                    "sadness": 0,
                    "surprise": 0.5
                }
            }
        },
        {
            "faceId": "a51ba958-c266-4016-8504-2e41f07c361f",
            "faceRectangle": {
                "top": 610,
                "left": 877,
                "width": 101,
                "height": 101
            },
            "faceAttributes": {
                "smile": 0.216,
                "gender": "male",
                "age": 54,
                "facialHair": {
                    "moustache": 0.1,
                    "beard": 0.1,
                    "sideburns": 0.1
                },
                "glasses": "NoGlasses",
                "emotion": {
                    "anger": 0.656,
                    "contempt": 0,
                    "disgust": 0.004,
                    "fear": 0.013,
                    "happiness": 0.216,
                    "neutral": 0,
                    "sadness": 0.106,
                    "surprise": 0.005
                }
            }
        },
        {
            "faceId": "8cd44fd4-ee48-4b0b-9fbf-c351c7ec7836",
            "faceRectangle": {
                "top": 56,
                "left": 577,
                "width": 101,
                "height": 101
            },
            "faceAttributes": {
                "smile": 0.999,
                "gender": "female",
                "age": 23,
                "facialHair": {
                    "moustache": 0,
                    "beard": 0,
                    "sideburns": 0
                },
                "glasses": "Sunglasses",
                "emotion": {
                    "anger": 0,
                    "contempt": 0,
                    "disgust": 0,
                    "fear": 0,
                    "happiness": 0.999,
                    "neutral": 0,
                    "sadness": 0,
                    "surprise": 0.001
                }
            }
        }
    ];
}