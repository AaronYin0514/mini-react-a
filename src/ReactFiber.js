import {
  ClassComponent,
  FunctionComponent,
  HostComponent,
  HostText,
  Fragment,
} from "./ReactWorkTags";
import { Placement, isFn, isStr, isUndefined } from "./utils";

export default function createFiber(vnode, returnFiber) {
  const fiber = {
    // 类型
    type: vnode.type,
    key: vnode.key,
    // 属性
    props: vnode.props,
    // 原生标签时候指dom节点，类组件时候指的是实例
    // 不同类型的组件， stateNode也不同
    // 原生标签 dom节点
    // class 实例
    stateNode: null, 
    child: null, // 第一个子fiber
    sibling: null, // 下一个兄弟fiber
    return: returnFiber, // 父fiber
    flags: Placement,
    
    // 老节点 old fiber
    alternate: null,
    
    deletions: null, // 要删除子节点 null或者[]
    index: null, //当前层级下的下标，从0开始

    // 函数组件存的是hook0
    memorizedState: null,
  };

  const { type } = vnode;

  if (isStr(type)) {
    fiber.tag = HostComponent;
  } else if (isFn(type)) {
    fiber.tag = type.prototype.isReactComponent
      ? ClassComponent
      : FunctionComponent;
  } else if (isUndefined(type)) {
    fiber.tag = HostText;
    fiber.props = { children: vnode };
  } else {
    fiber.tag = Fragment;
  }

  return fiber;
}
