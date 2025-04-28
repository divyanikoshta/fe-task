// 1.3 Function Composition & Closures
// Task:
// Implement a function composition utility compose(fns: Function[]) that chains multiple functions (either synchronous or asynchronous). The composed function should return a new function where the output of one function becomes the input to the next.

// Focus: 
// Closures, functional composition, type inference, generics, understanding of synchronous and asynchronous function chains.


function compose(fns: Function[]) {
    return async function (input: any): Promise<any> {
      let result = input;
      for (const fn of fns) {
        result = fn.constructor.name === 'AsyncFunction' ? await fn(result) : fn(result);
      }
      return result;
    };
  }
  