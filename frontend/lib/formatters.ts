const DATE_FORMATTER = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "short",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit"
});

export function formatDateFromString(dateString: string) {
  const date = new Date(dateString);
  return DATE_FORMATTER.format(date);
}

export function formatISBN(isbn: string) {
  isbn = isbn.replace(/[^\d]/g, '');

  if (isbn.length !== 13) {
      return "Invalid ISBN";
  }

  return isbn.slice(0, 3) + '-' + isbn.slice(3, 5) + '-' + isbn.slice(5, 9) + '-' + isbn.slice(9, 12) + '-' + isbn.slice(12);
}

  
  const CURRENCY_FORMATTER = new Intl.NumberFormat("en-IN", {
    currency: "INR",
    style: "currency",
    minimumFractionDigits: 0
  });
  
  export function formatCurrency(amount: number) {
    return CURRENCY_FORMATTER.format(amount);
  }
  
  
  const NUMBER_FORMATTER = new Intl.NumberFormat("en-US");
  
  export function formatNumber(number: number) {
    return NUMBER_FORMATTER.format(number);
  }
  