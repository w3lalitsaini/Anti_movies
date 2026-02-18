import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-dark border-t border-neutral-800 py-10 px-6 mt-20">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                <div>
                    <h2 className="text-2xl font-bold text-primary">CineRate</h2>
                    <p className="text-neutral-400 mt-2">Your ultimate destination for movie reviews and ratings.</p>
                </div>
                <div className="flex gap-8 text-neutral-400">
                    <a href="#" className="hover:text-white">About Us</a>
                    <a href="#" className="hover:text-white">Privacy Policy</a>
                    <a href="#" className="hover:text-white">Terms of Service</a>
                    <a href="#" className="hover:text-white">Contact</a>
                </div>
                <div className="text-neutral-500 text-sm">
                    &copy; {new Date().getFullYear()} CineRate. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
