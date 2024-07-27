import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import axios from "axios";
import { useState } from "react";

export default function Component() {
  return (
    <div>
      <header className="bg-background border-b">
        <div className="container max-w-6xl mx-auto px-4 md:px-6 py-3 flex items-center justify-between">
          <Link href="#" className="flex items-center gap-2" prefetch={false}>
            <XIcon className="h-6 w-6" />
            <span className="text-lg font-medium">Sentiment AI</span>
          </Link>
          <nav className="hidden md:flex items-center gap-4">
            <Link
              href="#"
              className="text-sm font-medium hover:underline"
              prefetch={false}
            >
              Features
            </Link>
            <Link
              href="#"
              className="text-sm font-medium hover:underline"
              prefetch={false}
            >
              Pricing
            </Link>
            <Link
              href="#"
              className="text-sm font-medium hover:underline"
              prefetch={false}
            >
              About
            </Link>
            <Link
              href="#"
              className="text-sm font-medium hover:underline"
              prefetch={false}
            >
              Contact
            </Link>
          </nav>
        </div>
      </header>

      <div className="grid md:grid-cols-[300px_1fr] gap-6 w-full max-w-6xl mx-auto p-6">
        <div className="bg-background rounded-lg border">
          <div className="p-4 border-b">
            <h2 className="text-lg font-medium">Text Analysis</h2>
          </div>
          <div className="p-4 space-y-6">
            <div className="space-y-2">
              <Label htmlFor="text-input">Paste or type your text</Label>
              <Textarea
                id="text-input"
                rows={8}
                placeholder="Start typing or paste your text here..."
                className="resize-none"
              />
            </div>
            <div className="space-y-2">
              <Label>Analysis Preferences</Label>
              <div className="grid gap-2">
                <div className="flex items-center gap-2">
                  <Checkbox id="grammar-check" defaultChecked />
                  <Label htmlFor="grammar-check">Grammar Check</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox id="spelling-check" defaultChecked />
                  <Label htmlFor="spelling-check">Spelling Check</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox id="tone-analysis" />
                  <Label htmlFor="tone-analysis">Tone Analysis</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox id="word-count" defaultChecked />
                  <Label htmlFor="word-count">Word Count</Label>
                </div>
              </div>
            </div>
            <Button>Analyze Text</Button>
          </div>
        </div>
        <div className="bg-background rounded-lg border">
          <div className="p-4 border-b">
            <h2 className="text-lg font-medium">Analysis Results</h2>
          </div>
          <div className="p-4 space-y-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-medium">Grammar Issues</h3>
                <Badge variant="outline" className="px-2 py-1 text-xs">
                  3
                </Badge>
              </div>
              <div className="space-y-2">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 text-red-500">
                    <CircleAlertIcon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">Incorrect verb tense</p>
                    <p className="text-sm text-muted-foreground">
                      The verb "was" should be in the past tense.
                    </p>
                    <div className="mt-2">
                      <Button variant="ghost" size="sm">
                        Fix
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 text-red-500">
                    <CircleAlertIcon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">Missing comma</p>
                    <p className="text-sm text-muted-foreground">
                      Add a comma after the dependent clause.
                    </p>
                    <div className="mt-2">
                      <Button variant="ghost" size="sm">
                        Fix
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-medium">Spelling Errors</h3>
                <Badge variant="outline" className="px-2 py-1 text-xs">
                  2
                </Badge>
              </div>
              <div className="space-y-2">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 text-yellow-500">
                    <TriangleAlertIcon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">Misspelled word</p>
                    <p className="text-sm text-muted-foreground">
                      The word "recieve" should be "receive".
                    </p>
                    <div className="mt-2">
                      <Button variant="ghost" size="sm">
                        Fix
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 text-yellow-500">
                    <TriangleAlertIcon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">Misspelled word</p>
                    <p className="text-sm text-muted-foreground">
                      The word "occured" should be "occurred".
                    </p>
                    <div className="mt-2">
                      <Button variant="ghost" size="sm">
                        Fix
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-medium">Tone Analysis</h3>
                <Badge variant="outline" className="px-2 py-1 text-xs">
                  Neutral
                </Badge>
              </div>
              <div className="text-sm text-muted-foreground">
                The overall tone of the text is neutral. No significant
                emotional language detected.
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-medium">Word Count</h3>
                <Badge variant="outline" className="px-2 py-1 text-xs">
                  243
                </Badge>
              </div>
              <div className="text-sm text-muted-foreground">
                The text contains 243 words.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CircleAlertIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" x2="12" y1="8" y2="12" />
      <line x1="12" x2="12.01" y1="16" y2="16" />
    </svg>
  );
}

function TriangleAlertIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3" />
      <path d="M12 9v4" />
      <path d="M12 17h.01" />
    </svg>
  );
}

function XIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}
