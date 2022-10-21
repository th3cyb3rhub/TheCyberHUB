// MessageParser code
class MessageParser {
  constructor(actionProvider, state) {
    this.actionProvider = actionProvider;
    this.state = state;
  }

  parse(message) {
    const lowerCaseMessage = message.toLowerCase();
    const lowerCaseMessageArr = lowerCaseMessage.split(" ");
    const actions = this.actionProvider;

    //Detect the User's name
    if (lowerCaseMessage === "") {
      actions.warn();
    } else if (
      lowerCaseMessage.includes("is") ||
      lowerCaseMessage.includes("am")
    ) {
      const userName = lowerCaseMessage.includes("is")
        ? lowerCaseMessageArr[lowerCaseMessageArr.indexOf("is") + 1]
        : lowerCaseMessageArr[lowerCaseMessageArr.indexOf("am") + 1];
      actions.welcome(userName);
    } else if (lowerCaseMessageArr.length === 1) {
      actions.welcome(lowerCaseMessage);
    } else if (
      lowerCaseMessageArr.length === 2 &&
      lowerCaseMessage.includes("i'm")
    ) {
      actions.welcome(lowerCaseMessageArr[1]);
    } else if (lowerCaseMessageArr.length === 2) {
      actions.welcome(lowerCaseMessageArr[0]);
    } else if (
      !lowerCaseMessage.includes("is") &&
      lowerCaseMessageArr.length !== 1 &&
      lowerCaseMessageArr.length !== 2
    ) {
      actions.warn();
    } else {
      actions.warn();
    }
  }
}

export default MessageParser;
