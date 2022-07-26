import SearchInput from "../base/SearchInput";
import { Product } from "./ProductSelection";

const AddProducts: React.FC<IAddProductsProps> = ({
  products,
  productSelectionHandler,
  productSaveHandler,
}) => {
  return (
    <div>
      <div className="p-1 w-11 text-center bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 rounded text-white text-xs select-none">
        1 of 3
      </div>
      <h1 className="text-3xl my-3 select-none">
        Let's add your internal tools
      </h1>
      <p className="text-slate-500 select-none">
        Search to quickly add products your team uses today.
        <br />
        You will be able to add as many as you need later, but for <br />
        now let's add four.
      </p>
      <div className="my-10">
        <SearchInput
          items={products}
          itemSelectHandler={(itemId) => {
            productSelectionHandler(itemId);
          }}
        />
        <button
          className="block p-3 my-6 w-6/12 rounded-lg bg-indigo-500 text-white"
          onClick={() => productSaveHandler()}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AddProducts;

export interface IAddProductsProps {
  products: Product[];
  productSelectionHandler: (itemId: string | number) => void;
  productSaveHandler: () => void;
}
