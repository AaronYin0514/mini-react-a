import { updateClassComponent, updateFunctionComponent, updateHostComponent } from "./ReactFiberReconciler";
import { isFn, isStr } from "./utils";

let wip = null; // work in progress
let wipRoot = null;

export function scheduleUpdateOnFiber(fiber) {
  wip = fiber;
  wipRoot = fiber;
}

export function performUnitWork() {
  // todo 1. 执行当前任务wip
  // 判断wip是什么类型的组件
  const { type } = wip;
  if (isStr(type)) {
    // 原生标签
    updateHostComponent(wip)
  } else if (isFn(wip)) {
    type.prototype.isReactComponent ? updateClassComponent(wip) : updateFunctionComponent(wip);
  }
  // todo 2. 更新wip
  // 深度优先遍历
  if (wip.child) {
    wip = wip.child;
    return;
  }
  let next = wip;
  while (next) {
    if (next.sibling) {
      wip = next.sibling;
      return;
    }
    next = next.return;
  }
  wip = null;
}