import React from "react";
import siteConfig from "../config/siteConfig";
import { ShieldAlert, Mail, Info } from "lucide-react";

const DMCA = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 bg-red-600/10 rounded-2xl border border-red-600/20">
          <ShieldAlert className="w-8 h-8 text-red-600" />
        </div>
        <h1 className="text-4xl font-black uppercase italic tracking-tighter">
          DMCA <span className="text-red-600">Policy</span>
        </h1>
      </div>

      <div className="glass rounded-3xl p-8 md:p-12 space-y-8 text-neutral-300 leading-relaxed shadow-2xl border border-neutral-800/50">
        <section className="space-y-4">
          <h2 className="text-xl font-black text-white uppercase flex items-center gap-2 tracking-widest">
            <Info className="w-5 h-5 text-red-600" /> Digital Millennium
            Copyright Act
          </h2>
          <p>
            {siteConfig.name} ("{siteConfig.domain}") respects the intellectual
            property rights of others. In accordance with the Digital Millennium
            Copyright Act (DMCA), we have adopted the following policy toward
            copyright infringement.
          </p>
        </section>

        <ul className="space-y-6 list-none">
          <li className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 bg-neutral-800 rounded-full flex items-center justify-center font-black text-red-600 border border-neutral-700">
              1
            </div>
            <div>
              <p className="font-bold text-white mb-1">
                Non-Hosting Disclaimer
              </p>
              <p className="text-sm">
                We do not store any movies, files, or media on our own servers.
                Our website simply provides links and indexes technical metadata
                from third-party websites. If you are the owner of a content and
                wish to have it removed, please contact the hosting site
                directly.
              </p>
            </div>
          </li>
          <li className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 bg-neutral-800 rounded-full flex items-center justify-center font-black text-red-600 border border-neutral-700">
              2
            </div>
            <div>
              <p className="font-bold text-white mb-1">
                Formal Takedown Requests
              </p>
              <p className="text-sm">
                If you believe that your copyrighted work has been copied in a
                way that constitutes copyright infringement and is accessible
                via our index, you may notify our copyright agent.
              </p>
            </div>
          </li>
        </ul>

        <div className="bg-neutral-900/50 rounded-2xl p-6 border border-neutral-800">
          <h3 className="text-white font-black text-sm uppercase mb-4 tracking-widest">
            Required Information
          </h3>
          <ul className="text-xs space-y-2 list-disc pl-4 text-neutral-400">
            <li>A physical or electronic signature of the copyright owner.</li>
            <li>
              Identification of the copyrighted work claimed to have been
              infringed.
            </li>
            <li>
              Identification of the material that is claimed to be infringing.
            </li>
            <li>Contact information (Address, Phone number, Email).</li>
            <li>
              A statement that the complaining party has a good faith belief
              that use of the material is not authorized.
            </li>
          </ul>
        </div>

        <div className="pt-8 border-t border-neutral-800 flex flex-col items-center text-center">
          <p className="text-sm font-bold uppercase tracking-widest text-neutral-500 mb-4">
            Contact our Copyright Agent
          </p>
          <a
            href={`mailto:${siteConfig.contactEmail}`}
            className="flex items-center gap-3 bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-full font-black text-sm transition-all shadow-xl shadow-red-900/30 group"
          >
            <Mail className="w-5 h-5 group-hover:scale-110 transition-transform" />
            {siteConfig.contactEmail}
          </a>
          <p className="mt-4 text-[10px] text-neutral-600 uppercase tracking-tighter">
            Please allow 48-72 hours for a response.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DMCA;
