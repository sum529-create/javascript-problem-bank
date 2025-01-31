/**
 * [(lv.4)복잡한-데이터-필터링.js]
 *
 * filterComplexData 함수는 아래 형태의 복잡한 객체 배열을 입력받습니다:
 * [
 *   {
 *     id: 1,
 *     tags: ["React", "JavaScript"],
 *     info: { likes: 100, active: true },
 *   },
 *   {
 *     id: 2,
 *     tags: ["Node.js", "TypeScript"],
 *     info: { likes: 50, active: false },
 *   },
 *   ...
 * ]
 *
 * 두 번째 파라미터로 조건 객체(conditions)를 받습니다.
 * 조건 객체의 키는 'tags'처럼 배열 요소를 요구할 수도 있고,
 * "info.active"처럼 중첩된 프로퍼티를 '.' 문법으로 가리킬 수도 있습니다.
 *
 * 조건에 맞는 데이터만 필터링하여 반환하세요.
 * - 예: { tags: "JavaScript", "info.active": true }
 *   => tags 배열에 "JavaScript"를 포함하고, info.active가 true 인 요소만 반환
 *
 * @param {{
 *   id: number,
 *   tags: string[],
 *   info: {
 *     likes: number,
 *     active: boolean
 *   }
 * }[]} data
 * @param {Object} conditions
 * @returns {Array}
 */

function filterComplexData(data, conditions) {
  let filterArr = [];
  for (let i of data) {
    const hasTags = conditions.tags && i.tags.includes(conditions.tags);
    const hasActive =
      conditions["info.active"] && conditions["info.active"] === i.info.active;
    if (conditions.tags && conditions["info.active"]) {
      if (hasTags && hasActive) filterArr.push(i);
    } else if (conditions.tags) {
      if (hasTags) filterArr.push(i);
    } else if (conditions["info.active"]) {
      if (hasActive) filterArr.push(i);
    } else if (!conditions.tags && !conditions["info.active"]) {
      filterArr = data;
    }
  }
  return filterArr;
}

export { filterComplexData };
