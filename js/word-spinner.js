// WordSpinner class
class WordSpinner extends HTMLElement {
    constructor() {
        super();

        this.style.transition = 'opacity 300ms ease-in-out';
        this.addEventListener('click', this.render);
    }

    // Which attributes should be watched for changes?
    static get observedAttributes() {
        return [
            'choices'
        ];
    }

    // choices getter so we can tie property to attribute
    get choices() {
        const choices = this.getAttribute('choices') || '';

        return choices.split(' ');
    }

    // choices setter so we can tie attribute to property
    set choices(value) {
        this.setAttribute('choices', value.join(' '));
    }

    // Lifecycle callback when attributes change
    attributeChangedCallback(name, oldVal, newVal) {
        if (oldVal && oldVal !== newVal) {
            this.render();
        }
    }

    // Get a random choice
    getRandomChoice() {
        const numberOfChoices = this.choices.length;
        const newChoiceIndex = Math.floor((Math.random() * 100) % numberOfChoices);

        return numberOfChoices ? this.choices[newChoiceIndex] : '';
    }

    // Render the component
    render() {
        const newChoice = this.getRandomChoice();

        if (newChoice.length) {
            this.style.opacity = '0';
            setTimeout(() => {
                this.innerHTML = newChoice;
                this.style.opacity = '1';
            }, 350);
        }
    }
}

// Define our class as a custom element
window.customElements.define('word-spinner', WordSpinner);