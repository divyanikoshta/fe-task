// 1.1 Async Programming & Event Loop

// Task: 
// Implement a function schedule(fn, delay) that:
// Ensures fn is executed after a given delay while respecting a rate limit: no more than N executions in a rolling 1-second window.

// Focus:
// Async execution, event loop behavior, and Promises. Demonstrate understanding of task/microtask queues and rate-limiting concepts.


type Task = {
  		fn: () => void;
		delay: number;
		timestamp: number;
	};

class Scheduler {
  private taskQueue: Task[] = [];
  private executedTimestamps: number[] = [];
  private rateLimit: number;

  constructor(rateLimit: number) {
    this.rateLimit = rateLimit;
  }

  schedule(fn: () => void, delay: number): void {
    const task: Task = {
      fn,
      delay,
      timestamp: Date.now() + delay
    };

    this.taskQueue.push(task);
    setTimeout(() => this.tryExecute(task), delay);
  }

  private tryExecute(task: Task) {
    const now = Date.now();
    this.executedTimestamps = this.executedTimestamps.filter(
      ts => now - ts < 1000
    );

    if (this.executedTimestamps.length < this.rateLimit) {
      task.fn();
      this.executedTimestamps.push(now);
    } else {
      // Reschedule until there's a slot
      setTimeout(() => this.tryExecute(task), 50);
    }
  }
}

// Example usage:
const scheduler = new Scheduler(3); // No more than 3 calls/sec
for (let i = 0; i < 10; i++) {
  scheduler.schedule(() => console.log(`Executed ${i} at ${Date.now()}`), i * 100);
}