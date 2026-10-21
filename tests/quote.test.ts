import { test } from "node:test";
import assert from "node:assert/strict";
import {
  validContact,
  quoteErrors,
  quoteMessage,
  whatsappUrl,
  emailUrl,
  type Quote,
} from "../src/lib/quote.ts";
const valid: Quote = {
  name: "اختبار مدار",
  contact: "test@example.com",
  service: "اختبار & تطوير",
  description: "وصف مشروع تجريبي بأكثر من عشرين حرفًا مع رموز & ? # +",
  timeframe: "خلال شهر",
  budget: "قابل للنقاش",
  consent: true,
};
test("accepts email and international/local phones while rejecting invalid contact", () => {
  for (const value of ["test@example.com", "+966 59 607 3350", "0596073350"])
    assert.equal(validContact(value), true, value);
  for (const value of [
    "",
    "not-email",
    "a@b",
    "123",
    "<script>alert(1)</script>",
    "+--- ---",
  ])
    assert.equal(validContact(value), false, value);
});
test("requires all inquiry fields and explicit consent", () => {
  const errors = quoteErrors(
    {
      name: "",
      contact: "",
      service: "",
      description: "",
      timeframe: "",
      budget: "",
      consent: false,
    },
    "ar",
  );
  assert.deepEqual(
    Object.keys(errors).sort(),
    [
      "name",
      "contact",
      "service",
      "description",
      "timeframe",
      "consent",
    ].sort(),
  );
  assert.deepEqual(quoteErrors(valid, "ar"), {});
  assert.deepEqual(quoteErrors({ ...valid, budget: "" }, "en"), {});
});
test("rejects whitespace names and overlong descriptions", () => {
  assert.ok(quoteErrors({ ...valid, name: "  " }, "ar").name);
  assert.ok(
    quoteErrors({ ...valid, description: "x".repeat(2001) }, "en").description,
  );
});
test("WhatsApp URI preserves Arabic and reserved characters without query injection", () => {
  const url = new URL(whatsappUrl(valid, "ar"));
  assert.equal(url.origin, "https://wa.me");
  assert.equal(url.pathname, "/966596073350");
  assert.equal([...url.searchParams.keys()].length, 1);
  assert.equal(url.searchParams.get("text"), quoteMessage(valid, "ar"));
  assert.ok(url.searchParams.get("text")?.includes(valid.description));
});
test("email alternative encodes subject and body", () => {
  const url = new URL(emailUrl(valid, "en"));
  assert.equal(url.protocol, "mailto:");
  assert.equal(url.pathname, "edubridge.tech@gmail.com");
  assert.equal(url.searchParams.get("subject"), "Quotation request — MADAR");
  assert.equal(url.searchParams.get("body"), quoteMessage(valid, "en"));
});
