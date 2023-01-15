/**
 * The Classr MLaaS SDK.
 *
 * @author Saul Johnson <saul.a.johnson@gmail.com>
 * @since 15/01/2023
 */
/**
 * Represents a confusion matrix.
 */
export declare type ConfusionMatrix = {
    [key: string]: {
        [key: string]: number;
    };
};
/**
 * Represents the support of the training data for a classifier.
 */
export declare type ClassifierSupport = {
    [key: string]: number;
};
/**
 * Represents a collection of information about a classifier.
 */
export interface ClassifierInfo {
    /**
     * The UUID of the classifier.
     */
    uuid: string;
    /**
     * The name of the classifier.
     */
    name: string;
    /**
     * The description of the classifier.
     */
    description: string;
    /**
     * The macro precision of the classifier.
     */
    precision: number;
    /**
     * The macro recall of the classifier.
     */
    recall: number;
    /**
     * The macro F1 score of the classifier.
     */
    f1Score: number;
    /**
     * The overall accuracy of the classifier.
     */
    overallAccuracy: number;
    /**
     * The support of the training data used to create the classifier.
     */
    support: ClassifierSupport;
    /**
     * The confusion matrix for the classifier.
     */
    confusionMatrix: ConfusionMatrix;
    /**
     * The normalized confusion matrix for the classifier.
     */
    normalizedConfusionMatrix: ConfusionMatrix;
}
/**
 * Classifies an unseen document using the classifier with the specified UUID.
 *
 * @param classifierUuid the UUID of the classifier
 * @param document the document to classify
 * @param baseUrl the base URL of the API to use (optional, defaults to the official API)
 * @returns the predicted class of the document
 */
export declare function classify(classifierUuid: string, document: string, baseUrl?: string): Promise<string>;
/**
 * Gets information about the classifier with the specified UUID.
 *
 * @param classifierUuid the UUID of the classifier
 * @param baseUrl the base URL of the API to use (optional, defaults to the official API)
 * @returns information about the classifier.
 */
export declare function getInfo(classifierUuid: string, document: string, baseUrl?: string): Promise<ClassifierInfo>;
/**
 * Represents a cloud-based classifier on the Classr platform.
 */
export declare class Classr {
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
    constructor(classifierUuid: string, baseUrl?: string);
    /**
     * Classifies an unseen document using the classifier.
     *
     * @param document the document to classify
     * @returns the predicted class of the document
     */
    classify(document: string): Promise<string>;
    /**
     * Gets information about the classifier.
     *
     * @returns information about the classifier
     */
    getInfo(): Promise<ClassifierInfo>;
}
