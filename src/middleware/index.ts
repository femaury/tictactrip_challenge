import {
    handleHeaders,
    handleCors,
    handleBodyRequestParsing
} from "./common";
import { handleLogging } from "./logger";
import { handleDocumentation } from "./swagger";

export default [
    handleHeaders,
    handleCors,
    handleBodyRequestParsing,
    handleLogging,
    handleDocumentation
];