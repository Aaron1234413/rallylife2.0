
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import APIErrorDisplay from '@/components/tennis-ai/APIErrorDisplay';

interface Message {
  id: string;
  content: string;
  is_from_ai: boolean;
  created_at: string;
}

interface MessageListProps {
  messages: Message[];
  isLoading: boolean;
  error?: { 
    message: string; 
    type?: string;
    retry?: () => void; 
  };
}

const MessageList: React.FC<MessageListProps> = ({ messages, isLoading, error }) => {
  // Display error message if there's an API failure
  if (error) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-4">
        <APIErrorDisplay 
          error={error}
          className="max-w-md mx-auto"
        />
      </div>
    );
  }

  // Display suggestion prompts when no messages
  if (messages.length === 0 && !isLoading) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-center text-muted-foreground p-6">
        <h3 className="text-lg font-medium mb-2">Tennis AI Assistant</h3>
        <p className="mb-4">Ask me anything about tennis techniques, strategies, or training.</p>
        <div className="max-w-md text-sm space-y-2">
          <div className="bg-accent/30 p-3 rounded-lg cursor-pointer hover:bg-accent/50 transition-colors">
            "What's the proper technique for a one-handed backhand?"
          </div>
          <div className="bg-accent/30 p-3 rounded-lg cursor-pointer hover:bg-accent/50 transition-colors">
            "How should I approach playing on clay courts?"
          </div>
          <div className="bg-accent/30 p-3 rounded-lg cursor-pointer hover:bg-accent/50 transition-colors">
            "What exercises help improve serve power?"
          </div>
          <div className="bg-accent/30 p-3 rounded-lg cursor-pointer hover:bg-accent/50 transition-colors">
            "Can you analyze why my second serve is inconsistent?"
          </div>
          <div className="bg-accent/30 p-3 rounded-lg cursor-pointer hover:bg-accent/50 transition-colors">
            "What's a good training routine for a 3.5 NTRP player?"
          </div>
        </div>
      </div>
    );
  }

  // Display loading skeletons
  if (messages.length === 0 && isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={`loading-${i}`} className="flex justify-start mb-4">
            <div className="flex max-w-[80%] flex-row">
              <Skeleton className="h-8 w-8 rounded-full mr-2" />
              <div>
                <Skeleton className="h-24 w-[250px] rounded-2xl" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {messages.map((msg) => (
        <div key={msg.id} className={`flex ${msg.is_from_ai ? 'justify-start' : 'justify-end'} mb-4`}>
          <div className={`flex max-w-[80%] ${msg.is_from_ai ? 'flex-row' : 'flex-row-reverse'}`}>
            {/* Avatar for AI messages */}
            {msg.is_from_ai && (
              <Avatar className="h-8 w-8 mr-2 flex-shrink-0">
                <AvatarImage src="/lovable-uploads/ee9cb25f-ea48-42bf-bd4d-2f6b06aa30ed.png" alt="AI" />
                <AvatarFallback className="bg-primary text-primary-foreground text-sm">AI</AvatarFallback>
              </Avatar>
            )}
            
            <div className="flex flex-col">
              <div className={`px-4 py-2 rounded-2xl ${
                msg.is_from_ai 
                  ? 'bg-accent/30 text-left rounded-tl-none' 
                  : 'bg-primary text-primary-foreground rounded-tr-none'
              }`}>
                <div className="whitespace-pre-wrap">{msg.content}</div>
              </div>
              <div className={`text-xs text-muted-foreground mt-1 ${msg.is_from_ai ? 'text-left' : 'text-right'}`}>
                {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          </div>
        </div>
      ))}
      
      {/* Typing indicator */}
      {isLoading && messages.length > 0 && (
        <div className="flex justify-start mb-4">
          <div className="flex max-w-[80%] flex-row">
            <Avatar className="h-8 w-8 mr-2 flex-shrink-0">
              <AvatarImage src="/lovable-uploads/ee9cb25f-ea48-42bf-bd4d-2f6b06aa30ed.png" alt="AI" />
              <AvatarFallback className="bg-primary text-primary-foreground text-sm">AI</AvatarFallback>
            </Avatar>
            
            <div className="flex flex-col">
              <div className="px-4 py-3 rounded-2xl bg-accent/30 text-left rounded-tl-none">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-current animate-bounce" />
                  <div className="w-2 h-2 rounded-full bg-current animate-bounce" style={{ animationDelay: '0.2s' }} />
                  <div className="w-2 h-2 rounded-full bg-current animate-bounce" style={{ animationDelay: '0.4s' }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MessageList;
