export interface VeganCheckResult {
  status: "YES" | "NO" | "MAYBE";
  flaggedIngredients: string[];
}

const NON_VEGAN_DEFINITE: string[] = [
  "milk",
  "skimmed milk",
  "whole milk",
  "semi-skimmed milk",
  "milk powder",
  "whey",
  "whey powder",
  "casein",
  "caseinate",
  "sodium caseinate",
  "lactose",
  "butter",
  "buttermilk",
  "cream",
  "ghee",
  "egg",
  "eggs",
  "egg white",
  "egg yolk",
  "albumen",
  "albumin",
  "gelatin",
  "gelatine",
  "isinglass",
  "honey",
  "shellac",
  "beeswax",
  "carmine",
  "cochineal",
  "e120",
  "lanolin",
  "lard",
  "tallow",
  "suet",
  "dripping",
  "anchovy",
  "anchovies",
  "fish",
  "cod",
  "salmon",
  "tuna",
  "prawns",
  "shrimp",
  "chicken",
  "beef",
  "pork",
  "lamb",
  "turkey",
  "duck",
  "pepsin",
  "rennet",
  "collagen",
  "royal jelly",
  "l-cysteine",
  "e920",
  "vitamin d3",
];

const NON_VEGAN_MAYBE: string[] = [
  "natural flavouring",
  "natural flavoring",
  "natural flavours",
  "e471",
  "mono- and diglycerides",
  "e472",
  "e322",
  "lecithin",
  "vitamin d",
  "cholecalciferol",
  "e904",
  "e631",
  "e627",
  "e635",
  "glycerol",
  "glycerine",
  "e422",
  "stearic acid",
  "e570",
  "lactic acid",
];

function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function checkVegan(ingredientsText: string): VeganCheckResult {
  const normalized = ingredientsText.toLowerCase().replace(/[()]/g, ", ");
  const flagged: string[] = [];
  let hasMaybe = false;

  // Sort by length descending to match longer terms first
  const definiteTerms = [...NON_VEGAN_DEFINITE].sort(
    (a, b) => b.length - a.length
  );
  for (const term of definiteTerms) {
    const regex = new RegExp(`\\b${escapeRegex(term)}\\b`, "i");
    if (regex.test(normalized)) {
      flagged.push(term);
    }
  }

  if (flagged.length > 0) {
    // Deduplicate: remove shorter terms if they're substrings of longer flagged terms
    const deduped = flagged.filter((flag) => {
      return !flagged.some(
        (other) => other !== flag && other.includes(flag) && other.length > flag.length
      );
    });
    return { status: "NO", flaggedIngredients: deduped };
  }

  const maybeTerms = [...NON_VEGAN_MAYBE].sort((a, b) => b.length - a.length);
  const maybeFlags: string[] = [];
  for (const term of maybeTerms) {
    const regex = new RegExp(`\\b${escapeRegex(term)}\\b`, "i");
    if (regex.test(normalized)) {
      maybeFlags.push(term);
    }
  }

  if (maybeFlags.length > 0) {
    const deduped = maybeFlags.filter((flag) => {
      return !maybeFlags.some(
        (other) => other !== flag && other.includes(flag) && other.length > flag.length
      );
    });
    return { status: "MAYBE", flaggedIngredients: deduped };
  }

  return { status: "YES", flaggedIngredients: [] };
}
