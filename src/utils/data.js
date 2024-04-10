export const level = [100];
export const semester = ["first", "second"];

export const getCourses = (level, semester) => {
  if (level === 100 && semester === "first") {
    return [
      "All",
      "ZLY111",
      "FSC111",
      "FSC112",
      "FSC113",
      "FSC114",
      "FSC115",
      "GST102",
      "GST105",
    ];
  } else {
    return [];
  }
};

export const getTopics = (course) => {
  switch (course) {
    case "All":
      return ["All"];
    case "FSC112":
      return ["Acid and Base", "Organic Chemistry"];
    case "FSC115":
      return ["Scalars and Vectors", "Kinematics"];
    default:
      return [];
  }
};
