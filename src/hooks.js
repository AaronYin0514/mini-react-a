import { scheduleUpdateOnFiber } from "./ReactFiberWorkLoop";

let currentlyRenderingFiber = null;
let workInProgressHook = null;

// 老hook
// let currentHook = null;

export function renderWithHooks(wip) {
  currentlyRenderingFiber = wip;
  currentlyRenderingFiber.memorizedState = null;
  workInProgressHook = null;
}

function updateWorkInProgressHook() {
  let hook;

  const current = currentlyRenderingFiber.alternate;
  if (current) {
    // 组件更新
    currentlyRenderingFiber.memorizedState = current.memorizedState;
    if (workInProgressHook) {
      workInProgressHook = hook = workInProgressHook.next;
      // currentHook = currentHook.next;
    } else {
      // hook0
      workInProgressHook = hook = currentlyRenderingFiber.memorizedState;
      // currentHook = current.memorizedState;
    }
  } else {
    // 组件初次渲染
    // currentHook = null;

    hook = {
      memorizedState: null, // state effect
      next: null, // 下一个hook
    };
    if (workInProgressHook) {
      workInProgressHook = workInProgressHook.next = hook;
    } else {
      // hook0
      workInProgressHook = currentlyRenderingFiber.memorizedState = hook;
    }
  }
  return hook;
}

export function useReducer(reducer, initalState) {
  let hook = updateWorkInProgressHook();

  if (!currentlyRenderingFiber.alternate) {
    // 初次渲染
    hook.memorizedState = initalState;
  }

  const dispatch = dispatchReducerAction.bind(
    null,
    currentlyRenderingFiber,
    hook,
    reducer
  );
  return [hook.memorizedState, dispatch];
}

function dispatchReducerAction(fiber, hook, reducer, action) {
  hook.memorizedState = reducer ? reducer(hook.memorizedState) : action;
  fiber.alternate = { ...fiber };
  fiber.sibling = null;
  scheduleUpdateOnFiber(fiber);
}
