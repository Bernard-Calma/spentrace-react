export const loadDemoState = () => {
  try {
    const data = localStorage.getItem("demo-state");
    return data ? JSON.parse(data) : undefined;
  } catch (err) {
    console.warn("LocalStorage load failed:", err);
    return undefined;
  }
};

export const saveDemoState = (state) => {
  try {
    localStorage.setItem("demo-state", JSON.stringify(state));
  } catch (err) {
    console.warn("LocalStorage save failed:", err);
  }
};

export const clearDemoState = () => {
  localStorage.removeItem("demo-state");
  console.log("Demo state cleared from localStorage");
};
