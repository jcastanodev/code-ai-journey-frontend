import { ChatBotMessageInterface } from "@interfaces/ai/chatBot/ChatBotInterface";

export function Message({ role, content, date }: ChatBotMessageInterface) {
    return (
        <div className={`w-full flex ${role === 'system' ? 'justify-center' : (role === 'assistant' ? 'justify-start' : 'justify-end')}`}>
            <div className={`max-w-2/3 p-2 rounded-lg shadow-md ${role === 'system' ? 'bg-yellow-400' : (role === 'assistant' ? 'bg-blue-300' : 'bg-green-300')}`}>
                <div>
                    <p className="text-title text-xl font-bold">{content}</p>
                </div>
                <div className="text-right">
                    <span className="text-primary">{date}</span>
                </div>
            </div>
        </div>
    );
}
