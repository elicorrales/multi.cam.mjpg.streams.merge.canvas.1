'use strict';
//const url0="http://localhost:8080/proxy/?action=stream";
//const url1="http://localhost:8081/proxy/?action=stream";
const url0="http://10.0.0.58:8080/?action=stream";
const url1="http://10.0.0.58:8081/?action=stream";

image0.crossOrigin = "Anonymous";
image1.crossOrigin = "Anonymous";

let image0Loaded = false;
let image1Loaded = false;


image0.onload = () => {
    canvas0.getContext('2d').drawImage(image0, 0, 0);
    image0Loaded = true;
    console.log('image0 loaded');
}

image1.onload = () => {
    canvas1.getContext('2d').drawImage(image1, 0, 0);
    image1Loaded = true;
    console.log('image1 loaded');
}


const diffImagesData = (data0, data1) => {
    const mergedData = [];
    for (let i=0; i<data0.length; i+=4) {
        mergedData[i] = 255 - Math.abs(data0[i] - data1[i]);
        mergedData[i+1] = 255 - Math.abs(data0[i+1] - data1[i+1]);
        mergedData[i+2] = 255 - Math.abs(data0[i+2] - data1[i+2]);
        mergedData[i+3] = 255;
    }
    return mergedData;
}

const mergeDiffTwoImages = (cnv0, cnv1) => {
    setTimeout(() => {
        if (image0Loaded && image1Loaded) {
            console.log('mergeDiffTwoImages');
            canvas0.getContext('2d').drawImage(image0, 0, 0);
            canvas1.getContext('2d').drawImage(image1, 0, 0);
            const data0 = cnv0.getContext('2d').getImageData(0,0,cnv0.width,cnv0.height).data;
            const data1 = cnv1.getContext('2d').getImageData(0,0,cnv1.width,cnv1.height).data;
            const mergedData = diffImagesData(data0, data1);
            const mergedImage = new ImageData(new Uint8ClampedArray(mergedData), cnv0.width, cnv1.height);
            mergeCanvas.getContext('2d').putImageData(mergedImage,0,0);
        }
        mergeDiffTwoImages(cnv0, cnv1);
    }, 50);
}

image0.src = url0;
image1.src = url1;
mergeDiffTwoImages(canvas0, canvas1);

