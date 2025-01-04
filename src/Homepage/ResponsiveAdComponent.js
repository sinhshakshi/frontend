import React, { useEffect } from 'react';

const ResponsiveAdComponent = () => {
  useEffect(() => {
    // Dynamically load the Google AdSense script if it's not already loaded
    if (!window.adsbygoogle) {
      const script = document.createElement('script');
      script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7439051765477438'; // AdSense script URL
      script.async = true;
      script.crossOrigin = 'anonymous';
      script.onload = () => {
        // Initialize the AdSense ads after the script has loaded
        try {
          // Push the ad to the adsbygoogle array if it's not already pushed
          if (window.adsbygoogle && !document.querySelector('.adsbygoogle').hasAttribute('data-ad-slot')) {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
          }
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
    <div>
      {/* Second Responsive AdSense Manual Ad Unit */}
      <ins
        className="adsbygoogle"
        style={{ display: "block", marginTop: "2%", marginBottom: "2%" }} 
        data-ad-client="ca-pub-7439051765477438"
        data-ad-slot="8071357905"
        data-ad-format="auto"
        data-full-width-responsive="true"></ins>
    
    </div>
  );
};

export default ResponsiveAdComponent;
