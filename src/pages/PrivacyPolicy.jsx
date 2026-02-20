import React from "react";
import siteConfig from "../config/siteConfig";
import { Lock, Cookie, UserCheck, Shield } from "lucide-react";

const PrivacyPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 bg-blue-600/10 rounded-2xl border border-blue-600/20">
          <Lock className="w-8 h-8 text-blue-600" />
        </div>
        <h1 className="text-4xl font-black uppercase italic tracking-tighter">
          Privacy <span className="text-blue-600">Policy</span>
        </h1>
      </div>

      <div className="glass rounded-3xl p-8 md:p-12 space-y-10 text-neutral-300 leading-relaxed shadow-2xl border border-neutral-800/50">
        <section className="space-y-4">
          <p className="text-sm font-bold uppercase tracking-widest text-neutral-500">
            Last Updated: {new Date().toLocaleDateString()}
          </p>
          <p>
            At {siteConfig.name}, accessible from {siteConfig.domain}, one of
            our main priorities is the privacy of our visitors. This Privacy
            Policy document contains types of information that is collected and
            recorded by {siteConfig.name} and how we use it.
          </p>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-neutral-900/40 p-6 rounded-2xl border border-neutral-800">
            <Cookie className="w-6 h-6 text-blue-500 mb-4" />
            <h3 className="text-white font-black text-sm uppercase mb-2 tracking-widest">
              Cookies & Web Beacons
            </h3>
            <p className="text-xs text-neutral-500">
              Like any other website, {siteConfig.name} uses 'cookies'. These
              cookies are used to store information including visitors'
              preferences, and the pages on the website that the visitor
              accessed or visited.
            </p>
          </div>
          <div className="bg-neutral-900/40 p-6 rounded-2xl border border-neutral-800">
            <Shield className="w-6 h-6 text-orange-500 mb-4" />
            <h3 className="text-white font-black text-sm uppercase mb-2 tracking-widest">
              Google DoubleClick DART
            </h3>
            <p className="text-xs text-neutral-500">
              Google is one of a third-party vendor on our site. It also uses
              cookies, known as DART cookies, to serve ads to our site visitors
              based upon their visit to our site and other sites on the
              internet.
            </p>
          </div>
        </div>

        <section className="space-y-4">
          <h2 className="text-xl font-black text-white uppercase flex items-center gap-2 tracking-widest">
            <UserCheck className="w-5 h-5 text-blue-600" /> Information We
            Collect
          </h2>
          <p>
            The personal information that you are asked to provide, and the
            reasons why you are asked to provide it, will be made clear to you
            at the point we ask you to provide your personal information.
          </p>
          <ul className="text-sm space-y-2 list-inside list-disc text-neutral-400">
            <li>
              When you register for an Account, we may ask for your contact
              information, including items such as name and email address.
            </li>
            <li>
              If you contact us directly, we may receive additional information
              about you such as your name, email address, phone number, the
              contents of the message.
            </li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-black text-white uppercase tracking-widest">
            How we use your information
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 bg-neutral-900/20 border border-neutral-800 rounded-lg">
              Provide, operate, and maintain our website
            </div>
            <div className="p-4 bg-neutral-900/20 border border-neutral-800 rounded-lg">
              Improve, personalize, and expand our website
            </div>
            <div className="p-4 bg-neutral-900/20 border border-neutral-800 rounded-lg">
              Understand and analyze how you use our website
            </div>
            <div className="p-4 bg-neutral-900/20 border border-neutral-800 rounded-lg">
              Develop new products, services, features, and functionality
            </div>
          </div>
        </section>

        <div className="pt-8 border-t border-neutral-800 text-center">
          <p className="text-xs text-neutral-600 uppercase font-black tracking-widest">
            If you have additional questions or require more information about
            our Privacy Policy, do not hesitate to contact us at{" "}
            {siteConfig.contactEmail}.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
