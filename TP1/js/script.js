//BLOQUE PARA CARGAR LA IMAGEN
//get component references
var canvas = document.querySelector('#canvas');
let input = document.querySelector('.input1');

// clear canvas
var context = canvas.getContext('2d');
context.fillStyle = "#F0F0F0"; // canvas background color
context.fillRect(0, 0, canvas.width, canvas.height);

// when click OK in the File Dialog
input.onchange = e => {

    // getting a hold of the file reference
    let file = e.target.files[0];

    
    // setting up the reader
    let reader = new FileReader();
    reader.readAsDataURL(file); // this is reading as data url

    // here we tell the reader what to do when it's done reading...
    reader.onload = readerEvent => {
        if (file.type.match('image.*')) {
        
        let content = readerEvent.target.result; // this is the content!

        let image = new Image();

        image.src = content;
        

        image.onload = function () {
            let imageAspectRatio = (1.0 * this.height) / this.width;
            let imageScaledWidth = canvas.width;
            let imageScaledHeight = canvas.width * imageAspectRatio;

            // draw image on canvas
            context.drawImage(this, 0, 0, imageScaledWidth, imageScaledHeight);

            // get imageData from content of canvas
            let imageData = context.getImageData(0, 0, imageScaledWidth, imageScaledHeight);

            /* //modify imageData
            for (let j = 0; j < imageData.height; j++) {
                for (let i = 0; i < imageData.width; i++) {
                    if (i % 2 == 0) {
                        let index = (i + imageData.width * j) * 4;
                        imageData.data[index + 0] = 0;
                        imageData.data[index + 1] = 0;
                        imageData.data[index + 2] = 0;
                    }
                }
            }*/
 
            
            // draw the modified image
            context.putImageData(imageData, 0, 0);
            setOrigin(imageData);
            
        }
        } else {
        alert('El archivo seleccionado no es una imagen.');
        }
    }
}//FIN CARGAR IMAGEN
