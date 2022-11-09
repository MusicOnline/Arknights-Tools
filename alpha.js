const fs = require("fs/promises");
const path = require("path");
const sharp = require("sharp");

const ALPHA_IMAGE_SUFFIX = "[alpha]";

async function checkShouldApplyMask(inputDirectory, filename) {
  if (!filename.endsWith(".png")) throw new Error("Not PNG file");
  if (filename.endsWith("b.png"))
    throw new Error("Skipping lower resolution file");
  if (filename.endsWith("[alpha].png"))
    throw new Error("Skipping alpha mask file");
  const mask = path.join(
    inputDirectory,
    filename.slice(0, -4) + ALPHA_IMAGE_SUFFIX + ".png"
  );
  return fs.access(mask);
}

async function applyAlphaMaskToAll(inputDirectory, outputDirectory) {
  const filenames = await fs.readdir(inputDirectory);
  return Promise.allSettled(
    filenames.map((filename) =>
      checkShouldApplyMask(inputDirectory, filename).then(() =>
        applyAlphaMask(inputDirectory, filename, outputDirectory)
      )
    )
  );
}

async function applyAlphaMask(inputDirectory, filename, outputDirectory = ".") {
  const actual = path.join(inputDirectory, filename);
  const mask = path.join(
    inputDirectory,
    filename.slice(0, -4) + ALPHA_IMAGE_SUFFIX + ".png"
  );

  const actualReadPipeline = sharp(actual);

  // Alpha layer must be removed first, unable to chain before joinChannel
  const actualBufferPipeline = actualReadPipeline.removeAlpha().toBuffer();
  const maskBufferPipeline = actualReadPipeline
    .metadata()
    .then(({ width, height }) => sharp(mask).resize(width, height).toBuffer());

  return Promise.all([actualBufferPipeline, maskBufferPipeline]).then(
    ([actualBuffer, maskBuffer]) =>
      sharp(actualBuffer)
        .joinChannel(maskBuffer)
        .toFile(path.join(outputDirectory, filename))
  );
}

function main() {
  const [inputDirectory, outputDirectory = "."] = process.argv.slice(2);
  if (!inputDirectory) {
    console.error(
      "Texture2D path required. Example: npm run alpha -- /path/to/Texture2D /optional/path/to/output"
    );
    process.exit(1);
  }
  fs.mkdir(outputDirectory, { recursive: true }).then(() =>
    applyAlphaMaskToAll(inputDirectory, outputDirectory)
  );
}

main();
