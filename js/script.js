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
        document.getElementById("keterangan").innerHTML = "Setelah digunakan DeepDetection yang bermodel CNN, gambar tersebut TERBUKTI PALSU."
    }
    else if (slideIndex == 2){
        document.getElementById("persentase").innerHTML = "99% DeepFake";
        document.getElementById("keterangan").innerHTML = "Setelah digunakan DeepDetection yang bermodel CNN, gambar tersebut TERBUKTI PALSU."
    }
    else if (slideIndex == 3){
        document.getElementById("persentase").innerHTML = "53% DeepFake";
        document.getElementById("keterangan").innerHTML = "Setelah digunakan DeepDetection yang bermodel CNN, gambar tersebut MUNGKIN PALSU."
    }
    else if (slideIndex == 4){
        document.getElementById("persentase").innerHTML = "0% DeepFake";
        document.getElementById("keterangan").innerHTML = "Setelah digunakan DeepDetection yang bermodel CNN, gambar tersebut TERBUKTI ASLI."
    }
    x[slideIndex - 1].style.display = 'block'; //memunculkan slide ke index-1, jadi misal foto pertama indexnya 0, jadi slideindex yang nilainya 1 - 1 =0
    
}
//jeda tiap slide
setInterval(() => {
    plusDivs(1);
}, 2000); //setiap 2000 milisecond(atau 2 detik) mengganti gambar



//bagian dropfoto
const dropfoto = document.querySelector(".dropfoto");

let browse = document.querySelector(".tombolbrowse");
let input = document.querySelector('input');

let file;

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

    let filedukung = ["image/jpeg", 'image/png', 'image/png', 'image/webp'];
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
        popup.classList.add("popup-visible");
        document.getElementById("pesan").innerHTML = "Kesalahan";
        document.getElementById("keterangan-pesan").innerHTML = "Mohon maaf, format file Anda tidak didukung."
    }
}



//bagian ketika tombol buktikan ditekan
let popup = document.getElementById("popup");
function buktikan(){
    //if not eror{}
    //let hasil = document.getElementById("tulisancek");
    // hasil.innerHTML = persentase

    //if eror{}
    popup.classList.add("popup-visible");
    
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