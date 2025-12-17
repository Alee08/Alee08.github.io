(() => {
  const storageKey = "theme";
  const root = document.documentElement;
  const mediaQuery =
    window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)");

  function getStoredTheme() {
    try {
      const value = localStorage.getItem(storageKey);
      return value === "light" || value === "dark" ? value : null;
    } catch {
      return null;
    }
  }

  function setStoredTheme(theme) {
    try {
      if (theme) {
        localStorage.setItem(storageKey, theme);
      } else {
        localStorage.removeItem(storageKey);
      }
    } catch {
      // Ignore.
    }
  }

  function getSystemTheme() {
    if (!mediaQuery) return "light";
    return mediaQuery.matches ? "dark" : "light";
  }

  function getActiveTheme() {
    return root.dataset.theme === "dark" || root.dataset.theme === "light"
      ? root.dataset.theme
      : getStoredTheme() || getSystemTheme();
  }

  function applyTheme(theme) {
    root.dataset.theme = theme;
  }

  function updateToggleButton(button) {
    if (!button) return;
    const activeTheme = getActiveTheme();
    const nextTheme = activeTheme === "dark" ? "light" : "dark";
    button.setAttribute("aria-label", `Switch to ${nextTheme} mode`);
    button.setAttribute("title", `Switch to ${nextTheme} mode`);
  }

  function onToggleClick(event) {
    const button = event?.currentTarget;
    const nextTheme = getActiveTheme() === "dark" ? "light" : "dark";
    applyTheme(nextTheme);
    setStoredTheme(nextTheme);
    updateToggleButton(button);
  }

  function onSystemThemeChange() {
    if (getStoredTheme()) return;
    const systemTheme = getSystemTheme();
    applyTheme(systemTheme);
    updateToggleButton(document.getElementById("theme-toggle"));
  }

  document.addEventListener("DOMContentLoaded", () => {
    const toggleButton = document.getElementById("theme-toggle");
    updateToggleButton(toggleButton);
    toggleButton?.addEventListener("click", onToggleClick);
  });

  if (mediaQuery) {
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", onSystemThemeChange);
    } else if (mediaQuery.addListener) {
      mediaQuery.addListener(onSystemThemeChange);
    }
  }
})();

