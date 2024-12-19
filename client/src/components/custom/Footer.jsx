import { Youtube, Twitter, Linkedin, Github } from 'lucide-react';
import {uid} from "uid";

const socialLinks = [
    <Youtube size={18}/>,
    <Twitter  size={18}/>,
    <Linkedin  size={18}/>,
    <Github  size={18}/>
]
const Footer = () => {
    return (
        <footer className='border-t py-6 mt-8 w-full flex justify-between text-neutral-600 dark:text-neutral-400'>
            <span className="text-sm font-semibold">Copyright @{new Date().getFullYear()}</span>
            <div className='flex flex-row gap-x-2 '>
                {socialLinks.map(icon=><span key={uid(4)}>{icon}</span>)}
            </div>
        </footer>
    );
};

export default Footer;