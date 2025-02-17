
let imgBBAPI = "69916af40b37867cced6a452843ec457";
let apiLink = "https://deepxpose-cnn-model-api.onrender.com/";

async function uploadImageToIMGBB(file) {
  
  if(!file){
    return;
  }

  let imgUrl = ""
  let dataResponse = {}
  const formData = new FormData();


  formData.append("image", file);

  try{
    const response = await fetch("https://api.imgbb.com/1/upload?expiration=600&key=" + imgBBAPI, {
      method: "POST",
      body: formData
    });

    dataResponse = await response.json();
  }
  catch(error){
    console.error("Error: ", error);
    popup.classList.add("popup-visible");
    return null;
  }

  if(dataResponse.success){
    imgUrl = dataResponse.data.url;
  } else{
    alert("Gagal mengunggah gambar");
    throw new Error("Gagal upload gambar");
    return null;
  }

  return imgUrl;
}

async function detectImage(url){
  
  let dataResponse = ""
  const formData = new FormData();
  formData.append("image_url", url);

  try{
    const response = await fetch(apiLink + "detect-deepfake", {
      method: "POST",
      body: formData
    })

    dataResponse = await response.json();
  }
  catch(error){
    console.error("Error: " + error);
    popup.classList.add("popup-visible");
  }
  
  return dataResponse.result;
}

//banner auto slide
var slideIndex = 1;
showDivs(slideIndex);

function plusDivs(n) {
    showDivs((slideIndex+=n));
}

function showDivs(n) {
    var i;
    var x = document.getElementsByClassName('contoh');
    var y = document.getElementsByClassName('persentase');
    var z = document.getElementsByClassName('keterangan');
    if (n > x.length) 
        slideIndex=1;
    else if (n < 1)  
        slideIndex = x.length; //kalau n<1 maka slide index menjadi banyak slide dari var x 
    for (i = 0; i <x.length; i++) {
        x[i].style.display = 'none';
    }
    if (slideIndex == 1){
        document.getElementById("persentase").innerHTML = "93% DeepFake";
        document.getElementById("keterangan").innerHTML = "Setelah digunakan model CNN dari DeepXpose, gambar tersebut TERBUKTI PALSU."
    }
    else if (slideIndex == 2){
        document.getElementById("persentase").innerHTML = "99% DeepFake";
        document.getElementById("keterangan").innerHTML = "Setelah digunakan model CNN dari DeepXpose, gambar tersebut TERBUKTI PALSU."
    }
    else if (slideIndex == 3){
        document.getElementById("persentase").innerHTML = "53% DeepFake";
        document.getElementById("keterangan").innerHTML = "Setelah digunakan model CNN dari DeepXpose, gambar tersebut MUNGKIN PALSU."
    }
    else if (slideIndex == 4){
        document.getElementById("persentase").innerHTML = "0% DeepFake";
        document.getElementById("keterangan").innerHTML = "Setelah digunakan model CNN dari DeepXpose, gambar tersebut TERBUKTI ASLI."
    }
    x[slideIndex - 1].style.display = 'block'; //memunculkan slide ke index-1, jadi misal foto pertama indexnya 0, jadi slideindex yang nilainya 1 - 1 =0
    
}
//jeda tiap slide
setInterval(() => {
    plusDivs(1);
}, 2000); //setiap 2000 milisecond(atau 2 detik) mengganti gambar



//bagian dropfoto
const dropfoto = document.querySelector(".dropfoto");

let browse = document.querySelector(".dropfoto");
let input = document.querySelector('input');

var file;

browse.onclick = () => {
    input.click();
};

//ketika nyari file 
input.addEventListener('change', function(){
    file = this.files[0];
    displayfile();
})

//ktika file di dalam area
dropfoto.addEventListener('dragover', (event) => {
    event.preventDefault();
    console.log('file di dalam area');
    dropfoto.classList.add('active');
})

//ketika file meninggalkan area
dropfoto.addEventListener('dragleave', () => {
    console.log('file pergi');
    dropfoto.classList.remove('active');
})

//ktika file di drop
dropfoto.addEventListener('drop', (event) => {
    event.preventDefault();
    //console.log('file drop');
    dropfoto.classList.remove('active');

    file = event.dataTransfer.files[0];
    // console.log(file); untuk cek file
    displayfile();

    
})

function displayfile(){
    let tipefile = file.type;
    //console.log(tipefile);

    let filedukung = ["image/jpeg", 'image/png', 'image/jpg', 'image/webp'];
    if(filedukung.includes(tipefile)){
        let pembacafile = new FileReader();

        pembacafile.onload = () => {
            let URLfile = pembacafile.result;
            //console.log(URLfile);
            let imgTag =`<img src="${URLfile}" alt="">`;
            dropfoto.innerHTML = imgTag;
        };
        pembacafile.readAsDataURL(file);
    }
    else{
        // popup.classList.add("popup-visible");
        document.getElementById("pesan").innerHTML = "Kesalahan";
        document.getElementById("keterangan-pesan").innerHTML = "Mohon maaf, format file Anda tidak didukung."
    }
}



//bagian ketika tombol buktikan ditekan
var popup = document.getElementById("popup");
var loadin = document.getElementById("loading");

function loading(){
  loadin.classList.add("loading-visible");
}

async function buktikan(){
    try{
      let imgUrl = await uploadImageToIMGBB(file);
      let detectionResult;
      setTimeout(async function(){
        if(imgUrl != null){
          detectionResult = await detectImage(imgUrl);
          var result = (detectionResult > 50.0) ? "Deepfake" : "Asli";
          let hasil = document.getElementById("tulisancek");
          hasil.innerHTML = detectionResult + "% Deepfake" + "<br>Gambar kemungkinan " + result ;
          loadin.classList.remove("loading-visible");
        }
      }, 1000)
    } catch(error){
      loadin.classList.remove("loading-visible");
      popup.classList.add("popup-visible");
      console.log(error);
    }
    
}
//nutup popup
function closepopup(){
  
  popup.classList.remove("popup-visible");
    
}


//Hamburger navbar (android)
const hamburger = document.querySelector(".hamburger");
const navigasi = document.querySelector(".navigasi-menu");

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navigasi.classList.toggle("active");
})

document.querySelectorAll(".navigasi-button").forEach(n => n.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navigasi.classList.remove("active");
}))
