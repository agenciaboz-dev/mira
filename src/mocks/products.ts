import { Product } from "../definitions/product"

export const products: Product[] = [
    {
        id: 1,
        name: "Martelo",
        description:
            "O martelo unha da mtx possui cabeça feita de aço de alta qualidade com acabamento e polido, cabo de fibra de vidro com revestimento de borracha que amortiza o impacto e é fácil para usar.",
        available: 20,
        story: "O martelo é uma das ferramentas mais antigas e amplamente utilizadas desde a pré-história. Originalmente, era feito de pedra ou osso e usado para quebrar ossos de animais e abrir frutas. Com o tempo, a ferramenta evoluiu para incluir um cabo de madeira e uma cabeça de metal para uso em trabalhos de carpintaria e construção. Hoje em dia, existem muitos tipos diferentes de martelos para várias aplicações, desde trabalhos de acabamento fino até trabalhos pesados de construção.",
        price: 39.99,
    },
    {
        id: 2,
        name: "Prego",
        description:
            "O prego com cabeça possui corpo liso, cabeça cônica e axadrezada, e ponta tipo diamante. É utilizado em diversos tipos de fixação: construções de todos os tipos, desde uso doméstico a construções pesadas, confecção de estruturas temporárias, marcenaria, embalagens, caixarias, aplicações rurais como pontes, mata-burros e porteiras.",
        available: 500,
        story: "O prego é uma das ferramentas mais antigas da humanidade e sua origem remonta a cerca de 5.000 anos atrás. Inicialmente, era feito de materiais como cobre e bronze, mas com a descoberta do ferro, passou a ser produzido com esse material. A partir da Idade Média, a produção de pregos se tornou uma indústria importante, com a fabricação em larga escala feita em forjas. Hoje, existem diversos tipos de pregos, desde os mais simples até os mais complexos, utilizados em diferentes áreas, como a construção civil e a indústria naval.",
        price: 1.99,
    },
]
