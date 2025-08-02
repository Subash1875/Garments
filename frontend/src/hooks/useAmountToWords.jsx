const ones = [
  "",
  "One",
  "Two",
  "Three",
  "Four",
  "Five",
  "Six",
  "Seven",
  "Eight",
  "Nine",
];
const teens = [
  "Ten",
  "Eleven",
  "Twelve",
  "Thirteen",
  "Fourteen",
  "Fifteen",
  "Sixteen",
  "Seventeen",
  "Eighteen",
  "Nineteen",
];
const tens = [
  "",
  "",
  "Twenty",
  "Thirty",
  "Forty",
  "Fifty",
  "Sixty",
  "Seventy",
  "Eighty",
  "Ninety",
];

function numberToWords(num) {
  if (num === 0) return "Zero";

  let words = "";

  if (num >= 100000) {
    words += numberToWords(Math.floor(num / 100000)) + " Lakh ";
    num %= 100000;
  }

  if (num >= 1000) {
    words += numberToWords(Math.floor(num / 1000)) + " Thousand ";
    num %= 1000;
  }

  if (num >= 100) {
    words += numberToWords(Math.floor(num / 100)) + " Hundred ";
    num %= 100;
  }

  if (num > 0) {
    if (words !== "") words += "and ";

    if (num < 10) words += ones[num];
    else if (num < 20) words += teens[num - 10];
    else {
      words += tens[Math.floor(num / 10)];
      if (num % 10 > 0) words += "-" + ones[num % 10];
    }
  }

  return words.trim();
}

export default numberToWords;
