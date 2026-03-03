import { useState } from "react";
import { Copy, X, ImageOff } from "lucide-react";

/* ── Image fallback ──────────────────────────────── */

function ImageWithFallback({ src, alt, className }) {
  const [failed, setFailed] = useState(false);

  if (failed || !src) {
    return (
      <div
        className={`${className} bg-zinc-100 flex flex-col items-center justify-center gap-2`}
      >
        <ImageOff size={28} className="text-zinc-300" />
        <span className="text-[11px] font-medium text-zinc-400 tracking-wide uppercase max-w-[80%] text-center leading-tight">
          {alt || "Image"}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setFailed(true)}
    />
  );
}

/* ── Categories ──────────────────────────────────── */

const CATEGORIES = [
  "All",
  "Fabrics",
  "Fit & Silhouette",
  "Pockets",
  "Hood Details",
  "Hardware",
  "Colors & Dyeing",
  "Labels & Branding",
  "Finishing & Trim",
];

/* ── Knowledge Base Items (65 entries) ───────────── */

const ITEMS = [
  // ─── Fabrics: Weights (4) ─────────────────────────
  {
    id: 1,
    category: "Fabrics",
    title: "Midweight French Terry (300 gsm)",
    tags: ["Fabric Weight", "300 GSM", "Versatile"],
    shortDesc:
      "A year-round workhorse terry with balanced weight and drape for transitional layering.",
    detailedDesc:
      "300 GSM midweight French terry featuring a smooth face and soft loopback interior. Offers the ideal balance between structure and comfort — substantial enough to hold a clean silhouette yet breathable for three-season wear. This weight is the go-to for most streetwear programs, offering easy garment-dye compatibility and consistent shrinkage rates across production runs.",
    imageUrl:
      "https://images.unsplash.com/photo-1558171813-4c088753af8f?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 2,
    category: "Fabrics",
    title: "Heavyweight French Terry (450 gsm)",
    tags: ["Fabric Weight", "450 GSM", "Structured"],
    shortDesc:
      "Dense loopback terry built for architectural silhouettes and cold-weather layering.",
    detailedDesc:
      "A 450 GSM heavyweight French terry with a tight loopback interior and a smooth, peached face. Milled from long-staple cotton for pill-resistance, this fabric holds structured shapes — dropped shoulders, boxy crops — without collapsing after wash. Ideal for Autumn/Winter collections where body and drape are paramount. Pre-shrunk compatible.",
    imageUrl:
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 3,
    category: "Fabrics",
    title: "Premium Fleece (380 gsm)",
    tags: ["Fabric Weight", "380 GSM", "Brushed"],
    shortDesc:
      "Brushed-back fleece with a plush interior hand-feel and excellent heat retention.",
    detailedDesc:
      "380 GSM premium fleece with a smooth jersey face and a deeply brushed interior. The napping process creates micro-air pockets that trap warmth without excessive bulk. Often specified for cold-climate drops and outdoor-inflected collections. Accepts pigment dye beautifully, developing rich depth of color with subtle highs and lows.",
    imageUrl:
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 4,
    category: "Fabrics",
    title: "Lightweight Loopback (250 gsm)",
    tags: ["Fabric Weight", "250 GSM", "Summer"],
    shortDesc:
      "Airy loopback jersey for warm-weather hoodies and resort-season layering.",
    detailedDesc:
      "250 GSM lightweight loopback with an open loop structure that maximizes airflow. The relaxed knit drapes softly and moves with the body, making it the natural choice for spring/summer programs and indoor-to-outdoor transitional pieces. Pairs well with garment-dye techniques for a washed, sun-faded aesthetic.",
    imageUrl:
      "https://images.unsplash.com/photo-1564859228273-274232fdb516?auto=format&fit=crop&q=80&w=800",
  },

  // ─── Fabrics: Composition (4) ─────────────────────
  {
    id: 5,
    category: "Fabrics",
    title: "100% Cotton",
    tags: ["Composition", "Pure Cotton", "Natural"],
    shortDesc:
      "All-natural cotton fiber for maximum breathability and a classic hand-feel.",
    detailedDesc:
      "Pure 100% cotton construction using ring-spun yarn for a smooth, consistent surface. Delivers superior moisture absorption, natural softness, and the authentic texture that cotton purists demand. Expect 3–5% shrinkage on first wash unless pre-shrunk treated. Ideal for garment-dye programs where cotton's affinity for reactive dyes produces the richest color payoff.",
    imageUrl:
      "https://images.unsplash.com/photo-1616627988170-6e3e48012986?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 6,
    category: "Fabrics",
    title: "80/20 Cotton-Polyester",
    tags: ["Composition", "Blended", "Durable"],
    shortDesc:
      "The industry-standard blend balancing cotton comfort with polyester durability.",
    detailedDesc:
      "An 80% cotton / 20% polyester blend that has become the default for premium fleece programs. The polyester component reduces pilling, minimizes shrinkage, and improves color retention after repeated washing — while the dominant cotton share preserves a natural hand-feel. A pragmatic choice for brands prioritizing production consistency and longevity.",
    imageUrl:
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 7,
    category: "Fabrics",
    title: "60/40 Cotton-Polyester",
    tags: ["Composition", "Performance", "Low-Shrink"],
    shortDesc:
      "Higher polyester ratio for enhanced shape retention and reduced production shrinkage.",
    detailedDesc:
      "A 60/40 cotton-polyester blend engineered for maximum dimensional stability. The elevated polyester content virtually eliminates shrinkage and ensures the garment holds its intended silhouette wash after wash. Slightly crisper hand-feel compared to cotton-heavy blends. Commonly specified for performance-adjacent streetwear and technical outerwear linings.",
    imageUrl:
      "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 8,
    category: "Fabrics",
    title: "Organic Cotton Blend",
    tags: ["Composition", "Organic", "Sustainable"],
    shortDesc:
      "GOTS-certified organic cotton for sustainability-conscious collections.",
    detailedDesc:
      "Woven from Global Organic Textile Standard (GOTS) certified organic cotton blended with recycled polyester. Grown without synthetic pesticides or fertilizers, this fiber carries full traceability from field to fabric. The slightly irregular yarn character gives each garment a unique, artisanal texture. Supports brands pursuing B-Corp certification and transparent supply chain narratives.",
    imageUrl:
      "https://images.unsplash.com/photo-1542060748-10c28b62716f?auto=format&fit=crop&q=80&w=800",
  },

  // ─── Fabrics: Toggle (1) ──────────────────────────
  {
    id: 9,
    category: "Fabrics",
    title: "Pre-Shrunk Treatment",
    tags: ["Treatment", "Anti-Shrink", "Pre-Wash"],
    shortDesc:
      "Industrial pre-shrink process that stabilizes the fabric before cut-and-sew.",
    detailedDesc:
      "A compressive shrinking treatment (sanforization or equivalent) applied to the rolled fabric before cutting. Reduces residual shrinkage to under 1%, ensuring the finished garment maintains its graded measurements through consumer wash cycles. Essential for 100% cotton programs and critical for maintaining size-chart accuracy across all SKUs.",
    imageUrl:
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&q=80&w=800",
  },

  // ─── Fit & Silhouette: Silhouettes (4) ────────────
  {
    id: 10,
    category: "Fit & Silhouette",
    title: "Standard Fit",
    tags: ["Silhouette", "Classic", "True-to-Size"],
    shortDesc:
      "A true-to-size silhouette with moderate ease through the chest and a straight body.",
    detailedDesc:
      "The standard fit provides approximately 4–6 inches of ease at the chest, a natural shoulder point, and a straight hem that falls at the hip. It serves as the baseline pattern from which all other silhouettes are derived. Universally flattering across body types and the safest choice for broad-market programs where fit consistency is paramount.",
    imageUrl:
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 11,
    category: "Fit & Silhouette",
    title: "Oversized",
    tags: ["Silhouette", "Relaxed", "Streetwear"],
    shortDesc:
      "Generous proportions with 8–10\" of ease for an effortless, contemporary drape.",
    detailedDesc:
      "An oversized block with 8–10 inches of ease through the chest, lowered armholes, and a relaxed sleeve that tapers slightly to the cuff. The exaggerated proportions create the quintessential streetwear silhouette — relaxed but intentional. Pairs naturally with cropped or longline hem adjustments. Size grading should account for the amplified ease to avoid excessive fabric at smaller sizes.",
    imageUrl:
      "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 12,
    category: "Fit & Silhouette",
    title: "Drop Shoulder / Boxy",
    tags: ["Silhouette", "Boxy", "Architectural"],
    shortDesc:
      "Extended shoulder seam and squared body for a structured, graphic silhouette.",
    detailedDesc:
      "The drop-shoulder boxy cut places the shoulder seam 2–3 inches below the natural shoulder point, creating a wider frame and a deliberately squared torso. The body is cut with minimal tapering for a rectangular shape when laid flat. This architectural silhouette is a staple of Japanese-inflected streetwear and works best in heavyweight fabrics (380+ gsm) that can hold the structured form.",
    imageUrl:
      "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 13,
    category: "Fit & Silhouette",
    title: "Slim Fit",
    tags: ["Silhouette", "Tailored", "Close-Cut"],
    shortDesc:
      "A close-cut silhouette with minimal ease, designed for layering under outerwear.",
    detailedDesc:
      "Slim fit provides 2–3 inches of ease at the chest with a tapered body that follows the torso's natural contour. Sleeves are narrower throughout, and the armhole sits higher. Ideal for under-jacket layering or for customers who prefer a more tailored aesthetic. Best executed in fabrics with some stretch or recovery (cotton-poly blends) to maintain comfort despite the closer cut.",
    imageUrl:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=800",
  },

  // ─── Fit & Silhouette: Body Length (3) ────────────
  {
    id: 14,
    category: "Fit & Silhouette",
    title: "Regular Length",
    tags: ["Body Length", "Standard", "Hip"],
    shortDesc:
      "Standard body length falling at the mid-hip — the default for most hoodie programs.",
    detailedDesc:
      "The regular length positions the hem at the mid-hip, roughly 27–28 inches from the high point of the shoulder in size M. This is the industry baseline that balances proportion across all silhouettes. Works equally well tucked, untucked, or layered. All grading increments (typically 1 inch per size) are calibrated from this base length.",
    imageUrl:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 15,
    category: "Fit & Silhouette",
    title: "Longline (+3 in)",
    tags: ["Body Length", "Extended", "Layering"],
    shortDesc:
      "Extended hem dropping 3 inches below standard for a modern longline proportion.",
    detailedDesc:
      "Adds 3 inches to the base body length, placing the hem below the hip at approximately 30–31 inches in size M. The longline cut enhances vertical proportion and provides additional coverage for layering over low-rise bottoms. Commonly paired with oversized silhouettes and curved split hems. Ensure tech pack callouts specify the added length to avoid confusion during grading.",
    imageUrl:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 16,
    category: "Fit & Silhouette",
    title: "Cropped (-2 in)",
    tags: ["Body Length", "Cropped", "High-Waist"],
    shortDesc:
      "Shortened hem sitting 2 inches above standard for a contemporary cropped look.",
    detailedDesc:
      "Subtracts 2 inches from the base body length, placing the hem at approximately 25–26 inches in size M — sitting at or just above the natural waist. The cropped proportion pairs naturally with high-waisted bottoms and boxy silhouettes. A key detail in women's and unisex streetwear. Rib hem is recommended to maintain a clean finish at the shortened length.",
    imageUrl:
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80&w=800",
  },

  // ─── Fit & Silhouette: Size Range (4) ─────────────
  {
    id: 17,
    category: "Fit & Silhouette",
    title: "S — XL",
    tags: ["Size Range", "Core", "4 Sizes"],
    shortDesc:
      "The core 4-size run covering the majority of the standard fit curve.",
    detailedDesc:
      "A 4-size run (S, M, L, XL) that covers approximately 80% of the standard bell-curve fit distribution. This is the most cost-effective range for emerging brands, minimizing grading costs and inventory complexity. Each size increments by 2 inches at the chest and 1 inch in body length. Recommended for initial production runs and capsule collections.",
    imageUrl:
      "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 18,
    category: "Fit & Silhouette",
    title: "XS — 2XL",
    tags: ["Size Range", "Extended", "6 Sizes"],
    shortDesc:
      "Extended 6-size range with XS and 2XL for broader market coverage.",
    detailedDesc:
      "A 6-size run (XS, S, M, L, XL, 2XL) that extends the standard range in both directions. XS captures slimmer builds and the growing women's unisex market, while 2XL ensures inclusive sizing. Requires two additional graded patterns and increases per-style SKU count by 50%. Recommended for established programs with proven sell-through data.",
    imageUrl:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 19,
    category: "Fit & Silhouette",
    title: "S — 3XL",
    tags: ["Size Range", "Inclusive", "6 Sizes"],
    shortDesc:
      "Upward-extended 6-size range reaching 3XL for plus-size inclusivity.",
    detailedDesc:
      "A 6-size run (S, M, L, XL, 2XL, 3XL) that extends upward to serve plus-size customers. Beyond 2XL, grading rules typically shift — chest increments increase to 2.5 inches, and body width adjustments account for different proportional needs. This range signals brand commitment to size inclusivity and is increasingly expected by wholesale buyers and DTC audiences alike.",
    imageUrl:
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 20,
    category: "Fit & Silhouette",
    title: "XS — 5XL",
    tags: ["Size Range", "Full Spectrum", "10 Sizes"],
    shortDesc:
      "Full-spectrum 10-size run for maximum inclusivity and wholesale readiness.",
    detailedDesc:
      "The widest available range spanning XS through 5XL (10 sizes). Demands dedicated pattern grading at the extremes, with separate fit models for the upper end of the range. Per-style development costs increase significantly, but the range ensures no customer is excluded. Typically required by large wholesale accounts and uniform programs. Best paired with a pre-shrunk, low-shrinkage fabric composition.",
    imageUrl:
      "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?auto=format&fit=crop&q=80&w=800",
  },

  // ─── Pockets: Style (4) ───────────────────────────
  {
    id: 21,
    category: "Pockets",
    title: "Kangaroo Pocket",
    tags: ["Pocket Style", "Classic", "Front Pouch"],
    shortDesc:
      "The iconic front pouch pocket — a defining feature of the pullover hoodie.",
    detailedDesc:
      "A single continuous pouch pocket spanning the lower front of the garment, accessed from both sides. Constructed with a top-entry opening and typically reinforced with bar-tacks at the stress points. The kangaroo pocket adds functional handwarming and visual weight to the front panel. It is the most recognized hoodie pocket style and a customer expectation on pullover designs.",
    imageUrl:
      "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 22,
    category: "Pockets",
    title: "Hidden Seam Pocket",
    tags: ["Pocket Style", "Minimal", "Invisible"],
    shortDesc:
      "A concealed welt pocket integrated into the side seam for a clean, minimal facade.",
    detailedDesc:
      "The hidden seam pocket is set into the side seam of the garment, rendering it virtually invisible when hands are not in use. The pocket bag is constructed from lightweight lining fabric to minimize bulk. This is the pocket of choice for minimalist and luxury-adjacent programs where a clean, uninterrupted front panel is paramount. Compatible with the optional thin lining upgrade for even further bulk reduction.",
    imageUrl:
      "https://images.unsplash.com/photo-1622470953794-aa9c70b0fb9d?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 23,
    category: "Pockets",
    title: "Split Kangaroo Pocket",
    tags: ["Pocket Style", "Divided", "Functional"],
    shortDesc:
      "A divided kangaroo pocket with separate left and right compartments.",
    detailedDesc:
      "Takes the classic kangaroo pouch and divides it into two distinct compartments via a center seam. Each side functions independently, reducing the sagging that can occur with heavy items in a single pouch. The center stitch line also adds a subtle design detail to the front panel. A practical upgrade for customers who carry phones, wallets, or small accessories.",
    imageUrl:
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 24,
    category: "Pockets",
    title: "No Pockets",
    tags: ["Pocket Style", "Clean", "Minimal"],
    shortDesc:
      "A pocketless construction for an ultra-clean silhouette and reduced bulk.",
    detailedDesc:
      "Eliminates all pockets for the cleanest possible front and side panels. This option reduces material usage and simplifies the sewing sequence, marginally lowering per-unit cost. The pocketless look works well for cropped silhouettes, layering pieces, and designs where graphic placement on the front panel must remain uninterrupted. Often specified in elevated or runway-adjacent collections.",
    imageUrl:
      "https://images.unsplash.com/photo-1578932750294-f5075e85f44a?auto=format&fit=crop&q=80&w=800",
  },

  // ─── Pockets: Toggles (2) ────────────────────────
  {
    id: 25,
    category: "Pockets",
    title: "Extra Thin Pocket Lining",
    tags: ["Pocket Detail", "Mesh Lining", "Low Bulk"],
    shortDesc:
      "Lightweight mesh lining for hidden seam pockets that eliminates visible bulk lines.",
    detailedDesc:
      "Replaces the standard cotton pocket bag with an ultra-lightweight polyester mesh lining (approx. 50 gsm). Designed specifically for hidden seam pockets where the pocket bag would otherwise create a visible bulge against the body. The mesh construction also improves breathability inside the pocket. Only applicable when the Hidden Seam Pocket style is selected.",
    imageUrl:
      "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 26,
    category: "Pockets",
    title: "Reinforced Bar-Tack Corners",
    tags: ["Pocket Detail", "Reinforcement", "Durability"],
    shortDesc:
      "High-density bar-tack stitching at pocket stress points to prevent tearing.",
    detailedDesc:
      "Bar-tack reinforcement applies a concentrated zigzag stitch (typically 42 stitches in a 10mm area) at the corners and openings of the pocket. This prevents the fabric from tearing under load — especially critical for kangaroo pockets that carry phones and heavy items. Enabled by default in all configurations. Disable only for ultra-minimal designs where the bar-tack stitch would be visible and undesirable.",
    imageUrl:
      "https://images.unsplash.com/photo-1558171813-4c088753af8f?auto=format&fit=crop&q=80&w=800",
  },

  // ─── Hood Details: Shape (3) ──────────────────────
  {
    id: 27,
    category: "Hood Details",
    title: "Classic 3-Panel",
    tags: ["Hood Shape", "3-Panel", "Traditional"],
    shortDesc:
      "The traditional 3-panel hood construction for balanced shape and coverage.",
    detailedDesc:
      "Constructed from three pattern pieces — two side panels and a center insert — that create a rounded, anatomically contoured shape. The 3-panel hood provides the most balanced fit when worn up, with the center panel running from the forehead to the nape. This is the most common hood construction in premium streetwear and the recommended starting point for most programs.",
    imageUrl:
      "https://images.unsplash.com/photo-1609709295948-17d77cb2a69b?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 28,
    category: "Hood Details",
    title: "2-Panel Crossover",
    tags: ["Hood Shape", "2-Panel", "Modern"],
    shortDesc:
      "A streamlined two-panel hood with a central seam for a modern, angular look.",
    detailedDesc:
      "Uses two mirror-image panels joined by a single center-back seam. The simplified construction produces a slightly flatter, more angular hood silhouette compared to the 3-panel. The visible center seam becomes a design feature. This construction is faster to sew (one fewer panel, one fewer seam), making it a cost-effective choice that still reads as intentional and designed.",
    imageUrl:
      "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 29,
    category: "Hood Details",
    title: "Oversized Scuba Hood",
    tags: ["Hood Shape", "Scuba", "Volume"],
    shortDesc:
      "An oversized, voluminous scuba-style hood with dramatic drape when worn down.",
    detailedDesc:
      "An enlarged 3-panel construction with approximately 20% more volume than the classic hood. When worn up, it extends further forward to frame the face; when worn down, it creates a dramatic, cascading drape at the upper back. The scuba hood is a statement detail associated with high-fashion streetwear and avant-garde collections. Best paired with heavyweight fabrics that can support the additional volume.",
    imageUrl:
      "https://images.unsplash.com/photo-1542327897-d73f4005b533?auto=format&fit=crop&q=80&w=800",
  },

  // ─── Hood Details: Lining (3) ─────────────────────
  {
    id: 30,
    category: "Hood Details",
    title: "Self-Fabric Lining",
    tags: ["Hood Lining", "Self-Fabric", "Consistent"],
    shortDesc:
      "Hood lined with the same body fabric for a seamless, tonal interior.",
    detailedDesc:
      "The hood interior is lined with the same fabric used for the garment body, creating a consistent hand-feel throughout. Self-fabric lining maintains a uniform weight and drape, and simplifies production by eliminating additional material sourcing. This is the default and most versatile option, working well across all hood shapes and fabric weights.",
    imageUrl:
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 31,
    category: "Hood Details",
    title: "Jersey Lined",
    tags: ["Hood Lining", "Jersey", "Lightweight"],
    shortDesc:
      "Smooth single-jersey lining for a softer, lighter-weight hood interior.",
    detailedDesc:
      "A lightweight single-jersey (approx. 180 gsm) lines the hood interior, providing a smoother, cooler hand-feel compared to self-fabric. The jersey lining reduces overall hood weight and bulk, making it the preferred choice for midweight and lightweight programs. The contrast between the outer terry and the smooth jersey interior adds a premium, intentional quality detail when the hood is worn down.",
    imageUrl:
      "https://images.unsplash.com/photo-1564859228273-274232fdb516?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 32,
    category: "Hood Details",
    title: "Sherpa Lined",
    tags: ["Hood Lining", "Sherpa", "Cold Weather"],
    shortDesc:
      "High-pile sherpa lining for maximum insulation and a luxe interior hand-feel.",
    detailedDesc:
      "A 100% polyester high-pile sherpa bonded to the hood's inner shell. Delivers exceptional warmth-to-weight ratio while adding a visible textural contrast when the hood is worn down. The sherpa face is brushed for softness and treated with an anti-pill finish to maintain appearance over time. Adds approximately 2mm of loft. Best suited for AW collections and heavyweight (380+ gsm) body fabrics.",
    imageUrl:
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&q=80&w=800",
  },

  // ─── Hood Details: Drawcord (3) ───────────────────
  {
    id: 33,
    category: "Hood Details",
    title: "Flat Woven Tape",
    tags: ["Drawcord", "Flat Tape", "Modern"],
    shortDesc:
      "A flat woven cotton tape drawcord for a clean, contemporary appearance.",
    detailedDesc:
      "A flat, woven cotton tape (typically 10–12mm wide) that lays flush against the garment when hanging. The flat profile reads as more modern and refined than traditional round cords. Available in matching body color or contrast tones. Compatible with both metal crimp and heat-sealed aglet finishes. Ensure CPSC drawcord safety requirements are met for children's sizing.",
    imageUrl:
      "https://images.unsplash.com/photo-1558171813-4c088753af8f?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 34,
    category: "Hood Details",
    title: "Round Cord",
    tags: ["Drawcord", "Round", "Classic"],
    shortDesc:
      "A traditional round braided drawcord with a heritage, sportswear-rooted aesthetic.",
    detailedDesc:
      "A braided round cord (typically 5–6mm diameter) that evokes classic sportswear and athletic heritage. The round profile is more tactile and provides a secure grip when cinching the hood. Works especially well with metal eyelet hardware and metal crimp aglets. A natural choice for vintage-inspired or athletics-adjacent collections.",
    imageUrl:
      "https://images.unsplash.com/photo-1595886918843-adbf140dbb5d?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 35,
    category: "Hood Details",
    title: "No Drawcord",
    tags: ["Drawcord", "Minimal", "Clean"],
    shortDesc:
      "Drawcord removed entirely for the cleanest possible neckline and hood opening.",
    detailedDesc:
      "Eliminates the drawcord entirely, resulting in a clean, uninterrupted hood opening. The drawcord channel may be left open as a subtle design detail or stitched closed. This option pairs naturally with the No Eyelets hardware configuration and is a hallmark of minimalist luxury programs. Without a drawcord, the hood shape relies entirely on its panel construction for fit.",
    imageUrl:
      "https://images.unsplash.com/photo-1578932750294-f5075e85f44a?auto=format&fit=crop&q=80&w=800",
  },

  // ─── Hardware: Eyelets (3) ────────────────────────
  {
    id: 36,
    category: "Hardware",
    title: "Metal Eyelets (Nickel)",
    tags: ["Eyelets", "Nickel", "Classic Silver"],
    shortDesc:
      "Polished nickel-finish eyelets for a classic, bright hardware accent.",
    detailedDesc:
      "Standard brass eyelets with a polished nickel plating. The bright silver finish provides a clean contrast against dark fabrics and a tonal accent on lighter colorways. Available in 8mm and 10mm inside-diameter options. Each eyelet is set with a die press to ensure a secure, non-rotating fit that withstands repeated drawcord pulling. The nickel finish resists light corrosion.",
    imageUrl:
      "https://images.unsplash.com/photo-1612993239009-be4dba2753c4?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 37,
    category: "Hardware",
    title: "Metal Eyelets (Matte Black)",
    tags: ["Eyelets", "Matte Black", "Stealth"],
    shortDesc:
      "PVD matte black eyelets for tonal, stealth-hardware aesthetics.",
    detailedDesc:
      "Brass eyelets coated with a PVD (Physical Vapor Deposition) matte black finish. The blacked-out hardware blends seamlessly with dark garments for a tonal, monochromatic look. PVD coating is significantly more durable than standard powder coating — resistant to scratching, chipping, and corrosion. The go-to choice for all-black programs and brands seeking a premium, understated hardware presence.",
    imageUrl:
      "https://images.unsplash.com/photo-1595886918843-adbf140dbb5d?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 38,
    category: "Hardware",
    title: "No Eyelets (Sewn Channel)",
    tags: ["Eyelets", "Sewn", "Zero Hardware"],
    shortDesc:
      "Drawcord exits through a sewn channel instead of metal eyelets — zero hardware on face.",
    detailedDesc:
      "Replaces metal eyelets with a cleanly stitched fabric channel that the drawcord threads through. The result is a completely hardware-free neckline. The sewn channel is reinforced with a bartack at the exit point to prevent fraying. This option is essential for brands pursuing a minimalist, no-metal aesthetic and pairs naturally with flat woven tape drawcords.",
    imageUrl:
      "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&q=80&w=800",
  },

  // ─── Hardware: Aglets (4) ─────────────────────────
  {
    id: 39,
    category: "Hardware",
    title: "Metal Crimp (Silver)",
    tags: ["Aglet", "Silver", "Polished"],
    shortDesc:
      "Polished silver metal crimp aglet — a bright, classic cord-end finish.",
    detailedDesc:
      "A precision-stamped brass aglet with a polished nickel finish that matches the standard nickel eyelet option. The crimp barrel secures the drawcord end, prevents fraying, and adds a small but noticeable weight that helps the cord hang cleanly. Available with optional logo deboss (minimum order quantities apply). The silver finish is the most versatile and pairs with all colorways.",
    imageUrl:
      "https://images.unsplash.com/photo-1612993239009-be4dba2753c4?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 40,
    category: "Hardware",
    title: "Metal Crimp (Gunmetal)",
    tags: ["Aglet", "Gunmetal", "Dark Metal"],
    shortDesc:
      "Gunmetal-finished metal crimp aglet for a stealth, tonal hardware accent.",
    detailedDesc:
      "Precision-stamped brass aglet with a PVD gunmetal coating that resists tarnish and abrasion. Designed to pair with dark-toned drawcords on black, navy, or charcoal colorways. The low-profile barrel shape slips easily through eyelet channels and adds a tactile, premium weight to the drawcord end. Specify with logo deboss for branded detailing.",
    imageUrl:
      "https://images.unsplash.com/photo-1595886918843-adbf140dbb5d?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 41,
    category: "Hardware",
    title: "Heat-Sealed Plastic",
    tags: ["Aglet", "Plastic", "Clean Tip"],
    shortDesc:
      "Heat-sealed plastic tip for a discreet, no-hardware cord finish.",
    detailedDesc:
      "The drawcord ends are sealed with a clear or tinted heat-shrink plastic that prevents fraying without adding any visible hardware. This is the most minimal aglet option — the cord tip appears as a clean, slightly tapered end. Ideal for brands that want zero metal on the garment or for programs where metal allergies are a concern. Low per-unit cost and fast application.",
    imageUrl:
      "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 42,
    category: "Hardware",
    title: "Knotted (No Aglet)",
    tags: ["Aglet", "Knotted", "Raw"],
    shortDesc:
      "A simple overhand knot at the cord end — raw, intentional, and hardware-free.",
    detailedDesc:
      "The cord end is simply knotted (overhand or figure-eight) with no additional aglet, cap, or seal. This deliberately unfinished detail signals an artisanal, hand-made quality that resonates with wabi-sabi-inspired and deconstructed collections. The knot also serves as a functional stop, preventing the drawcord from pulling through the channel. Zero additional component cost.",
    imageUrl:
      "https://images.unsplash.com/photo-1542060748-10c28b62716f?auto=format&fit=crop&q=80&w=800",
  },

  // ─── Colors & Dyeing: Methods (3) ────────────────
  {
    id: 43,
    category: "Colors & Dyeing",
    title: "Piece Dye (Standard)",
    tags: ["Dye Method", "Piece Dye", "Consistent"],
    shortDesc:
      "Fabric is dyed in roll form before cutting — the most consistent and cost-effective method.",
    detailedDesc:
      "In piece dyeing, the fabric is dyed in full rolls before it is cut and sewn. This method delivers the most consistent color across all parts of the garment, since every panel is cut from identically dyed fabric. It is the industry default for most production programs. Color matching to Pantone references is most precise with this method. The trade-off is that the fabric does not develop the soft, lived-in hand-feel of garment dyeing.",
    imageUrl:
      "https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 44,
    category: "Colors & Dyeing",
    title: "Garment Dye (Vintage Wash)",
    tags: ["Dye Method", "Garment Dye", "Vintage"],
    shortDesc:
      "The finished garment is dyed after sewing, creating a soft, vintage-wash character.",
    detailedDesc:
      "The fully sewn garment is submerged in dye baths, producing subtle color variations at seams, edges, and stress points. Garment dyeing delivers a distinctly soft, broken-in hand-feel and the characteristic vintage aesthetic prized in premium streetwear. Each piece develops unique highs and lows, meaning no two garments are identical. Expect 5–8% additional shrinkage. Requires PFD (Prepared for Dye) white fabric at cut stage.",
    imageUrl:
      "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 45,
    category: "Colors & Dyeing",
    title: "Yarn Dye (Heathered)",
    tags: ["Dye Method", "Yarn Dye", "Heathered"],
    shortDesc:
      "Individual yarns are dyed before knitting, producing a rich, heathered texture.",
    detailedDesc:
      "In yarn dyeing, the raw cotton or blended yarn is dyed before being knitted into fabric. When yarns of slightly different shades are combined on the knitting machine, the result is a heathered, marled texture with exceptional depth and dimension. Yarn-dyed fabrics have superior color fastness and a more complex visual character than piece-dyed equivalents. Higher cost due to the additional pre-knitting dye step.",
    imageUrl:
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&q=80&w=800",
  },

  // ─── Colors & Dyeing: Pantone (5) ────────────────
  {
    id: 46,
    category: "Colors & Dyeing",
    title: "Black (Pantone Black C)",
    tags: ["Pantone", "Black", "Core Color"],
    shortDesc:
      "True black — the perpetual core colorway and foundation of any streetwear palette.",
    detailedDesc:
      "Pantone Black C is the deepest, truest black achievable in textile dyeing. It serves as the anchor colorway for virtually every streetwear collection. Achieving a rich, non-fading black requires high dye concentrations and often a double-dye process. Garment-dyed black develops a naturally faded, charcoal patina over time — a desired effect in vintage programs. Specify 'jet black' or 'washed black' to set customer expectations.",
    imageUrl:
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 47,
    category: "Colors & Dyeing",
    title: "Navy (Pantone 289 C)",
    tags: ["Pantone", "Navy", "Dark Blue"],
    shortDesc:
      "Deep midnight navy — a versatile dark neutral that reads softer than black.",
    detailedDesc:
      "Pantone 289 C is a deep, saturated navy that sits one shade above black on the value scale. It functions as a dark neutral in collections where pure black feels too stark. Navy pairs naturally with nickel hardware and cream or off-white contrast details. Under garment-dye processing, navy develops beautiful indigo-like fading patterns at seams and edges. A perennial bestseller in menswear and unisex programs.",
    imageUrl:
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 48,
    category: "Colors & Dyeing",
    title: "Heather Grey (Pantone Cool Gray 5 C)",
    tags: ["Pantone", "Grey", "Heather"],
    shortDesc:
      "The quintessential athletic grey — a cool-toned heather that defines casual luxury.",
    detailedDesc:
      "Pantone Cool Gray 5 C in a heathered execution is the archetypal sweatshirt grey. Achieved through yarn dyeing with a blend of grey and white yarns, it produces the familiar marled texture associated with athletic heritage. Heather grey is the second most in-demand colorway after black in the hoodie category. It shows embroidery and print work cleanly and pairs effortlessly with any accent color.",
    imageUrl:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 49,
    category: "Colors & Dyeing",
    title: "Off-White (Pantone 7527 C)",
    tags: ["Pantone", "Off-White", "Cream"],
    shortDesc:
      "A warm, creamy off-white with a slightly yellow undertone — softer than optical white.",
    detailedDesc:
      "Pantone 7527 C is a warm off-white / cream tone that avoids the stark, clinical feel of optical white. In streetwear, off-white signals intentionality — it reads as a deliberate color choice rather than 'undyed.' Works beautifully as a canvas for garment dyeing and takes on a rich, parchment-like character when enzyme-washed. Pairs well with tonal hardware and earth-tone accent details.",
    imageUrl:
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 50,
    category: "Colors & Dyeing",
    title: "Forest Green (Pantone 3435 C)",
    tags: ["Pantone", "Green", "Earth Tone"],
    shortDesc:
      "A deep, saturated forest green rooted in military and outdoor heritage palettes.",
    detailedDesc:
      "Pantone 3435 C is a deep, cool-leaning forest green with strong military and outdoor heritage connotations. It adds dimension to collections built around earth tones and neutrals. Under garment-dye processing, forest green develops olive undertones at wear points, creating a naturally aged, field-jacket-inspired patina. Pairs exceptionally well with gunmetal and matte black hardware finishes.",
    imageUrl:
      "https://images.unsplash.com/photo-1542327897-d73f4005b533?auto=format&fit=crop&q=80&w=800",
  },

  // ─── Labels & Branding: Neck Label (3) ────────────
  {
    id: 51,
    category: "Labels & Branding",
    title: "Woven Damask Label",
    tags: ["Neck Label", "Woven", "Premium"],
    shortDesc:
      "A finely woven damask label with excellent detail resolution and a luxe hand-feel.",
    detailedDesc:
      "Woven on high-density Jacquard looms, the damask label reproduces intricate logos and fine text with crisp clarity. The satin-weave face creates a subtle sheen that signals quality. Damask labels are folded and sewn into the center-back neck seam. Available in single-fold or book-fold configurations. The premium standard for brands that view the neck label as a touchpoint for perceived value.",
    imageUrl:
      "https://images.unsplash.com/photo-1558171813-4c088753af8f?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 52,
    category: "Labels & Branding",
    title: "Heat Transfer / Tagless Print",
    tags: ["Neck Label", "Tagless", "Comfort"],
    shortDesc:
      "Heat-pressed branding directly onto the fabric — no physical tag, no itch.",
    detailedDesc:
      "A heat-transfer print applies the brand logo and care information directly onto the fabric interior at the center back neck. This eliminates the physical tag entirely, reducing skin irritation and improving the first-touch experience. Tagless printing is the industry trend for premium basics and DTC brands. The transfer must be tested for durability through the brand's specified wash-care cycle (typically 50+ washes).",
    imageUrl:
      "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 53,
    category: "Labels & Branding",
    title: "Leather Patch Label",
    tags: ["Neck Label", "Leather", "Artisanal"],
    shortDesc:
      "A debossed leather patch sewn at the center back neck for a tactile, artisanal brand mark.",
    detailedDesc:
      "A small vegetable-tanned or faux-leather patch (typically 30mm x 15mm) debossed or laser-etched with the brand logo. Sewn into the center-back neck seam, it adds a tactile, dimensional branding element that stands apart from woven or printed alternatives. The leather patch develops a natural patina over time with wear, reinforcing the handcrafted narrative. Available in natural, black, and custom-dyed options.",
    imageUrl:
      "https://images.unsplash.com/photo-1605383562635-0219cdeefd26?auto=format&fit=crop&q=80&w=800",
  },

  // ─── Labels & Branding: Care Label (3) ────────────
  {
    id: 54,
    category: "Labels & Branding",
    title: "Side Seam (Standard)",
    tags: ["Care Label", "Side Seam", "Standard"],
    shortDesc:
      "Care label sewn into the left side seam — the default, regulation-compliant placement.",
    detailedDesc:
      "The care and content label is inserted into the left side seam, approximately 3 inches above the hem. This is the most common placement and meets all FTC and international textile labeling regulations. The side seam position keeps the label away from direct skin contact at the neck while remaining easily accessible for the consumer. Multi-language and multi-market content is supported via accordion-fold labels.",
    imageUrl:
      "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 55,
    category: "Labels & Branding",
    title: "Center Back Hem",
    tags: ["Care Label", "Back Hem", "Discreet"],
    shortDesc:
      "Care label positioned at the center back hem for a discreet, out-of-sight placement.",
    detailedDesc:
      "The care label is sewn into the center-back hem, making it virtually invisible during normal wear. This placement is favored by minimalist brands that want the interior of the garment to feel as clean and uncluttered as the exterior. The label remains accessible by flipping the hem up. Ensure the label is positioned so it does not interfere with any hem rib or finishing detail.",
    imageUrl:
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 56,
    category: "Labels & Branding",
    title: "Printed Inside",
    tags: ["Care Label", "Printed", "No Tag"],
    shortDesc:
      "All care and content information printed directly inside the garment — fully tagless.",
    detailedDesc:
      "All required care instructions, fiber content, country of origin, and RN/CA numbers are heat-transferred onto the interior fabric, eliminating all physical labels below the neckline. This fully tagless approach is the ultimate expression of the comfort-first philosophy. Must be tested for print durability (50+ wash cycles minimum) and legibility compliance across all required markets.",
    imageUrl:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=800",
  },

  // ─── Finishing & Trim: Cuff Style (3) ─────────────
  {
    id: 57,
    category: "Finishing & Trim",
    title: "Standard Ribbed Cuff",
    tags: ["Cuff", "Ribbed", "Classic"],
    shortDesc:
      "Classic 1x1 or 2x2 rib-knit cuff providing stretch, recovery, and a clean finish.",
    detailedDesc:
      "A rib-knit cuff (typically 2x2 rib) sewn to the sleeve end, providing elasticity that holds the sleeve in place at the wrist. Standard rib height is approximately 2.5–3 inches. The rib should be knitted from the same yarn composition as the body fabric for consistent shrinkage and color matching. This is the most common and expected cuff finish in hoodie construction.",
    imageUrl:
      "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 58,
    category: "Finishing & Trim",
    title: "Lycra-Reinforced Cuff",
    tags: ["Cuff", "Lycra", "Durable Stretch"],
    shortDesc:
      "Rib cuff with Lycra content for superior elasticity retention over the life of the garment.",
    detailedDesc:
      "A rib-knit cuff with 3–5% Lycra (spandex) blended into the yarn. The Lycra content ensures the rib maintains its recovery and doesn't stretch out or become loose after repeated wear and washing. This is a critical upgrade for programs using oversized silhouettes where sleeves are frequently pushed up — a motion that accelerates standard rib fatigue. Marginally higher per-unit cost than standard rib.",
    imageUrl:
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 59,
    category: "Finishing & Trim",
    title: "Raw Edge (Cut & Sew)",
    tags: ["Cuff", "Raw Edge", "Deconstructed"],
    shortDesc:
      "An unfinished, raw-cut sleeve end for a deconstructed, DIY-inflected aesthetic.",
    detailedDesc:
      "The sleeve is cut to the desired length and left unfinished — no rib, no hem, no fold. The raw edge will naturally curl and fray slightly with wear and washing, developing a lived-in, deconstructed character over time. This is an intentional design choice associated with avant-garde and anti-fashion programs. Ensure the fabric composition supports a clean cut edge (cotton-poly blends fray more cleanly than 100% cotton).",
    imageUrl:
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80&w=800",
  },

  // ─── Finishing & Trim: Hem Finish (3) ─────────────
  {
    id: 60,
    category: "Finishing & Trim",
    title: "Matching Rib Hem",
    tags: ["Hem", "Ribbed", "Classic"],
    shortDesc:
      "Rib-knit hem matching the cuff rib for a cohesive, pulled-in hemline.",
    detailedDesc:
      "A rib-knit band (matching the cuff rib specification) is sewn to the garment's lower edge, creating a pulled-in hemline that defines the waist and prevents the body from riding up. The matching rib provides visual consistency between cuff and hem. Standard rib height is 2.5–3 inches. This is the most traditional and widely expected hoodie hem finish.",
    imageUrl:
      "https://images.unsplash.com/photo-1622470953794-aa9c70b0fb9d?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 61,
    category: "Finishing & Trim",
    title: "Curved Split Hem",
    tags: ["Hem", "Split", "Modern"],
    shortDesc:
      "A gently curved hem with side splits for modern layering and movement.",
    detailedDesc:
      "The hem is finished with a clean topstitched fold (no rib) and features small 2–3 inch side splits at each side seam. The front panel is typically cut slightly shorter than the back, creating a gentle curve. The split hem allows the garment to drape freely over the hips without bunching and facilitates layering over longer tees. A signature detail of contemporary and longline hoodie programs.",
    imageUrl:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 62,
    category: "Finishing & Trim",
    title: "Raw Edge Hem",
    tags: ["Hem", "Raw Edge", "Deconstructed"],
    shortDesc:
      "An unfinished, raw-cut hemline for a deconstructed, undone silhouette.",
    detailedDesc:
      "The garment body is cut to length and left unhemmed — no rib, no topstitch, no fold. Like the raw-edge cuff, the hem will develop natural curl and fraying over time. This finish works best on cropped or standard-length silhouettes where the raw edge can be visually balanced. Ensure the tech pack specifies the cut length accounting for expected curl (typically 0.5 inches of upward curl).",
    imageUrl:
      "https://images.unsplash.com/photo-1542060748-10c28b62716f?auto=format&fit=crop&q=80&w=800",
  },

  // ─── Finishing & Trim: Cover-Stitch (3) ───────────
  {
    id: 63,
    category: "Finishing & Trim",
    title: "Single Needle",
    tags: ["Cover-Stitch", "Single Needle", "Minimal"],
    shortDesc:
      "A single-needle topstitch for the narrowest, most discreet seam finish.",
    detailedDesc:
      "A single-needle cover-stitch produces a single line of visible topstitching on the face of the garment, with a serged chain on the interior. This is the most minimal topstitch option, drawing the least visual attention to seam lines. Ideal for clean, modern aesthetics where the fabric and silhouette should speak louder than the construction details. Standard stitch gauge: 8–10 stitches per inch.",
    imageUrl:
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 64,
    category: "Finishing & Trim",
    title: "Double Needle",
    tags: ["Cover-Stitch", "Double Needle", "Standard"],
    shortDesc:
      "The industry-standard double-needle topstitch — two parallel rows for a balanced finish.",
    detailedDesc:
      "A double-needle cover-stitch produces two parallel lines of topstitching (typically 3/16\" apart) on the garment face, with a serged chain stitch on the interior. This is the most common and expected topstitch specification for hems, cuffs, and pocket openings on hoodies. It provides a clean, professional appearance that balances visual detail with subtlety. The default choice for most production programs.",
    imageUrl:
      "https://images.unsplash.com/photo-1558171813-4c088753af8f?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 65,
    category: "Finishing & Trim",
    title: "Triple Needle",
    tags: ["Cover-Stitch", "Triple Needle", "Decorative"],
    shortDesc:
      "A wide triple-needle topstitch for a bold, decorative seam detail.",
    detailedDesc:
      "A triple-needle cover-stitch produces three parallel lines of topstitching, creating a wider, more decorative seam detail that is visible from a distance. This option adds a workwear or industrial character to the garment and works especially well on heavyweight fabrics where the stitch tension can be tuned for a pronounced, embossed effect. Use sparingly as a design accent rather than a blanket specification.",
    imageUrl:
      "https://images.unsplash.com/photo-1564859228273-274232fdb516?auto=format&fit=crop&q=80&w=800",
  },
];

