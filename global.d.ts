declare function log(...msg: any[]): void
declare const ce: {
	<K extends keyof HTMLElementTagNameMap>(tagName: K, options?: ElementCreationOptions) : HTMLElementTagNameMap[K];
	(name: string) : HTMLElement;
};

