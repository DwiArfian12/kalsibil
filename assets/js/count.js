const input = document.getElementById("input");
const lblinput = document.getElementById("lblinput");
const divbiner = document.getElementById("divbiner");
const divoktal = document.getElementById("divoktal");
const divdesimal = document.getElementById("divdesimal");
const divheksa = document.getElementById("divheksa");
const divascii = document.getElementById("divascii");
const outputbiner = document.getElementById("outputbiner");
const outputoktal = document.getElementById("outputoktal");
const outputdesimal = document.getElementById("outputdesimal");
const outputheksa = document.getElementById("outputheksa");
const outputascii = document.getElementById("outputascii");
const test = document.getElementById("test");
const warning = document.getElementById("warning");

let asciiData;

fetch("/assets/json/ascii.json")
  .then((response) => response.json())
  .then((data) => {
    asciiData = data;
  });

function addLeadingZeros(num) {
  while (num.length < 8) {
    num = "0" + num;
  }
  return num;
}

function removeLeadingZeros(binaryString) {
  return binaryString.replace(/^0+(?=\d)/, "");
}

let pil = "biner";
pilihan(pil);

function pilihan(value) {
  warning.innerHTML = "";
  pil = value;
  switch (pil) {
    case "biner":
      lblinput.innerHTML = "Biner";
      divbiner.hidden = true;
      divoktal.hidden = false;
      divdesimal.hidden = false;
      divheksa.hidden = false;
      divascii.hidden = false;
      break;
    case "oktal":
      lblinput.innerHTML = "Oktal";
      divbiner.hidden = false;
      divoktal.hidden = true;
      divdesimal.hidden = false;
      divheksa.hidden = false;
      divascii.hidden = false;
      break;
    case "desimal":
      lblinput.innerHTML = "Desimal";
      divbiner.hidden = false;
      divoktal.hidden = false;
      divdesimal.hidden = true;
      divheksa.hidden = false;
      divascii.hidden = false;
      break;
    case "heksa":
      lblinput.innerHTML = "Heksadesimal";
      divbiner.hidden = false;
      divoktal.hidden = false;
      divdesimal.hidden = false;
      divheksa.hidden = true;
      divascii.hidden = false;
      break;
    case "ascii":
      lblinput.innerHTML = "ASCII";
      divbiner.hidden = false;
      divoktal.hidden = false;
      divdesimal.hidden = false;
      divheksa.hidden = false;
      divascii.hidden = true;
      break;
  }
}

function convert() {
  warning.innerHTML = "";
  if (input.value.length == 0) {
    outputbiner.value = "0";
    outputoktal.value = "0";
    outputdesimal.value = "0";
    outputheksa.value = "0";
    outputascii.value = "0";
  } else {
    switch (pil) {
      case "biner":
        const binerRegex = /^[01]+$/;
        if (binerRegex.test(input.value)) {
          hasil = fromBiner(input.value);
          outputoktal.value = hasil.oktal;
          outputdesimal.value = hasil.desimal;
          outputheksa.value = hasil.heksa.toUpperCase();
          outputascii.value = hasil.ascii;
        } else {
          warning.innerHTML = "Input harus 0 atau 1 untuk bilangan biner!";
        }
        break;
      case "oktal":
        const oktalRegex = /^[0-7]+$/;
        if (oktalRegex.test(input.value)) {
          hasil = fromOktal(input.value);
          hasilbiner = addLeadingZeros(hasil.biner);
          outputbiner.value = hasilbiner;
          outputdesimal.value = hasil.desimal;
          outputheksa.value = hasil.heksa.toUpperCase();
          outputascii.value = hasil.ascii;
        } else {
          warning.innerHTML = "Input harus bilangan antara 0-7!";
        }
        break;
      case "desimal":
        const desimalRegex = /^\d+$/;
        if (desimalRegex.test(input.value)) {
          hasil = fromDesimal(input.value);
          hasilbiner = addLeadingZeros(hasil.biner);
          outputbiner.value = hasilbiner;
          outputoktal.value = hasil.oktal;
          outputheksa.value = hasil.heksa.toUpperCase();
          outputascii.value = hasil.ascii;
        } else {
          warning.innerHTML = "Input harus bilangan antara 0-9!";
        }
        break;
      case "heksa":
        const heksaRegex = /^[0-9A-Fa-f]+$/;
        if (heksaRegex.test(input.value)) {
          hasil = fromHeksa(input.value);
          hasilbiner = addLeadingZeros(hasil.biner);
          outputbiner.value = hasilbiner;
          outputoktal.value = hasil.oktal;
          outputdesimal.value = hasil.desimal;
          outputascii.value = hasil.ascii;
        } else {
          warning.innerHTML = "Input harus bilangan antara 0-9 atau A-F!";
        }
        break;
      case "ascii":
        try {
          hasil = fromASCII(input.value);
          hasilbiner = addLeadingZeros(hasil.biner);
          outputbiner.value = hasilbiner;
          outputoktal.value = hasil.oktal;
          outputdesimal.value = hasil.desimal;
          outputheksa.value = hasil.heksa.toUpperCase();
        } catch {
          warning.innerHTML = "Input tidak terdaftar dalam ASCII!";
        }
        break;
    }
  }
}

function fromBiner(value) {
  let result = {};
  result.oktal = parseInt(value, 2).toString(8);
  result.desimal = parseInt(value, 2);
  result.heksa = parseInt(value, 2).toString(16);
  asciiData.forEach((item) => {
    let biner = item.decimal.toString(2);
    if (biner == removeLeadingZeros(value)) {
      result.ascii = item.character;
    }
  });
  return result;
}

function fromOktal(value) {
  let result = {};
  result.biner = parseInt(value, 8).toString(2);
  result.desimal = parseInt(value, 8);
  result.heksa = parseInt(value, 8).toString(16);
  asciiData.forEach((item) => {
    let oktal = item.decimal.toString(8);
    if (oktal == value) {
      result.ascii = item.character;
    }
  });
  return result;
}

function fromDesimal(value) {
  let result = {};
  result.biner = parseInt(value, 10).toString(2);
  result.oktal = parseInt(value, 10).toString(8);
  result.heksa = parseInt(value, 10).toString(16);
  asciiData.forEach((item) => {
    let desimal = item.decimal;
    if (desimal == value) {
      result.ascii = item.character;
    }
  });
  return result;
}

function fromHeksa(value) {
  let result = {};
  result.biner = parseInt(value, 16).toString(2);
  result.oktal = parseInt(value, 16).toString(8);
  result.desimal = parseInt(value, 16);
  asciiData.forEach((item) => {
    let heksa = item.hexa;
    if (heksa == value) {
      result.ascii = item.character;
    }
  });
  return result;
}

function fromASCII(value) {
  let result = {};
  asciiData.forEach((item) => {
    if (item.character == value) {
      result.biner = item.decimal.toString(2);
      result.oktal = item.decimal.toString(8);
      result.desimal = item.decimal;
      result.heksa = item.hexa.toString();
    }
  });
  return result;
}
