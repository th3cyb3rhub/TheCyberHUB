import BotAvatar from "../../../../assets/thecyberworld-green01.png";

export default function TCHBotAvatar() {
  return (
    <div className="react-chatbot-kit-chat-bot-avatar">
      <div
        className="react-chatbot-kit-chat-bot-avatar-container"
        style={{ background: "none" }}
      >
        <img alt="BotAvatar" src={BotAvatar} />
      </div>
    </div>
  );
}
