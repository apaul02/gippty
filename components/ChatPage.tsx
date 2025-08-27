'use client';

import { Plus, Send } from "lucide-react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";

export function ChatPage() {
    return  <div>
        <div className="flex justify-center h-screen w-full flex-col">
           <div className="flex justify-center h-1/7">
                <div className="border flex justify-between w-1/2  rounded-md flex-col">
                    <Textarea className="resize-none w-full h-auto border-none shadow-none focus-visible:ring-0"/>  
                    <div className="flex justify-between px-2 py-1">
                        <Button size={"icon"} variant={"ghost"} className="rounded-full"><Plus /></Button>
                        <Button size={"icon"} variant={"ghost"} className="rounded-full"><Send /></Button>
                    </div>
                </div>
            </div> 
        </div>
    </div>
}
