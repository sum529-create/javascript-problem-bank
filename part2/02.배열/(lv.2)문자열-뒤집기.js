/**
 * [(lv.2)문자열-뒤집기.js]
 *
 * reverseString 함수를 작성하세요.
 * - 문자열이 아니라면 빈 문자열을 반환하세요.
 * - 반복문을 사용하여 입력받은 문자열을 뒤집어 반환하세요.
 *
 * @param {string} str
 * @returns {string}
 */

function reverseString(str) {
  if (typeof str === "string" && str.length > 0) {
    const arr = [...str];
    let temp = "";
    for (let i = arr.length - 1; i >= 0; i--) {
      temp += arr[i];
    }
    return temp;
  }
  return "";
}

// export 를 수정하지 마세요.
export { reverseString };
