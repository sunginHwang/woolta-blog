export default interface IAsyncAction {
    INDEX?: string,
    PENDING: string;
    FULFILLED?: string;
    REJECTED?: string;
    SUCCESS?: string;
    FAILURE?: string;
}
