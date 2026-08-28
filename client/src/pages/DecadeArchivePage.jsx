import { Link, useParams } from "react-router-dom";

const ARCHIVES = {
  "1950s": { title:"1950s", kicker:"A FAÍSCA", intro:"Antes de existir uma indústria chamada rock, blues, rhythm & blues, country, gospel e juventude começaram a colidir.", stories:[
    ["Little Richard — quando o rock descobriu que podia gritar","1955","Tutti Frutti não foi apenas um sucesso: a voz, o piano e a presença de Little Richard ajudaram a estabelecer o vocabulário do rock star.","https://au.rollingstone.com/music/music-features/little-richard-tribute-rob-sheffield-10847/"],
    ["Chuck Berry e a guitarra que virou gramática","1955","Maybellene misturou country e blues em alta velocidade e ajudou a cristalizar um riff que atravessaria gerações do rock.","https://au.rollingstone.com/music/music-lists/greatest-debut-songs-singles-11446/buddy-holly-and-the-crickets-thatll-be-the-day-2-11525/"],
    ["Quando o rock começou a romper a segregação","1950s","Os primeiros concertos de rock & roll também expuseram as tensões raciais dos Estados Unidos — e públicos jovens começaram a desafiar barreiras impostas nas plateias.","https://au.rollingstone.com/music/music-features/the-rope-the-forgotten-history-of-segregated-rock-roll-concerts-23426/"],
  ]},
  "1960s": { title:"1960s", kicker:"TUDO MUDOU", intro:"A década em que pop, soul, psicodelia e contracultura deixaram de caminhar separados.", stories:[
    ["Motown: a fábrica que redefiniu o pop","1960s","Detroit transformou composição, produção e performance em uma linguagem pop mundial — de Supremes e Temptations a Marvin Gaye e Stevie Wonder.","https://www.theguardian.com/music/2004/may/02/popandrock"],
    ["Beatlemania atravessa o Atlântico","1964","A chegada dos Beatles aos Estados Unidos ajudou a acelerar uma mudança cultural e comercial que redesenharia a música popular.","https://www.theguardian.com/music/2004/may/02/popandrock"],
    ["Woodstock e a transformação dos festivais","1969","Santana explodiu diante de uma audiência gigantesca e o festival tornou-se um marco de uma era em que palco, juventude e contracultura passaram a ocupar o mesmo território.","https://www.loudersound.com/features/fields-of-dreams-how-the-original-festivals-shaped-the-future-of-rock-music"],
  ]},
  "1970s": { title:"1970s", kicker:"ANOS DOURADOS", intro:"Prog, glam, hard rock e grandes discos: os anos 70 transformaram ambição em método.", stories:[
    ["David Bowie, Marc Bolan e o nascimento visual do glam","1971","Glitter, maquiagem e auto-mitologia fizeram a imagem deixar de ser embalagem e virar parte da própria linguagem do rock.","https://www.loudersound.com/features/david-bowie-the-gig-that-invented-glam-rock"],
    ["Fleetwood Mac antes de Rumours","1967–1974","Peter Green, Danny Kirwan, Jeremy Spencer e Bob Welch: antes da formação mais famosa, a banda atravessou blues, rupturas e reinvenções profundas.","https://www.loudersound.com/features/fleetwood-mac-wild-ride-the-story-of-the-blues-years"],
    ["Led Zeppelin IV: quando ignorar a crítica virou estratégia","1971","Jimmy Page relembra a criação de um álbum sem título que consolidaria a linguagem monumental do Led Zeppelin.","https://www.loudersound.com/features/the-fourth-album-it-s-good-isn-t-it"],
  ]},
  "1980s": { title:"1980s", kicker:"HITS ETERNOS", intro:"Pop virou arquitetura total: imagem, vídeo, tecnologia, rádio e palco passaram a disputar a mesma atenção.", stories:[
    ["Prince — Purple Rain e o pop sem fronteiras","1984","Rock, funk, soul e psicodelia convivem em um disco que mostrou como um artista podia atravessar gêneros sem pedir licença.","https://www.udiscovermusic.com/stories/the-sgt-pepper-of-every-decade/"],
    ["Public Image Ltd — Flowers of Romance","1981","Percussão, abrasão e experimentação empurraram o pós-punk para uma região que continuaria influenciando músicos anos depois.","https://www.udiscovermusic.com/stories/best-1981-albums/"],
    ["Psychedelic Furs — antes de Pretty in Pink","1981","Talk Talk Talk capturou uma banda ainda mais áspera antes de sua associação definitiva com o cinema adolescente dos anos 80.","https://www.udiscovermusic.com/stories/best-1981-albums/"],
  ]},
  "1990s": { title:"1990s", kicker:"A ÚLTIMA PARADA", intro:"O começo dos anos 90 herdou tudo: alternativo, eletrônico, metal, hip-hop e pop passaram a dividir o mesmo mapa.", stories:[
    ["1990 não começou do zero","1990","A virada para os anos 90 foi menos uma ruptura instantânea e mais uma colisão entre linguagens amadurecidas durante a década anterior.","https://www.theguardian.com/music/2004/may/02/popandrock"],
    ["Do pós-punk ao alternativo","1980s → 1990s","A influência de discos experimentais como Flowers of Romance ajuda a entender por que a década seguinte abriu tanto espaço para ruído, textura e desconforto.","https://www.udiscovermusic.com/stories/best-1981-albums/"],
    ["A década começa com muitas portas abertas","1990s","Rock alternativo, eletrônica e novas formas de produção não nasceram isoladas: carregavam décadas de mutações anteriores.","https://www.theguardian.com/music/2004/may/02/popandrock"],
  ]},
};

export default function DecadeArchivePage(){
 const {decade}=useParams(); const data=ARCHIVES[decade]||ARCHIVES["1950s"];
 return <main style={{background:"#f4e6cf",color:"#211c17",minHeight:"100vh",padding:"72px 0 100px"}}><div style={{width:"min(1120px,calc(100% - 32px))",margin:"auto"}}>
  <Link to="/programacao" style={{color:"#8b2d24",fontWeight:900,textDecoration:"none",fontSize:12}}>← PROGRAMAÇÃO</Link>
  <header style={{padding:"48px 0 42px",borderBottom:"1px solid #6d513333"}}><span style={{fontSize:11,fontWeight:900,letterSpacing:".18em",color:"#a43a2c"}}>GUIROPA RADIO · ARQUIVO VIVO</span><h1 style={{font:"400 clamp(64px,11vw,140px)/.82 Georgia,serif",margin:"14px 0 22px"}}>{data.title}</h1><h2 style={{fontSize:14,letterSpacing:".16em"}}>{data.kicker}</h2><p style={{maxWidth:720,lineHeight:1.7,color:"#665846"}}>{data.intro}</p></header>
  <section style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))",gap:1,background:"#6d513333",border:"1px solid #6d513333",marginTop:36}}>{data.stories.map(([title,year,dek,url])=><a key={title} href={url} target="_blank" rel="noreferrer" style={{background:"#fff8eb",color:"inherit",padding:26,minHeight:260,textDecoration:"none",display:"flex",flexDirection:"column"}}><span style={{fontSize:10,fontWeight:900,letterSpacing:".14em",color:"#a43a2c"}}>{year}</span><h3 style={{font:"400 28px/1.05 Georgia,serif",margin:"18px 0"}}>{title}</h3><p style={{lineHeight:1.6,color:"#665846"}}>{dek}</p><strong style={{marginTop:"auto",fontSize:11,letterSpacing:".1em",color:"#a43a2c"}}>LER A MATÉRIA →</strong></a>)}</section>
 </div></main>;
}
