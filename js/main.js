// Characters to replace
const character_to_replace = ["e", "i", "a", "o", "u"];

//  Words to replace
const words_replace = ["enter", "imes", "ai", "ober", "ufat"];

const verifyCharacters = (text) => {
    /* Regex que permite solo letras minusculas, sin acentos, sin caracteres especiales */
    const regex = /^[a-z\s]*$/;
    return text && regex.test(text);
};

/**
 * Encripta un texto
 * @param {*} text 
 * @returns 
 */
const encrypText = (text) => {
    for (let i = 0; i < character_to_replace.length; i++) {
        text = text.replaceAll(character_to_replace[i], words_replace[i]);
    }
    console.debug(`Encrypted text: ${text}`);
    return text;
};

/**
 * Desencripta un texto 
 * @param {*} text 
 * @returns 
 */
const decryptText = (text) => {
    for (let i = 0; i < words_replace.length; i++) {
        text = text.replaceAll(words_replace[i], character_to_replace[i]);
    }
    console.debug(`Decrypted text: ${text}`);

    return text;
};

/**
 * Encriptación 
 * @returns 
 */
const encrypt = () => {
    resetStyleTexarea("text-to-encrypt");
    resetStyleButton("encrypt-button");
    resetStyleButton("decrypt-button");
    resetStyleButton("copy-button");

    const text = document.getElementById("text-to-encrypt").value.trim().toLowerCase();
    console.debug(`Text to encrypt: ${text}`);
    if(text.length === 0) return;

    document.getElementById("text-to-encrypt").value = text;

    if (!verifyCharacters(text)) {
        console.error("Text invalid");
        document.getElementById("notification").innerHTML = "Solo se admiten caracteres alfabeticos sin acentos.";
        document.getElementById("text-to-encrypt").classList.replace("w3-border-black", "w3-border-red");
        document.getElementById("text-to-encrypt").classList.add("w3-animate-opacity");
        return;
    }

    const encryptedText = encrypText(text);
    document.getElementById("encrypted-text").value = encryptedText;
    setSuccessStyleButton("encrypt-button");

    return;
};

/**
 * Desencriptación 
 * @returns 
 */
const decrypt = () => {
    resetStyleTexarea("encrypted-text");
    resetStyleButton("decrypt-button");
    resetStyleButton("encrypt-button");
    resetStyleButton("copy-button");

    const text = document.getElementById("text-to-encrypt").value.trim().toLowerCase();
    console.debug(`Text to decrypt: ${text}`);
    if(text.length === 0) return;

    document.getElementById("text-to-encrypt").value = text;

    if (!verifyCharacters(text)) {
        alert("Texto invalido");
        return;
    }

    const decryptedText = decryptText(text);
    document.getElementById("encrypted-text").value = decryptedText;
    setSuccessStyleButton("decrypt-button");
    return;
};


/**
 * Setea el estilo de un boton en caso satisfactorio 
 * @param {*} idElement 
 */
const setSuccessStyleButton = (idElement) => {
    document.getElementById(idElement).classList.add("w3-border");
    document.getElementById(idElement).classList.add("w3-border-green");
    document.getElementById(idElement).classList.add("w3-light-green");
    document.getElementById(idElement).classList.remove("w3-dark-gray");
    document.getElementById(idElement).classList.remove("w3-hover-light-gray");
    document.getElementById(idElement).classList.add("w3-green");
    document.getElementById(idElement).classList.add("w3-animate-opacity");

};

/**
 * Resetea el estilo de un boton 
 * @param {*} idElement 
 */
const resetStyleButton = (idElement) => {
    document.getElementById(idElement).classList.remove("w3-border");
    document.getElementById(idElement).classList.remove("w3-border-green");
    document.getElementById(idElement).classList.remove("w3-green");
    document.getElementById(idElement).classList.remove("w3-hover-light-green");
    document.getElementById(idElement).classList.add("w3-dark-gray");
    document.getElementById(idElement).classList.add("w3-hover-light-gray");
};

/**
 * Resetea el estilo de un textarea 
 * @param {*} idElement 
 */
const resetStyleTexarea = (idElement) => {
    document.getElementById(idElement).classList.replace("w3-border-red","w3-border-black");
    document.getElementById(idElement).classList.remove("w3-animate-opacity");
};

/**
 * Copia el texto encriptado al portapapeles
 */
const copyToClipboard = () => {
    if (navigator.clipboard) {
        const str = document.getElementById("encrypted-text").value.trim();

        if(str.length === 0) return;

        navigator.clipboard.writeText(str)
            .then(() => {
                setSuccessStyleButton("copy-button");
                console.log("Text copied to clipboard");
            })
            .catch(err => console.log("Something went wrong", err));
    } else {
        alert("API clipboard not supported");
        console.log("API clipboard not supported");
    }
};


window.onload = () => {
    document.getElementById("encrypted-text").value = "";
    document.getElementById("text-to-encrypt").value = "";
    document.getElementById("text-to-encrypt").focus();

    const encryptButton = document.getElementById("encrypt-button");
    encryptButton.onclick = encrypt;

    const decryptButton = document.getElementById("decrypt-button");
    decryptButton.onclick = decrypt;

    const copyButton = document.getElementById("copy-button");
    copyButton.onclick = copyToClipboard;

    const textToEncrypt = document.getElementById("text-to-encrypt");
    textToEncrypt.onkeyup = () => {
        document.getElementById("notification").innerHTML = "";
        document.getElementById("encrypted-text").value = "";

        resetStyleButton("encrypt-button");
        resetStyleButton("decrypt-button");
        resetStyleButton("copy-button");
    }; 
};  
