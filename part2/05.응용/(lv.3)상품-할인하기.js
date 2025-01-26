/**
 * [(lv.3)상품-할인하기.js]
 *
 * 1) calculateDiscount 함수는 상품 가격(price)과 쿠폰(coupon)을 입력받아 할인된 가격을 반환합니다.
 * 2) 쿠폰은 다음과 같은 형태로 입력받습니다:
 *    - { type: "percent", rate: 0.2 } => 20% 할인
 *    - { type: "fixed", amount: 1000 } => 1000원 할인
 * 3) 쿠폰이 없으면 할인 없이 원래 가격을 반환합니다.
 * 4) 가격은 0 이상이라고 가정합니다.
 *
 * @param {number} price
 * @param {{type:string, rate?:number, amount?:number}} coupon
 * @returns {number}
 */

function calculateDiscount(price, coupon) {
  if (
    !coupon ||
    coupon.length === 0 ||
    (coupon.type !== "percent" && coupon.type !== "fixed") ||
    (coupon.type === "percent" &&
      (coupon.rate === undefined || coupon.rate <= 0)) || // rate가 없는 경우
    (coupon.type === "fixed" &&
      (coupon.amount === undefined || coupon.amount <= 0)) // amount가 없는 경우
  ) {
    return price; // 할인 적용 없음
  }

  // percent 타입 쿠폰 처리
  if (coupon.type === "percent") {
    return price * (1 - coupon.rate);
  }

  // fixed 타입 쿠폰 처리
  if (coupon.type === "fixed") {
    return price - coupon.amount > 0 ? price - coupon.amount : 0;
  }

  // 기본값 반환
  return price;
}

// export 를 수정하지 마세요.
export { calculateDiscount };
