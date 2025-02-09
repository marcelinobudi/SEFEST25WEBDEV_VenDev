let imgBBAPI = "69916af40b37867cced6a452843ec457";

async function uploadImage(file) {
  
  if(!file){
    return;
  }

  const formData = new FormData();
  formData.append("image", file);

  console.log(formData)

  try{
    const response = await fetch("https://api.imgbb.com/1/upload?expiration=600&key=" + imgBBAPI, {
      method: "POST",
      body: formData
    });
    
    const data = await response.json();

    if(data.success){
      const imageUrl = data.data.url;
      console.log(imageUrl);
    } else{
      alert("Gagal mengunggah gambar");
    }
  }
  catch(error){
    console.error("Error: ", error);
    alert("Terjadi kesalahan saat mengunggah");
  }
}

document.getElementById('fileInput').addEventListener('change', function(){
  uploadImage(this.files[0])
})