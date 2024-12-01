import { vectorize } from "../modules/vectorize.js";

const argv = process.argv.slice(2);

await vectorize(argv[0].replace('--filein=', ''), argv[1].replace('--fileout=', ''));