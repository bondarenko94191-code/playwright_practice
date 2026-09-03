import fs from "fs";
import path from "path";
import archiver from "archiver";

const output = fs.createWriteStream(
  path.join(__dirname, "playwright-report.zip"),
);
const archive = archiver("zip", { zlib: { level: 9 } });

output.on("close", () =>
  console.log(`Архів створено! Загальний розмір: ${archive.pointer()} байт`),
);
archive.on("error", (err) => {
  throw err;
});

archive.pipe(output);
archive.directory("playwright-report/", false); // Шлях до вашої папки зі звітом
archive.finalize();
