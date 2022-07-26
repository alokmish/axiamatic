import { useEffect, useState, useRef } from "react";

const SearchInput: React.FC<ISearchInputProps> = ({
  items,
  itemSelectHandler,
}) => {
  const [listItems, setListItems] = useState([] as ISearchInputItem[]);
  const [searchText, setSearchText] = useState("");
  const [focused, setFocused] = useState(false);
  const inputRef = useRef({} as HTMLInputElement);
  const listItemsRef = useRef({} as HTMLDivElement);

  useEffect(() => {
    const documentClickHandler = (event: MouseEvent) => {
      if (
        inputRef.current &&
        listItemsRef.current &&
        !inputRef.current.contains(event.target as Node) &&
        !listItemsRef.current.contains(event.target as Node)
      ) {
        setFocused(false);
      }
    };

    document.addEventListener("click", documentClickHandler);

    return () => {
      document.removeEventListener("click", documentClickHandler);
    };
  }, []);

  useEffect(() => {
    setSearchText("");
    setListItems(items);
  }, [items]);

  useEffect(() => {
    setListItems(
      items.filter((i) =>
        i.title.toLowerCase().includes(searchText.toLowerCase())
      )
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchText]);

  return (
    <>
      <input
        className="p-3 w-6/12 bg-slate-200 rounded-lg"
        type="text"
        title="product name"
        placeholder="Search for any software"
        value={searchText}
        ref={inputRef}
        onChange={(e) => setSearchText(e.target.value)}
        onFocus={() => setFocused(true)}
      />
      {focused && listItems.length > 0 && (
        <div
          className="z-10 my-4 p-3 w-1/4 bg-white absolute rounded-lg shadow-lg shadow-slate-100 border"
          ref={listItemsRef}
        >
          <ul>
            {listItems.map((item) => {
              return (
                <li
                  key={item.id}
                  onClick={() => {
                    setFocused(false);
                    itemSelectHandler(item.id);
                  }}
                  className="p-2 flex space-x-2 rounded-lg items-center justify-start hover:bg-indigo-500 hover:text-white"
                >
                  <img
                    className="w-5 h-5 inline-block"
                    src={item.icon}
                    alt={`${item.title} icon`}
                  />
                  <span>{item.title}</span>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </>
  );
};

export default SearchInput;

export interface ISearchInputItem {
  id: string | number;
  title: string;
  icon: string;
}

export interface ISearchInputProps {
  items: ISearchInputItem[];
  itemSelectHandler: (itemId: string | number) => void;
}
