/**
 * [(lv.5)api-요청-제한기.js]
 *
 * 1) createRateLimiter 함수를 작성하세요.
 * 2) 주어진 시간(timeWindow) 내에 최대 maxRequests번까지 요청을 처리해야 합니다.
 * 3) 요청이 제한을 초과하면, 큐에 대기시켰다가 순차적으로 처리하세요.
 * 4) 모든 요청은 Promise로 처리되어야 합니다.
 *
 * 힌트:
 * 1. 큐를 사용하여 대기 중인 요청을 관리하세요
 * 2. 요청 시간을 기록하여 timeWindow 내의 요청 수를 추적하세요
 * 3. setTimeout을 활용하여 제한된 요청을 지연 실행하세요
 * 4. Promise를 사용하여 비동기 처리를 구현하세요
 *
 * 예시:
 * const rateLimitedRequest = createRateLimiter(2, 1000); // 1초에 최대 2개 요청
 *
 * // 동시에 3개 요청
 * Promise.all([
 *   rateLimitedRequest(() => fetch('/api/1')), // 즉시 실행
 *   rateLimitedRequest(() => fetch('/api/2')), // 즉시 실행
 *   rateLimitedRequest(() => fetch('/api/3'))  // 1초 후 실행
 * ]);
 *
 * @param {number} maxRequests - 최대 허용 요청 수
 * @param {number} timeWindow - 시간 윈도우 (ms)
 * @returns {(fn: () => Promise<any>) => Promise<any>}
 */

function createRateLimiter(maxRequests, timeWindow) {
  const queue = [];
  const requestTimes = [];

  // 큐에서 다음 작업을 처리하는 함수
  function processQueue() {
    // 현재 시점에서 timeWindow보다 오래된 요청 시간들을 제거
    const now = Date.now();
    while (requestTimes.length > 0 && now - requestTimes[0] > timeWindow) {
      requestTimes.shift();
    }

    // 큐에 작업이 있고, 현재 실행 중인 요청이 maxRequests보다 적으면
    while (queue.length > 0 && requestTimes.length < maxRequests) {
      const { task, resolve, reject } = queue.shift();
      executeTask(task).then(resolve).catch(reject);
    }
  }

  // 실제 작업을 실행하는 함수
  async function executeTask(task) {
    requestTimes.push(Date.now());
    try {
      return await task();
    } finally {
      // timeWindow가 지난 후에 큐 처리
      setTimeout(processQueue, timeWindow);
    }
  }

  // 반환되는 rate limiter 함수
  return function rateLimited(task) {
    return new Promise((resolve, reject) => {
      const now = Date.now();

      // timeWindow보다 오래된 요청 시간들을 제거
      while (requestTimes.length > 0 && now - requestTimes[0] > timeWindow) {
        requestTimes.shift();
      }

      // 현재 실행 중인 요청이 maxRequests보다 적으면 바로 실행
      if (requestTimes.length < maxRequests) {
        executeTask(task).then(resolve).catch(reject);
      } else {
        // 그렇지 않으면 큐에 추가
        queue.push({ task, resolve, reject });
      }
    });
  };
}

// export 를 수정하지 마세요.
export { createRateLimiter };
