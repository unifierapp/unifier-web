declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NEXT_PUBLIC_BACKEND_URL: string,
        }
    }
}

export {};