(function () {
  const btn = document.getElementById("themeToggle");
  const prefersDark =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;
  const saved = localStorage.getItem("theme");
  const isDark = saved ? saved === "dark" : prefersDark;
  const root = document.documentElement;

  function apply(dark) {
    root.classList.toggle("dark", dark);
    if (btn) btn.textContent = dark ? "☀️" : "🌙";
    if (btn) btn.title = dark ? "Switch to light mode" : "Switch to dark mode";
  }

  apply(isDark);

  if (btn)
    btn.addEventListener("click", function () {
      const darkNow = !root.classList.contains("dark");
      localStorage.setItem("theme", darkNow ? "dark" : "light");
      apply(darkNow);
    });
})();
