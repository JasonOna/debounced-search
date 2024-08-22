type Result = {
  id: number;
  title: string;
  price: number;
  image: string;
};

export const Results = ({ results }: { results: Result[] }) => {
  return (
    <div className="flex flex-wrap max-h-96 overflow-auto">
      {results.map((result) => {
        return (
          <div key={result.id} className="w-6/12 grid grid-cols-3">
            <img src={result.image} className="h-32" />
            <section className="col-span-2 flex flex-col">
              <h1 className="text-xl uppercase">{result.title}</h1>
              <h2 className="text-lg text-slate-500">
                {parsePrice(result.price)}
              </h2>
            </section>
          </div>
        );
      })}
    </div>
  );
};

// TODO: refactor if more complex display is needed
const parsePrice = (price: number) => {
  return `$ ${price}`;
};
