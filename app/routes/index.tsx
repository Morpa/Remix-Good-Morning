import { useLoaderData } from 'remix';
import data from '../../data/data.json';

interface ListItem {
  id: string;
  phrase: string;
  description: string;
  flag: string;
}

interface Data {
  list: ListItem[];
  selectedIndex: number;
}

function randomGoodMorning(list: ListItem[]): number {
  return Math.floor(Math.random() * list.length);
}

export const loader = () => {
  return {
    list: data.list,
    selectedIndex: randomGoodMorning(data.list),
  } as Data;
};

import type { MetaFunction } from 'remix';

export const meta: MetaFunction = ({ data }: { data: Data | undefined }) => {
  if (!data) {
    return {
      title: 'A new good morning every day',
      description: 'A random good morning phrase in a different language every day',
    };
  }
  const goodMorningOfTheDay = data.list[data.selectedIndex];

  return {
    title: `${goodMorningOfTheDay.flag} | ${goodMorningOfTheDay.phrase}`,
    description: goodMorningOfTheDay.description,
  };
};

export default function Index() {
  const data = useLoaderData<Data>();
  const goodMorningOfTheDay = data.list[data.selectedIndex];

  return (
    <div className="flex flex-col items-center justify-center text-center h-screen bg-gray-100, px-5">
      <p className="text-center text-gray-700 md:text-8xl text-6xl font-bold transition-all">
        {goodMorningOfTheDay.flag}
      </p>
      <h1 className="md:text-8xl text-6xl font-bold mb-8 transition-all">
        {goodMorningOfTheDay.phrase}
      </h1>
      <p className="md:text-2xl text-xl px-4 transition-all">{goodMorningOfTheDay.description}</p>
    </div>
  );
}
