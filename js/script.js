let imgBBAPI = "69916af40b37867cced6a452843ec457";
let apiLink = "https://7a56-34-19-112-210.ngrok-free.app/"

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
    alert("Terjadi kesalahan saat mengunggah");
    return null;
  }

  if(dataResponse.success){
    imgUrl = dataResponse.data.url;
  } else{
    alert("Gagal mengunggah gambar");
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
    console.error("Error: ", error);
    alert("Terjadi kesalahan saat mendeteksi");
  }
  
  return dataResponse;
}


document.getElementById('fileInput').addEventListener('change', async function(){
  let imgUrl = await uploadImageToIMGBB(this.files[0]);
  let detectionResult;

  if(imgUrl != null){
    detectionResult = await detectImage(imgUrl);
    console.log("Detection result ", detectionResult)
    document.getElementById("hasil") = detectionResult
  }

})