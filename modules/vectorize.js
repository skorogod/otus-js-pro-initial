import * as fs from "fs";
import * as util from "util";

import * as stream from "stream";

import { Transform } from "stream";

const pipeline = util.promisify(stream.pipeline);

const sortObj = (obj) => {
    const sortedObj = {}

    Object.keys(obj).sort().forEach(key => {
        sortedObj[key] = obj[key]
    })

    return sortedObj;
}

export async function vectorize(fileInput, fileOutput) {
  const vector = {};

  const readStream = fs.createReadStream(fileInput);
  const writeStream = fs.createWriteStream(fileOutput);

  const filterSymbols = new Transform({
    transform(chunk, encoding, callback) {
      const data = chunk.toString();
      if (data.length) {
        callback(null, countParts(data));
      } else {
        callback("data is empty");
      }
    },
  });

  const countParts = (data) => {
    const parts = data
                    .replace(/[^a-zA-Z0-9\s]/g, "")
                    .split(/\s+/)
                    .filter(el => el.length > 0)

    parts.forEach(el => {
        if (!vector[el]) {
            vector[el] = 0
        }
        vector[el] += 1;
    })

    return `${JSON.stringify(sortObj(vector))} -> ${JSON.stringify(Object.values(sortObj(vector)))}`
  }

  pipeline(readStream, filterSymbols, writeStream)
}
