/**
 * The Input component is used to focus text input elements.
 *
 * @usage
 * ```html
 * <ion-input>
 *   <ion-label>Name</ion-label>
 *   <input value="Name" type="text">
 * </ion-input>
 * ```
 */
export declare class Form {
    constructor();
    register(input: any): void;
    deregister(input: any): void;
    focusCtrl(document: any): void;
    focusOut(): void;
    setAsFocused(input: any): void;
    /**
     * Focuses the next input element, if it exists.
     */
    focusNext(currentInput: any): any;
    nextId(): number;
}