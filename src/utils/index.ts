export const getGrade = (temperature: number, ph: number) => {
  if (temperature > 20) {
    return "C";
  } else if (temperature > 10) {
    return "B";
  } else {
    return "A";
  }
};
