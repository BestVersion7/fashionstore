"use client";
import Script from "next/script";

const GoogleAnalytics = () => {
    return (
        <>
            <Script
                src="https://www.googletagmanager.com/gtag/js?id=G-TL113B62L5"
                strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
                {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', 'G-TL113B62L5');
                `}
            </Script>
        </>
    );
};

export default GoogleAnalytics;
