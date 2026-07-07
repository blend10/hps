"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

// "Contact" — the "Get In Touch" enquiry form. A centered, single-column form
// on black with orange (#EF4123) accents, matching the HPS contact mock:
// bracketed title, intro + important-notice, a two-up grid of dark fields, a
// message box, an "identify as" select, a dashed file dropzone, a consent
// checkbox and a full-width SUBMIT button.
//
// The form is controlled and self-contained. On submit it currently just shows
// a local success state (no backend endpoint exists yet) — swap the body of
// `handleSubmit` for a fetch to your API when it's ready.

const IDENTIFY_OPTIONS = [
  "Military",
  "Law Enforcement",
  "Government Agency",
  "Licensed Defense Distributor",
  "Other",
];

// A dashed horizontal rule that breaks out of the centered container to span
// the full page width.
const FullWidthRule = () => (
  <div className="relative left-1/2 w-screen -translate-x-1/2 border-t border-dashed border-white/20" />
);

// Small uppercase field label used above every input.
const FieldLabel = ({ htmlFor, children }) => (
  <label
    htmlFor={htmlFor}
    className="mb-2 block text-[14px] tracking-tight font-medium uppercase tracking-[0.12em] text-neutral-300"
  >
    {children}
  </label>
);

// Shared input styling — dark fill, subtle border, orange focus ring.
const inputClass =
  "w-full rounded-sm   border border-white/10 bg-[#474747] px-4 py-3 text-[14px] text-white placeholder:text-neutral-500 outline-none transition-colors focus:border-[#EF4123]";

