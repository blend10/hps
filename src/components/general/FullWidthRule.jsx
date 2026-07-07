// A dashed horizontal rule that breaks out of its centered container to span
// the full viewport width. Shared by Contact, Faq, and ProductDetails (each
// previously defined an identical copy).
const FullWidthRule = () => (
  <div className="relative left-1/2 w-screen -translate-x-1/2 border-t border-dashed border-white/20" />
);

export default FullWidthRule;
