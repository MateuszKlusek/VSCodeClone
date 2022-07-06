

import { execFile, spawn } from "child_process"
import process from "process"
import tmp from "tmp"

import fs from "fs"

export const runCode = async (req, res) => {
    console.log("")
    console.log("====! EXECUTING CODE !====")
    try {
        const codeToRun = req.body.codeToRun
        var tmpObj = tmp.fileSync({
            mode: '755', tmpdir: "./temp", prefix: 'temp', postfix: '.js',
        });
        var tempFileName = tmpObj.name.split("/").at(-1)

        const serverPath = process.cwd()

        await fs.appendFile(`${serverPath}/temp/${tempFileName}`, codeToRun, 'utf8',
            // callback function
            function (err) {
                try {
                    if (err) throw "Something went wrong with file creationg";
                    else {
                        // if no error
                        console.log("Data is appended to file successfully.")

                        var result = ''
                        try {
                            execFile("node", [`${serverPath}/temp/${tempFileName}`], { timeout: 3000, }, (err, stdout, stderr) => {
                                try {
                                    if (err) {
                                        console.log("err", err);
                                        console.log(`standard stderr: "${stderr}"`)
                                        throw stderr || err
                                    } else {
                                        result = stdout
                                        tmpObj.removeCallback()
                                        res.send({ status: "success", message: result })
                                    }
                                }
                                catch (err) {
                                    tmpObj.removeCallback()
                                    res.send({ status: 'error', message: err })
                                }

                            })
                        } catch (err) {
                            console.log('err:', err)
                            tmpObj.removeCallback()
                            res.send({ status: 'error', message: err })
                            throw err
                        }
                    }
                } catch (err) {
                    throw err
                }

            });
    }
    catch (err) {
        console.log("sindie last err")
        tmpObj.removeCallback()
        res.send({ status: 'error', message: err })
    }
}