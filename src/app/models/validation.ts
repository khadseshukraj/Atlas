export enum ValidationPatterns {
  twoNumberThreeDecimal = '^\\d{1,2}(\\.\\d{1,3})?$',
  threeNumberThreeDecimal = '^\\d{1,3}(\\.\\d{1,3})?$',
  threeNumberThreeDecimalWithNegative = '^\\-?\\d{1,3}(\\.\\d{1,3})?$',
  percentage = '(^100(\\.0{1,2})?$)|(^([1-9](\\d)?|0)(\\.\\d{1,2})?$)'
}