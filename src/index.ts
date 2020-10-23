import os from "os";
import { init } from "./server";
import config from "./config";

(async () => {
    try {
        const server = await init();
        const PORT = config.PORT;

        server.listen(PORT, () =>
            console.info(`{"level":30,"time":${Date.now()},"pid":${process.pid},"hostname":"${os.hostname}","msg":"Server started on port ${PORT}"}`)
        );
    }
    catch (err) {
        console.info(`{"level":40,"time":${Date.now()},"pid":${process.pid},"hostname":"${os.hostname}","msg":"Couldn't start server. - ${err}"}`)
        process.exit(1);
    }
})();