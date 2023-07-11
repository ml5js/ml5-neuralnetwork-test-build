import * as tf from '@tensorflow/tfjs';
import handleArguments from "../utils/handleArguments";
import callCallback from '../utils/callcallback';
import { imgToPixelArray, isInstanceOfSupportedElement } from '../utils/imageUtilities';

import '@mediapipe/face_mesh';
import '@tensorflow/tfjs-core';
import '@tensorflow/tfjs-backend-webgl';
import * as faceLandmarksDetection from '@tensorflow-models/face-landmarks-detection';
import { EventEmitter } from "events";

class facemesh extends EventEmitter {
  constructor(video) {
  // constructor(video, options, callback) {
    super();
    this.video = video;
    // this.model = null
    // this.modelReady = false;
    // this.config = options;
    // this.ready = callCallback(this.loadModel(), callback);
  }
  
  async predict(inputOr, cb) {
    const { image, callback } = handleArguments(this.video, inputOr, cb);
    if (!image) {
      throw new Error("No input image found.");
    }
    const Model = faceLandmarksDetection.SupportedModels.MediaPipeFaceMesh;
    const detectorConfig = {
      runtime: 'tfjs',
      solutionPath: 'https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh',
    }
    const estimationConfig = {flipHorizontal: false};
    const detector = await faceLandmarksDetection.createDetector(Model, detectorConfig);
    const face = await detector.estimateFaces(image, estimationConfig);
    const result = face;
    this.emit("predict", result);
    this.emit("face", result);

    if (this.video) {
      return tf.nextFrame().then(() => this.predict());
    }

    if (typeof callback === "function") {
      callback(result);
    }

    return result;
  }


}

const faceMesh = (...inputs) => {
  const { video } = handleArguments(...inputs);
  const instance = new facemesh(video);
  return instance
};

export default faceMesh;