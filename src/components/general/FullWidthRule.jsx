// A dashed horizontal rule that breaks out of its centered container to span
// the full viewport width. Shared by Contact, Faq, and ProductDetails (each
// previously defined an identical copy).
//
// Full-bleed via a negative inline-start margin rather than the more common
// `relative left-1/2 w-screen -translate-x-1/2`. That trick silently assumes the
// element's static position is its parent's LEFT edge, which only holds in LTR —
// under `dir="rtl"` the static edge is the parent's RIGHT edge, so the rule lands
// ~830px off and drags a horizontal scrollbar onto the page.
//
// `margin-inline-start` flips with the writing direction, and `50%` resolves
// against the parent's content box, so `calc(50% - 50vw)` pulls the rule out to
// the viewport edge in both directions with no transform involved.
const FullWidthRule = () => (
  <div className="ms-[calc(50%-50vw)] w-screen border-t border-dashed border-white/20" />
);

export default FullWidthRule;