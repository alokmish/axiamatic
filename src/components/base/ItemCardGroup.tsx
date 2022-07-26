import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { Grid } from "react-loader-spinner";

import ItemCard, { IItemCardItem } from "./ItemCard";

let emptyItems: { id: string }[] = [];

const ItemCardGroup: React.FC<IItemCardGroupProps> = ({
  items,
  capacity,
  removeItemHandler,
}) => {
  const [numProducts, setNumProducts] = useState(0);
  const [loading, setLoading] = useState(true);

  const handleItemRemoval = (itemId: string | number) => {
    removeItemHandler(itemId);
  };

  const getItemGrid = () => {
    return (
      <>
        <div className="grid grid-cols-2 gap-8 items-center justify-center">
          {
            // Add selected products to DOM
            items.map((item: IItemCardItem) => (
              <ItemCard
                key={item.id}
                item={item}
                removeItemHandler={() => handleItemRemoval(item.id)}
              />
            ))
          }
          {
            // Add empty product placeholders to DOM
            emptyItems.map((item) => (
              <ItemCard key={item.id} item={null} />
            ))
          }
        </div>
        <span className="m-10 text-slate-400 select-none">
          {numProducts} Products Added
        </span>
      </>
    );
  };

  useEffect(() => {
    setLoading(true);
    setNumProducts(items.length);
    emptyItems = new Array(capacity - items.length).fill(0).map(() => {
      return {
        id: uuidv4(),
      };
    });
    setLoading(false);
  }, [items, capacity]);

  return (
    <div className="flex flex-col items-center justify-center">
      <Grid
        height="80"
        width="80"
        color="#6366F1"
        ariaLabel="grid-loading"
        radius="12.5"
        wrapperStyle={{}}
        wrapperClass=""
        visible={loading}
      />
      {!loading && getItemGrid()}
    </div>
  );
};

export default ItemCardGroup;

export interface IItemCardGroupProps {
  items: IItemCardItem[];
  capacity: number;
  removeItemHandler: (itemId: string | number) => void;
}
