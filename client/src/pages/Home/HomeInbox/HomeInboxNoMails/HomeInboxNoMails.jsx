import InboxAnimation from "../../../../assets/lottifies/InboxAnimation.json";
import Lottie from "lottie-react"

const HomeInboxNoMails = () => {
    return (
        <div className="flex gap-y-6 items-center justify-center">
            <div className="w-16">
                <Lottie animationData={InboxAnimation} loop={true} />
            </div>
            <h1>Your Inbox is empty</h1>
            <p>Waiting for incoming emails</p>
        </div>
    );
};

export default HomeInboxNoMails;