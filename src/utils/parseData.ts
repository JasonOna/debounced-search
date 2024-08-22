type Product = {
  id: number;
  title: string;
  price: number;
  images: string[];
};

type Data = {
  products: Product[];
};

export default function parseData(data: Data | null) {
  return data?.products?.map((product) => {
    return {
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.images[0],
    };
  });
}
