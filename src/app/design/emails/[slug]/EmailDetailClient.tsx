"use client";

import { useMemo, useState } from "react";
import Handlebars from "handlebars";
import { Check, Copy, DownloadSimple } from "@phosphor-icons/react";
import { Badge } from "@/components/ui/Badge";
import { CopyField } from "@/components/ui/CopyField";
import { IconButton } from "@/components/ui/IconButton";
import { Select, type SelectOption } from "@/components/ui/Select";
import { Table, type TableColumn } from "@/components/ui/Table";
import { Tabs } from "@/components/ui/Tabs";
import type { EmailEntry } from "../catalog";
import styles from "./detail.module.css";

type PreviewMode = "default" | "gmail-desktop-dark";

const PREVIEW_MODE_OPTIONS: SelectOption[] = [
  { value: "default", label: "Default (Light)" },
  { value: "gmail-desktop-dark", label: "Gmail — Desktop — Dark" },
];

type DarkMethod = "approximate" | "filter";

const DARK_METHOD_OPTIONS: SelectOption[] = [
  { value: "approximate", label: "Approximate (color remap)" },
  { value: "filter", label: "CSS filter (invert)" },
];

/**
 * Rough "smart dark mode" stand-in: swaps this template's own known light
 * backgrounds/dark text (plain hex literals in its inline styles) for dark
 * equivalents, same as real client engines try to do — but leaves the brand
 * button, links, and the logo image untouched. Not a real client engine.
 */
const APPROX_DARK_COLOR_MAP: [string, string][] = [
  ["#ffffff", "#1e1e1e"],
  ["#fafafa", "#121212"],
  ["#f9fafb", "#1a1a1a"],
  ["#e4e7ec", "#2a2d33"],
  ["#101828", "#f2f2f2"],
  ["#344054", "#d6d9dd"],
  ["#667085", "#9aa1ab"],
  ["#98a2b3", "#7d8590"],
  ["#475467", "#b0b6bf"],
];

function applyApproxDarkRemap(html: string): string {
  return APPROX_DARK_COLOR_MAP.reduce((acc, [from, to]) => acc.split(from).join(to), html);
}

type DownloadFile = {
  key: string;
  file: string;
  content: string;
  mime: string;
};

type Token = { text: string; cls?: string };

function tokenize(
  text: string,
  regex: RegExp,
  classFor: (groups: (string | undefined)[]) => string | undefined
): Token[] {
  const tokens: Token[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  regex.lastIndex = 0;
  while ((match = regex.exec(text))) {
    if (match.index > lastIndex) tokens.push({ text: text.slice(lastIndex, match.index) });
    tokens.push({ text: match[0], cls: classFor(match.slice(1)) });
    lastIndex = match.index + match[0].length;
    if (match[0].length === 0) regex.lastIndex++;
  }
  if (lastIndex < text.length) tokens.push({ text: text.slice(lastIndex) });
  return tokens;
}

function renderTokens(tokens: Token[]) {
  return tokens.map((t, i) => (t.cls ? <span key={i} className={t.cls}>{t.text}</span> : t.text));
}

// Group order: key, string, number, bool, punct
const JSON_TOKEN_RE =
  /("(?:\\.|[^"\\])*"(?=\s*:))|("(?:\\.|[^"\\])*")|(-?\d+\.?\d*)|(\btrue\b|\bfalse\b|\bnull\b)|([{}[\],:])/g;

function highlightJson(text: string) {
  return renderTokens(
    tokenize(text, JSON_TOKEN_RE, ([key, string, number, bool, punct]) => {
      if (key) return styles.tokKey;
      if (string) return styles.tokString;
      if (number) return styles.tokNumber;
      if (bool) return styles.tokKeyword;
      if (punct) return styles.tokPunct;
      return undefined;
    })
  );
}

// Group order: comment, mustache, tag, tagPunct, attrName, attrValue
const HBS_TOKEN_RE =
  /(<!--[\s\S]*?-->)|(\{\{[^}]*\}\})|(<\/?[a-zA-Z][\w-]*)|(\/?>)|(\s[a-zA-Z-:]+(?==))|("[^"]*")/g;

function highlightHbs(text: string) {
  return renderTokens(
    tokenize(text, HBS_TOKEN_RE, ([comment, mustache, tag, tagPunct, attrName, attrValue]) => {
      if (comment) return styles.tokComment;
      if (mustache) return styles.tokMustache;
      if (tag) return styles.tokTag;
      if (tagPunct) return styles.tokPunct;
      if (attrName) return styles.tokAttr;
      if (attrValue) return styles.tokString;
      return undefined;
    })
  );
}

function CopyIconButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <IconButton variant="ghost" size="sm" label={copied ? "Copied" : "Copy"} onClick={handleCopy}>
      {copied ? <Check size={14} weight="bold" /> : <Copy size={14} weight="bold" />}
    </IconButton>
  );
}

type DetailTab = "preview" | "code" | "download";

const TABS: { value: DetailTab; label: string }[] = [
  { value: "preview", label: "Preview" },
  { value: "code", label: "Code" },
  { value: "download", label: "Download options" },
];

function typeTone(type: EmailEntry["type"]): "info" | "purple" | "amber" {
  if (type === "system") return "info";
  if (type === "marketing") return "purple";
  return "amber";
}

function statusTone(status: EmailEntry["status"]): "success" | "neutral" | "danger" {
  if (status === "active") return "success";
  if (status === "draft") return "neutral";
  return "danger";
}

