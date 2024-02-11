import { deepEqual } from "./modules/deepEqual.js";

const obj1 = {
  a: {
    b: 1,
  },
};

const obj2 = {
  a: {
    b: 2,
  },
};
const obj3 = {
  a: {
    b: 1,
  },
};

deepEqual(obj1, obj1)
deepEqual(obj1, obj2)
deepEqual(obj1, obj3)