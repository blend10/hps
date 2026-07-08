import { Fragment } from "react";

// Renders a dictionary value that is an array of lines, joined with <br/>.
//
// Headlines in the design are hard-broken across lines ("Protecting" / "the
// Best"). Those break points are language-specific — German compounds run long,
// Arabic runs short — so the dictionary stores each headline as an array and the
// translator chooses its own breaks. Passing a bare string renders one line, so
// a locale is free to collapse a two-line headline into one.
//
// No "use client": this is a plain, stateless component usable from both Server
// and Client Components.
const Lines = ({ lines }) =>
  (Array.isArray(lines) ? lines : [lines]).map((line, i) => (
    <Fragment key={i}>
      {i > 0 && <br />}
      {line}
    </Fragment>
  ));

export default Lines;
