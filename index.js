const { spawn } = require("child_process");
const { readFileSync } = require("fs-extra");
const http = require("http");
const axios = require("axios");
const semver = require("semver");
const logger = require("./utils/log");


/////////////////////////////////////////////
//========= Check node.js version =========//
/////////////////////////////////////////////

const nodeVersion = semver.parse(process.version);
if (nodeVersion.major < 12) {
    logger(`Node.js hiện tại của bạn ${process.version} không được hỗ trợ, cần Node.js 12 trở lên để có thể  khởi chạy bot!`, "error");
    return process.exit(0);
};

///////////////////////////////////////////////////////////
//========= Create website for dashboard/uptime =========//
///////////////////////////////////////////////////////////

const dashboard = http.createServer(function (_req, res) {
    res.writeHead(200, "OK", { "Content-Type": "text/plain" });
    res.write("HI! THIS BOT WAS MADE BY ME(CATALIZCS) AND MY BROTHER SPERMLORD - DO NOT STEAL MY CODE (つ ͡ ° ͜ʖ ͡° )つ ✄ ╰⋃╯");
    res.end();
});

dashboard.listen(process.env.port || 0);

logger("Đã mở server website...", "[ Starting ]");

/////////////////////////////////////////////////////////
//========= Create start bot and make it loop =========//
/////////////////////////////////////////////////////////

function startBot(message) {
    (message) ? logger(message, "[ Starting ]") : "";

    const child = spawn("node", ["--trace-warnings", "--async-stack-traces", "mirai.js"], {
        cwd: __dirname,
        stdio: "inherit",
        shell: true
    });

    child.on("close", (codeExit) => {
        if (codeExit != 0) {
            startBot("Đang khởi động lại...");
            return;
        } else return;
    });

    child.on("error", function (error) {
        logger("Đã xảy ra lỗi: " + JSON.stringify(error), "[ Starting ]");
    });
};

////////////////////////////////////////////////
//========= Check update from Github =========//
////////////////////////////////////////////////

axios.get('\x68\x74\x74\x70\x73\x3a\x2f\x2f\x72\x61\x77\x2e\x67\x69\x74\x68\x75\x62\x75\x73\x65\x72\x63\x6f\x6e\x74\x65\x6e\x74\x2e\x63\x6f\x6d\x2f\x6d\x61\x6e\x68\x6b\x68\x61\x63\x2f\x6d\x69\x72\x61\x69\x2d\x31\x2e\x32\x2e\x38\x2f\x6d\x61\x69\x6e\x2f\x70\x61\x63\x6b\x61\x67\x65\x2e\x6a\x73\x6f\x6e').then((res) => {
    logger("Đang kiểm tra cập nhật...", "[ CHECK UPDATE ]");
    const local = JSON.parse(readFileSync('./package.json'));
    if (semver.lt(local.version, res.data.version)) {
        if (local.autoUpdate == true) {
            logger(`Đã có phiên bản ${res.data.version}, tiến hành cập nhật source code!`, "[ CHECK UPDATE ]");
            const child = spawn("node", ["update.js"], {
                cwd: __dirname,
                stdio: "inherit",
                shell: true
            });

            child.on("exit", function () { return process.exit(0) });

            child.on("error", function (error) {
                logger("Đã xảy ra lỗi: " + JSON.stringify(error), "[ CHECK UPDATE ]");
            });
        } else {
            logger(`Đã có phiên bản ${res.data.version} đang đợi bạn cập nhật, sử dụng lệnh "node update" để cập nhật lên phiên bản mới!`, "[ CHECK UPDATE ]");
            startBot();
        }
    }
    else {
        logger('Bạn đang sử dụng bản mới nhất!', "[ CHECK UPDATE ]");
        startBot();
    }
}).catch(err => logger("Đã có lỗi xảy ra khi đang kiểm tra cập nhật cho bạn!", "[ CHECK UPDATE ]"));

//THIZ BOT WAS MADE BY ME(CATALIZCS) AND MY BROTHER SPERMLORD - DO NOT STEAL MY CODE (つ ͡ ° ͜ʖ ͡° )つ ✄ ╰⋃╯
