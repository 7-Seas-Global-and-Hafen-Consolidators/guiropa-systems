import { Link } from "react-router-dom";

export default function Guiropa70sTunnelEntry() {
  return (
    <section style={{background:"#100a05",color:"#f5e7ca",padding:"clamp(64px,9vw,110px) 0",borderTop:"1px solid rgba(213,122,36,.22)",borderBottom:"1px solid rgba(213,122,36,.22)"}}>
      <div className="container" style={{display:"grid",gridTemplateColumns:"minmax(0,1fr) auto",gap:"32px",alignItems:"end"}}>
        <div>
          <span style={{display:"block",fontSize:".58rem",fontWeight:900,letterSpacing:".22em",color:"#d57a24",marginBottom:"18px"}}>CONTINUOUS SIGNAL · 1970—1979</span>
          <h2 style={{fontFamily:"Georgia,serif",fontWeight:400,fontSize:"clamp(3.2rem,7vw,6.8rem)",lineHeight:.9,letterSpacing:"-.055em",margin:0}}>70s Tunnel™</h2>
          <p style={{maxWidth:"650px",color:"#aa987f",lineHeight:1.7,margin:"24px 0 0"}}>A década inteira em uma frequência contínua. Rock, pop, soul, funk, disco, soft rock e baladas — sem paredes de gênero.</p>
        </div>
        <Link to="/1977" style={{display:"inline-flex",alignItems:"center",justifyContent:"center",minHeight:"54px",padding:"0 24px",border:"1px solid #d57a24",color:"#100a05",background:"#d57a24",textDecoration:"none",fontSize:".7rem",fontWeight:900,letterSpacing:".13em",whiteSpace:"nowrap"}}>ENTER TUNNEL →</Link>
      </div>
    </section>
  );
}
