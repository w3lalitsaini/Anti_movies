import { useEffect, useRef } from "react";
import siteConfig from "../config/siteConfig";

const AdSense = ({ slot, format = "auto", className = "" }) => {
  const adRef = useRef(null);

  useEffect(() => {
    if (!window.adsbygoogle) return;

    try {
      if (
        adRef.current &&
        !adRef.current.hasAttribute("data-adsbygoogle-status")
      ) {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (err) {
      console.error("AdSense error:", err);
    }
  }, []);

  return (
    <div className={`my-8 text-center ${className}`}>
      <span className="text-[8px] text-neutral-600 uppercase tracking-widest block mb-1">
        Advertisement
      </span>

      <ins
        ref={adRef}
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
