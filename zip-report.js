const fs = require('fs');
const path = require('path');
const archiverPkg = require('archiver');
const { ZipArchive } = archiverPkg;

const outputPath = path.join(__dirname, 'playwright-report.zip');
const output = fs.createWriteStream(outputPath);
const archive = new ZipArchive({ zlib: { level: 9 } });

output.on('close', () =>
  console.log(`Archive created: ${outputPath} (${archive.pointer()} bytes)`),
);
archive.on('error', (err) => {
  throw err;
});

archive.pipe(output);
archive.directory('playwright-report/', false);
archive.finalize();
