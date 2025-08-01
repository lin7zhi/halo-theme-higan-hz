import "@purge-icons/generated";
import "../../tmp/styles/theme.css";
import "../styles/main.css";
import "../styles/tailwind.css";
// 导入类型定义（仅类型导入，不会在运行时包含。包含了自定义 window 扩展）
import type {} from "../types/window-common";

// 使此文件成为模块
export {};

// 检查元素是否可见
window.isVisible = (element: HTMLElement | null): boolean => {
  if (!element) {
    return false;
  }
  const style = window.getComputedStyle(element);

  // 基本可见性检查
  if (style.display === "none" || style.visibility === "hidden") {
    return false;
  }

  // 对于 position: fixed 的元素，offsetParent 会是 null，但这不意味着不可见
  // 我们需要额外检查元素的位置属性
  if (element.offsetParent === null) {
    // 如果元素是 position: fixed，我们认为它是可见的（只要 display 和 visibility 没问题）
    if (style.position === "fixed") {
      return true;
    }

    // 如果元素或其父元素有 transform 属性，offsetParent 也可能为 null
    // 在这种情况下，我们检查元素的尺寸和位置
    const rect = element.getBoundingClientRect();
    if (rect.width > 0 && rect.height > 0) {
      return true;
    }

    // 其他情况下，offsetParent 为 null 通常意味着不可见
    return false;
  }

  return true;
};