function downloadText(filename: string, content: string, mime: string) {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export function EmailDetailClient({ entry }: { entry: EmailEntry }) {
  const [tab, setTab] = useState<DetailTab>("preview");
  const [previewMode, setPreviewMode] = useState<PreviewMode>("default");
  const [darkMethod, setDarkMethod] = useState<DarkMethod>("approximate");
  const jsonString = useMemo(() => JSON.stringify(entry.defaultProps, null, 2), [entry.defaultProps]);

  const compiled = useMemo(() => {
    try {
      const tmpl = Handlebars.compile(entry.template);
      const html = tmpl(entry.defaultProps);
      // Also compile subject/preheader for display
      const subjectTmpl = Handlebars.compile(entry.subject);
      const subject = subjectTmpl(entry.defaultProps);
      const preheader = entry.preheader
        ? Handlebars.compile(entry.preheader)(entry.defaultProps)
        : null;
      return { html, subject, preheader, error: null };
    } catch (e) {
      return { html: "", subject: entry.subject, preheader: entry.preheader ?? null, error: (e as Error).message };
    }
  }, [entry.template, entry.subject, entry.preheader, entry.defaultProps]);

  const isDarkMode = previewMode === "gmail-desktop-dark";

  const previewSrcDoc = useMemo(
    () => (isDarkMode && darkMethod === "approximate" ? applyApproxDarkRemap(compiled.html) : compiled.html),
    [compiled.html, isDarkMode, darkMethod]
  );

  const files: DownloadFile[] = useMemo(
    () => [
      { key: "hbs", file: `${entry.slug}.hbs`, content: entry.template, mime: "text/x-handlebars;charset=utf-8" },
      { key: "json", file: `${entry.slug}.json`, content: jsonString, mime: "application/json;charset=utf-8" },
      { key: "html", file: `${entry.slug}.html`, content: compiled.html, mime: "text/html;charset=utf-8" },
    ],
    [entry.slug, entry.template, compiled.html, jsonString]
  );

  const fileColumns: TableColumn<DownloadFile>[] = [
    {
      key: "file",
      header: "File",
      render: (row) => <code className={styles.fileName}>{row.file}</code>,
    },
    {
      key: "download",
      header: "Download",
      width: "110px",
      align: "center",
      render: (row) => (
        <IconButton
          variant="secondary"
          size="sm"
          label={`Download ${row.file}`}
          onClick={() => downloadText(row.file, row.content, row.mime)}
        >
          <DownloadSimple size={14} weight="bold" />
        </IconButton>
      ),
    },
    {
      key: "copy",
      header: "Copy",
      width: "90px",
      align: "center",
      render: (row) => <CopyIconButton value={row.content} />,
    },
  ];

  return (
    <>
      <div className={styles.header}>
        <div className={styles.titleRow}>
          <h1 className={styles.title}>{entry.name}</h1>
          <div className={styles.badges}>
            <Badge tone={typeTone(entry.type)}>{entry.type}</Badge>
            <Badge tone={statusTone(entry.status)}>{entry.status}</Badge>
          </div>
        </div>
        <p className={styles.desc}>{entry.description}</p>

        <div className={styles.fields}>
          <div className={styles.field}>
            <span className={styles.fieldLabel}>Subject</span>
            <CopyField value={compiled.subject} copyVariant="secondary" />
          </div>
          {compiled.preheader && (
            <div className={styles.field}>
              <span className={styles.fieldLabel}>Preheader</span>
              <p className={styles.preheaderText}>{compiled.preheader}</p>
            </div>
          )}
        </div>
      </div>

      <div className={styles.tabsWrap}>
        <Tabs items={TABS} value={tab} onChange={(v) => setTab(v as DetailTab)} />
      </div>

      {tab === "preview" && (
        <>
          <div className={styles.previewToolbar}>
            <Select
              options={PREVIEW_MODE_OPTIONS}
              value={previewMode}
              onChange={(v) => setPreviewMode(v as PreviewMode)}
            />
            <Select
              options={DARK_METHOD_OPTIONS}
              value={darkMethod}
              onChange={(v) => setDarkMethod(v as DarkMethod)}
              disabled={!isDarkMode}
            />
          </div>

          <div className={styles.previewWrap}>
            <div className={styles.previewHeader}>
              <span>{compiled.subject}</span>
            </div>
            {compiled.error ? (
              <div className={styles.error}>Can’t render preview: {compiled.error}</div>
            ) : (
              <iframe
                title={`${entry.name} preview`}
                className={[
                  styles.previewFrame,
                  isDarkMode && darkMethod === "filter" ? styles.previewFrameInverted : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                sandbox="allow-same-origin"
                srcDoc={previewSrcDoc}
              />
            )}
          </div>
        </>
      )}

      {tab === "code" && (
        <div className={styles.codeRow}>
          <div className={styles.codeBlock}>
            <div className={styles.codeHeader}>
              <span className={styles.codeHeaderLabel}>Props — JSON</span>
            </div>
            <div className={styles.codeContent}>
              <pre className={styles.jsonPre}>{highlightJson(jsonString)}</pre>
            </div>
          </div>

          <div className={styles.codeBlock}>
            <div className={styles.codeHeader}>
              <span className={styles.codeHeaderLabel}>Template — Handlebars</span>
            </div>
            <div className={styles.codeContent}>
              <pre className={styles.hbsPre}>{highlightHbs(entry.template)}</pre>
              {compiled.error && <div className={styles.error}>Compile error: {compiled.error}</div>}
            </div>
            <div className={styles.codeFooter}>
              <CopyField value={entry.template} multiline />
            </div>
          </div>
        </div>
      )}

      {tab === "download" && (
        <Table columns={fileColumns} rows={files} rowKey={(r) => r.key} />
      )}
    </>
  );
}
