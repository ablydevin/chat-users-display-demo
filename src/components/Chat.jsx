import Messages from "./Messages";
import MessageBox from "./MessageBox";
import MemberList from "./MemberList";
import OrganizationList from "./OrganizationList";

export default async function Chat() {
  return (
    <div>
      <div className="container">
        <div className="content">
          <div>
            <OrganizationList />
            <hr className="separator" />
            <MemberList />
          </div>
          <div style={{flexGrow:"1"}}>
            <Messages />
            <MessageBox />
          </div>
        </div>
      </div>
    </div>
  );
}
