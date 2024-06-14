export const getGrade = (ph: number) => {
  if (ph >= 4.5) {
    if (ph < 5) {
      return "A (Tinggi)";
    } else if (ph < 5.5) {
      return "B (Sedang)";
    } else if (ph <= 7) {
      return "C (Rendah)";
    } else {
      return "-";
    }
  } else {
    return "-";
  }
};
