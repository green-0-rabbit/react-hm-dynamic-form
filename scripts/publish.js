const util = require('util');
const exec = util.promisify(require('child_process').exec);
const fs = require("fs/promises");
const packageJson = require("../package.json");
const path = require('path');
const os = require("os");

const packageName = packageJson.name;
const packageDir = path.join(__dirname.replace("\scripts", ""), `\\${packageName}`)
const localPackageName = packageJson.localPackageName;
// const localPackageDir = path.join(os.homedir(), localPackageName)
// console.log(localPackageDir);

const rmRf = async () => {
    try {
        await fs.mkdir(packageDir)
    } catch (err) {
        await fs.rm(packageDir, { recursive: true })
        await fs.mkdir(packageDir)
    }
}

const runPack = async () => {
    try {
        const { stdout, stderr } = await exec(`npm pack --pack-destination=${packageName}`);
        console.log('stdout:', stdout);
        console.error('stderr:', stderr);
    } catch (err) {
        console.log('test', err);
    }
}

rmRf()
runPack()






