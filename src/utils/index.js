import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../config/firebase";
import { v4 } from "uuid";

export const debounce = (fn, delay) => {
  let timeoutID;
  return function (...args) {
    if (timeoutID) clearTimeout(timeoutID);

    timeoutID = setTimeout(() => {
      fn(...args);
    }, delay);
  };
};

export const getColorClassname = (colorString) => {
  let classname = "bg-customTernary";
  switch (colorString) {
    case "red":
      classname = "bg-card-red";
      break;
    case "blue":
      classname = "bg-card-blue";
      break;
    case "yellow":
      classname = "bg-card-yellow";
      break;
    case "green":
      classname = "bg-card-green";
      break;
    case "orange":
      classname = "bg-card-orange";
      break;
    case "purple":
      classname = "bg-card-purple";
      break;
    case "default":
      break;
    default:
      break;
  }

  return classname;
};

export const getDateString = (timestamp) => {
  const miliseconds = timestamp * 1000;
  const date = new Date(miliseconds);
  return date.toLocaleDateString("en-US", { weekday: "short", year: "numeric", month: "short", day: "numeric" });
};

const selectLocalImage = () => {
  const input = document.createElement("input");
  input.setAttribute("type", "file");
  input.setAttribute("accept", "image/*");
  input.click();

  input.onchange = () => {
    const file = input.files[0];
    return file;
  };
};

const saveToServer = (file) => {
  const imageRef = ref(storage, `image/${file.name + v4()}`);
  uploadBytes(imageRef, file).then((snapshot) => {
    getDownloadURL(snapshot.ref).then((downloadURL) => {
      return downloadURL;
    });
  });
};

export const uploadImage = () => {
  const file = selectLocalImage();
  const url = saveToServer(file);
  return url;
};
