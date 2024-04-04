/// <reference types="vite/client" />

declare namespace globalThis {
    const $autox: {
        callHandler: (name: string, arg: string, callback: (resp: string) => void) => void
    }
}