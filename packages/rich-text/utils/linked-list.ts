// export class ListNode<T> {
//   value: T;
//   next: ListNode<T> | null;
//   prev: ListNode<T> | null;

//   constructor(value: T) {
//     this.value = value;
//     this.next = null;
//     this.prev = null;
//   }
// }

// export class LinkedList<T> {
//   head: ListNode<T> | null;

//   constructor() {
//     this.head = null;
//   }

//   // Add a node to the beginning of the list
// //   prepend(value: T): void {
// //     const newNode = new ListNode(value);
// //     newNode.next = this.head;
// //     this.head = newNode;
// //   }

//   // Add a node to the end of the list
//   append(value: T): void {
//     const newNode = new ListNode(value);

//     if (!this.head) {
//       this.head = newNode;
//       return;
//     }

//     let current = this.head;
//     while (current.next) {
//       current = current.next;
//     }
//     current.next = newNode;
//   }

//   // Remove a node with a specific value
//   remove(value: T): void {
//     if (!this.head) {
//       return;
//     }

//     if (this.head.value === value) {
//       this.head = this.head.next;
//       return;
//     }

//     let current = this.head;
//     while (current.next) {
//       if (current.next.value === value) {
//         current.next = current.next.next;
//         return;
//       }
//       current = current.next;
//     }
//   }

//   // Print the linked list
//   print(): void {
//     let current = this.head;
//     let output = '';
//     while (current) {
//       output += `${current.value} -> `;
//       current = current.next;
//     }
//     console.log(`${output}null`);
//   }

//   size(): number {
//     return this.traverse().length;
//   }
//   traverse(): T[] {
//     const array: T[] = [];
//     if (!this.head) {
//       return array;
//     }

//     const addToArray = (node: ListNode<T>): T[] => {
//       array.push(node.value);
//       return node.next ? addToArray(node.next) : array;
//     };
//     return addToArray(this.head);
//   }
// }

export class ListNode<T> {
  value: T;
  next: ListNode<T> | null;
  prev: ListNode<T> | null;

  constructor(value: T) {
    this.value = value;
    this.next = null;
    this.prev = null;
  }
}

export class LinkedList<T> {
  head: ListNode<T> | null = null;

  append(data: T): ListNode<T> {
    const node = new ListNode(data);
    if (this.head) {
      const getLast = (node: ListNode<T>): ListNode<T> => {
        return node.next ? getLast(node.next) : node;
      };

      const lastNode = getLast(this.head);
      node.prev = lastNode;
      lastNode.next = node;
    } else {
      this.head = node;
    }
    return node;
  }

  //   insertInBegin(data: T): ListNode<T> {
  //     const node = new ListNode(data);
  //     if (this.head) {
  //       this.head.prev = node;
  //       node.next = this.head;
  //       this.head = node;
  //     } else {
  //       this.head = node;
  //     }
  //     return node;
  //   }

  deleteNode(node: ListNode<T>): void {
    if (node.prev) {
      const prevNode = node.prev;
      prevNode.next = node.next;
    } else {
      this.head = node.next;
    }
  }

  search(comparator: (data: T) => boolean): ListNode<T> | null {
    const checkNext = (node: ListNode<T>): ListNode<T> | null => {
      if (comparator(node.value)) {
        return node;
      }
      return node.next ? checkNext(node.next) : null;
    };

    return this.head ? checkNext(this.head) : null;
  }

  traverse(): T[] {
    const array: T[] = [];
    if (!this.head) {
      return array;
    }

    const addToArray = (node: ListNode<T>): T[] => {
      array.push(node.value);
      return node.next ? addToArray(node.next) : array;
    };
    return addToArray(this.head);
  }

  size(): number {
    return this.traverse().length;
  }
}
