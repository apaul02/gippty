'use client';
import { useChat } from '@ai-sdk/react';
import { useState } from 'react';
import { AutoGrowTextarea } from './AutoGrowTextArea';
import { Button } from './ui/button';
import { Plus, Send } from 'lucide-react';

export default function ChatPage() {
    const handleSend = async () => {
        if (!input.trim()) return;
        sendMessage({ text: input });
        setInput('')
    }
    
    const [input, setInput] = useState('');
    const { messages, sendMessage } = useChat();
    
    return (
        <div className='flex justify-center'>        
            <div className='flex flex-col h-screen w-1/2'>
                <div className='flex-1 overflow-y-auto pb-32'>
                    <div className='flex justify-center flex-col h-full'>
                        <div className='flex justify-center w-full'>
                            <div className='w-full space-y-4 p-4'>
                                {messages.map(message => (
                                    <div key={message.id} className={`w-full flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                        <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                                            message.role === 'user' 
                                                ? 'bg-blue-500 text-white' 
                                                : 'bg-gray-200 text-gray-900'
                                        }`}>
                                            <div className='text-xs font-semibold mb-1'>
                                                {message.role === 'user' ? 'You' : 'AI'}
                                            </div>
                                            {message.parts.map((part, i) => {
                                                switch (part.type) {
                                                    case 'text':
                                                        return <div key={`${message.id}-${i}`} className='text-sm'>{part.text}</div>
                                                }
                                            })}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className='basis-1/5'>
                    <div className='flex justify-center flex-col h-full'>
                        <div className='flex justify-center'>
                            <div className='fixed bottom-0 left-1/2 transform -translate-x-1/2 w-1/2 p-4 border-2 rounded-md'>
                                <div className='flex border w-full h-auto rounded-md flex-col focus-within:outline bg-white focus-within:outline-2 focus-within:outline-offset-0 transition-all duration-50 '>
                                    <div>
                                        <AutoGrowTextarea 
                                            value={input}
                                            onChange={e => setInput(e.currentTarget.value)}
                                            onEnterPress={handleSend}
                                            placeholder='Ask Anything.....'
                                            className='!border-none !outline-none focus:outline-none focus-visible:ring-0 focus:border-none focus:shadow-none shadow-none'
                                        />
                                    </div>
                                    <div className='flex px-2 py-2 justify-between'>
                                        <div>
                                           <Button size={"icon"} variant={"ghost"}><Plus /></Button> 
                                        </div>
                                        <div>
                                            <Button size={"icon"} onClick={handleSend} disabled={!input.trim()} variant={"ghost"}><Send /></Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> 
        </div>
    );
}
