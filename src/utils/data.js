export const level = [100, 200];
export const semester = ["first", "second"];

export const getCourses = (level, semester) => {
  if (level === 100 && semester === "first") {
    return [
      "ZLY111",
      "FSC111",
      "FSC112",
      "FSC113",
      "FSC114",
      "FSC115",
      "GST102",
      "GST105",
    ];
  } else if (level === 100 && semester === "second") {
    return [
      "CHM121",
      "ZLY121",
      "PHY121",
      "PHY122",
      "MIC121",
      "BTN121",
      "MSF121",
      "GST103",
    ];
  } else {
    return [];
  }
};

export const getTopics = (course) => {
  switch (course) {
    case "ZLY111":
      return [
        "ALL",
        "GENERAL INTRODUCTION",
        "SYSTEMATICS",
        "PROTOZOA",
        "PORIFERA",
        "COELENTERATA",
        "PLATYHELMINTHES",
        "NEMATODA",
        "ANNELIDA",
        "ANTHROPODA",
        "MOLLUSCA",
        "ECHINODERMATA",
      ];
    case "FSC111":
      return [
        "ALL",
        "GENERAL INTRODUCTION",
        "UNIFYING THEMES",
        "TAXONOMY",
        "CENTRAL DOGMA OF LIFE",
        "CELL STRUCTURE AND FUNCTIONS",
        "BIOLOGICAL MOLECULES",
        "CELLULAR RESPIRATION",
        "PHOTOSYNTHESIS",
        "THE CELL CYCLE",
        "ENERGY",
        "GENETICS",
        "EVOLUTION",
        "REPRODUCTION",
        "ECOLOGY"
      ];
    case "FSC112":
      return [
        "ALL",
        "MEASUREMENT AND UNITS",
        "NATURE OF SCIENCE - THE SCIENTIFIC METHOD",
        "NATURE OF MATTER",
        "ATOMIC STRUCTURE",
        "PERIODIC TABLE",
        "STOICHIOMETRY",
        "TYPES OF REACTION",
        "REDOX REACTION",
        "ELECTROCHEMISTRY",
        "CHEMICAL KINETICS",
        "CHEMICAL EQUILLIBRUM",
        "ACID-BASE CHEMISTRY",
        "SOLUBILITY",
        "THERMOCHEMISTRY",
        "ORGANIC CHEMISTRY",
      ];
    case "FSC113":
      return ["ALL", "All"];
    case "FSC114":
      return [
        "ALL",
        "INDICES AND LOGARITHM",
        "ELEMENTARY SET THEORY",
        "REAL NUMBER AND FUNCTIONS",
        "SEQUENCE AND SERIES",
        "POLYNOMIAL",
        "BINOMIAL THEOREM",
        "THEORY OF QUADRATIC EQUATION",
        "INEQUALITIES",
        "MATHEMATICAL INDUCTION",
        "TRIGONOMETRY",
        "COMPLEX NUMBERS",
        "CIRCLE AND CURVES",
        "COORDINATE GEOMETRY",
      ];
    case "FSC115":
      return [
        "ALL",
        "MEASUREMENTS, UNITS AND DIMENSIONS",
        "SCALARS AND VECTORS",
        "KINEMATICS",
        "CIRCULAR MOTION",
        "GRAVITATION",
        "DYNAMICS",
        "NEWTON'S LAW OF MOTION",
        "FRICTION",
        "WORK, ENERGY AND POWER",
        "ELASTICITY",
        "EQUILLIBRUM OF FORCES",
        "FLUIDS",
        "HEAT/THERMAL PHYSICS"
      ];
    case "GST102":
      return ["ALL", "All"];
    case "GST105":
      return ["ALL", "All"];
    default:
      return [];
  }
};
