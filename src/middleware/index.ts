import {
    handleHeaders,
    handleCors,
    handleBodyRequestParsing
} from "./common";

import { handleLogging } from "./logger";

export default [handleHeaders, handleCors, handleBodyRequestParsing, handleLogging];