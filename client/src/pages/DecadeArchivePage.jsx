import { Link, useParams } from "react-router-dom";

const ARCHIVES = {
  "1950s": {
    title: "1950s",
    kicker: "A FAÍSCA",
    subtitle: "Quando juventude, rádio e música negra mudaram o eixo da cultura popular.",
    intro: [
      "Antes de o rock virar indústria, camiseta, pose e memória, ele foi uma colisão. Rhythm & blues, gospel, blues elétrico, country, western swing e boogie encontraram uma geração que tinha dinheiro no bolso, rádio no quarto e pouca vontade de obedecer ao gosto dos pais.",
      "Os anos 50 não inventaram a rebeldia. Inventaram uma forma nova de fazê-la circular. Um disco de 45 rotações, um locutor disposto a atravessar fronteiras raciais, uma guitarra elétrica e alguns minutos de televisão podiam transformar uma música local em assunto nacional. Foi assim que uma faísca virou incêndio.",
    ],
    chapters: [
      {
        eyebrow: "01 · ANTES DO NOME",
        title: "O rock já existia antes de alguém decidir chamá-lo de rock.",
        paragraphs: [
          "Nas igrejas negras do Sul dos Estados Unidos havia intensidade vocal. Nos clubes de rhythm & blues havia bateria, saxofone, baixo e eletricidade. No country e no western swing havia velocidade, narrativa e uma tradição branca rural que também buscava novos públicos. O que os anos 50 fizeram foi aproximar mundos que a sociedade insistia em manter separados.",
          "Artistas como Sister Rosetta Tharpe, Fats Domino, Ruth Brown, Big Joe Turner e outros já haviam preparado o terreno. Quando Chuck Berry, Little Richard, Bo Diddley, Bill Haley, Elvis Presley, Buddy Holly e Jerry Lee Lewis começaram a ocupar o centro da cultura jovem, a mistura já estava em movimento havia anos.",
        ],
      },
      {
        eyebrow: "02 · O ADOLESCENTE",
        title: "A indústria descobriu um público que queria ter seu próprio som.",
        paragraphs: [
          "O pós-guerra criou uma figura comercial poderosa: o teenager. Não era apenas uma idade. Era um mercado. Jovens compravam discos, ouviam rádio, frequentavam bailes, imitavam roupas e procuravam algo que não soasse como a sala de estar de seus pais.",
          "O rock encontrou esse público no momento exato. As letras falavam de carros, escola, namoro, dança, frustração e liberdade. Chuck Berry entendeu isso com precisão rara: escreveu sobre a vida jovem como se ela merecesse ser assunto central da música popular.",
        ],
      },
      {
        eyebrow: "03 · A BARREIRA",
        title: "A música atravessou fronteiras que o país ainda mantinha de pé.",
        paragraphs: [
          "O mercado fonográfico americano era profundamente dividido por raça. Músicas negras eram confinadas a categorias específicas e muitas vezes ganhavam versões brancas destinadas ao mercado pop. Ainda assim, rádio, jukeboxes e o desejo do público jovem começaram a embaralhar essa separação.",
          "Não foi uma integração limpa ou justa. Artistas negros continuaram enfrentando exclusão, apropriação, contratos ruins e segregação em turnês. Mas a circulação do rhythm & blues entre jovens brancos expôs uma contradição impossível de esconder: a cultura dominante queria a energia daquela música mesmo quando a sociedade ainda discriminava quem a havia criado.",
        ],
      },
      {
        eyebrow: "04 · A IMAGEM",
        title: "Então apareceu Elvis — e a televisão entendeu que também havia um corpo naquela música.",
        paragraphs: [
          "Elvis Presley não criou o rock, mas tornou impossível ignorá-lo. Sua combinação de country, blues, gospel e performance sexualizada condensou influências negras e brancas em uma figura que a grande indústria conseguia vender em escala nacional.",
          "A televisão ampliou tudo: voz, roupa, cabelo, movimento, reação da plateia. O rock deixou de ser apenas um som e virou linguagem corporal. A geração jovem não estava somente ouvindo diferente. Estava se vestindo, dançando e se comportando diferente.",
        ],
      },
      {
        eyebrow: "05 · A GRAMÁTICA",
        title: "Guitarra, piano, bateria e três minutos bastaram para construir um idioma.",
        paragraphs: [
          "Chuck Berry ajudou a transformar a guitarra em símbolo e ferramenta narrativa. Little Richard mostrou que uma voz podia rasgar a canção de dentro para fora. Buddy Holly mostrou como banda, composição e estúdio podiam caminhar juntos. Fats Domino provou que suavidade e balanço não eram opostos.",
          "O rock dos anos 50 parecia simples porque precisava ser imediato. Mas sua simplicidade aparente continha um método que seria reutilizado por décadas: riff reconhecível, refrão direto, identidade forte e a sensação de que aquela música pertencia primeiro a quem a ouvia agora — não a quem havia mandado na cultura antes.",
        ],
      },
      {
        eyebrow: "06 · O QUE FICOU",
        title: "No fim da década, quase tudo já tinha mudado.",
        paragraphs: [
          "Escândalos, acidentes, serviço militar, mortes precoces e mudanças na indústria encerraram a primeira explosão do rock com uma rapidez brutal. Mas não havia volta. O mercado jovem existia. A guitarra elétrica tinha virado protagonista. A música negra havia atravessado o centro do pop. E uma nova ideia de estrela havia sido criada.",
          "Os anos 60 herdariam essa linguagem e a fariam explodir em direções que ninguém em 1955 conseguiria prever. Mas a porta já estava aberta. E portas abertas fazem barulho quando uma geração inteira resolve passar por elas ao mesmo tempo.",
        ],
      },
    ],
    quote: "O rock dos anos 50 não foi o começo de tudo. Foi o momento em que muitas coisas antigas encontraram um público novo — e o mundo percebeu o impacto.",
    sources: [
      ["W. W. Norton · The Birth and First Flourishing of Rock and Roll", "https://nerd.wwnorton.com/ebooks/epub/whatsthatsound6/EPUB/content/2.1.0-chapter02.xhtml"],
      ["EBSCO · Rock and roll in the 1950s", "https://www.ebsco.com/research-starters/music/rock-and-roll-1950s"],
      ["Digital History · Rock 'n' roll and youth culture", "https://www.digitalhistory.uh.edu/era.cfm?eraID=16&smtid=6"],
    ],
  },

  "1960s": {
    title: "1960s",
    kicker: "TUDO MUDOU",
    subtitle: "A década em que pop, política, estúdio e juventude passaram a falar ao mesmo tempo.",
    intro: [
      "Os anos 60 começaram com a promessa de continuidade e terminaram irreconhecíveis. Em menos de dez anos, a música popular atravessou Motown, British Invasion, folk de protesto, soul, psicodelia, festivais gigantes, experimentação de estúdio e uma nova noção do que um álbum podia significar.",
      "Foi também a década em que a canção deixou de ser apenas entretenimento para muita gente. Ela virou identidade, argumento, protesto, moda, comunidade e documento de uma sociedade em conflito.",
    ],
    chapters: [
      {
        eyebrow: "01 · DETROIT",
        title: "Motown construiu uma máquina de hits e colocou artistas negros no centro do pop.",
        paragraphs: [
          "Berry Gordy organizou a Motown com disciplina quase industrial: compositores, produtores, músicos de estúdio, coreografia, figurino e controle de qualidade. Mas chamar aquilo apenas de fórmula seria reduzir demais o que aconteceu em Detroit.",
          "Smokey Robinson, Supremes, Temptations, Four Tops, Stevie Wonder, Marvin Gaye, Martha and the Vandellas e muitos outros ajudaram a criar um som reconhecível, moderno e profundamente enraizado em gospel, R&B e jazz. Motown vendeu milhões de discos e atravessou um mercado ainda segregado.",
        ],
      },
      {
        eyebrow: "02 · LIVERPOOL CHEGA À AMÉRICA",
        title: "A British Invasion devolveu aos Estados Unidos uma versão transformada de sua própria música.",
        paragraphs: [
          "Beatles, Rolling Stones, Kinks, Animals, Who e outros haviam crescido ouvindo rock and roll, blues, soul e rhythm & blues americanos. Quando chegaram ao mercado dos Estados Unidos, trouxeram essas influências de volta com novas composições, sotaques, estética de grupo e uma energia diferente.",
          "A aparição dos Beatles no Ed Sullivan Show em 1964 virou símbolo porque condensou algo maior: a música jovem havia se tornado internacional. Londres, Liverpool, Detroit, Memphis, Los Angeles e Nova York já pertenciam ao mesmo mapa cultural.",
        ],
      },
      {
        eyebrow: "03 · O ESTÚDIO",
        title: "A gravação deixou de documentar uma performance e passou a criar mundos impossíveis de reproduzir ao vivo.",
        paragraphs: [
          "Produtores e bandas começaram a usar fita, sobreposições, efeitos, microfonação e montagem como parte da composição. Phil Spector já havia mostrado o poder de uma produção monumental; depois, Beatles, Beach Boys, Hendrix e tantos outros levaram o estúdio ainda mais longe.",
          "O álbum deixou de ser apenas uma coleção de singles. Podia ter unidade, conceito, atmosfera. A pergunta mudou: em vez de 'como registrar essa música?', passou a ser 'o que só podemos fazer porque estamos dentro de um estúdio?'.",
        ],
      },
      {
        eyebrow: "04 · A CANÇÃO TOMA POSIÇÃO",
        title: "Folk, soul e rock começaram a carregar o peso do tempo em que estavam sendo feitos.",
        paragraphs: [
          "Movimento pelos direitos civis, guerra do Vietnã, conflitos raciais e contestação política atravessaram a música. Bob Dylan levou a tradição folk para uma nova geração e depois chocou puristas ao eletrificá-la. No soul, vozes e repertórios passaram a incorporar orgulho, resistência e transformação social.",
          "Não existia uma única trilha sonora para a década. Existiam disputas. Era justamente isso que tornava o período tão vivo: a música não observava a mudança de longe; ela estava dentro dela.",
        ],
      },
      {
        eyebrow: "05 · PSICODELIA",
        title: "Quando a forma tradicional começou a parecer pequena demais.",
        paragraphs: [
          "Na segunda metade da década, psicodelia, improvisação, feedback, gravações experimentais e novas estruturas ampliaram os limites do rock. Jimi Hendrix tratou a guitarra como laboratório. Bandas em San Francisco aproximaram música, comunidade e contracultura. No Reino Unido, grupos experimentaram composição, timbre e formatos longos.",
          "O resultado não foi apenas um novo gênero. Foi a ideia de que música popular podia ser estranha, ambiciosa, abstrata e ainda assim alcançar milhões de pessoas.",
        ],
      },
      {
        eyebrow: "06 · WOODSTOCK",
        title: "O festival virou uma cidade temporária e um espelho das utopias da juventude.",
        paragraphs: [
          "Em agosto de 1969, centenas de milhares de pessoas foram a Bethel, no estado de Nova York. Woodstock virou símbolo instantâneo de uma cultura juvenil que acreditava poder inventar outra maneira de viver — pelo menos por alguns dias.",
          "Mas 1969 também carregava violência, frustração política e o desgaste da própria contracultura. A década terminou com triunfo e exaustão ao mesmo tempo. A música havia conquistado um poder cultural enorme. Agora teria de descobrir o que fazer com ele.",
        ],
      },
    ],
    quote: "Os anos 60 não escolheram um único som. Escolheram a mudança como método.",
    sources: [
      ["Smithsonian Magazine · Motown Turns 50", "https://www.smithsonianmag.com/arts-culture/motown-turns-50-143158529/"],
      ["EBSCO · Rock and roll / British Invasion", "https://www.ebsco.com/research-starters/music/rock-and-roll"],
      ["EBSCO · Woodstock and 1960s youth culture", "https://www.ebsco.com/research-starters/history/woodstock-music-festival-marks-climax-1960s-youth-culture"],
    ],
  },

  "1970s": {
    title: "1970s",
    kicker: "ANOS DOURADOS",
    subtitle: "A década em que o rock ficou enorme — e imediatamente começou a se dividir contra si mesmo.",
    intro: [
      "Se os anos 60 abriram portas, os anos 70 construíram corredores inteiros atrás delas. O álbum ganhou status de obra, o estádio virou destino natural de bandas gigantes, a tecnologia de gravação ficou mais sofisticada e a indústria fonográfica alcançou uma escala que poucos imaginavam dez anos antes.",
      "Mas crescimento nunca significa unidade. Enquanto o hard rock ficava mais pesado e o progressivo mais ambicioso, o glam transformava identidade em espetáculo, o soft rock aperfeiçoava a melodia, a disco reconstruía a pista de dança e o punk aparecia para dizer que talvez tudo tivesse ficado grande demais.",
    ],
    chapters: [
      {
        eyebrow: "01 · O ÁLBUM",
        title: "O disco deixou de ser embalagem para singles e virou um território inteiro.",
        paragraphs: [
          "Pink Floyd, Led Zeppelin, Fleetwood Mac, Stevie Wonder, Joni Mitchell, David Bowie e tantos outros ajudaram a consolidar uma era em que ouvir um álbum do começo ao fim fazia parte da experiência. Sequência, capa, produção, conceito e duração importavam.",
          "O formato LP favorecia ambição. Havia espaço para canções longas, suítes, narrativas, experimentos de estúdio e mudanças de clima que não cabiam em três minutos de rádio.",
        ],
      },
      {
        eyebrow: "02 · PESO E AMBIÇÃO",
        title: "Hard rock e progressive rock levaram técnica, volume e escala ao limite.",
        paragraphs: [
          "Black Sabbath aprofundou uma linguagem pesada e sombria. Led Zeppelin combinou blues, folk, volume e monumentalidade. Deep Purple, Uriah Heep e outros mostraram quantas formas o peso poderia assumir. Ao mesmo tempo, Yes, Genesis, King Crimson, Emerson Lake & Palmer e Pink Floyd expandiam estruturas e texturas.",
          "O rock queria provar que podia ocupar qualquer espaço — de uma canção simples a uma composição longa, de um clube a uma arena, de um riff direto a uma arquitetura musical quase sinfônica.",
        ],
      },
      {
        eyebrow: "03 · GLAM",
        title: "A imagem parou de pedir desculpas e entrou no palco como parte da música.",
        paragraphs: [
          "David Bowie, Marc Bolan, Roxy Music, Queen e outros transformaram maquiagem, figurino, teatralidade, ficção científica, sexualidade e excesso visual em linguagem artística. O glam não era apenas roupa brilhante. Era uma declaração de que identidade também podia ser composta.",
          "A década entendeu que som e imagem não precisavam disputar espaço. Podiam contar a mesma história de maneiras diferentes — uma ideia que os anos 80 levariam ao extremo.",
        ],
      },
      {
        eyebrow: "04 · CANÇÕES PARA FICAR",
        title: "Enquanto o rock crescia, melodias íntimas também dominavam rádios e salas de estar.",
        paragraphs: [
          "Carole King, James Taylor, Eagles, Fleetwood Mac, Elton John, Billy Joel e uma enorme corrente de soft rock e singer-songwriters mostraram que a década não era feita apenas de amplificadores no máximo. Havia espaço para confissão, arranjo elegante, harmonias vocais e produção refinada.",
          "Muitas dessas músicas sobreviveram justamente porque não dependiam de uma única moda. Eram construídas sobre melodia, interpretação e uma proximidade emocional que continuou funcionando muito depois que a estética da época mudou.",
        ],
      },
      {
        eyebrow: "05 · A PISTA",
        title: "Disco transformou a noite, o estúdio e a batida em centro de gravidade.",
        paragraphs: [
          "Em clubes frequentados por comunidades negras, latinas e LGBTQ+, DJs e produtores desenvolveram uma cultura em que a continuidade da dança importava tanto quanto a canção individual. A batida de quatro tempos, os arranjos orquestrais, o baixo e a produção de estúdio criaram uma nova arquitetura para a pista.",
          "Quando a disco explodiu comercialmente, levou consigo moda, cinema, comportamento e uma nova ideia sobre a função social da música. A reação contra ela também revelou preconceitos e disputas culturais que iam muito além de gosto musical.",
        ],
      },
      {
        eyebrow: "06 · PUNK",
        title: "Então alguém arrancou os enfeites da parede e contou até quatro.",
        paragraphs: [
          "Ramones, Sex Pistols, Clash, Damned, Buzzcocks e outros devolveram urgência, simplicidade e confronto ao centro da conversa. Parte do punk nasceu como reação a uma indústria que parecia distante demais da energia imediata de uma banda tocando para uma sala pequena.",
          "Seu legado foi maior que as vendas: independência, selos pequenos, fanzines, estética DIY e a ideia de que técnica não precisava ser autorização para começar. O fim dos anos 70 já estava preparando pós-punk, new wave, hardcore e boa parte do que dominaria a década seguinte.",
        ],
      },
    ],
    quote: "Os anos 70 ficaram gigantes. O punk apareceu para lembrar que três acordes ainda podiam derrubar uma parede.",
    sources: [
      ["Popular Music History · Rethinking the popular music of the 1970s", "https://doi.org/10.1558/pomh.v2i1.5"],
      ["Oxford Academic · Hard Rock, Glam Rock, and Progressive Rock in the 1970s", "https://academic.oup.com/book/39865/chapter-abstract/340042551"],
      ["EBSCO / music history references", "https://www.ebsco.com/research-starters/music/popular-music"],
    ],
  },

  "1980s": {
    title: "1980s",
    kicker: "HITS ETERNOS",
    subtitle: "Quando a música ganhou tela, tecnologia e uma nova escala de espetáculo.",
    intro: [
      "Os anos 80 não inventaram a relação entre música e imagem, mas a industrializaram. Videoclipes, televisão por assinatura, sintetizadores, drum machines, samplers e novas técnicas de produção mudaram tanto o som quanto a maneira de construir uma estrela.",
      "Foi uma década de superfícies brilhantes e subterrâneos profundos. Madonna, Michael Jackson, Prince e Whitney Houston coexistiam com hip-hop em expansão, house nas pistas, pós-punk, goth, college rock, thrash metal e cenas independentes que já preparavam a ruptura dos anos seguintes.",
    ],
    chapters: [
      {
        eyebrow: "01 · A TELA",
        title: "A MTV fez o público ouvir com os olhos.",
        paragraphs: [
          "Quando a MTV entrou no ar em 1981, o videoclipe ganhou uma força comercial inédita. Artistas britânicos da new wave perceberam rapidamente o poder do formato, e a chamada Second British Invasion encontrou nos Estados Unidos uma vitrine perfeita.",
          "A partir daí, cabelo, figurino, coreografia, iluminação e narrativa visual passaram a influenciar diretamente a carreira de um single. Uma música podia ser ótima; mas um vídeo inesquecível podia transformar seu alcance.",
        ],
      },
      {
        eyebrow: "02 · A MÁQUINA",
        title: "Sintetizadores e baterias eletrônicas deixaram de parecer futuro e viraram presente.",
        paragraphs: [
          "Tecnologias antes caras ou restritas começaram a se tornar centrais na produção pop. Sintetizadores, sequenciadores, samplers e drum machines permitiam novas texturas, precisão rítmica e camadas que redesenharam a estética do estúdio.",
          "Synthpop, new wave, electro, house e parte do pop mainstream nasceram dessa nova relação com máquinas. O debate entre 'orgânico' e 'eletrônico' parecia importante na época. Hoje sabemos que a década estava ensinando a música popular a conviver com os dois.",
        ],
      },
      {
        eyebrow: "03 · MEGASTAR",
        title: "Michael Jackson, Madonna e Prince transformaram carreira em linguagem total.",
        paragraphs: [
          "Michael Jackson expandiu a escala do videoclipe e da performance pop. Madonna fez da reinvenção visual e do controle de narrativa parte inseparável de sua obra. Prince recusou fronteiras simples entre rock, funk, soul, pop e psicodelia.",
          "O artista de topo já não era apenas voz ou compositor. Era imagem, palco, coreografia, entrevista, moda, produção, controvérsia e espetáculo global. A década construiu o modelo de superstar que ainda domina boa parte da indústria.",
        ],
      },
      {
        eyebrow: "04 · HIP-HOP",
        title: "Enquanto a televisão vendia brilho, outra revolução crescia em ruas, clubes e rádios urbanas.",
        paragraphs: [
          "O hip-hop havia nascido nos anos 70, mas nos 80 consolidou linguagem, indústria e identidade. Rap, DJing, sampling e cultura de rua se expandiram de Nova York para uma escala nacional e depois internacional.",
          "Run-D.M.C., Public Enemy, LL Cool J, Beastie Boys, Eric B. & Rakim e muitos outros mostraram que o gênero não era uma curiosidade passageira. Era uma nova estrutura para ritmo, palavra, autoria e comentário social.",
        ],
      },
      {
        eyebrow: "05 · VOLUME",
        title: "Arena rock, hard rock e metal aprenderam a ocupar espaços gigantes.",
        paragraphs: [
          "Bon Jovi, Def Leppard, Journey, Van Halen e outros transformaram refrões enormes e produção polida em combustível para arenas. Em outra direção, Metallica, Slayer e Megadeth radicalizavam velocidade e peso; Guns N' Roses chegaria no fim da década com uma agressividade menos higienizada.",
          "As power ballads também nasceram desse casamento improvável entre volume e vulnerabilidade. A guitarra distorcida podia dividir o mesmo disco com uma canção construída para acender milhares de luzes em um estádio.",
        ],
      },
      {
        eyebrow: "06 · O SUBTERRÂNEO",
        title: "Nem todo mundo queria parecer enorme — e isso seria decisivo.",
        paragraphs: [
          "R.E.M., The Smiths, Sonic Youth, Pixies, Hüsker Dü, The Cure, Joy Division/New Order e dezenas de cenas independentes criaram públicos fora do pop mais espetacular. College radio, selos alternativos e circuitos de clubes mantinham outras sensibilidades vivas.",
          "Quando a década terminou, o mainstream parecia invencível. Mas as sementes da próxima mudança já estavam plantadas. O que estava escondido nas margens logo pisaria no centro do palco.",
        ],
      },
    ],
    quote: "Os anos 80 ensinaram que uma canção podia ocupar rádio, televisão, pista, estádio e quarto ao mesmo tempo.",
    sources: [
      ["HISTORY · Music in the 1980s", "https://www.history.com/articles/1980s"],
      ["EBSCO · Popular music history", "https://www.ebsco.com/research-starters/music/popular-music"],
      ["Smithsonian music collections", "https://www.si.edu/spotlight/music"],
    ],
  },

  "1990": {
    title: "1990",
    kicker: "A ÚLTIMA PARADA",
    subtitle: "Um ano na fronteira: o velho mapa ainda existia, mas a próxima década já estava entrando pela porta.",
    intro: [
      "1990 é interessante justamente porque ainda não soa como a caricatura que a memória construiu dos anos 90. O hair metal continuava vendendo, o pop de arena ainda dominava grandes espaços, baladas e adult contemporary permaneciam fortes — mas por baixo da superfície uma troca de guarda já acontecia.",
      "Alternative rock, hip-hop, música eletrônica e novas cenas independentes vinham acumulando força desde os anos 80. Em pouco tempo mudariam o centro da cultura popular. 1990 é o instante em que ainda é possível ouvir os dois mundos ao mesmo tempo.",
    ],
    chapters: [
      {
        eyebrow: "01 · O ECO DOS 80",
        title: "A década anterior não terminou quando o calendário virou.",
        paragraphs: [
          "Produção brilhante, sintetizadores, power ballads, pop de grande escala e hard rock continuaram ocupando rádio e televisão. Mudanças culturais raramente obedecem a 31 de dezembro; estilos sobrevivem, contratos continuam, turnês seguem na estrada.",
          "Por isso 1990 funciona como uma fotografia de transição. O que havia dominado a década anterior ainda estava presente, mas já não era a única força capaz de definir o futuro.",
        ],
      },
      {
        eyebrow: "02 · ALTERNATIVO",
        title: "O subterrâneo dos anos 80 estava pronto para deixar de ser subterrâneo.",
        paragraphs: [
          "R.E.M., Sonic Youth, Pixies e outras bandas haviam provado que existia uma audiência grande para música fora das fórmulas dominantes. Em Seattle, Nirvana, Soundgarden, Mudhoney e Alice in Chains faziam parte de uma cena que ainda não havia virado fenômeno global.",
          "No ano seguinte, Nevermind mudaria a escala dessa história. Mas 1990 é o capítulo anterior ao terremoto — quando os sinais já estavam todos ali para quem prestasse atenção.",
        ],
      },
      {
        eyebrow: "03 · HIP-HOP NO CENTRO",
        title: "O rap já não precisava pedir licença para ser tratado como força principal da cultura.",
        paragraphs: [
          "A década de 1980 havia consolidado o hip-hop como linguagem e mercado. Na virada para 1990, produção baseada em samples, novas escolas regionais, narrativa urbana e experimentação lírica ampliavam ainda mais o gênero.",
          "O que vinha a seguir não seria uma simples expansão comercial. Hip-hop passaria a reorganizar moda, linguagem, produção, negócios e a própria definição de música popular global.",
        ],
      },
      {
        eyebrow: "04 · ELETRÔNICA",
        title: "A pista também estava preparando seu próprio futuro.",
        paragraphs: [
          "House em Chicago, techno em Detroit, acid house e rave culture no Reino Unido mostravam que música eletrônica de dança já possuía ecossistemas próprios. DJs, clubes, selos e novas tecnologias estavam criando uma cultura que não dependia da lógica tradicional de banda de rock.",
          "Em 1990, essas cenas ainda pareciam paralelas ao centro do pop para muita gente. Poucos anos depois, seriam impossíveis de ignorar.",
        ],
      },
      {
        eyebrow: "05 · O FORMATO MUDA",
        title: "O CD ganhou espaço e a maneira de consumir música começou a mudar de pele.",
        paragraphs: [
          "A transição do vinil e da fita para o compact disc alterou catálogo, preço, remasterizações e hábitos de escuta. Gravadoras descobriram que podiam vender novamente décadas inteiras de repertório em um formato novo.",
          "Essa transformação tecnológica também reforçou uma ideia decisiva para a GUIROPA: o passado musical não desaparece quando uma era termina. Ele volta em outro suporte, encontra outro público e ganha outra leitura.",
        ],
      },
      {
        eyebrow: "06 · A LINHA",
        title: "É aqui que a GUIROPA para — não porque a música parou, mas porque a história seguinte já pertence a outro mapa.",
        paragraphs: [
          "Depois de quarenta anos de mutações, 1990 oferece um ponto final elegante. Ainda há ecos claros dos anos 50, 60, 70 e 80: guitarra, soul, pop, estúdio, espetáculo, pista, rádio. Mas novas forças já apontam para um mundo diferente.",
          "A última parada não é um funeral. É uma plataforma. Olhe para trás e você enxerga quarenta anos de transformações conectadas. Olhe para a frente e percebe que a próxima viagem já começou sem pedir permissão.",
        ],
      },
    ],
    quote: "1990 não é o fim da música. É o ponto em que esta linha do tempo fecha a porta — enquanto outra história começa do lado de fora.",
    sources: [
      ["EBSCO · Alternative rock music in the 1990s", "https://www.ebsco.com/research-starters/music/alternative-rock-music-1990s"],
      ["HISTORY · 1980s music and the transition to a new era", "https://www.history.com/articles/1980s"],
      ["EBSCO · Popular music history", "https://www.ebsco.com/research-starters/music/popular-music"],
    ],
  },
};

