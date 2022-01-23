import { useEffect, useState } from 'react'
import { useLoaderData, MetaFunction, LoaderFunction } from 'remix'
import { IoVolumeMediumOutline } from 'react-icons/io5'

import { Error } from '../components'

import { client } from '~/graphql/client'
import { GetPhrasesQuery, Item } from '~/graphql/generated/graphql'
import { GET_PHRASES } from '~/graphql/queries'

type DataList = {
  list: Pick<Item, 'language' | 'flag' | 'phrase'>[]
  selectedIndex: number
}

function randomGoodMorning(
  list: Pick<Item, 'language' | 'flag' | 'phrase'>[]
): number {
  return Math.floor(Math.random() * list.length)
}

export const meta: MetaFunction = ({
  data
}: {
  data: DataList | undefined
}) => {
  if (!data) {
    return {
      title: 'A new good morning every day',
      description:
        'A random good morning phrase in a different language every day'
    }
  }
  const goodMorningOfTheDay = data.list[data.selectedIndex]

  return {
    title: `${goodMorningOfTheDay.flag} | ${goodMorningOfTheDay.phrase}`,
    description: goodMorningOfTheDay.phrase
  }
}

export const loader: LoaderFunction = async () => {
  const { items } = await client.request<GetPhrasesQuery>(GET_PHRASES)

  return {
    list: items,
    selectedIndex: randomGoodMorning(items)
  }
}

export default function () {
  const data = useLoaderData<DataList>()
  const goodMorningOfTheDay = data.list[data.selectedIndex]
  const [voice, setVoice] = useState<SpeechSynthesisVoice | null>(null)

  const speak = (word: string) => {
    const utterance = new SpeechSynthesisUtterance()

    utterance.text = word
    utterance.lang = 'english'
    utterance.voice = voice
    utterance.rate = 0.8

    window.speechSynthesis.speak(utterance)
  }

  useEffect(() => {
    const voices = window.speechSynthesis?.getVoices()
    const voice = voices?.find((voice) => voice.lang)

    setVoice(voice || voices?.[0])
  }, [])

  return (
    <div className="flex flex-col items-center justify-center text-center h-screen bg-gray-100, px-5">
      <p className="text-center text-gray-700 md:text-8xl text-6xl font-bold transition-all">
        {goodMorningOfTheDay.flag}
      </p>
      <h1 className="md:text-8xl text-6xl font-bold mb-8 transition-all">
        {goodMorningOfTheDay.phrase}
      </h1>
      <p className="px-4 py-4 transition-all">
        <button
          className="outline-none animate-pulse"
          onClick={() => speak(goodMorningOfTheDay.phrase)}
          title="Hear the pronunciation"
        >
          <IoVolumeMediumOutline className="h-16 w-16" />
        </button>
      </p>

      <span className="text-sm mt-18">
        * This app uses the new Web Speech API, so it may not work properly on
        some browsers/devices. In addition, not all sentences have translation.
      </span>
    </div>
  )
}

export function ErrorBoundary({ error }: { error: Error }) {
  return <Error error={error} />
}
