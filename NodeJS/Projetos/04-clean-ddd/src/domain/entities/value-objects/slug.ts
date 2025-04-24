export class Slug {
	public value: string;

	constructor(value: string) {
		this.value = value;
	}

	/**
	 * Receives a string and normalizes it as a slug.
	 * Example: "Hello World!" => "hello-world"
	 * @param text {string}
	 */
	static createFromText(text: string): Slug {
		const slugText = text
			.normalize("NFKD")
			.toLowerCase()
			.trim()
			.replace(/\s+/g, "-")
			.replace(/[^\w-]+/g, "")
			.replace(/_/g, "-")
			.replace(/--+/g, "-")
			.replace(/-$/g, "");

		return new Slug(slugText);
	}
}