ARCHIVES["1990s"] = ARCHIVES["1990"];

const ACCENTS = {
  "1950s": "#b83224",
  "1960s": "#267c7a",
  "1970s": "#d57a24",
  "1980s": "#e62e6b",
  "1990": "#245a91",
  "1990s": "#245a91",
};

const DECADE_NAV = [
  ["1950s", "1950s"],
  ["1960s", "1960s"],
  ["1970s", "1970s"],
  ["1980s", "1980s"],
  ["1990", "1990"],
];

export default function DecadeArchivePage() {
  const { decade } = useParams();
  const data = ARCHIVES[decade] || ARCHIVES["1950s"];
  const accent = ACCENTS[decade] || ACCENTS["1950s"];

  return (
    <main className="decade-longform" style={{ "--accent": accent }}>
      <style>{`
        .decade-longform{min-height:100vh;background:#f4e6cf;color:#211c17;padding:64px 0 110px}.decade-wrap{width:min(1040px,calc(100% - 32px));margin:auto}.decade-back{color:var(--accent);font-size:.7rem;font-weight:900;letter-spacing:.12em;text-decoration:none}.decade-hero{padding:52px 0 48px;border-bottom:1px solid #6d513333}.decade-eye{display:block;color:var(--accent);font-size:.64rem;font-weight:900;letter-spacing:.2em}.decade-hero h1{font:400 clamp(5rem,13vw,10rem)/.8 Georgia,serif;letter-spacing:-.055em;margin:18px 0 26px;color:var(--accent)}.decade-hero h2{max-width:850px;font:400 clamp(2rem,4vw,3.8rem)/1.02 Georgia,serif;margin:0 0 26px}.decade-intro{max-width:760px}.decade-intro p{font:400 clamp(1.05rem,1.7vw,1.25rem)/1.82 Georgia,serif;color:#54483b}.decade-nav{display:flex;gap:8px;flex-wrap:wrap;padding:22px 0;border-bottom:1px solid #6d513333}.decade-nav a{border:1px solid #6d513355;padding:9px 12px;color:#54483b;text-decoration:none;font-size:.62rem;font-weight:900;letter-spacing:.1em}.decade-nav a.is-current{color:#fff;background:var(--accent);border-color:var(--accent)}.decade-chapter{display:grid;grid-template-columns:180px minmax(0,1fr);gap:42px;padding:56px 0;border-bottom:1px solid #6d513333}.decade-chapter__eye{color:var(--accent);font-size:.62rem;font-weight:900;letter-spacing:.16em;line-height:1.5}.decade-chapter h3{font:400 clamp(2.35rem,5vw,4.8rem)/.98 Georgia,serif;letter-spacing:-.04em;margin:0 0 24px}.decade-chapter p{max-width:720px;font:400 1.08rem/1.82 Georgia,serif;color:#4c4136}.decade-pull{margin:62px 0;padding:34px 0;border-top:4px solid var(--accent);border-bottom:1px solid #6d513333;font:italic 400 clamp(2rem,4vw,3.7rem)/1.12 Georgia,serif;color:#2d2822}.decade-signoff{padding:38px 0 26px}.decade-signoff small{display:block;color:var(--accent);font-size:.62rem;font-weight:900;letter-spacing:.16em}.decade-sign{display:inline-block;margin-top:12px;font-family:"Brush Script MT","Segoe Script","Bradley Hand",cursive;font-size:3.2rem;line-height:1;transform:rotate(-3deg)}.decade-sources{margin-top:42px;padding:28px;border:1px solid #6d513333;background:#fff8eb}.decade-sources h4{margin:0 0 18px;font-size:.66rem;letter-spacing:.16em;color:var(--accent)}.decade-sources a{display:block;color:#54483b;margin:.65rem 0;line-height:1.45;text-decoration:underline;text-underline-offset:3px}.decade-tunnel{display:inline-flex;margin-top:26px;padding:13px 18px;border:1px solid var(--accent);color:var(--accent);text-decoration:none;font-size:.66rem;font-weight:900;letter-spacing:.1em}@media(max-width:760px){.decade-longform{padding-top:42px}.decade-chapter{grid-template-columns:1fr;gap:14px;padding:42px 0}.decade-hero{padding-top:38px}.decade-hero h1{font-size:clamp(4.5rem,24vw,7.2rem)}}
      `}</style>

      <div className="decade-wrap">
        <Link className="decade-back" to="/">← GUIROPA RADIO</Link>

        <header className="decade-hero">
          <span className="decade-eye">THE GUIROPA ARCHIVES · MR. NOMAD</span>
          <h1>{data.title}</h1>
          <h2>{data.subtitle}</h2>
          <div className="decade-intro">
            {data.intro.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
        </header>

        <nav className="decade-nav" aria-label="Arquivos por período">
          {DECADE_NAV.map(([slug, label]) => (
            <Link key={slug} className={data.title === label ? "is-current" : ""} to={`/decada/${slug}`}>
              {label}
            </Link>
          ))}
        </nav>

        {data.chapters.map((chapter) => (
          <section className="decade-chapter" key={chapter.eyebrow}>
            <div className="decade-chapter__eye">{chapter.eyebrow}</div>
            <div>
              <h3>{chapter.title}</h3>
              {chapter.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
          </section>
        ))}

        <blockquote className="decade-pull">{data.quote}</blockquote>

        {data.title === "1970s" && (
          <Link className="decade-tunnel" to="/1977">ENTRAR NO GUIROPA 70s TUNNEL™ →</Link>
        )}

        <div className="decade-signoff">
          <small>HISTÓRIA E CURADORIA EDITORIAL · GUIROPA RADIO</small>
          <span className="decade-sign">Mr. Nomad</span>
        </div>

        <aside className="decade-sources">
          <h4>FONTES DE PESQUISA</h4>
          {data.sources.map(([label, url]) => (
            <a key={url} href={url} target="_blank" rel="noreferrer">{label} ↗</a>
          ))}
        </aside>
      </div>
    </main>
  );
}
