export const INTEGRATION_FRAMES = [
  {
    id: "step-1",
    integral: "\\int_{e^{\\text{Eid-ul}}}^{e^{\\text{fitr}}}",
    numerator: "x^2-x^2\\cos(2x)+x^2\\cdot2\\cos^2(x)",
    denominator: "2x^3",
    suffix: "dx",
  },
  {
    id: "step-2",
    integral: "\\int_{e^{\\text{Eid-ul}}}^{e^{\\text{fitr}}}",
    numerator: "x^2(1-\\cos(2x)+2\\cos^2(x))",
    denominator: "2x^3",
    suffix: "dx",
  },
  {
    id: "step-3",
    integral: "\\int_{e^{\\text{Eid-ul}}}^{e^{\\text{fitr}}}",
    numerator: "x^2(2\\sin^2(x)+2\\cos^2(x))",
    denominator: "2x^3",
    suffix: "dx",
  },
  {
    id: "step-4",
    integral: "\\int_{e^{\\text{Eid-ul}}}^{e^{\\text{fitr}}}",
    numerator: "x^2\\cdot2(\\sin^2(x)+\\cos^2(x))",
    denominator: "2x^3",
    suffix: "dx",
  },
  {
    id: "step-5",
    integral: "\\int_{e^{\\text{Eid-ul}}}^{e^{\\text{fitr}}}",
    numerator: "x^2",
    denominator: "x^3",
    suffix: "dx",
  },
  {
    id: "step-6",
    integral: "\\int_{e^{\\text{Eid-ul}}}^{e^{\\text{fitr}}}",
    numerator: "1",
    denominator: "x",
    suffix: "dx",
  },
  {
    id: "step-7",
    integral: "",
    numerator: "[\\ln x]_{e^{\\text{fitr}}}^{e^{\\text{Eid-ul}}}",
    denominator: "",
    suffix: "",
  },
  {
    id: "step-8",
    integral: "",
    numerator: "\\ln(e^{\\text{Eid-ul}})-\\ln(e^{\\text{fitr}})",
    denominator: "",
    suffix: "",
    accent: true,
  },
  {
    id: "step-9",
    integral: "",
    numerator: "\\text{Eid-ul-fitr}",
    denominator: "",
    suffix: "",
    accent: true,
  },
];

export const INTRO_FRAME_COUNT = INTEGRATION_FRAMES.length;
