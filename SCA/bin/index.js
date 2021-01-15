#!/usr/bin/env node

const os = require('os')
const { exec } = require('child_process')
const path = require('path')
const http = require('http');
const https = require('https');
const fs = require('fs');

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

function installSoftware(version) {
    if (isLinux) {
        if(version == "node --version")
            installUtilityFunction("sudo apt-get install", "node")
        else if(version == "curl --version")
            installUtilityFunction("sudo apt-get install", "curl")
        else if(version ==  "wget --version")
            installUtilityFunction("sudo apt-get install", "wget")
    } else if (isMacOs) {
        exec(`/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"`, function(err, stdout, stdderr) {})
        if(version == "node --version")
            installUtilityFunction("sudo brew install", "node")
        else if(version == "curl --version")
            installUtilityFunction("sudo brew install", "curl")
        else if(version == "wget --version")
            installUtilityFunction("sudo brew install", "wget")
    } else if (isWin) {
        if(version == "wget --version")
            https.get("https://downloads.sourceforge.net/project/gnuwin32/wget/1.11.4-1/wget-1.11.4-1-setup.exe?r=https%3A%2F%2Fsourceforge.net%2Fprojects%2Fgnuwin32%2Ffiles%2Fwget%2F1.11.4-1%2Fwget-1.11.4-1-setup.exe%2Fdownload%3Fuse_mirror%3Djztkft&ts=1610386940", response => response.pipe(fs.createWriteStream(getRootDir + "/Users/hp/Downloads/wget-1.11.4.exe")))
        else if(version == "curl --version")
            https.get("https://curl.se/windows/dl-7.74.0_2/curl-7.74.0_2-win32-mingw.zip", response => response.pipe(fs.createWriteStream(getRootDir + "/Users/hp/Downloads/curl-7.74.0_2-win32-mingw.zip")))
        else if(version == "node --version")
            https.get("https://nodejs.org/dist/v14.15.4/node-v14.15.4-x64.msi", response => response.pipe(fs.createWriteStream(getRootDir + "/Users/hp/Downloads/node-v14.15.msi")))

    } else {
        console.log("OS NOT FOUND")
    }
}

function SCA(version) {
    exec(version, (err, stdout) => {
        if (err) {
            console.log( version + " application not found");
            console.log("Installing " + version + "...");
        }
        if (stdout != "") {
            console.log(`${stdout}`)
        } else {
            installSoftware(version);
            console.log("software is ready to be installed on your OS");
        }
    });
}

SCA("neto --version")
