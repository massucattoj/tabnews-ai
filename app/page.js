import Confetti from "./confetti";
import styles from "./page.module.css";

export const dynamic = "force-dynamic";

const TABNEWS_URL = "https://www.tabnews.com.br";

async function getTotalContents() {
  try {
    const response = await fetch(
      `${TABNEWS_URL}/api/v1/contents?per_page=1&strategy=new`,
      { cache: "no-store" },
    );

    if (!response.ok) return null;

    const total = Number(response.headers.get("x-pagination-total-rows"));
    return Number.isFinite(total) ? total : null;
  } catch {
    return null;
  }
}

export default async function Home() {
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
