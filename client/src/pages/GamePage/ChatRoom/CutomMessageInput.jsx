import {} from "react";
import { ChatAutoComplete, useMessageInputContext } from "stream-chat-react";
import MainButton from "../../../components/Common/MainButton";

function CustomMessageInput() {
  const { handleSubmit } = useMessageInputContext();
  return (
    <div className="str-chat__input-flat str-chat__input-flat--send-button-active">
      <div className="str-chat__input-flat-wrapper">
        <div className="str-chat__input-flat--textarea-wrapper">
          <ChatAutoComplete />
        </div>
        <MainButton onClick={handleSubmit}> Send Message</MainButton>
      </div>
    </div>
  );
}

export default CustomMessageInput;