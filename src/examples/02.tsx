import { useEffect, useRef, useState } from "react";
import AnimateRender from "../AnimateRender";
import "./02.css";

interface Item {
  id: number;
  name: string;
}

export default function Example02() {
  const currId = useRef(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const [items, setItems] = useState<Item[]>([]);

  function addItem() {
    const newItem = {
      id: currId.current++,
      name: ["Alice", "Marco", "Juliana", "Cecília", "Gabriel"][
        Math.floor(Math.random() * 5)
      ],
    };
    setItems((prev) => [...prev, newItem]);
  }

  function removeItem(id: number) {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }

  return (
    <main>
      <h1>Example 02</h1>
      <button onClick={() => addItem()}>Add new Item!</button>

      <label htmlFor="duration">{`Duration ms.`}</label>
      <input
        id="duration"
        ref={inputRef}
        type="number"
        step={100}
        min={0}
        max={10000}
        defaultValue={1000}
      />

      <AnimatedList
        items={items}
        duration={Number(inputRef.current?.value)}
        onRemove={removeItem}
      />
    </main>
  );
}

interface VirtualItem extends Item {
  isMounted: boolean;
}
function AnimatedList({
  items,
  duration,
  onRemove,
}: {
  items: Item[];
  duration: number;
  onRemove: (id: number) => void;
}) {
  const prevItems = useRef<Item[]>([]);
  const [virtualItems, setVirtualItems] = useState<VirtualItem[]>([]);

  useEffect(() => {
    const [added] = items
      .filter((c) => !prevItems.current.some((p) => p.id === c.id))
      .map((c) => ({ ...c, isMounted: true }));

    const [removed] = prevItems.current
      .filter((p) => !items.some((c) => c.id === p.id))
      .map((c) => ({ ...c, isMounted: false }));

    if (added) {
      setVirtualItems((prev) => [...prev, added]);
    }

    if (removed) {
      const removedIdx = virtualItems.findIndex((it) => it.id === removed.id);
      setVirtualItems((prev) => {
        const copy = [...prev];
        copy[removedIdx] = removed;
        return copy;
      });

      console.log({ items, prevItems: prevItems.current, added, removed });

      // remove from virtualItems
      setTimeout(() => {
        setVirtualItems((prev) => prev.filter((p) => p.id !== removed.id));
      }, duration);
    }

    prevItems.current = items;
  }, [items]);

  useEffect(() => {
    console.log(virtualItems);
  }, [virtualItems]);

  return (
    <ul>
      {virtualItems.map((item) => (
        <AnimateRender
          key={item.id}
          isMounted={item.isMounted}
          enter={`slideIn ${duration}ms ease-in 0ms both`}
          exit={`slideOut ${duration}ms ease-in 0ms both`}
          duration={duration}
          animateContainerY
        >
          <li>
            <div>
              {item.id} {item.name}{" "}
              <span
                onClick={() => {
                  onRemove(item.id);
                }}
              >
                X
              </span>
            </div>
          </li>
        </AnimateRender>
      ))}
    </ul>
  );
}
