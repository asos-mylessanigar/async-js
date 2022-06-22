// async.js

import fetch from "node-fetch";
import fs from "fs";

// callbacks

setTimeout(() => {
  // now we're inside the callback function
  // async essentially means "do this then do this"
  console.log("waited for 1 second, then did something");
}, 1000);

// callback hell
setTimeout(() => {
  console.log("3");
  setTimeout(() => {
    console.log("2");
    setTimeout(() => {
      console.log("1");
    }, 1000);
  }, 1000);
}, 1000);

// another example of a callback in browser land

/* 
    const btn = document.querySelector("#someElm");
    btn.addEventListener("click", someCallbackFunc);
    const someCallbackFunc = () => console.log("clicked");
*/

// callback error handling, sometimes called error-first callback

/*  could also use a try-catch here */
fs.readFile("./data.txt", { encoding: "utf-8" }, (err, data) => {
  if (err) {
    console.log("oops!, something went wrong");
  } else {
    console.log("success!", data);
  }
});

// Promises

/*  by creating a promise, you're passing it a function
    that accepts two paramaters, a resolve and a reject, callback essentially

    the aim of your code within a promise is to determine whether
    it was successful or not, then resolve or reject accordingly
*/
const myPromise = new Promise((resolve, reject) => {
  // promises are most often used for fetching data
  // but we can use them for regular code, say to calculate something
  // then resolve or reject based on the result of the calc
  const randomNumber = Math.floor(Math.random() * 2);
  // this can be 0 or 1, 50% chance of resolving
  if (randomNumber === 0) {
    resolve();
  } else {
    reject();
  }
});

/*
    The aim of the .then() and .catch() callback functions 
    is to handle the two different possible paths of resolve/reject
*/
myPromise
  .then(() => console.log("success!  promise resolved"))
  .catch(() => console.log("failure!  promised rejected"));

/* lets fetch the current value of bitcoin from a free API */
fetch("https://api.coincap.io/v2/assets/bitcoin", { method: "GET" })
  // use .then() as this is a promise, the response is returned
  // as this is the HTTP response we need to drill down into the data
  .then((res) => res.json())
  // you can chain .then() together
  .then((data) => console.log(data))
  // returns a JSON obj
  .catch((err) => console.log("something went wrong: ", err));

// Async/Await
// or how we should be writing async js in 2022

/*  if you want to use async await functionality you have to mark
    the func as async
*/
const loadFile = async () => {
  try {
    const data = await fs.promises.readFile("./data.txt", {
      encoding: "utf-8"
    });
    console.log("async/await : ", data);
    // by using a try-catch you're satefly handling any 'error'/'rejection'
    // scenario rather than the JS/Node engine/runtime thinking it's broken
  } catch (error) {
    console.log("uh oh...", error);
  }
};
loadFile();

// Async/await with Fetch API

const fetchBtc = async () => {
  try {
    // await the response
    const res = await fetch("https://api.coincap.io/v2/assets/bitcoin");
    // await the data from the response
    const data = await res.json();
    // do something with it
    console.log(data);
  } catch (error) {
    console.log("always handle your errors", error);
  }
};
fetchBtc();

/* NOTES */

// Axios is a wrapper package for XHR/XMLhttprequest (not Fetch API) which
// provides you with Promise API support; you call simply provide .then() and .catch()
// callbacks to Axios when used

// Fetch API with promise
// Fetch RETURNS a promise for you to handle
