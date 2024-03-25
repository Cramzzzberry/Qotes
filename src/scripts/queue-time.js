export default class Queue {
  constructor(maxLength) {
    this.queue = [];
    this.maxLength = maxLength;
    this.id = 0;
  }

  enqueue(message, timeLimit) {
    let id = this.id++;
    this.queue.push({ message, timeLimit, id });

    if (this.queue.length > this.maxLength) {
      this.queue.shift();
    }

    setTimeout(() => {
      this.queue.shift();
      if (this.queue.length === 0) {
        this.id = 0;
      }
    }, timeLimit);
  }

  getQueue() {
    return this.queue;
  }
}
