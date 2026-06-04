import { NextResponse } from "next/server";

const CLAY_URLS: Record<string, string | undefined> = {
  "hiring-icp":       process.env.CLAY_HIRING_ICP,
  "account-score":    process.env.CLAY_ACCOUNT_SCORE,
  "decision-makers":  process.env.CLAY_DECISION_MAKERS,
  "lead-scoring":     process.env.CLAY_LEAD_SCORING,
  "inbound-enrich":   process.env.CLAY_INBOUND_ENRICH,
  "viral-heyreach":   process.env.CLAY_VIRAL_HEYREACH,
  "buying-signals":   process.env.CLAY_BUYING_SIGNALS,
};

export async function GET() {
  const urls: Record<string, string> = {};
  for (const [key, val] of Object.entries(CLAY_URLS)) {
    if (val) urls[key] = val;
  }
  return NextResponse.json(urls);
}
