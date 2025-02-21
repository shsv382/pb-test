type Period = { years: number, months: number, days: number }

export function getDateDifference(startDate: Date, endDate: Date): Period | null {
    if (startDate > endDate) {
      return null
    }
  
    let years = endDate.getFullYear() - startDate.getFullYear();
    let months = endDate.getMonth() - startDate.getMonth();
    let days = endDate.getDate() - startDate.getDate();
  
    if (days < 0) {
      months--;
      const lastDayOfMonth = new Date(endDate.getFullYear(), endDate.getMonth(), 0).getDate();
      days += lastDayOfMonth;
    }
  
    if (months < 0) {
      years--;
      months += 12;
    }

    return {
      years, months, days
    }
}

export function getPeriodInWords(startDate: Date, endDate: Date): string {
  const period = getDateDifference(startDate, endDate)
  if (!period) return ''
  const yearsWord = datePluralize(period.years, ["год", "года", "лет"]);
  const monthsWord = datePluralize(period.months, ["месяц", "месяца", "месяцев"]);
  const daysWord = datePluralize(period.days, ["день", "дня", "дней"]);
  
  return `${period.years} ${yearsWord}, ${period.months} ${monthsWord}, ${period.days} ${daysWord}`;
}

export function datePluralize(count: number, words: [string, string, string]): string {
  const cases = [2, 0, 1, 1, 1, 2];
  return words[count % 100 > 4 && count % 100 < 20 ? 2 : cases[Math.min(count % 10, 5)]];
}

export function calculateAverageAge(dates: Date[]): number {
    const today = new Date();
    const ages = dates.map(oldDate => {
      const age = today.getFullYear() - new Date(oldDate).getFullYear();
      
      const hasHadBirthdayThisYear =
        today.getMonth() > new Date(oldDate).getMonth() ||
        (today.getMonth() === new Date(oldDate).getMonth() && today.getDate() >= new Date(oldDate).getDate());
  
      return hasHadBirthdayThisYear ? age : age - 1;
    });
  
    const averageAge = ages.reduce((sum, age) => sum + age, 0) / ages.length;
    return averageAge;
}