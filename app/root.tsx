import {
  Links,
  LinksFunction,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch
} from 'remix'
import { NotFound } from './components'
import globalStylesUrl from './styles/global.css'
import tailwindStyles from './tailwind.css'

export const links: LinksFunction = () => {
  return [
    {
      rel: 'stylesheet',
      href: globalStylesUrl
    },
    { rel: 'stylesheet', href: tailwindStyles }
  ]
}

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === 'development' && <LiveReload />}
      </body>
    </html>
  )
}

export function CatchBoundary() {
  const caught = useCatch()

  let message
  switch (caught.status) {
    case 401:
      message =
        ' Oops! Looks like you tried to visit a page that you do not have access to.'
      break
    case 404:
      message =
        'Oops! Looks like you tried to visit a page that does not exist.'
      break

    default:
      throw new Error(caught.data || caught.statusText)
  }

  return (
    <>
      <NotFound message={message} />
    </>
  )
}
