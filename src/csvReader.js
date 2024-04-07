import fs from "fs";
import csv from "csv-parser";
import { parse } from "json2csv";

export async function readCSV(filePath) {
  const results = [];

  return new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (data) => results.push(data))
      .on("end", () => {
        resolve(results);
      })
      .on("error", (error) => {
        reject(error);
      });
  });
}

export async function writeCSV(filename, data) {
  const csvData = parse(data);
  fs.writeFileSync(filename, csvData);
}
