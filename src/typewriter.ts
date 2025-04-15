export class Typewriter {
    private element: HTMLElement;
    private texts: string[];
    private currentTextIndex: number = 0;
    private currentText: string = '';
    private isDeleting: boolean = false;
    private typingSpeed: number = 100;
    private deletingSpeed: number = 50;
    private delayAfterTyping: number = 2000;
    private delayAfterDeleting: number = 500;

    constructor(element: HTMLElement, texts: string[]) {
        this.element = element;
        this.texts = texts;
        this.type();
    }

    private type() {
        const currentFullText = this.texts[this.currentTextIndex];
        
        if (this.isDeleting) {
            // Deleting text
            this.currentText = currentFullText.substring(0, this.currentText.length - 1);
        } else {
            // Typing text
            this.currentText = currentFullText.substring(0, this.currentText.length + 1);
        }

        this.element.textContent = this.currentText;

        let delay = this.isDeleting ? this.deletingSpeed : this.typingSpeed;

        if (!this.isDeleting && this.currentText === currentFullText) {
            // Finished typing
            delay = this.delayAfterTyping;
            this.isDeleting = true;
        } else if (this.isDeleting && this.currentText === '') {
            // Finished deleting
            this.isDeleting = false;
            this.currentTextIndex = (this.currentTextIndex + 1) % this.texts.length;
            delay = this.delayAfterDeleting;
        }

        setTimeout(() => this.type(), delay);
    }
}