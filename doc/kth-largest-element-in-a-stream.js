/**
 * 数据流中第K大元素
*/

var KthLargest = function (k, nums) {
  this.k = k;
  // 这个最小堆只有k个元素
  this.heap = new MinHeap();

  for (const node of nums) {
    this.add(node)
  }
}

KthLargest.prototype.add = function (node) {
  this.heap.push(node)

  if (this.heap.size() > this.k) {
    this.heap.pop()
  }

  console.log(this.heap.peak())
}

class MinHeap {
  constructor() {
    this.data = [];
  }

  size() {
    return this.data.length;
  }

  compare(a, b) {
    return a - b;
  }

  // 获取最小堆的最小值
  peak() {
    return this.size() === 0 ? null : this.data[0];
  }

  // 添加新元素进最小堆
  push(node) {
    this.data.push(node)
    this.siftUp(node, this.size() -1)
  }

  siftUp(node, i) {
    let index = i
    while (index > 0) {
      const parentIndex = (index - 1) >> 1;
      const parent = this.data[parentIndex];
      if (this.compare(node, parent) < 0) {
        this.swap(index, parentIndex);
        index = parentIndex;
      } else {
        break;
      }
    }
  }

  siftDown(node, i) {
    let index = i;
    const length = this.size();
    const halfLength = length >> 1;
    while (index < halfLength) {
      const leftIndex = (index + 1) * 2 - 1;
      const rightIndex = leftIndex + 1;
      if (this.compare(this.data[leftIndex], node) < 0) {
        // left < node
        // right? left
        if (rightIndex < length && this.compare(this.data[rightIndex], this.data[leftIndex]) < 0) {
          // right最小
          this.swap(rightIndex, index);
          index = rightIndex;
        } else {
          // left最小
          this.swap(leftIndex, index);
          index = leftIndex;
        }
      } else if (rightIndex < length && this.compare(this.data[rightIndex], node) < 0) {
        // right最小
        this.swap(rightIndex, index);
        index = rightIndex;
      } else {
        break;
      }
    }
  }

  swap(index1, index2) {
    [this.data[index1], [this.data[index2]]] = [this.data[index2], [this.data[index1]]]
  }

  // 删除堆顶元素
  pop() {
    if (this.size() === 0) return null;
    const first = this.data[0];
    const last = this.data.pop();
    if (this.size() !== 0) {
      this.data[0] = last;
    }
    this.siftDown(last, 0);
  }
}

const k = new KthLargest(3, [4, 5, 8, 2]);
k.add(3);
k.add(5);
k.add(10);
k.add(9);
k.add(4);