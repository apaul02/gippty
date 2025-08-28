'use client';

import { useChat } from '@ai-sdk/react';
import { useState } from 'react';
import { AutoGrowTextarea } from './AutoGrowTextArea';

export default function ChatPage() {
    const handleSend = async () => {
        sendMessage({ text: input });
        setInput('')
    }
  const [input, setInput] = useState('');
  const { messages, sendMessage } = useChat();
  return (
        <div className='flex justify-center'>        
            <div className='flex flex-col h-screen w-1/2'>
                <div className='basis-4/5'>
                    <div className='flex justify-center flex-col h-full'>
                        <div className='flex justify-center'>
                            <div>
                                {messages.map(message => (
                                    <div key={message.id} className='whitespace-pre-warp'>
                                        {message.role === 'user' ? 'User' : 'AI: '}
                                        { message.parts.map((part, i) => {
                                            switch (part.type) {
                                                case 'text':
                                                    return <div key={`${message.id}-${i}`}>{part.text}</div>
                                            }
                                        })}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className='basis-1/5'>
                    <div className='flex justify-center flex-col h-full'>
                        <div className='flex justify-center'>
                            <AutoGrowTextarea 
                                value={input}
                                onChange={e => setInput(e.currentTarget.value)}
                                onEnterPress={handleSend}
                            />
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
  );
}
