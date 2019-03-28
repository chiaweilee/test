import "jest";
import _fetch from "isomorphic-fetch";
require("es6-promise").polyfill();

let result = [];

function reset() {
  result = [];
}

global.fetch = function(...argv) {
  return new Promise((resolve, reject) => {
    _fetch(...argv)
      .then(function(response) {
        result.push(response);
        resolve(response);
      })
      .catch(function(reason) {
        result.push(reason);
        reject(reason);
      });
  });
};

describe("test fetch env", () => {
  it("fetch ready", () => {
    expect(typeof fetch).toBe("function");
  });
});

describe("test x-fetch", () => {
  it("test fetch response", () => {
    return fetch("http://localhost:8000/t").then(data => {
      expect(data).toBe("peanut butter");
    });
  });

  it("test fetch catch", () => {
    expect.assertions(1);
    return fetch("http://localhost:8000/t").catch(e => {
      expect(e).toMatch("error");
    });
  });

  it("test fetch deep then", async () => {
    expect.assertions(3);
    reset();
    await fetch("http://localhost:8000/t");
    expect(result[0]).toBe("peanut butter");
    expect(result[1]).toBe("peanut butter");
    expect(result[2]).toBe("peanut butter");
    reset();
  });
});
