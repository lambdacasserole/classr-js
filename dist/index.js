"use strict";
/**
 * The Classr MLaaS SDK.
 *
 * @author Saul Johnson <saul.a.johnson@gmail.com>
 * @since 15/01/2023
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Classr = exports.getInfo = exports.classify = void 0;
const axios_1 = __importStar(require("axios"));
/**
 * The default base API URL (the URL of the official Classr API).
 */
const DEFAULT_BASE_URL = 'https://www.classr.dev/';
/**
 * Validates that a UUID is well-formed.
 *
 * @param uuid the UUID to validate
 * @returns true if the UUID is well-formed, otherwise false
 */
function validateUuid(uuid) {
    return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(uuid);
}
/**
 * Classifies an unseen document using the classifier with the specified UUID.
 *
 * @param classifierUuid the UUID of the classifier
 * @param document the document to classify
 * @param baseUrl the base URL of the API to use (optional, defaults to the official API)
 * @returns the predicted class of the document
 */
function classify(classifierUuid, document, baseUrl = DEFAULT_BASE_URL) {
    return __awaiter(this, void 0, void 0, function* () {
        // Check validity of UUID.
        if (!validateUuid(classifierUuid)) {
            throw new Error('The UUID provided is not valid.');
        }
        // Send off API request.
        try {
            const response = yield axios_1.default.post(`/api/classifier/${classifierUuid}`, { document }, {
                baseURL: baseUrl,
            });
            // Return info.
            return response.data.class;
        }
        catch (e) {
            if (e instanceof axios_1.AxiosError) { // Narrow type.
                switch (e.status) {
                    case 404:
                        throw new Error(`A classifier with UUID ${classifierUuid} could not be found.`);
                    case 413:
                        throw new Error('The document provided was too large.');
                    case 429:
                        throw new Error(`You are making too many calls to the Classr API. Please wait a while and try again.`);
                    default:
                        throw e;
                }
            }
            else {
                throw e;
            }
        }
    });
}
exports.classify = classify;
/**
 * Gets information about the classifier with the specified UUID.
 *
 * @param classifierUuid the UUID of the classifier
 * @param baseUrl the base URL of the API to use (optional, defaults to the official API)
 * @returns information about the classifier.
 */
function getInfo(classifierUuid, document, baseUrl = DEFAULT_BASE_URL) {
    return __awaiter(this, void 0, void 0, function* () {
        // Check validity of UUID.
        if (!validateUuid(classifierUuid)) {
            throw new Error('The UUID provided is not valid.');
        }
        // Send off API request.
        try {
            const response = yield axios_1.default.get(`/api/classifier/${classifierUuid}`, {
                baseURL: baseUrl,
                headers: {
                    'accept': 'application/json',
                },
            });
            // Return info.
            return response.data;
        }
        catch (e) {
            if (e instanceof axios_1.AxiosError) { // Narrow type.
                switch (e.status) {
                    case 404:
                        throw new Error(`A classifier with UUID ${classifierUuid} could not be found.`);
                    case 429:
                        throw new Error(`You are making too many calls to the Classr API. Please wait a while and try again.`);
                    default:
                        throw e;
                }
            }
            else {
                throw e;
            }
        }
    });
}
exports.getInfo = getInfo;
/**
 * Represents a cloud-based classifier on the Classr platform.
 */
class Classr {
    /**
     * Initializes a new instance of a cloud-based classifier on the Classr platform.
     *
     * @param classifierUuid the UUID of the classifier
     * @param baseUrl the base URL of the API to use (optional, defaults to the official API)
     */
    constructor(classifierUuid, baseUrl = DEFAULT_BASE_URL) {
        this.classifierUuid = classifierUuid;
        this.baseUrl = baseUrl;
    }
    /**
     * Classifies an unseen document using the classifier.
     *
     * @param document the document to classify
     * @returns the predicted class of the document
     */
    classify(document) {
        return classify(this.classifierUuid, document, this.baseUrl);
    }
    /**
     * Gets information about the classifier.
     *
     * @returns information about the classifier
     */
    getInfo() {
        return getInfo(this.classifierUuid, this.baseUrl);
    }
}
exports.Classr = Classr;
