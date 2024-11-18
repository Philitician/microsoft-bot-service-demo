import { cn } from '@/lib/utils';
import { Message } from '@/lib/types';
import { Card } from '@/components/ui/card';

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  return (
    <div
      className={cn(
        'flex w-full',
        message.sender === 'user' ? 'justify-end' : 'justify-start'
      )}
    >
      <Card
        className={cn(
          'max-w-[80%] p-4 mb-4',
          message.sender === 'user'
            ? 'bg-primary text-primary-foreground'
            : 'bg-muted'
        )}
      >
        <p className="text-sm">{message.text}</p>
      </Card>
    </div>
  );
}