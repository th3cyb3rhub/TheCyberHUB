class ActionProvider {
    constructor(createChatBotMessage, setStateFunc, createClientMessage, stateRef, createCustomMessage, ...rest) {
        this.createChatBotMessage = createChatBotMessage;
        this.setState = setStateFunc;
        this.createClientMessage = createClientMessage;
        this.stateRef = stateRef;
        this.createCustomMessage = createCustomMessage;
    }

    updateChatbotState(message) {
        this.setState((prevState) => ({
            ...prevState,
            messages: [...prevState.messages, message],
        }));
    }

    welcome(name) {
        const userName = name.charAt(0).toUpperCase() + name.slice(1);
        const welcomeMessage = this.createChatBotMessage(`Hi, ${userName}! How can I best assist you today?`, {
            widget: "assistOptions",
        });
        this.updateChatbotState(welcomeMessage);
    }

    warn() {
        const warnMessage = this.createChatBotMessage("I didn't get that. Your First Name would do please.");
        this.updateChatbotState(warnMessage);
    }

    suggestLinks = (name, reply) => {
        const message = this.createChatBotMessage(`${reply[name]}`, {
            widget: "assistLinks",
        });

        this.setState((prevState) => ({
            ...prevState,
            optionName: name,
            messages: [...prevState.messages, message],
        }));
    };
}

export default ActionProvider;