// A modern, custom dropdown replacing the native <select>: a styled trigger
// that opens a floating panel of options with hover + selected states, a
// rotating chevron, click-outside and Escape to close. Keeps the same dark /
// orange aesthetic as the rest of the form.
const Select = ({ value, options, onChange, id }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  // Close on outside click or Escape.
  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className="relative" ref={ref}>
      <button
        id={id}
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={`${inputClass} flex items-center justify-between text-left ${
          open ? "border-[#EF4123]" : ""
        }`}
      >
        <span>{value}</span>
        <svg
          viewBox="0 0 24 24"
          className={`h-4 w-4 shrink-0 text-neutral-300 transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      {/* Floating options panel. */}
      <ul
        role="listbox"
        className={`absolute left-0 right-0 z-20 mt-2 origin-top overflow-hidden rounded-md border border-white/10 bg-[#2a2a2a] shadow-2xl transition-all duration-200 ${
          open
            ? "pointer-events-auto scale-100 opacity-100"
            : "pointer-events-none scale-95 opacity-0"
        }`}
      >
        {options.map((opt) => {
          const selected = opt === value;
          return (
            <li key={opt} role="option" aria-selected={selected}>
              <button
                type="button"
                onClick={() => {
                  onChange(opt);
                  setOpen(false);
                }}
                className={`flex w-full items-center justify-between px-4 py-2.5 text-left text-[14px] transition-colors ${
                  selected
                    ? "bg-[#EF4123]/15 text-[#EF4123]"
                    : "text-neutral-200 hover:bg-white/5"
                }`}
              >
                <span>{opt}</span>
                {selected && (
                  <svg
                    viewBox="0 0 24 24"
                    className="h-4 w-4 shrink-0"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                )}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

const Contact = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    country: "",
    city: "",
    message: "",
    identifyAs: IDENTIFY_OPTIONS[0],
    consent: false,
  });
  const [files, setFiles] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const fileInputRef = useRef(null);

  const update = (key) => (e) =>
    setForm((f) => ({
      ...f,
      [key]: e.target.type === "checkbox" ? e.target.checked : e.target.value,
    }));

  const handleFiles = (e) => {
    setFiles(Array.from(e.target.files ?? []));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // No backend endpoint yet — show a local success state. Replace with a
    // fetch("/api/contact", …) once the endpoint exists.
    setSubmitted(true);
  };

  return (
    <section className="bg-black text-white" aria-label="Get in touch">
      <div className="mx-auto max-w-2xl px-6 py-24 md:px-8 pt-60 border border-white/20 border-dashed">
        {/* Header — bracketed title + intro + important notice. */}
        <div className="text-center  pb-12">
          <div className="relative inline-block px-5 py-2">
            <span
              aria-hidden="true"
              className="pointer-events-none absolute left-0 top-0 h-6 w-6 border-l-4 border-t-4 border-[#EF4123] md:h-8 md:w-8"
            />
            <h2 className="text-4xl font-medium tracking-tight md:text-[100px]">
              Get In Touch
            </h2>
            <span
              aria-hidden="true"
              className="pointer-events-none absolute bottom-0 right-0 h-6 w-6 border-b-4 border-r-4 border-[#EF4123] md:h-8 md:w-8"
            />
          </div>

          <p className="mx-auto mt-6 max-w-4xl text-[18px] leading-relaxed text-white">
            Whether you are a procurement officer, tactical gear distributor, or
            part of a law enforcement or military agency, we’re here to support
            your operational needs with certified, high-performance ballistic
            helmets and riot control helmet systems. We welcome inquiries
            related to product specifications, procurement procedures,
            certifications, and partnership opportunities.
          </p>

          <p className="mt-6 text-[20px] font-semibold uppercase tracking-wide text-[#EF4123]">
            Important Notice ⚠
          </p>
          <p className="mx-auto mt-2 max-w-2xl text-[16px] italic leading-relaxed text-[#EF4123]/90">
            We expressly point out that our tactical and protective helmets are
            offered exclusively to government entities, official agencies, and
            licensed defense distributors.
          </p>
        </div>
        <FullWidthRule />

        {submitted ? (
          /* Success state. */
          <div className="mt-14 rounded-md border border-[#EF4123]/40 bg-[#2a2a2a] px-6 py-10 text-center">
            <p className="text-lg font-medium">
              Thank you — your enquiry has been received.
            </p>
            <p className="mt-2 text-[13px] text-neutral-400">
              Our team will get back to you shortly.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-14 space-y-6">
            {/* First / Last name */}
            <div className="grid grid-cols-1 tracking-tight gap-6 sm:grid-cols-2">
              <div>
                <FieldLabel htmlFor="firstName">First Name</FieldLabel>
                <input
                  id="firstName"
                  type="text"
                  value={form.firstName}
                  onChange={update("firstName")}
                  placeholder="Enter your First Name..."
                  className={inputClass}
                  required
                />
              </div>
              <div>
                <FieldLabel htmlFor="lastName">Last Name</FieldLabel>
                <input
                  id="lastName"
                  type="text"
                  value={form.lastName}
                  onChange={update("lastName")}
                  placeholder="Enter your Last Name..."
                  className={inputClass}
                  required
                />
              </div>
            </div>

            {/* Email / Phone */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={update("email")}
                  placeholder="Enter your Email..."
                  className={inputClass}
                  required
                />
              </div>
              <div>
                <FieldLabel htmlFor="phone">Phone</FieldLabel>
                <input
                  id="phone"
                  type="tel"
                  value={form.phone}
                  onChange={update("phone")}
                  placeholder="Enter your Phone Number with Prefix..."
                  className={inputClass}
                />
              </div>
            </div>

            {/* Country / City */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <FieldLabel htmlFor="country">Country</FieldLabel>
                <input
                  id="country"
                  type="text"
                  value={form.country}
                  onChange={update("country")}
                  placeholder="Enter your Country..."
                  className={inputClass}
                />
              </div>
              <div>
                <FieldLabel htmlFor="city">City</FieldLabel>
                <input
                  id="city"
                  type="text"
                  value={form.city}
                  onChange={update("city")}
                  placeholder="Enter your City..."
                  className={inputClass}
                />
              </div>
            </div>

            {/* Message */}
            <div>
              <FieldLabel htmlFor="message">Message</FieldLabel>
              <textarea
                id="message"
                rows={6}
                value={form.message}
                onChange={update("message")}
                placeholder="Anything to add..."
                className={`${inputClass} resize-y`}
              />
            </div>

            {/* Identify as — custom modern dropdown. */}
            <div>
              <FieldLabel htmlFor="identifyAs">Identify As</FieldLabel>
              <Select
                id="identifyAs"
                value={form.identifyAs}
                options={IDENTIFY_OPTIONS}
                onChange={(val) => setForm((f) => ({ ...f, identifyAs: val }))}
              />
            </div>

            {/* Add additional files */}
            <div>
              <div className="mb-2 flex items-center justify-between">
                <FieldLabel htmlFor="files">Add Additional Files</FieldLabel>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="text-[11px] font-semibold uppercase tracking-tight text-[#EF4123] hover:underline"
                >
                  + Required
                </button>
              </div>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex w-full bg-[#474747] flex-col items-center justify-center gap-3 rounded-md border border-dashed border-white/25 bg-[#2a2a2a] px-6 py-12 text-center transition-colors hover:border-[#EF4123]/60"
              >
                <div className="flex flex-col items-center justify-center gap-3 bg-[#535353] p-5">
                  {" "}
                  <Image
                    src="/uploadImg.svg"
                    alt=""
                    width={80}
                    height={80}
                    aria-hidden="true"
                    className="h-[80px] w-[80px] brightness-80 invert"
                  />
                  <span className="text-[16px] font-semibold uppercase tracking-tight text-neutral-400">
                    {files.length > 0
                      ? `${files.length} file${files.length > 1 ? "s" : ""} selected`
                      : "Choose Files"}
                  </span>
                </div>
              </button>
              <input
                ref={fileInputRef}
                id="files"
                type="file"
                multiple
                onChange={handleFiles}
                className="hidden"
              />
            </div>

            {/* Consent */}
            <label className="flex items-start gap-3 text-[12px] leading-relaxed text-neutral-400">
              <input
                type="checkbox"
                checked={form.consent}
                onChange={update("consent")}
                required
                className="mt-0.5 h-4 w-4 shrink-0 accent-[#EF4123]"
              />
              <span>
                I Read and understood the{" "}
                <Link
                  href="/privacy"
                  className="text-[#EF4123] hover:underline"
                >
                  privacy policy
                </Link>
                , I authorize the treatment of my personal data by Racing Force
                S.p.A. in order to respond to my request.{" "}
                <span className="text-[#EF4123]">*</span>
              </span>
            </label>

            {/* Submit */}
            <button
              type="submit"
              className="w-full rounded-md bg-white py-3.5 text-[13px] font-bold uppercase tracking-tight text-[#EF4123] transition-colors hover:bg-neutral-200"
            >
              Submit
            </button>
          </form>
        )}
      </div>
    </section>
  );
};

export default Contact;
