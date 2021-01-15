#!/usr/bin/env node

const os = require('os')
const { exec } = require('child_process')
const path = require('path')
const http = require('http');

const getRootDir = path.parse(process.cwd()).root
const isMacOs = os.platform() === 'darwin';
const isWin = os.platform() === "win32";
const isLinux = os.platform() === 'linux';

/**
 * Execute utility function to exec command .
 * @param {String} cmd
 * @param {String} software
 * @return {void}
 */
function installUtilityFunction(cmd, software) {
    exec(`${software} --version`, function(err, stdout, stderr) {
        console.log("output: ", stdout);
        if (stdout === "" || !stdout) {
            exec(`${cmd} ${software}`, function(err, stdout, stderr) {
                console.log("output: ", stdout);
            })
        }
    });
}

function installSoftware() {
    if (isLinux) {
        installUtilityFunction("sudo apt-get install", "node")
        installUtilityFunction("sudo apt-get install", "curl")
        installUtilityFunction("sudo apt-get install", "wget")
    } else if (isMacOs) {
        exec(`/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"`, function(err, stdout, stdderr) {})

        installUtilityFunction("sudo brew install", "node")
        installUtilityFunction("sudo brew install", "curl")
        installUtilityFunction("sudo brew install", "wget")
    } else if (isWin) {

        http.get("http://ftp.gnu.org/gnu/wget/wget-1.11.4.tar.gz", response => response.pipe(fs.createWriteStream(getRootDir + "/Users/Downloads/wget-1.11.4.tar.gz")))

        https.get("https://curl.se/windows/dl-7.74.0_2/curl-7.74.0_2-win32-mingw.zip", response => response.pipe(fs.createWriteStream(getRootDir + "/Users/Downloads/curl-7.74.0_2-win32-mingw.zip")))

        https.get("https://nodejs.org/dist/v14.15.4/node-v14.15.4.tar.gz", response => response.pipe(fs.createWriteStream(getRootDir + "/Users/Downloads/node-v14.15.4.tar.gz")))

    } else {
        console.log("OS NOT FOUND")
    }
}

function SCA(version) {
    exec(version, (err, stdout) => {
        if (err) {
            console.log("command not found");
            console.log("Installing " + version + "...");
        }
        if (stdout != "") {
            console.log(`${stdout}`)
        } else {
            installSoftware()
        }
    });
}

SCA("wget --version")
