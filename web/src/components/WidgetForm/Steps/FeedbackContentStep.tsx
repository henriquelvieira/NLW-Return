import { FormEvent, useState } from 'react';
import { ArrowLeft } from 'phosphor-react';
import { CloseButton } from '../../CloseButton';
import { ScreenShotButton } from '../ScreenShotButton';

import { feedbackTypes, FeedbackType } from '..';

interface FeedbackContentStepProps {
    feedbackType: FeedbackType;
    onFeedbackRestartRequested: () => void;
    onFeedbackSent: () => void;
 };

export type screenshotType = string | null;

export function FeedbackContentStep({ 
    feedbackType, 
    onFeedbackRestartRequested, 
    onFeedbackSent 
}: FeedbackContentStepProps) {
    const [screenshot, setScreenshot] = useState<screenshotType>(null);
    const [comment, setComment] = useState<string>('');
    
    const feedbackTypeInfo = feedbackTypes[feedbackType]; //Pegar as informações do objeto conforme tipo selecionado

    function handleSubmitFeedback(event: FormEvent) { 
        event.preventDefault();
        console.log(comment);
        console.log(screenshot);
        onFeedbackSent();
    };

    return (
        <>        
            <header>

                <button 
                    type="button" 
                    className="top-5 left-5 absolute text-zinc-400 hover:text-zinc-100"
                    onClick={onFeedbackRestartRequested}
                >
                    <ArrowLeft weight="bold" className="w-4 h-4" />
                </button>
                
                <span className="text-xl leading-6 flex items-c enter gap-2">
                    <img 
                        src={feedbackTypeInfo.imagem.source} 
                        alt={feedbackTypeInfo.imagem.alt} 
                        className="w-6 h-6 "
                    />
                    {feedbackTypeInfo.title}
                </span>
                
                <CloseButton />
            </header> 

            <form className="my-4 w-full" onSubmit={handleSubmitFeedback}>
                <textarea  
                    className="min-w-[304px] w-full min-h-[112px] text-sm placeholder-zinc-400 text-zinc-100 bg-transparent border-zinc-600 rounded-md focus:border-brand-500 focus:ring-brand-500 focus:ring-1 resize-none focus:outline-none scrollbar scrollbar-thumb-zinc-700 scrollbar-track-transparent"
                    placeholder='Conte com detalhes o que está acontecendo...'
                    value={comment}
                    onChange={event => setComment(event.target.value)}
                />

                <footer className='flex gap-2 mt-2'>

                    <ScreenShotButton 
                        screenshot={screenshot}
                        onScreenShotTook={setScreenshot} 
                    />

                    <button
                        type='submit'
                        disabled={comment.length === 0}
                        className="p-2 bg-brand-500 rounded-md border-transparent flex-1 flex justify-center items-center text-sm hover:bg-brand-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500 transition-colors disabled:opacity-50 disabled:hover:bg-brand-500"                         
                    >
                        Enviar feedback
                    </button>

                </footer>

            </form>
    </>
    )
}