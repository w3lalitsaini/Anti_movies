import React, { useEffect } from "react";
import siteConfig from "../config/siteConfig";

const AdSense = ({ slot, format = "auto", className = "" }) => {
  if (!siteConfig.ads.enabled) return null;

  React.useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error("AdSense error:", e);
    }
  }, []);

  return (
    <div
      className={`adsense-placeholder my-8 p-1 bg-neutral-900/10 border border-neutral-800/50 rounded-lg text-center ${className}`}
    >
      <span className="text-[8px] text-neutral-600 uppercase tracking-widest block mb-1">
        Advertisement
      </span>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={siteConfig.ads.client}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
};

export default AdSense;
