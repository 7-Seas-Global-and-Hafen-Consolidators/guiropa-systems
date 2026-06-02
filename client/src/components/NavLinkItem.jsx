import { Link } from "react-router-dom";

/** Link interno (rotas ou âncoras na home). */
export default function NavLinkItem({ href, className, children, onClick }) {
  return (
    <Link to={href} className={className} onClick={onClick}>
      {children}
    </Link>
  );
}
