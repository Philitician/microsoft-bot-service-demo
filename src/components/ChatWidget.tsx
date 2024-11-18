import { useState } from 'react';
import { X, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { Message } from '@/lib/types';

const DIRECT_LINE_SECRET = 'YOUR_DIRECT_LINE_SECRET';
const BOT_API_URL = 'YOUR_BOT_API_URL';

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hei, jeg er El-Bot! Jeg kan hjelpe deg med å svare på generelle spørsmål relatert til oss i EL-PROFFEN.',
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);

  const sendMessage = async (text: string) => {
    // Add user message to chat
    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);

    try {
      const response = await fetch(BOT_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${DIRECT_LINE_SECRET}`,
        },
        body: JSON.stringify({ text }),
      });

      const data = await response.json();
      
      // Add bot response to chat
      const botMessage: Message = {
        id: Date.now().toString(),
        text: data.text,
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isOpen ? (
        <Card className="w-[400px] h-[600px] flex flex-col">
          <div className="flex items-center justify-between p-4 bg-[#8B1F2F] text-white">
            <h2 className="text-xl font-bold">EL-BOT</h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-white/80"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          <ScrollArea className="flex-1 p-4">
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
          </ScrollArea>
          <ChatInput onSend={sendMessage} />
        </Card>
      ) : (
        <Button
          onClick={() => setIsOpen(true)}
          size="icon"
          className="h-12 w-12 rounded-full bg-[#8B1F2F] hover:bg-[#7A1B29]"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      )}
    </div>
  );
}