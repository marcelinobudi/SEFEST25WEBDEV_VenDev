let imgBBAPI = "69916af40b37867cced6a452843ec457";
let apiLink = "https://6625-35-197-68-141.ngrok-free.app/"

async function uploadImage(file) {
  
  if(!file){
    return;
  }
  let imgUrl = ""

  const formDataUploadImage = new FormData();
  formDataUploadImage.append("image", file);


  try{
    const response = await fetch("https://api.imgbb.com/1/upload?expiration=600&key=" + imgBBAPI, {
      method: "POST",
      body: formDataUploadImage
    });
    
    const data = await response.json();

    if(data.success){
      imageUrl = data.data.url;
      console.log(imageUrl);
    } else{
      alert("Gagal mengunggah gambar");
    }
  }
  catch(error){
    console.error("Error: ", error);
    alert("Terjadi kesalahan saat mengunggah");
  }

  const formDataDetectImage = new FormData();
  formDataDetectImage.append("image_url", imgUrl)
  try{
    const response = await fetch(apiLink + "detect-deepfake", {
      method: "POST",
      body: formDataDetectImage
    })

    const data = await response.json();
    document.getElementById("hasil") = data
  }
  catch(error){
    console.error("Error: ", error);
    alert("Terjadi kesalahan saat mendeteksi");
  }
}

document.getElementById('fileInput').addEventListener('change', function(){
  uploadImage(this.files[0])
})