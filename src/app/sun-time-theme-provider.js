'use client';

import { useEffect, useState } from 'react';

export default function SunTimeThemeProvider({ children }) {
  const [status, setStatus] = useState('Checking location...');
  const [theme, setTheme] = useState(null); // null = not ready

  useEffect(() => {
    const applyTheme = async (lat, lng) => {
      try {
        const res = await fetch(
          `https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lng}&formatted=0`
        );
        const data = await res.json();

        const sunriseUTC = new Date(data.results.sunrise);
        const sunsetUTC = new Date(data.results.sunset);
        const sunriseLocal = new Date(sunriseUTC.toLocaleString());
        const sunsetLocal = new Date(sunsetUTC.toLocaleString());
        const nowLocal = new Date();

        const isDark = nowLocal < sunriseLocal || nowLocal > sunsetLocal;

        if (isDark) {
          document.documentElement.classList.add('dark');
          setTheme('dark');
          setStatus('🌙 Dark mode (after sunset or before sunrise)');
        } else {
          document.documentElement.classList.remove('dark');
          setTheme('light');
          setStatus('☀️ Light mode (daytime)');
        }
      } catch (err) {
        console.error(err);
        setStatus('⚠️ Could not fetch sunrise/sunset data');
        document.documentElement.classList.remove('dark');
        setTheme('light');
      }
    };

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        applyTheme(latitude, longitude);
      },
      () => {
        setStatus('⚠️ Location denied. Defaulting to light mode.');
        document.documentElement.classList.remove('dark');
        setTheme('light');
      }
    );
  }, []);

  if (!theme) return null; // prevent hydration mismatch

  return <>{children}</>;
}
