import Lottie from "lottie-react"

import InboxAnimation from "../../../../assets/lottifies/InboxAnimation.json";

const HomeInboxNoMails = () => {
    return (
        <div className="flex flex-col w-full gap-y-2 items-center justify-center">
            <div className="w-48">
                <Lottie animationData={InboxAnimation} loop={true} />
            </div>
            <h1 className="font-semibold">Your Inbox is empty</h1>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">Waiting for incoming emails</p>
        </div>
    );
};

export default HomeInboxNoMails;