export declare function encrypt(text: string): {
    iv: string;
    content: string;
};
export declare function decrypt(encrypted: {
    iv: string;
    content: string;
}): string;
