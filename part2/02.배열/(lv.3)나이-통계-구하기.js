/**
 * [(lv.3)나이-통계-구하기.js]
 *
 * 1) users 배열은 [{ age: 10 }, { age: 30 }, ...] 형태를 가집니다.
 * 2) calculateStatistics(users)는 평균 나이(averageAge)와 최대 나이(maxAge)를 구해서
 *    { averageAge, maxAge } 객체 형태로 반환해야 합니다.
 * 3) reduce 메서드를 사용하세요.
 *
 * @param {{age:number}[]} users
 * @returns {{ averageAge: number, maxAge: number }}
 */

function calculateStatistics(users) {
  return users.length > 0
    ? users.reduce(
        (acc, cur, i) => {
          acc.sumAge += cur.age;
          acc.maxAge = cur.age ? Math.max(acc.maxAge, cur.age) : 0;
          if (i === users.length - 1) {
            acc.averageAge = acc.sumAge / users.length;
          }
          return acc;
        },
        { averageAge: 0, sumAge: 0, maxAge: -Infinity }
      )
    : { averageAge: 0, maxAge: 0 };
}

// export 를 수정하지 마세요.
export { calculateStatistics };
