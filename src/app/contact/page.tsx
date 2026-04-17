"use client";

import { useState } from "react";
import { Column, Heading, Text, Button } from "@once-ui-system/core";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, message }),
    });

    setStatus(res.ok ? "success" : "error");
  }

  return (
    <Column as="section" maxWidth="s" horizontal="center" gap="xl" paddingY="xl">
      <Column gap="m">
        <Heading variant="display-strong-m">Get in touch</Heading>
        <Text variant="body-default-l" onBackground="neutral-weak">
          Have a project in mind or want to discuss an opportunity? Send me a message.
        </Text>
      </Column>

      {status === "success" ? (
        <Column gap="m" horizontal="center">
          <Heading variant="heading-strong-l">Message sent!</Heading>
          <Text onBackground="neutral-weak">I'll get back to you as soon as possible.</Text>
        </Column>
      ) : (
        <form onSubmit={handleSubmit} style={{ width: "100%", display: "flex", flexDirection: "column", gap: "16px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <label htmlFor="name" style={{ fontSize: "14px", fontWeight: 500 }}>Name</label>
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
              }}
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <label htmlFor="email" style={{ fontSize: "14px", fontWeight: 500 }}>Email</label>
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
              }}
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <label htmlFor="message" style={{ fontSize: "14px", fontWeight: 500 }}>Message</label>
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
              }}
            />
          </div>

          {status === "error" && (
            <Text variant="body-default-s" onBackground="danger-weak">
              Something went wrong. Please try again.
            </Text>
          )}

          <Button type="submit" disabled={status === "sending"} size="l">
            {status === "sending" ? "Sending..." : "Send message"}
          </Button>
        </form>
      )}
    </Column>
  );
}
