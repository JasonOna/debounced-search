type Result = {
  id: number;
  title: string;
  price: number;
  image: string;
};

export default function Results({ results }: { results: Result[] }) {
  return (
    <div className="flex flex-wrap max-h-96 overflow-auto">
      {results.map((result) => {
        return (
          <div key={result.id} className="w-6/12 grid grid-cols-3">
            <section className="m-auto">
              <img src={result.image} className="max-h-32 max-w-32 w-full" />
            </section>
            <section className="col-span-2 flex flex-col">
              <h1 className="text-xl uppercase mb-1">{result.title}</h1>
              <h2 className="text-lg text-slate-500">
                {parsePrice(result.price)}
              </h2>
            </section>
          </div>
        );
      })}
    </div>
  );
}

// TODO: refactor if more complex display is needed
const parsePrice = (price: number) => {
  return `$ ${price}`;
};
