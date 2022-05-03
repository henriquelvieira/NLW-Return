import { useState } from "react";
import { Camera, Trash } from "phosphor-react";
import html2canvas from 'html2canvas';
import { Loading } from "../Loading";
import { screenshotType } from './Steps/FeedbackContentStep';

interface ScreenShotButtonProps {
    screenshot: screenshotType; 
    onScreenShotTook: (screenshot: screenshotType) => void;
};

export function ScreenShotButton({ screenshot, onScreenShotTook }: ScreenShotButtonProps) {
      const [isTakingScreenShot, setIsTakingScreenShot] = useState<boolean>(false);

    async function  handleTakeScreenshot() {
        setIsTakingScreenShot(true);

        try {
            const canvas = await html2canvas(document.querySelector('html')!);
            const base64image = canvas.toDataURL('image/png');
            onScreenShotTook(base64image);
        } catch (error) {
            console.log(error);
        } finally {
            setIsTakingScreenShot(false);
        };

    };

    if (screenshot) {
        return (
            <button 
                type='button'
                className='p-1 w-10 h-10 rounded-md border-transparent flex justify-end items-end text-zinc-400 hover:text-zinc-100 transition-colors'
                style={{ 
                    backgroundImage: `url(${screenshot})`,
                    backgroundPosition: 'right bottom',
                    backgroundSize: 100
                }}
                onClick={() => onScreenShotTook(null) }
            >
                <Trash weight='bold' />
            </button>
        )
    };

    return ( 
    <button 
        type="button" 
        className="p-2 bg-zinc-800 rounded-md border-transparent hover:bg-zinc-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500"
        onClick={handleTakeScreenshot}
     >
         {isTakingScreenShot ? <Loading /> : <Camera className="w-6 h-6 " /> }
    </button>
    )
}