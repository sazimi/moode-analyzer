import { Injectable } from '@angular/core';

import { takePicture, requestCameraPermissions } from 'nativescript-camera';
import { ImageAsset } from 'tns-core-modules/image-asset/image-asset';
import { ImageSource, fromFile, fromResource, fromBase64 } from "tns-core-modules/image-source";

import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class FaceService {

    
}

