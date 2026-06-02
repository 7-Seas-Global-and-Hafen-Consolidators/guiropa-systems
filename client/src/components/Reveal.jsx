import { useReveal } from "../hooks/useReveal.js";

export default function Reveal({ children, className = "", delay = 0, as: Tag = "div" }) {
  const ref = useReveal(delay);
  return (
    <Tag ref={ref} className={`reveal ${className}`.trim()}>
      {children}
    </Tag>
  );
}
