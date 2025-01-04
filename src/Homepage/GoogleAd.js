import React, { useEffect } from 'react';

const AdComponent = () => {
  useEffect(() => {
    // Dynamically load the Google AdSense script if it's not already loaded
    if (!window.adsbygoogle) {
      const script = document.createElement('script');
      script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js'; // Correct AdSense script URL
      script.async = true;
      script.crossOrigin = 'anonymous';
      script.onload = () => {
        // Initialize the AdSense ads after the script has loaded
        try {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (e) {
          console.error('AdSense error:', e);
        }
      };
      document.head.appendChild(script);

      // Cleanup to remove script if the component unmounts
      return () => {
        document.head.removeChild(script);
      };
    }
  }, []); // Only run once when the component mounts

  return (
    <>
      {/* AdSense Manual Ad Unit */}
      <ins
        className="adsbygoogle"  
        style={{ display: "block" }}  
        data-ad-format="fluid"
        data-ad-layout-key="-fb+5w+4e-db+86"
        data-ad-client="ca-pub-7439051765477438"
        data-ad-slot="2607278239"></ins>
    </>
  );
};

export default AdComponent;
