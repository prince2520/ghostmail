const HomeInboxMessages = ({ messages }) => {
    return (
        <div>
            {messages.map(msg => <div key={msg.id}>
                <h1>{msg.subject}</h1>
                <p>{msg.text}</p>
            </div>)}
        </div>
    );
};

export default HomeInboxMessages;