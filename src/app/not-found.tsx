export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-screen max-w-lg flex-col justify-center px-6">
      <p className="eyebrow text-accent">404 / PAGE NOT FOUND</p>
      <h1 className="mt-6 text-3xl font-medium">ページが見つかりません。</h1>
      <p className="mt-5 text-sm leading-loose text-muted">
        URLをご確認いただくか、トップページからご覧ください。
      </p>
      <a
        href={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/`}
        className="mt-8 inline-flex min-h-12 items-center text-accent underline underline-offset-4"
      >
        Yukaのプロフィールへ戻る
      </a>
    </main>
  );
}
