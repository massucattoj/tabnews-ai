import { prefetchDNS } from "react-dom";
import Confetti from "./confetti";
import styles from "./page.module.css";

// O total de conteúdos não precisa ser em tempo real: a página é gerada
// estaticamente e revalidada em segundo plano a cada 60s (ISR), em vez de
// esperar a API do TabNews a cada requisição.
export const revalidate = 60;

const TABNEWS_URL = "https://www.tabnews.com.br";

async function getTotalContents() {
  try {
    const response = await fetch(
      `${TABNEWS_URL}/api/v1/contents?per_page=1&strategy=new`,
      {
        next: { revalidate },
        // Não deixa uma API lenta segurar a geração da página.
        signal: AbortSignal.timeout(3000),
      },
    );

    if (!response.ok) return null;

    const total = Number(response.headers.get("x-pagination-total-rows"));
    return Number.isFinite(total) ? total : null;
  } catch {
    return null;
  }
}

export default async function Home() {
  // O botão principal leva ao TabNews: resolve o DNS enquanto a página carrega,
  // para o clique não pagar esse custo. Só DNS (barato); um preconnect abriria
  // TCP+TLS que provavelmente seria descartado antes do clique.
  prefetchDNS(TABNEWS_URL);

  const totalContents = await getTotalContents();

  return (
    <main className={styles.main}>
      <Confetti />
      <h1 className={styles.title}>Em construção</h1>
      <p className={styles.description}>
        Estamos neste exato momento reconstruindo o TabNews, um lugar na
        internet para quem trabalha com tecnologia e precisa consumir conteúdos
        com valor concreto
      </p>
      <p className={styles.stats}>
        {totalContents === null ? (
          "Não foi possível carregar o total de conteúdos publicados agora."
        ) : (
          <>
            <span className={styles.count}>
              {totalContents.toLocaleString("pt-BR")}
            </span>{" "}
            conteúdos já publicados
          </>
        )}
      </p>
      <a
        className={styles.button}
        href={TABNEWS_URL}
        target="_blank"
        rel="noopener noreferrer"
      >
        Visitar o TabNews
      </a>
    </main>
  );
}
