// Characters to replace
const character_to_replace = ["e", "i", "a", "o", "u"];

//  Words to replace
const words_replace = ["enter", "imes", "ai", "ober", "ufat"];

const verifyCharacters = (text) => {
    /* Regex que permite solo letras minusculas, sin acentos, sin caracteres especiales */
    const regex = /^[a-z\s]*$/
    return regex.test(text);
}

const encrypText = (text) => {
    for (let i = 0; i < character_to_replace.length; i++) {
        text = text.replaceAll(character_to_replace[i], words_replace[i]);
    }
    console.debug(`Encrypted text: ${text}`);
    return text;
}

const decryptText = (text) => {
    for (let i = 0; i < words_replace.length; i++) {
        text = text.replaceAll(words_replace[i], character_to_replace[i]);
    }
    console.debug(`Decrypted text: ${text}`);

    return text;
}

const encrypt = () => {
    const text = document.getElementById("text-to-encrypt").value.trim();
    console.debug(`Text to encrypt: ${text}`);

    if (!verifyCharacters(text)) {
        alert("Texto invalido");
        return;
    }

    const encryptedText = encrypText(text);
    document.getElementById("encrypted-text").value = encryptedText;

    return;
}

const decrypt = () => {
    const text = document.getElementById("text-to-encrypt").value.trim();
    console.debug(`Text to decrypt: ${text}`);

    if (!verifyCharacters(text)) {
        alert("Texto invalido");
        return;
    }

    const decryptedText = decryptText(text);
    document.getElementById("encrypted-text").value = decryptedText;

    return;
}


const copyToClipboard = () => {
    if (navigator.clipboard) {
        const str = document.getElementById("encrypted-text").value.trim();
        navigator.clipboard.writeText(str)
            .then(() => console.log("Text copied to clipboard"))
            .catch(err => console.log('Something went wrong', err));
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

}  
