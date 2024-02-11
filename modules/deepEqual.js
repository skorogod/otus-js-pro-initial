export function deepEqual(a, b) {
  let path = [];

  function checkEquality(a, b) {
    for (let key in a) {
      path.push(key);

      if (b.hasOwnProperty(key)) {
        if (a[key] instanceof Object) {
          checkEquality(a[key], b[key]);
        } else if (a[key] !== b[key]) {
          throw new Error();
        }
      } else {
        throw new Error();
      }
    }
  }

  try {
    checkEquality(a, b);
    console.log("OK");
  } catch (err) {
    console.log(`Error: ${path.join(".")}`);
  }
}