/* ── Component ───────────────────────────────────── */

export default function KnowledgeBase() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [copiedId, setCopiedId] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

  const filteredItems =
    activeCategory === "All"
      ? ITEMS
      : ITEMS.filter((item) => item.category === activeCategory);

  const handleCopy = (e, item) => {
    e.stopPropagation();
    const specs = `${item.title}\n${item.tags.join(" · ")}\n${item.shortDesc}`;
    navigator.clipboard.writeText(specs);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  return (
    <main className="flex-1 min-h-screen bg-cream overflow-y-auto">
      <div className="max-w-6xl mx-auto px-8 py-12">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-ink tracking-tight">
            Knowledge Base
          </h1>
          <p className="mt-2 text-ink-muted text-base">
            Standardized materials, hardware, and silhouettes for your tech
            packs.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2 scrollbar-hide">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                activeCategory === cat
                  ? "bg-zinc-900 text-white"
                  : "text-zinc-500 hover:bg-zinc-100"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className="bg-white rounded-xl border border-zinc-200 overflow-hidden shadow-sm hover:shadow-md transition-all group cursor-pointer"
            >
              {/* Image */}
              <div className="h-48 bg-zinc-100 overflow-hidden">
                <ImageWithFallback
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Content */}
              <div className="p-4 relative">
                <h3 className="text-sm font-bold text-ink leading-snug">
                  {item.title}
                </h3>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-medium px-2 py-1 rounded-md bg-zinc-100 text-zinc-700"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Description */}
                <p className="mt-2.5 text-sm text-zinc-500 leading-relaxed line-clamp-2">
                  {item.shortDesc}
                </p>

                {/* Copy button */}
                <button
                  onClick={(e) => handleCopy(e, item)}
                  title="Copy Specs"
                  className={`absolute bottom-4 right-4 w-8 h-8 flex items-center justify-center rounded-lg transition-all ${
                    copiedId === item.id
                      ? "bg-emerald-100 text-emerald-600"
                      : "bg-zinc-100 text-zinc-400 opacity-0 group-hover:opacity-100 hover:bg-zinc-200 hover:text-zinc-600"
                  }`}
                >
                  <Copy size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detail Modal */}
      {selectedItem && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center"
          onClick={() => setSelectedItem(null)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full mx-4 overflow-hidden relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-4 right-4 z-10 w-9 h-9 flex items-center justify-center rounded-full bg-black/40 text-white hover:bg-black/60 transition-colors"
            >
              <X size={18} />
            </button>

            {/* Hero image */}
            <div className="h-72 w-full bg-zinc-100 overflow-hidden">
              <ImageWithFallback
                src={selectedItem.imageUrl}
                alt={selectedItem.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Content */}
            <div className="p-8">
              <h2 className="text-2xl font-bold text-zinc-900 mb-4">
                {selectedItem.title}
              </h2>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-5">
                {selectedItem.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-medium px-2 py-1 rounded-md bg-zinc-100 text-zinc-700"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <hr className="border-zinc-200 mb-5" />

              <p className="text-zinc-600 leading-relaxed">
                {selectedItem.detailedDesc}
              </p>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
