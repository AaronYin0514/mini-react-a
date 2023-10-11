import {
  updateClassComponent,
  updateFragmentComponent,
  updateFunctionComponent,
  updateHostComponent,
  updateHostTextComponent,
} from "./ReactFiberReconciler";
import {
  ClassComponent,
  Fragment,
  FunctionComponent,
  HostComponent,
  HostText,
} from "./ReactWorkTags";
import { Placement, Update, updateNode } from "./utils";
import { scheduleCallback } from "./scheduler";

let wip = null; // work in progress
let wipRoot = null;

export function scheduleUpdateOnFiber(fiber) {
  wip = fiber;
  wipRoot = fiber;

  scheduleCallback(workLoop);
}

export function performUnitWork() {
  // todo 1. 执行当前任务wip
  // 判断wip是什么类型的组件
  console.log(wip);
  const { tag } = wip;
  switch (tag) {
    case HostComponent:
      // 原生标签
      updateHostComponent(wip);
      break;
    case FunctionComponent:
      updateFunctionComponent(wip);
      break;
    case ClassComponent:
      updateClassComponent(wip);
      break;
    case Fragment:
      updateFragmentComponent(wip);
      break;
    case HostText:
      updateHostTextComponent(wip);
      break;
    default:
      break;
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

function workLoop() {
  while (wip) {
    performUnitWork();
  }

  if (!wip && wipRoot) {
    commitRoot();
  }
}

// requestIdleCallback(workLoop);

function commitRoot() {
  commitWorker(wipRoot);
  wipRoot = null;
}

function commitWorker(wip) {
  if (!wip) return;
  // 1 更新自己
  const { flags, stateNode } = wip;

  let parentNode = getParentNode(wip.return);
  if (flags & Placement && stateNode) {
    parentNode.appendChild(stateNode);
  }

  if (flags & Update && stateNode) {
    // 更新属性
    updateNode(stateNode, wip.alternate.props, wip.props);
  }

  if (wip.deletions) {
    // 删除wip子节点
    commitDeletion(wip.deletions, stateNode || parentNode);
  }

  // 2 更新子节点
  commitWorker(wip.child);
  // 3 更新兄弟节点
  commitWorker(wip.sibling);
}

function getParentNode(wip) {
  let tem = wip;
  while (tem) {
    if (tem.stateNode) {
      return tem.stateNode;
    }
    tem = tem.return;
  }
}

function commitDeletion(deletions, parentNode) {
  for (let i = 0; i < deletions.length; i++) {
    parentNode.removeChild(getStateNode(deletions[i]));
  }
}

function getStateNode(fiber) {
  let tem = fiber;
  while (!tem.stateNode) {
    tem = tem.child;
  }
  return tem.stateNode;
}
