const encrypText =  (text) => {
    return text;
}

const decryptText = (text) => {
    return text;
}

const encrypt = () => {
    const  text = document.getElementById("text-to-encrypt").value;
    console.log(text);
    return;
}

const decrypt = () => {
    return;
}

// funcion habitual para ejecutar javascript despues de que se carga el documento
window.onload = () => {
  console.log('Documment cargado')

  const encryptButton = document.getElementById("encrypt-button");
  encryptButton.onclick = encrypt;
  
}  
