// components/ui/auto-grow-textarea.tsx

"use client";

import * as React from "react";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

// 1. Add our new prop to the type definition
type AutoGrowTextareaProps = React.ComponentPropsWithoutRef<typeof Textarea> & {
  onEnterPress?: () => void;
};

const AutoGrowTextarea = React.forwardRef<
  HTMLTextAreaElement,
  AutoGrowTextareaProps
>(({ onEnterPress, ...props }, ref) => { // 2. Destructure the new prop
  const internalRef = React.useRef<HTMLTextAreaElement>(null);
  const textareaRef = (ref || internalRef) as React.RefObject<HTMLTextAreaElement>;

  React.useLayoutEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [textareaRef, props.value]); // Re-run effect if value changes programmatically

  const handleInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
    if (props.onChange) {
      props.onChange(event);
    }
  };

  // 3. Create the new key down handler
  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Check if Enter is pressed without the Shift key
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault(); // Prevent a new line from being added
      onEnterPress?.(); // Trigger the callback function
    }
    
    // Also call any onKeyDown prop that was passed in
    if (props.onKeyDown) {
        props.onKeyDown(event);
    }
  };


  return (
    <Textarea
      {...props}
      ref={textareaRef}
      onChange={handleInput}
      onKeyDown={handleKeyDown} // 4. Attach the handler
      className={cn("resize-none overflow-hidden", props.className)}
    />
  );
});

AutoGrowTextarea.displayName = "AutoGrowTextarea";

export { AutoGrowTextarea };
