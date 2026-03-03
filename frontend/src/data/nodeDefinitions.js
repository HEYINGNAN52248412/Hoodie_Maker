import {
  Shirt,
  Ruler,
  PocketKnife,
  CloudDrizzle,
  Wrench,
  Palette,
  Tag,
  Scissors,
} from "lucide-react";

/**
 * Each node definition describes a configurable manufacturing step.
 *
 * field.type:
 *   "select"  — dropdown with options[]
 *   "toggle"  — on/off switch
 *
 * field.showWhen — optional conditional:
 *   { field: "<siblingId>", value: "<requiredValue>" }
 *
 * field.tooltip — brief hover text
 * field.knowledge — title shown in the deep-dive modal
 */
const nodeDefinitions = [
  {
    id: "fabric",
    label: "Fabric",
    icon: Shirt,
    description: "Base fabric weight and composition",
    fields: [
      {
        id: "weight",
        label: "Fabric Weight",
        type: "select",
        options: [
          "Midweight French Terry (300 gsm)",
          "Heavyweight French Terry (450 gsm)",
          "Premium Fleece (380 gsm)",
          "Lightweight Loopback (250 gsm)",
        ],
        default: "Midweight French Terry (300 gsm)",
        tooltip: "Heavier fabrics provide more structure and warmth.",
        knowledge: "Fabric Weight & GSM Guide",
      },
      {
        id: "composition",
        label: "Composition",
        type: "select",
        options: [
          "100% Cotton",
          "80/20 Cotton-Polyester",
          "60/40 Cotton-Polyester",
          "Organic Cotton Blend",
        ],
        default: "80/20 Cotton-Polyester",
        tooltip: "Polyester blends reduce shrinkage and increase durability.",
        knowledge: "Fiber Composition & Performance",
      },
      {
        id: "preShrunk",
        label: "Pre-Shrunk Treatment",
        type: "toggle",
        default: true,
        tooltip: "Garment-washed to minimize post-purchase shrinkage.",
        knowledge: "Pre-Shrink & Wash Treatments",
      },
    ],
  },
  {
    id: "fit",
    label: "Fit & Silhouette",
    icon: Ruler,
    description: "Overall garment shape and sizing",
    fields: [
      {
        id: "silhouette",
        label: "Silhouette",
        type: "select",
        options: ["Standard Fit", "Oversized", "Drop Shoulder / Boxy", "Slim Fit"],
        default: "Standard Fit",
        tooltip: "Controls the overall drape and body shape of the garment.",
        knowledge: "Silhouette & Body Mapping",
      },
      {
        id: "length",
        label: "Body Length",
        type: "select",
        options: ["Regular", "Longline (+3 in)", "Cropped (-2 in)"],
        default: "Regular",
        tooltip: "Measured from highest point of shoulder to hem.",
        knowledge: "Body Length Adjustments",
      },
      {
        id: "sizeRange",
        label: "Size Range",
        type: "select",
        options: ["S — XL", "XS — 2XL", "S — 3XL", "XS — 5XL"],
        default: "S — XL",
        tooltip: "Broader ranges require additional grading work.",
        knowledge: "Size Grading & Range Planning",
      },
    ],
  },
  {
    id: "pockets",
    label: "Pockets",
    icon: PocketKnife,
    description: "Pocket style and construction",
    fields: [
      {
        id: "style",
        label: "Pocket Style",
        type: "select",
        options: [
          "Kangaroo Pocket",
          "Hidden Seam Pocket",
          "Split Kangaroo Pocket",
          "No Pockets",
        ],
        default: "Kangaroo Pocket",
        tooltip: "The pocket style affects both function and visual weight.",
        knowledge: "Pocket Construction Methods",
      },
      {
        id: "thinLining",
        label: "Extra Thin Pocket Lining",
        type: "toggle",
        default: false,
        showWhen: { field: "style", value: "Hidden Seam Pocket" },
        tooltip: "Uses lighter mesh lining so the pocket doesn't add bulk.",
        knowledge: "Pocket Lining Materials",
      },
      {
        id: "bartack",
        label: "Reinforced Bar-Tack Corners",
        type: "toggle",
        default: true,
        tooltip: "Extra stitching at stress points prevents tearing.",
        knowledge: "Bar-Tack & Reinforcement Stitching",
      },
    ],
  },
  {
    id: "hood",
    label: "Hood Details",
    icon: CloudDrizzle,
    description: "Hood shape, lining, and drawcord",
    fields: [
      {
        id: "shape",
        label: "Hood Shape",
        type: "select",
        options: [
          "Classic 3-Panel",
          "2-Panel Crossover",
          "Oversized Scuba Hood",
        ],
        default: "Classic 3-Panel",
        tooltip: "Panel count affects the hood's contour when worn up.",
        knowledge: "Hood Panel Construction",
      },
      {
        id: "lining",
        label: "Hood Lining",
        type: "select",
        options: ["Self-Fabric", "Jersey Lined", "Sherpa Lined"],
        default: "Self-Fabric",
        tooltip: "Lined hoods add warmth and a premium hand-feel.",
        knowledge: "Hood Lining Options",
      },
      {
        id: "drawcord",
        label: "Drawcord Type",
        type: "select",
        options: [
          "Flat Woven Tape",
          "Round Cord",
          "No Drawcord",
        ],
        default: "Flat Woven Tape",
        tooltip: "Flat tape offers a modern look; round cord is more traditional.",
        knowledge: "Drawcord Styles & Safety Standards",
      },
    ],
  },
  {
    id: "hardware",
    label: "Hardware",
    icon: Wrench,
    description: "Zippers, eyelets, aglets, and metal trims",
    fields: [
      {
        id: "eyelet",
        label: "Drawcord Eyelets",
        type: "select",
        options: [
          "Metal Eyelets (Nickel)",
          "Metal Eyelets (Matte Black)",
          "No Eyelets (Sewn Channel)",
        ],
        default: "Metal Eyelets (Nickel)",
        tooltip: "Eyelets reinforce the drawcord exit point.",
        knowledge: "Eyelet Types & Finishes",
      },
      {
        id: "aglet",
        label: "Aglet Finish",
        type: "select",
        options: [
          "Metal Crimp (Silver)",
          "Metal Crimp (Gunmetal)",
          "Heat-Sealed Plastic",
          "Knotted (No Aglet)",
        ],
        default: "Metal Crimp (Silver)",
        tooltip: "Aglets cap the drawcord ends and prevent fraying.",
        knowledge: "Aglet & Cord End Finishes",
      },
    ],
  },
  {
    id: "color",
    label: "Color & Dyeing",
    icon: Palette,
    description: "Garment color and dyeing technique",
    fields: [
      {
        id: "method",
        label: "Dyeing Method",
        type: "select",
        options: [
          "Piece Dye (Standard)",
          "Garment Dye (Vintage Wash)",
          "Yarn Dye (Heathered)",
        ],
        default: "Piece Dye (Standard)",
        tooltip: "Garment dye produces a softer, lived-in look.",
        knowledge: "Dyeing Techniques Explained",
      },
      {
        id: "colorCode",
        label: "Pantone Reference",
        type: "select",
        options: [
          "Black (Pantone Black C)",
          "Navy (Pantone 289 C)",
          "Heather Grey (Pantone Cool Gray 5 C)",
          "Off-White (Pantone 7527 C)",
          "Forest Green (Pantone 3435 C)",
        ],
        default: "Black (Pantone Black C)",
        tooltip: "Use Pantone references for precise color matching across batches.",
        knowledge: "Pantone Color Matching System",
      },
    ],
  },
  {
    id: "labeling",
    label: "Labels & Branding",
    icon: Tag,
    description: "Neck labels, care labels, and hang tags",
    fields: [
      {
        id: "neckLabel",
        label: "Neck Label",
        type: "select",
        options: [
          "Woven Damask Label",
          "Heat Transfer / Tagless Print",
          "Leather Patch Label",
        ],
        default: "Woven Damask Label",
        tooltip: "Tagless prints reduce irritation; woven labels feel premium.",
        knowledge: "Neck Label Printing & Weaving",
      },
      {
        id: "careLabel",
        label: "Care Label Position",
        type: "select",
        options: ["Side Seam (Standard)", "Center Back Hem", "Printed Inside"],
        default: "Side Seam (Standard)",
        tooltip: "Alternative placements can reduce label irritation.",
        knowledge: "Care Label Regulations & Placement",
      },
    ],
  },
  {
    id: "finishing",
    label: "Finishing & Trim",
    icon: Scissors,
    description: "Cuffs, hem, and finishing details",
    fields: [
      {
        id: "cuff",
        label: "Cuff Style",
        type: "select",
        options: [
          "Standard Ribbed Cuff",
          "Lycra-Reinforced Cuff",
          "Raw Edge (Cut & Sew)",
        ],
        default: "Standard Ribbed Cuff",
        tooltip: "Lycra-reinforced cuffs retain elasticity after repeated washing.",
        knowledge: "Cuff & Ribbing Construction",
      },
      {
        id: "hem",
        label: "Hem Finish",
        type: "select",
        options: [
          "Matching Rib Hem",
          "Curved Split Hem",
          "Raw Edge Hem",
        ],
        default: "Matching Rib Hem",
        tooltip: "Rib hems offer a classic, clean finish with stretch.",
        knowledge: "Hem Finishing Techniques",
      },
      {
        id: "coverStitch",
        label: "Cover-Stitch Gauge",
        type: "select",
        options: ["Single Needle", "Double Needle", "Triple Needle"],
        default: "Double Needle",
        tooltip: "More needles produce a wider, more decorative topstitch.",
        knowledge: "Cover-Stitch & Topstitch Guide",
      },
    ],
  },
];

export default nodeDefinitions;
