// Renders text where `backticked` parts become inline code.
// Built from React elements instead of HTML strings, so no markup is ever injected.
export default function RichText({ text }) {
  const parts = String(text).split(/`([^`]+)`/g);
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <code key={i} className="code-inline">
            {part}
          </code>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
}
