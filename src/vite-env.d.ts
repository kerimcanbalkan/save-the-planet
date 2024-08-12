/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly API_URL: string;
	// add more environment variables as needed
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
