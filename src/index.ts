/**
 * The Classr MLaaS SDK.
 *
 * @author Saul Johnson <saul.a.johnson@gmail.com>
 * @since 15/01/2023
 */

import axios, { AxiosError } from 'axios';


/**
 * The default base API URL (the URL of the official Classr API).
 */
const DEFAULT_BASE_URL = 'https://www.classr.dev/';


/**
 * Represents a confusion matrix.
 */
export type ConfusionMatrix = { [key: string]: { [key: string]: number } };

/**
 * Represents the support of the training data for a classifier.
 */
export type ClassifierSupport = { [key: string]: number };


/**
 * Represents a collection of information about a classifier.
 */
export interface ClassifierInfo {

    /**
     * The UUID of the classifier.
     */
    uuid: string,

    /**
     * The name of the classifier.
     */
    name: string,

    /**
     * The description of the classifier.
     */
    description: string,

    /**
     * The macro precision of the classifier.
     */
    precision: number,

    /**
     * The macro recall of the classifier.
     */
    recall: number,

    /**
     * The macro F1 score of the classifier.
     */
    f1Score: number,

    /**
     * The overall accuracy of the classifier.
     */
    overallAccuracy: number,

    /**
     * The support of the training data used to create the classifier.
     */
    support: ClassifierSupport,

    /**
     * The confusion matrix for the classifier.
     */
    confusionMatrix: ConfusionMatrix,

    /**
     * The normalized confusion matrix for the classifier.
     */
    normalizedConfusionMatrix: ConfusionMatrix,
}


/**
 * Validates that a UUID is well-formed.
 *
 * @param uuid the UUID to validate
 * @returns true if the UUID is well-formed, otherwise false
 */
function validateUuid(uuid: string): boolean {
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
export async function classify(classifierUuid: string, document: string, baseUrl: string = DEFAULT_BASE_URL): Promise<string> {

    // Check validity of UUID.
    if (!validateUuid(classifierUuid)) {
        throw new Error('The UUID provided is not valid.');
    }

    // Send off API request.
    try {
        const response = await axios.post(`/api/classifier/${classifierUuid}`, { document }, {
            baseURL: baseUrl,
        });

        // Return info.
        return response.data.class;
    } catch (e) {
        if (e instanceof AxiosError) { // Narrow type.
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
        } else {
            throw e;
        }
    }
}


/**
 * Gets information about the classifier with the specified UUID.
 *
 * @param classifierUuid the UUID of the classifier
 * @param baseUrl the base URL of the API to use (optional, defaults to the official API)
 * @returns information about the classifier.
 */
export async function getInfo(classifierUuid: string, document: string, baseUrl: string = DEFAULT_BASE_URL): Promise<ClassifierInfo> {

    // Check validity of UUID.
    if (!validateUuid(classifierUuid)) {
        throw new Error('The UUID provided is not valid.');
    }

    // Send off API request.
    try {
        const response = await axios.get(`/api/classifier/${classifierUuid}`, {
            baseURL: baseUrl,
            headers: {
                'accept': 'application/json',
            },
        });

        // Return info.
        return response.data;
    } catch (e) {
        if (e instanceof AxiosError) { // Narrow type.
            switch (e.status) {
                case 404:
                    throw new Error(`A classifier with UUID ${classifierUuid} could not be found.`);
                case 429:
                    throw new Error(`You are making too many calls to the Classr API. Please wait a while and try again.`);
                default:
                    throw e;
            }
        } else {
            throw e;
        }
    }
}


/**
 * Represents a cloud-based classifier on the Classr platform.
 */
export default class Classr {

    /**
     * The UUID of the classifier.
     */
    classifierUuid: string;

    /**
     * The base URL of the API to use.
     */
    baseUrl: string;

    /**
     * Initializes a new instance of a cloud-based classifier on the Classr platform.
     *
     * @param classifierUuid the UUID of the classifier
     * @param baseUrl the base URL of the API to use (optional, defaults to the official API)
     */
    constructor(classifierUuid: string, baseUrl: string = DEFAULT_BASE_URL) {
        this.classifierUuid = classifierUuid;
        this.baseUrl = baseUrl;
    }

    /**
     * Classifies an unseen document using the classifier.
     *
     * @param document the document to classify
     * @returns the predicted class of the document
     */
    classify(document: string): Promise<string> {
        return classify(this.classifierUuid, document, this.baseUrl);
    }

    /**
     * Gets information about the classifier.
     *
     * @returns information about the classifier
     */
    getInfo(): Promise<ClassifierInfo> {
        return getInfo(this.classifierUuid, this.baseUrl);
    }
}
