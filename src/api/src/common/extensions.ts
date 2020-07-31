import 'colors';
export {};

declare global {
    interface Array<T> {
        promise(): Promise<T extends Promise<infer U> ? U[] : any[]>;
        shuffle(): T[];
    }
}

Array.prototype.promise = function() {
    return Promise.all(this);
};

Array.prototype.shuffle = function() {
    const maxIterations = this.length;
    let i = 0;
    return this.sort(() => (i++ < maxIterations ? Math.random() - 0.5 : 0));
};

declare module 'express' {
    interface Request {
        user?: any;
    }
}
