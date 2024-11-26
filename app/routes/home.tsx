import type { Route } from '../+types/root';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'New React Router App' },
    { name: 'description', content: 'Welcome to React Router!' },
  ];
}

export default function Home() {
  return (
    <div>
      <h1>Welcome to React Router!</h1>
      <p>
        Get started by editing the file at <code>app/routes/home.tsx</code>
      </p>
    </div>
  );
}
