import { NextResponse } from "next/server";

const BASE = "https://github.com/rishirajpaul3/rishirajpaul3.github.io/releases/download/v1.0-builds";

const WORKFLOWS = [
  "cold-call-machine.json",
  "company-research-agent.json",
  "content-repurposing-pipeline.json",
  "email-reply-classifier.json",
  "gmail-auto-labelling.json",
  "job-application-auto-reply.json",
  "lead-to-slack.json",
  "video-to-content.json",
];

export async function GET() {
  const urls: Record<string, string> = {};
  for (const file of WORKFLOWS) {
    urls[file] = `${BASE}/${file}`;
  }
  return NextResponse.json(urls);
}
