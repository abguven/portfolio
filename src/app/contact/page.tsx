"use client";

import { useState, useRef } from "react";
import { Column, Heading, Text, Button } from "@once-ui-system/core";
import { Turnstile } from "@marsidev/react-turnstile";
import type { TurnstileInstance } from "@marsidev/react-turnstile";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const turnstileRef = useRef<TurnstileInstance>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!turnstileToken) return;
    setStatus("sending");

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, message, honeypot, turnstileToken }),
    });

    if (!res.ok) {
      turnstileRef.current?.reset();
      setTurnstileToken(null);
    }
    setStatus(res.ok ? "success" : "error");
  }

  return (
    <Column as="section" maxWidth="m" gap="xl" paddingY="xl" horizontal="center">
      <Column maxWidth="s" fillWidth gap="m" horizontal="start">
        <Heading variant="display-strong-m">Get in touch</Heading>
        <Text variant="body-default-l" onBackground="neutral-weak" align="left">
          Have a project in mind or want to discuss an opportunity? Send me a message.
        </Text>
      </Column>
      <Column maxWidth="s" fillWidth>

      {status === "success" ? (
        <Column gap="m" horizontal="center">
          <Heading variant="heading-strong-l">Message sent!</Heading>
          <Text onBackground="neutral-weak">I'll get back to you as soon as possible.</Text>
        </Column>
      ) : (
        <form onSubmit={handleSubmit} style={{ width: "100%", display: "flex", flexDirection: "column", gap: "16px", alignItems: "flex-start" }}>
          {/* Honeypot field (invisible to users) */}
          <div style={{ display: "none" }} aria-hidden="true">
            <input
              type="text"
              name="website"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
              tabIndex={-1}
              autoComplete="off"
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "6px", width: "100%" }}>
            <label htmlFor="name" style={{ fontSize: "14px", fontWeight: 500, textAlign: "left" }}>Name</label>
            <input
              id="name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{
                padding: "10px 14px",
                borderRadius: "8px",
                border: "1px solid var(--neutral-alpha-medium)",
                background: "var(--neutral-alpha-weak)",
                color: "var(--neutral-on-background-strong)",
                fontSize: "14px",
                outline: "none",
                width: "100%",
                textAlign: "left",
              }}
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "6px", width: "100%" }}>
            <label htmlFor="email" style={{ fontSize: "14px", fontWeight: 500, textAlign: "left" }}>Email</label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                padding: "10px 14px",
                borderRadius: "8px",
                border: "1px solid var(--neutral-alpha-medium)",
                background: "var(--neutral-alpha-weak)",
                color: "var(--neutral-on-background-strong)",
                fontSize: "14px",
                outline: "none",
                width: "100%",
                textAlign: "left",
              }}
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "6px", width: "100%" }}>
            <label htmlFor="message" style={{ fontSize: "14px", fontWeight: 500, textAlign: "left" }}>Message</label>
            <textarea
              id="message"
              required
              rows={6}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              style={{
                padding: "10px 14px",
                borderRadius: "8px",
                border: "1px solid var(--neutral-alpha-medium)",
                background: "var(--neutral-alpha-weak)",
                color: "var(--neutral-on-background-strong)",
                fontSize: "14px",
                outline: "none",
                resize: "vertical",
                width: "100%",
                textAlign: "left",
              }}
            />
          </div>

          {status === "error" && (
            <Text variant="body-default-s" onBackground="danger-weak" align="left">
              Something went wrong. Please try again.
            </Text>
          )}

          <Turnstile
            ref={turnstileRef}
            siteKey={process.env.NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY!}
            onSuccess={setTurnstileToken}
            onError={() => setTurnstileToken(null)}
            onExpire={() => setTurnstileToken(null)}
          />

          <Button type="submit" disabled={status === "sending" || !turnstileToken} size="l">
            {status === "sending" ? "Sending..." : "Send message"}
          </Button>
        </form>
      )}
      </Column>
    </Column>
  );
}
