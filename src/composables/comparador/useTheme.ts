import { ref, watchEffect, onMounted } from "vue";

// Verificar se está no navegador
const isBrowser = typeof window !== 'undefined';

const isDark = ref<boolean>(false);

// Inicializar o tema apenas no cliente
if (isBrowser) {
  isDark.value = localStorage.getItem("theme") === "dark" ||
    (!localStorage.getItem("theme") &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);
}

watchEffect(() => {
  if (!isBrowser) return;
  
  const html = document.documentElement;
  if (isDark.value) {
    html.classList.add("dark");
    localStorage.setItem("theme", "dark");
    return;
  }
  html.classList.remove("dark");
  localStorage.setItem("theme", "light");
});

export function useTheme() {
  function toggle() {
    isDark.value = !isDark.value;
  }
  return { isDark, toggle };
}
