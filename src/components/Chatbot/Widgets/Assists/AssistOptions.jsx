import { OptionButton, OptionCont } from "./AssistElements";
import { createClientMessage } from "react-chatbot-kit";

export default function AssistOptions(props) {
  const optionReply = {
    "Join Community":
      "Fantastic, It'll be a priviledge to have you in the community. I've got the following links to join our community, below:",
    "Contribute To Open-Source":
      "Great, contributing to Open-Source is gold. I tell you! I've got the following links to our Open-Source projects, below:",
    "Apply For Job(s)":
      "The journey of a thousand miles starts with a step. See below, for a link to our Jobs/Internships page. Good luck!",
    "See Upcoming Events":
      "Nice! Learn how successful people in your field pull off their tricks by attending events that they air in. Here is a link to our Upcoming Events page:",
    "Enroll For Course(s)":
      "You've come to the right place! You'll learn a lot from any of our courses you take. I've got a link to a page showing all of our available courses, below:",
  };
  const options = [
    {
      name: "Join Community",
      handler: () => {
        const message = createClientMessage("Join Community");
        props.setState((prevState) => ({
          ...prevState,
          messages: [...prevState.messages, message],
        }));
        props.actionProvider.suggestLinks("Join Community", optionReply);
      },
      id: 1,
    },
    {
      name: "Contribute To Open-Source",
      handler: () => {
        const message = createClientMessage("Contribute To Open-Source");
        props.setState((prevState) => ({
          ...prevState,
          messages: [...prevState.messages, message],
        }));
        props.actionProvider.suggestLinks(
          "Contribute To Open-Source",
          optionReply
        );
      },
      id: 2,
    },
    {
      name: "Apply For Job(s)",
      handler: () => {
        const message = createClientMessage("Apply For Job(s)");
        props.setState((prevState) => ({
          ...prevState,
          messages: [...prevState.messages, message],
        }));
        props.actionProvider.suggestLinks("Apply For Job(s)", optionReply);
      },
      id: 3,
    },
    {
      name: "See Upcoming Events",
      handler: () => {
        const message = createClientMessage("See Upcoming Events");
        props.setState((prevState) => ({
          ...prevState,
          messages: [...prevState.messages, message],
        }));
        props.actionProvider.suggestLinks("See Upcoming Events", optionReply);
      },
      id: 4,
    },
    {
      name: "Enroll For Course(s)",
      handler: () => {
        const message = createClientMessage("Enroll For Course(s)");
        props.setState((prevState) => ({
          ...prevState,
          messages: [...prevState.messages, message],
        }));
        props.actionProvider.suggestLinks("Enroll For Course(s)", optionReply);
      },
      id: 5,
    },
  ];

  const optionsMarkup = options.map((option) => (
    <OptionButton key={option.id} onClick={option.handler}>
      {option.name}
    </OptionButton>
  ));

  return <OptionCont>{optionsMarkup}</OptionCont>;
}
