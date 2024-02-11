function tree(obj) {
  let indent = -1;

  function getName(obj) {
    let str = "";

    for (let key in obj) {
      if (key === "name") {
        str += obj[key];
      } else if (key === "items") {
        indent += 1;

        for (let item of obj[key]) {
          str += `\n${
            indent > 0 && indent < obj[key].length ? "|" : ""
          }${" ".repeat(indent)}|__`;
          str += `${getName(item)}`;
        }

        indent = 0;
      }
    }
    return str;
  }

  console.log(getName(obj));
}

const obj = {
  name: 1,
  items: [
    {
      name: 2,
      items: [{ name: 3 }, { name: 4 }],
    },
    {
      name: 5,
      items: [{ name: 6 }],
    },
  ],
};

tree(obj);
