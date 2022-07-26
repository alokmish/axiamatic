import { CgClose, CgMathPlus } from "react-icons/cg";

const ItemCard: React.FC<IItemCardProps> = ({ item, removeItemHandler }) => {
  return <>{getContent(item, removeItemHandler)}</>;
};

export default ItemCard;

function getContent(
  item: IItemCardItem | null,
  removeItemHandler?: (itemId: string | number) => void
) {
  if (item && removeItemHandler) {
    return (
      <div className="flex flex-col items-center justify-between p-5 h-44 w-44 rounded shadow-lg shadow-slate-100 border">
        <div className="product-card__product">
          <img
            className="m-2.5 w-10"
            src={item.icon}
            alt={`${item.title} icon`}
          />
          <p className="text-center text-base">{item.title}</p>
        </div>
        <a
          className="flex items-center justify-between text-xs no-underline"
          href="/"
          onClick={(e) => {
            e.preventDefault();
            removeItemHandler(item.id);
          }}
        >
          <CgClose className="mr-1.5 text-red-600" />
          Remove
        </a>
      </div>
    );
  }
  return (
    <div className="flex flex-col items-center justify-center p-5 h-44 w-44 rounded shadow-lg shadow-slate-100 border">
      <div className="text-2xl w-14 h-14 bg-slate-100 flex items-center justify-center text-slate-300">
        <CgMathPlus />
      </div>
    </div>
  );
}

export interface IItemCardItem {
  id: string | number;
  title: string;
  icon: string;
}

export interface IItemCardProps {
  item: IItemCardItem | null;
  removeItemHandler?: (itemId: string | number) => void;
}
